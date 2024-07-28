import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fforum_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, updateInteraction } from '../utils/helperfunctions';
import axios from 'axios';

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('/api/forum');
        setTopics(response.data);
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
      <section className="pt-4">
        <div className="container px-lg-5">
          <div className="list-group" id="topics-list">
            {topics.map((forum) => (
              <div key={forum._id}>
                <Link
                  className="list-group-item list-group-item-action flex-column align-items-start"
                  to="/topic_detail"
                  onClick={() => {
                    localStorage.setItem('currentTopic', JSON.stringify(forum));
                  }}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{forum.title}</h5>
                    <small>{new Date(forum.date).toLocaleDateString()}</small>
                  </div>
                  <p className="mb-1">{forum.content.substring(0, 50)}...</p>
                  <div className="d-flex justify-content-between">
                    <small>
                      Beğeni: {(forum.likes && forum.likes.length) || 0}, Beğenmeme: {(forum.dislikes && forum.dislikes.length) || 0}, Komik: {(forum.funny && forum.funny.length) || 0}
                    </small>
                    <small>{new Date(forum.createdAt).toLocaleDateString()}</small>
                  </div>
                </Link>
                <div className="d-flex mt-2">
                  <button onClick={() => handleInteraction(forum._id, 'like')} className="btn btn-sm btn-outline-primary me-2">Beğen</button>
                  <button onClick={() => handleInteraction(forum._id, 'dislike')} className="btn btn-sm btn-outline-secondary me-2">Beğenme</button>
                  <button onClick={() => handleInteraction(forum._id, 'funny')} className="btn btn-sm btn-outline-success">Komik</button>
                </div>
              </div>
            ))}
          </div>
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

export default Topics;
