import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/fforum_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../utils/helperfunctions';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/playerEvaluation/top');
        if (response.data && Array.isArray(response.data)) {
          setProfiles(response.data);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
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
              <p className="fs-4">En çok etkileşim alan oyuncu profillerini görüntüleyin</p>
            </div>
          </div>
        </div>
      </header>
      <section className="pt-4">
        <div className="container px-lg-5">
          <div className="row gx-lg-5">
            {profiles.map((profile) => (
              <div key={profile._id} className="col-lg-4 mb-5">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                    <h2 className="fs-4 fw-bold">{profile.playerName}</h2>
                    <p className="mb-0">{profile.teamName}</p>
                    <p className="mb-0">{profile.nationality}</p>
                    <a href={`/profileDetail/${profile._id}`} className="btn btn-primary mt-4">
                      Detayları Görüntüle
                    </a>
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

export default Profiles;
