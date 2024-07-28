import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';




// admin_panel_script.js
var AdminPanelScript = (function() {
    document.addEventListener('DOMContentLoaded', function() {
        const blogForm = document.getElementById('blog-form');
        if (blogForm) {
            blogForm.addEventListener('submit', function(event) {
                event.preventDefault();

                const title = document.getElementById('title').value;
                const excerpt = document.getElementById('excerpt').value;
                const author = document.getElementById('author').value;
                const content = document.getElementById('content').value;
                const images = document.getElementById('images').files;
                const imageUrls = [];

                for (let i = 0; i < images.length; i++) {
                    const imageUrl = URL.createObjectURL(images[i]);
                    imageUrls.push(imageUrl);
                }

                const blogPost = {
                    id: Date.now(),
                    title,
                    excerpt,
                    author,
                    content,
                    images: imageUrls,
                    likes: 0,
                    dislikes: 0,
                    comments: []
                };

                let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
                blogs.push(blogPost);
                localStorage.setItem('blogs', JSON.stringify(blogs));

                alert('Blog yazısı başarıyla yayınlandı!');
                window.location.href = 'fblog.html';
            });
        }
    });
})();


// blog_detail_script.js
var BlogDetailScript = (function() {
    document.addEventListener('DOMContentLoaded', function() {
        const currentBlog = JSON.parse(localStorage.getItem('currentBlog'));
        
        if (currentBlog) {
            document.getElementById('blog-title').innerText = currentBlog.title;
            document.getElementById('blog-author').innerText = `Yazar: ${currentBlog.author}`;
            document.getElementById('blog-content').innerHTML = currentBlog.content;
            
            // Like ve dislike butonları
            const likeButton = document.getElementById('like-button');
            const dislikeButton = document.getElementById('dislike-button');
            
            if (likeButton) {
                likeButton.addEventListener('click', () => {
                    currentBlog.likes = (currentBlog.likes || 0) + 1;
                    localStorage.setItem('blogs', JSON.stringify(updateBlog(currentBlog)));
                    alert('Beğendiniz!');
                });
            }
            
            if (dislikeButton) {
                dislikeButton.addEventListener('click', () => {
                    currentBlog.dislikes = (currentBlog.dislikes || 0) + 1;
                    localStorage.setItem('blogs', JSON.stringify(updateBlog(currentBlog)));
                    alert('Beğenmediniz!');
                });
            }
            
            // Yorumları yükle
            const commentsList = document.getElementById('comments-list');
            currentBlog.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.innerText = comment;
                commentsList.appendChild(commentDiv);
            });
            
            // Yorum ekleme
            const commentForm = document.getElementById('comment-form');
            if (commentForm) {
                commentForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    const commentText = document.getElementById('comment-text').value;
                    currentBlog.comments.push(commentText);
                    localStorage.setItem('blogs', JSON.stringify(updateBlog(currentBlog)));
                    location.reload(); // eslint-disable-line no-restricted-globals
                });
            }
        }
    });

    function updateBlog(updatedBlog) {
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const blogIndex = blogs.findIndex(blog => blog.id === updatedBlog.id);
        if (blogIndex !== -1) {
            blogs[blogIndex] = updatedBlog;
        }
        return blogs;
    }
})();


// fblog_script.js
var FBlogScript = (function() {
    window.addEventListener('DOMContentLoaded', () => {
        let scrollPos = 0;
        const mainNav = document.getElementById('mainNav');
        if (mainNav) {
            const headerHeight = mainNav.clientHeight;

            window.addEventListener('scroll', function() {
                const currentTop = document.body.getBoundingClientRect().top * -1;
                if (currentTop < scrollPos) {
                    // Scrolling Up
                    if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                        mainNav.classList.add('is-visible');
                    } else {
                        mainNav.classList.remove('is-visible', 'is-fixed');
                    }
                } else {
                    // Scrolling Down
                    mainNav.classList.remove(['is-visible']);
                    if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                        mainNav.classList.add('is-fixed');
                    }
                }
                scrollPos = currentTop;
            });
        }

        // Eklenen blog fonksiyonları
        const blogList = document.getElementById('blog-list');
        if (blogList) {
            const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
            
            blogs.slice(0, 10).forEach(blog => {
                const blogDiv = document.createElement('div');
                blogDiv.classList.add('col-lg-6', 'col-xxl-4', 'mb-5');
                blogDiv.innerHTML = `
                    <div class="card bg-light border-0 h-100">
                        <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                            <h2 class="fs-4 fw-bold">${blog.title}</h2>
                            <p class="mb-0">${blog.excerpt}</p>
                        </div>
                    </div>
                `;
                blogList.appendChild(blogDiv);
                
                blogDiv.addEventListener('click', () => {
                    localStorage.setItem('currentBlog', JSON.stringify(blog));
                    window.location.href = 'blog_detail.html';
                });
            });
        }
    });
})();


