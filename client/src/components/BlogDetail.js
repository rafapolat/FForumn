import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/fblog_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navbar } from '../utils/helperfunctions';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/blog/${id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlog(prevBlog => ({ ...prevBlog, likes: response.data.likes, dislikes: response.data.dislikes }));
    } catch (error) {
      console.error('Error liking blog', error);
      alert('Beğeni işlemi sırasında bir hata oluştu: ' + (error.response ? error.response.data.message : error.message));
    }
  };
  
  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/blog/${id}/dislike`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlog(prevBlog => ({ ...prevBlog, likes: response.data.likes, dislikes: response.data.dislikes }));
    } catch (error) {
      console.error('Error disliking blog', error);
      alert('Beğenmeme işlemi sırasında bir hata oluştu: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const commentText = e.target.commentText.value;
    if (!commentText) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/blog/${id}/comment`, { text: commentText }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlog(response.data);
      e.target.commentText.value = '';
    } catch (error) {
      console.error('Error adding comment', error);
      alert('Yorum ekleme işlemi sırasında bir hata oluştu: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div>
      <div>
        <Navbar navType="blog" />
      </div>
      <header className="masthead" style={{ backgroundImage: `url(http://localhost:5000${blog.backgroundImage})` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1 id="blog-title">{blog.title}</h1>
                <span className="subheading" id="blog-author">Yazar: {blog.author}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className="container px-lg-5">
          <div id="blog-content" className="mb-4">
            <p>{blog.content}</p>
          </div>
          <div id="blog-interactions" className="mb-4">
            <button id="like-button" className="btn btn-success" onClick={handleLike}>Beğen ({blog.likes.length})</button>
            <button id="dislike-button" className="btn btn-danger" onClick={handleDislike}>Beğenme ({blog.dislikes.length})</button>
          </div>
          <div id="blog-comments">
            <h3>Yorumlar</h3>
            <div id="comments-list" className="mb-4">
              {blog.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment.text}</p>
                  <small>{new Date(comment.date).toLocaleDateString()}</small>
                  <hr />
                </div>
              ))}
            </div>
            <form id="comment-form" onSubmit={handleComment}>
              <textarea id="comment-text" name="commentText" className="form-control mb-2" placeholder="Yorumunuzu yazın"></textarea>
              <button type="submit" className="btn btn-primary">Gönder</button>
            </form>
          </div>
        </div>
      </section>
      <footer className="footer bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
              <ul className="list-inline mb-2">
                <li className="list-inline-item"><a href="#!">About</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">Contact</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">Terms of Use</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">Privacy Policy</a></li>
              </ul>
              <p className="text-muted small mb-4 mb-lg-0">&copy; Your Website 2023. All Rights Reserved.</p>
            </div>
            <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4">
                  <a href="#!"><i className="bi-facebook fs-3"></i></a>
                </li>
                <li className="list-inline-item me-4">
                  <a href="#!"><i className="bi-twitter fs-3"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#!"><i className="bi-instagram fs-3"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetail;
