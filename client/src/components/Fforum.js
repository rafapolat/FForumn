import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fforum_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, updateInteraction } from '../utils/helperfunctions';
import axios from 'axios';

const Fforum = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('/api/forum');
        const sortedTopics = response.data.sort((a, b) => b.interactions - a.interactions).slice(0, 6);
        setTopics(sortedTopics);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  const handleInteraction = async (forumId, interactionType) => {
    const updatedForum = await updateInteraction(forumId, interactionType);
    if (updatedForum) {
      setTopics((prevTopics) => 
        prevTopics.map((forum) => 
          forum._id === forumId ? updatedForum : forum
        )
      );
    }
  };

  return (
    <div>
      <Navbar navType="forum" />
      <header className="py-5">
        <div className="container px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">Forumlara Hoş Geldiniz</h1>
              <p className="fs-4">Bu bölümde öne çıkan tartışma konuları yer alıyor</p>
            </div>
          </div>
        </div>
      </header>
      <section className="pt-4">
        <div className="container px-lg-5">
          <div className="row gx-lg-5" id="topics-container">
            {topics.map((forum) => (
              <div key={forum._id} className="col-lg-6 col-xxl-4 mb-5">
                <div className="card bg-light border-0 h-100 shadow-lg">
                  <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                    <h2 className="fs-4 fw-bold">{forum.title}</h2>
                    <p className="mb-0">{forum.tags ? forum.tags.join(', ') : ''}</p>
                    <div className="d-flex justify-content-between mt-4">
                      <p>Interactions: {forum.interactions}</p>
                      <p>{new Date(forum.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="d-flex mt-2">
                      <button onClick={() => handleInteraction(forum._id, 'like')} className="btn btn-sm btn-outline-primary me-2">Beğen</button>
                      <button onClick={() => handleInteraction(forum._id, 'dislike')} className="btn btn-sm btn-outline-secondary me-2">Beğenme</button>
                      <button onClick={() => handleInteraction(forum._id, 'funny')} className="btn btn-sm btn-outline-success">Komik</button>
                    </div>
                  </div>
                  <Link to="/topic_detail" className="stretched-link" onClick={() => {
                    localStorage.setItem('currentTopic', JSON.stringify(forum));
                  }} />
                </div>
              </div>
            ))}
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

export default Fforum;
