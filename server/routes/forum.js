const express = require('express');
const mongoose = require('mongoose');
const Forum = require('../models/Forum');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Create a new forum topic
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const newForum = new Forum({ title, content, author: req.user._id });
  await newForum.save();
  res.json(newForum);
});

// Get all forum topics
router.get('/', async (req, res) => {
  const forums = await Forum.find().populate('author', 'username');
  res.json(forums);
});

// Update a forum topic
router.put('/:id', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const forum = await Forum.findById(req.params.id);
  if (forum.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  forum.title = title;
  forum.content = content;
  forum.updatedAt = Date.now();
  await forum.save();
  res.json(forum);
});

// Delete a forum topic
router.delete('/:id', verifyToken, async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  if (forum.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  await forum.remove();
  res.json({ message: 'Forum topic deleted' });
});

// Create a new reply to a forum topic
router.post('/:id/reply', verifyToken, async (req, res) => {
  const { content } = req.body;
  const forum = await Forum.findById(req.params.id);

  if (!forum) {
    return res.status(404).json({ message: 'Forum topic not found' });
  }

  const newReply = {
    content,
    author: req.user._id
  };

  forum.replies.push(newReply);
  await forum.save();
  res.json(forum);
});

// Get replies of a forum topic
router.get('/:id/replies', async (req, res) => {
  const forum = await Forum.findById(req.params.id).populate('replies.author', 'username');

  if (!forum) {
    return res.status(404).json({ message: 'Forum topic not found' });
  }

  res.json(forum.replies);
});

// Update interaction for a forum topic
router.post('/:id/interact', verifyToken, async (req, res) => {
  const { interactionType } = req.body;
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(req.user._id.toString());

  try {
    const forum = await Forum.findById(id);
    if (!forum) {
      return res.status(404).send('Forum topic not found');
    }

    switch (interactionType) {
      case 'like':
        if (forum.likes.includes(userId)) {
          forum.likes.pull(userId);
        } else {
          forum.likes.push(userId);
        }
        break;
      case 'dislike':
        if (forum.dislikes.includes(userId)) {
          forum.dislikes.pull(userId);
        } else {
          forum.dislikes.push(userId);
        }
        break;
      case 'funny':
        if (forum.funny.includes(userId)) {
          forum.funny.pull(userId);
        } else {
          forum.funny.push(userId);
        }
        break;
      default:
        return res.status(400).send('Invalid interaction type');
    }

    await forum.save();
    res.json(forum);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