// forum_script.js
var ForumScript = (function() {
    document.addEventListener('DOMContentLoaded', function() {
        const topicsContainer = document.getElementById('topics-container');
        if (topicsContainer) {
            const topics = JSON.parse(localStorage.getItem('topics')) || [];
            
            topics.sort((a, b) => b.interactions - a.interactions);
            
            const topTopics = topics.slice(0, 6);
            
            topTopics.forEach(topic => {
                const topicDiv = document.createElement('div');
                topicDiv.classList.add('col-lg-6', 'col-xxl-4', 'mb-5');
                topicDiv.innerHTML = `
                    <div class="card bg-light border-0 h-100">
                        <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                            <h2 class="fs-4 fw-bold">${topic.title}</h2>
                            <p class="mb-0">${topic.tags ? topic.tags.join(', ') : ''}</p>
                        </div>
                    </div>
                `;
                topicsContainer.appendChild(topicDiv);
                
                topicDiv.addEventListener('click', () => {
                    localStorage.setItem('currentTopic', JSON.stringify(topic));
                    window.location.href = 'topic_detail.html';
                });
            });
        }
    });
})();


// fprofile_script.js
var FProfileScript = (function() {
    document.addEventListener('DOMContentLoaded', function() {
        const profilesList = document.getElementById('players-list');
        if (profilesList) {
            const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
            
            profiles.sort((a, b) => b.interactions - a.interactions);
            
            const topProfiles = profiles.slice(0, 10);
            
            topProfiles.forEach(profile => {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('col-lg-6', 'col-xxl-4', 'mb-5');
                profileDiv.innerHTML = `
                    <div class="card bg-light border-0 h-100">
                        <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                            <h2 class="fs-4 fw-bold">${profile.playerName}</h2>
                            <p class="mb-0">${profile.teamName}</p>
                        </div>
                    </div>
                `;
                profilesList.appendChild(profileDiv);
                
                profileDiv.addEventListener('click', () => {
                    localStorage.setItem('currentProfile', JSON.stringify(profile));
                    window.location.href = 'profile_detail.html';
                });
            });
        }
    });
})();


// login_script.js
var LoginScript = (function() {
    async function handleSubmit(event) {
        event.preventDefault();
                
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
                
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);

                
                const user = JSON.parse(atob(response.data.token.split('.')[1]));
                localStorage.setItem('user', JSON.stringify(user));

                alert('Giriş başarılı!');
                window.location.href = '/';
            } else {
                throw new Error('Geçersiz yanıt');
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;
            console.error('Giriş başarısız:', errorMessage);
            alert('Giriş başarısız: ' + errorMessage);
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleSubmit);
        }
    });

    return {
        setupLoginForm: function() {
            console.log("Login form setup completed.");
        },
        handleSubmit: handleSubmit 
    };
})();


// navbar_script.js
const Navbar = ({ navType }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/login';
    };
  
    const renderLinks = () => {
        switch(navType) {
          case 'forum':
            return (
              <>
                <a className="btn btn-primary me-2" href="/fforum">Fforum</a>
                <a className="btn btn-primary me-2" href="/topics">Konular</a>
                <a className="btn btn-primary me-2" href="/new_topic">Konu Aç</a>
                <a className="btn btn-primary me-2" href="/">Ana Sayfa</a>
              </>
            );
          case 'profil':
            return (
              <>
                <a className="btn btn-primary me-2" href="/fprofil">Fprofil</a>
                <a className="btn btn-primary me-2" href="/profiles">Profiller</a>
                <a className="btn btn-primary me-2" href="/evaluate">Profil Oluştur</a>
                <a className="btn btn-primary me-2" href="/">Ana Sayfa</a>
              </>
            );
          case 'blog':
            return (
              <>
                <a className="btn btn-primary me-2" href="/fblog">Fblog</a>
                <a className="btn btn-primary me-2" href="/">Ana Sayfa</a>
                {user && user.role === 'admin' && (
                  <a className="btn btn-primary me-2" href="/admin-panel">Admin Paneli</a>
                )}
              </>
            );
          case 'login':
            return (
              <>
                <a className="btn btn-primary me-2" href="/">Ana Sayfa</a>
              </>
            );
          default:
            return null;
        }
      };
  
    return (
      <nav className={`navbar navbar-${navType} navbar-light bg-light static-top`}>
        <div className="container d-flex justify-content-between">
          <div className="d-flex">
          <img src={logo} alt="FFORUM Logo" className="navbar-logo me-3" />
            {renderLinks()}
          </div>
          <div className="d-flex">
            {user ? (
              <>
                <span className="navbar-text me-2">Hoş geldiniz {user.username}</span>
                <button className="btn btn-primary" onClick={handleLogout}>Çıkış Yap</button>
              </>
            ) : (
              <>
                <a className="btn btn-primary me-2" href="/register">Kaydol</a>
                <a className="btn btn-primary" href="/login">Giriş Yap</a>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  };
  



// new_topic_script.js
var NewTopicScript = (function() {
    document.addEventListener('DOMContentLoaded', function() {
        const newTopicForm = document.getElementById('new-topic-form');
        if (newTopicForm) {
            newTopicForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const title = document.getElementById('title').value;
                const content = document.getElementById('topicContent').value;
                const tags = document.getElementById('topicTags').value.split(',').map(tag => tag.trim());
                
                
                let topics = JSON.parse(localStorage.getItem('topics')) || [];
                topics.push({ title, content, tags, interactions: 0 });
                localStorage.setItem('topics', JSON.stringify(topics));
                
                alert('Yeni konu oluşturuldu!');
                window.location.href = 'fforum.html'; 
            });
        }
    });
})();


