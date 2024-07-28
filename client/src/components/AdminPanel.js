import React, { useState, useEffect } from 'react';
import '../styles/fblog_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navbar } from '../utils/helperfunctions';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    content: ''
  });
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBackgroundImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('excerpt', formData.excerpt);
    data.append('author', formData.author);
    data.append('content', formData.content);
    data.append('backgroundImage', backgroundImage);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.post('http://localhost:5000/api/blog', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Blog created', response.data);
      alert('Blog başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Error creating blog:', error.message);
      alert('Blog oluşturulurken bir hata oluştu.');
    }
  };

  const handleRoleChange = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      await axios.put(`http://localhost:5000/api/users/${userId}/role`, { role }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Kullanıcı rolü güncellendi');
      setRole('');
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user role', error);
    }
  };

  return (
    <div>
      <Navbar navType="blog" />
      <section className="pt-4">
        <div className="container px-lg-5">
          <h2>Yeni Blog Yazısı Oluştur</h2>
          <form id="blog-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Başlık</label>
              <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="excerpt" className="form-label">Özet</label>
              <input type="text" className="form-control" id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Yazar</label>
              <input type="text" className="form-control" id="author" name="author" value={formData.author} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">İçerik</label>
              <textarea className="form-control" id="content" name="content" rows="5" value={formData.content} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="backgroundImage" className="form-label">Arka Plan Resmi</label>
              <input type="file" className="form-control" id="backgroundImage" name="backgroundImage" onChange={handleFileChange} accept="image/*" />
            </div>
            <button type="submit" className="btn btn-primary">Yayınla</button>
          </form>
          <h2 className="mt-5">Kullanıcı Rolleri Yönetimi</h2>
          <ul>
            {Array.isArray(users) ? users.map(user => (
              <li key={user._id}>
                {user.username} - {user.role}
                <button onClick={() => setSelectedUser(user)}>Rol Güncelle</button>
              </li>
            )) : <p>Kullanıcı bulunamadı.</p>}
          </ul>
          {selectedUser && (
            <div>
              <h3>{selectedUser.username} için rol güncelle</h3>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Rol Seç</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button onClick={() => handleRoleChange(selectedUser._id)}>Güncelle</button>
            </div>
          )}
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

export default AdminPanel;
