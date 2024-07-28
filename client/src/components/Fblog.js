import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fblog_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import background from '../assets/img/home-bg.jpg';
import { Navbar } from '../utils/helperfunctions';

const Fblog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };

    const checkAdmin = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'admin') {
        setIsAdmin(true);
      }
    };

    fetchBlogs();
    checkAdmin();
  }, []);

  return (
    <div>
      <Navbar navType="blog" />
      <header className="masthead" style={{ backgroundImage: `url(${background})` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>FBlog</h1>
                <span className="subheading">Objektiflik çatısı altında yeri geldiğinde taraftar olarak site moderatörlerinin saygı çerçevesinde fikirlerini belirttiği alan</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              {blogs.map(blog => (
                <div className="post-preview" key={blog._id}>
                  <Link to={`/blog/${blog._id}`}>
                    <h2 className="post-title">{blog.title}</h2>
                    <h3 className="post-subtitle">{blog.excerpt}</h3>
                  </Link>
                  <p className="post-meta">
                    <a href="#!"> {blog.author} </a>
                     tarafından-  
                      {new Date(blog.createdAt).toLocaleDateString()} 
                     -tarihinde paylaşılmıştır
                  </p>
                  <hr className="my-4" />
                </div>
              ))}
              {isAdmin && (
                <div className="mt-4">
                  <h3>Yeni Blog Yazısı Oluştur</h3>
                  <a href="/admin-panel" className="btn btn-primary">Admin Paneline Git</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <footer className="footer bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
              <ul className="list-inline mb-2">
                <li className="list-inline-item"><a href="#!">Hakkında</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">İletişim</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">Kullanıcı Sözleşmesi</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">Gizlilik Sözleşmesi</a></li>
              </ul>
              <p className="text-muted small mb-4 mb-lg-0">&copy; FForum 2024</p>
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

export default Fblog;
