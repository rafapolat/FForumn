const express = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog');
const verifyToken = require('../middleware/verifyToken');
const { requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new blog post with image upload
router.post('/', [verifyToken, requireRole('admin'), upload.single('backgroundImage')], async (req, res) => {
  const { title, excerpt, content, author } = req.body;
  const backgroundImage = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newBlog = new Blog({
      title,
      excerpt,
      content,
      author,
      backgroundImage
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a blog post by ID
router.put('/:id', [verifyToken, requireRole('admin')], async (req, res) => {
  const { title, excerpt, content, author } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.title = title;
    blog.excerpt = excerpt;
    blog.content = content;
    blog.author = author;
    blog.updatedAt = Date.now();

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a blog post by ID
router.delete('/:id', [verifyToken, requireRole('admin')], async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.remove();
    res.status(200).json({ message: 'Blog deleted' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Like a blog post
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (!blog.likes) blog.likes = [];
    if (!blog.dislikes) blog.dislikes = [];

    if (blog.likes.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already liked this blog.' });
    }

    const dislikeIndex = blog.dislikes.indexOf(req.user._id);
    if (dislikeIndex !== -1) {
      blog.dislikes.splice(dislikeIndex, 1);
    }

    blog.likes.push(req.user._id);
    await blog.save();
    res.status(200).json({ likes: blog.likes.length, dislikes: blog.dislikes.length });
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Dislike a blog post
router.post('/:id/dislike', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (!blog.likes) blog.likes = [];
    if (!blog.dislikes) blog.dislikes = [];

    if (blog.dislikes.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already disliked this blog.' });
    }

    const likeIndex = blog.likes.indexOf(req.user._id);
    if (likeIndex !== -1) {
      blog.likes.splice(likeIndex, 1);
    }

    blog.dislikes.push(req.user._id);
    await blog.save();
    res.status(200).json({ likes: blog.likes.length, dislikes: blog.dislikes.length });
  } catch (error) {
    console.error('Error disliking blog:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Add a comment to a blog post
router.post('/:id/comment', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = {
      text: req.body.text,
      date: Date.now(),
      user: req.user._id
    };

    blog.comments.push(comment);
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
