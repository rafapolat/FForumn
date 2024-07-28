import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Fforum from './components/Fforum';
import Fprofil from './components/Fprofil';
import NewTopic from './components/NewTopic';
import PlayerEvaluation from './components/PlayerEvaluation';
import ProfileDetail from './components/ProfileDetail';
import Profiles from './components/Profiles';
import Fblog from './components/Fblog';
import TopicDetail from './components/TopicDetail';
import Topics from './components/Topics';
import AdminPanel from './components/AdminPanel';
import BlogDetail from './components/BlogDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fforum" element={<Fforum />} />
        <Route path="/fprofil" element={<Fprofil />} />
        <Route path="/new_topic" element={<NewTopic />} />
        <Route path="/evaluate" element={<PlayerEvaluation />} />
        <Route path="/profileDetail/:id" element={<ProfileDetail />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/fblog" element={<Fblog />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/blog/:id" element={<BlogDetail />} />      
        <Route path="/topic_detail" element={<TopicDetail />} /> </Routes>
    </Router>
  );
}

export default App;