// player_evaluation_script.js
var PlayerEvaluationScript = (function() {
    document.addEventListener('DOMContentLoaded', function() {
        const evaluationForm = document.getElementById('evaluation-form');
        if (evaluationForm) {
            evaluationForm.addEventListener('submit', function(event) {
                event.preventDefault();

                const playerName = document.getElementById('playerName').value;
                const teamName = document.getElementById('teamName').value;
                const nationality = document.getElementById('nationality').value;
                const criteria = [];

                for (let i = 1; i <= 17; i++) {
                    const score = document.getElementById(`criteria${i}`).value;
                    const description = document.getElementById(`criteria${i}Desc`).value;
                    criteria.push({ score, description });
                }

                const generalComment = document.getElementById('generalComment').value;

                const playerProfile = {
                    playerName,
                    teamName,
                    nationality,
                    criteria,
                    generalComment,
                    interactions: 0, 
                    comments: [] 
                };

                let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
                profiles.push(playerProfile);
                localStorage.setItem('profiles', JSON.stringify(profiles));

                alert('Değerlendirme başarıyla kaydedildi!');
                window.location.href = 'fprofil.html';
            });
        }
    });
})();


// profiles_script.js
var ProfilesScript = (function() {
    document.addEventListener('DOMContentLoaded', function() {
        const profilesList = document.getElementById('profiles-list');
        if (profilesList) {
            const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
            
            profiles.forEach(profile => {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('col-lg-6', 'col-xxl-4', 'mb-5');
                profileDiv.innerHTML = `
                    <div class="card bg-light border-0 h-100">
                        <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                            <h2 class="fs-4 fw-bold">${profile.playerName}</h2>
                            <p class="mb-0">${profile.teamName}</p>
                        </div>
                    </div>
                `;
                profilesList.appendChild(profileDiv);
                
                profileDiv.addEventListener('click', () => {
                    localStorage.setItem('currentProfile', JSON.stringify(profile));
                    window.location.href = 'profile_detail.html';
                });
            });
        }
    });
})();


// profile_detail_script.js
var ProfileDetailScript = (function() {
    document.addEventListener('DOMContentLoaded', function() {
        const profileDetail = document.getElementById('profile-detail');
        const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));

        if (currentProfile) {
            profileDetail.innerHTML = `
                <div class="col-12">
                    <div class="card bg-light border-0 h-100">
                        <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                            <h2 class="fs-4 fw-bold">${currentProfile.playerName}</h2>
                            <p class="mb-0">${currentProfile.teamName}</p>
                            <p class="mb-0">${currentProfile.nationality}</p>
                            ${currentProfile.criteria.map((criterion, index) => `
                            <p class="mb-0">${index + 1}. Puan: ${criterion.score}, Açıklama: ${criterion.description}</p>
                            `).join('')}
                            <p class="mb-0">Genel Yorum: ${currentProfile.generalComment}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    });
})();


// register_script.js
var RegisterScript = (function() {
    async function handleSubmit(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);

                const user = JSON.parse(atob(response.data.token.split('.')[1]));
                localStorage.setItem('user', JSON.stringify(user));

                alert('Kayıt başarılı!');
                window.location.href = '/'; 
            } else {
                throw new Error('Geçersiz yanıt');
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;
            console.error('Kayıt başarısız:', errorMessage);
            alert('Kayıt başarısız: ' + errorMessage);
        }
    }

    function setupRegistrationForm() {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', handleSubmit);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        setupRegistrationForm();
    });

    return {
        setupRegistrationForm: setupRegistrationForm,
        handleSubmit: handleSubmit
    };
})();


// topics_script.js
export const loadTopics = async () => {
    try {
      const response = await axios.get('/api/forum');
      return response.data;
    } catch (error) {
      console.error('Error fetching topics:', error);
      return [];
    }
  };
  
  export const loadTopicDetail = () => {
    const currentTopic = JSON.parse(localStorage.getItem('currentTopic'));
    if (!currentTopic) {
      console.error('No current topic found in localStorage.');
      return null;
    }
    return currentTopic;
  };
  
  export const setCurrentTopic = (topic) => {
    localStorage.setItem('currentTopic', JSON.stringify(topic));
  };
  export const updateInteraction = async (forumId, interactionType) => {
    try {
      const response = await fetch(`/api/forum/${forumId}/interact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ interactionType })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedForum = await response.json();
      return updatedForum;
    } catch (error) {
      console.error('Error updating interaction:', error);
      return null;
    }
  };

export { 
  AdminPanelScript, 
  BlogDetailScript, 
  FBlogScript, 
  ForumScript, 
  FProfileScript, 
  LoginScript, 
  Navbar, 
  NewTopicScript, 
  PlayerEvaluationScript, 
  ProfilesScript, 
  ProfileDetailScript, 
  RegisterScript,  
}

