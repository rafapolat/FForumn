import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, updateInteraction } from '../utils/helperfunctions';

const TopicDetail = () => {
  const [forum, setForum] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    const currentForum = JSON.parse(localStorage.getItem('currentTopic'));
    if (!currentForum) {
      console.error('No current topic found in localStorage.');
      return;
    }
    setForum(currentForum);
    fetchReplies(currentForum._id);
  }, []);

  const fetchReplies = async (topicId) => {
    try {
      const response = await fetch(`/api/forum/${topicId}/replies`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setReplies(data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleInteraction = async (forumId, interactionType) => {
    const updatedForum = await updateInteraction(forumId, interactionType);
    if (updatedForum) {
      setForum(updatedForum);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      const response = await fetch(`/api/forum/${forum._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newReply })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedForum = await response.json();
      setForum(updatedForum);
      setReplies(updatedForum.replies);
      setNewReply('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  if (!forum) return <div>Loading...</div>;

  return (
    <div>
      <Navbar navType="forum" />
      <div className="container px-lg-5 mt-5" id="topic-detail">
        <div className="p-4 p-lg-5 bg-light rounded-3 shadow-lg">
          <h2>{forum.title}</h2>
          <p className="mt-4">{forum.content}</p>
          <div className="d-flex justify-content-between mt-4">
            <p>Interactions: {forum.likes.length} Beğeni, {forum.dislikes.length} Beğenmeme, {forum.funny.length} Komik</p>
            <p>{new Date(forum.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="d-flex mt-2">
            <button onClick={() => handleInteraction(forum._id, 'like')} className="btn btn-sm btn-outline-primary me-2">Beğen</button>
            <button onClick={() => handleInteraction(forum._id, 'dislike')} className="btn btn-sm btn-outline-secondary me-2">Beğenme</button>
            <button onClick={() => handleInteraction(forum._id, 'funny')} className="btn btn-sm btn-outline-success">Komik</button>
          </div>
        </div>
        <div className="mt-5">
          <h4>Yanıtlar</h4>
          <div className="replies">
            {replies.map(reply => (
              <div key={reply._id} className="reply mb-3 p-3 bg-light rounded">
                <p>{reply.content}</p>
                <small>By {reply.author.username} at {new Date(reply.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
          <form onSubmit={handleReplySubmit} className="mt-4">
            <div className="mb-3">
              <textarea
                className="form-control"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Yanıtınızı yazın"
                rows="3"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Yanıtla</button>
          </form>
        </div>
      </div>
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">Copyright &copy; FForum 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default TopicDetail;
