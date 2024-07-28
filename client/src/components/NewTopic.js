import React, { useState } from 'react';
import '../styles/fforum_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../utils/helperfunctions';
import axios from 'axios';

const NewTopic = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/forum', { title, content, tags: tags.split(',') }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Konu başarıyla oluşturuldu');
      window.location.href = '/forum'; 
    } catch (error) {
      console.error('Error creating topic', error);
      alert('Konu oluşturma sırasında bir hata oluştu: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div>
      <div>
        <Navbar navType="forum" />
      </div>
      <section className="pt-4">
        <div className="container px-lg-5">
          <form id="new-topic-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Konu Başlığı</label>
              <input type="text" className="form-control" id="title" placeholder="Konu başlığını girin" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="topicContent" className="form-label">İçerik</label>
              <textarea className="form-control" id="topicContent" rows="5" placeholder="İçeriği girin" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="topicTags" className="form-label">Etiketler</label>
              <input type="text" className="form-control" id="topicTags" placeholder="Etiketleri virgülle ayırarak girin" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Gönder</button>
          </form>
        </div>
      </section>
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">Copyright &copy; FForum 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default NewTopic;
