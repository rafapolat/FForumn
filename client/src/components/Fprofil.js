import React, { useEffect, useState } from 'react';
import '../styles/fforum_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../utils/helperfunctions';
import axios from 'axios';

const Fprofil = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/playerEvaluation/top');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div>
      <Navbar navType="profil" />
      <header className="py-5">
        <div className="container px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">Oyuncu Profilleri</h1>
              <p className="fs-4">En çok etkileşim alan oyuncuları inceleyin</p>
            </div>
          </div>
        </div>
      </header>
      <section className="pt-4">
        <div className="container px-lg-5">
          <div className="row gx-lg-5" id="players-list">
            {profiles.map(profile => (
              <div key={profile._id} className="col-lg-4 mb-4">
                <div className="card h-100 shadow border-0">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3">{profile.playerName}</h5>
                    <p className="card-text">{profile.teamName} - {profile.nationality}</p>
                    <a href={`/profileDetail/${profile._id}`} className="btn btn-primary">Detayları Görüntüle</a>
                  </div>
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

export default Fprofil;
