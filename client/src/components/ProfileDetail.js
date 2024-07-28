import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/fforum_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navbar } from '../utils/helperfunctions';

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/playerEvaluation/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <Navbar navType="profil" />
      <header className="py-5">
        <div className="container px-lg-5" style={{ backgroundImage: `url('/path/to/background-image.jpg')`, backgroundSize: 'cover' }}>
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">{profile.playerName}</h1>
              <p className="fs-4">{profile.teamName} - {profile.nationality}</p>
            </div>
          </div>
        </div>
      </header>
      <section className="pt-4">
        <div className="container px-lg-5">
          <div className="row gx-lg-5" id="profile-detail">
            <div className="col-lg-12">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <h5 className="card-title mb-3">Oyuncu Değerlendirmeleri</h5>
                  <p className="card-text">Hata yaptıktan sonra toparlanma: {profile.recoveryAfterMistakes} - {profile.criteria1Desc}</p>
                  <p className="card-text">Süreklilik: {profile.consistency} - {profile.criteria2Desc}</p>
                  <p className="card-text">Fizik gücü: {profile.physicalStrength} - {profile.criteria3Desc}</p>
                  <p className="card-text">Stamina: {profile.stamina} - {profile.criteria4Desc}</p>
                  <p className="card-text">Risk alma: {profile.riskTaking} - {profile.criteria5Desc}</p>
                  <p className="card-text">Sosyal hayat: {profile.socialLife} - {profile.criteria6Desc}</p>
                  <p className="card-text">Oyuna ufak katkılar: {profile.criteria7} - {profile.criteria7Desc}</p>
                  <p className="card-text">Oyuna büyük katkılar: {profile.criteria8} - {profile.criteria8Desc}</p>
                  <p className="card-text">İkili mücadelelere girme: {profile.criteria9} - {profile.criteria9Desc}</p>
                  <p className="card-text">Topu kullanırken aldığı risk: {profile.criteria10} - {profile.criteria10Desc}</p>
                  <p className="card-text">Aldığı riski başarıya ulaştırma: {profile.criteria11} - {profile.criteria11Desc}</p>
                  <p className="card-text">İlk kontrol: {profile.criteria12} - {profile.criteria12Desc}</p>
                  <p className="card-text">Sosyal Hayat: {profile.criteria13} - {profile.criteria13Desc}</p>
                  <p className="card-text">Tanınırlık: {profile.criteria14} - {profile.criteria14Desc}</p>
                  <p className="card-text">Hız: {profile.criteria15} - {profile.criteria15Desc}</p>
                  <p className="card-text">Dar Alanda adam geçme: {profile.criteria16} - {profile.criteria16Desc}</p>
                  <p className="card-text">Geniş Alanda adam geçme: {profile.criteria17} - {profile.criteria17Desc}</p>
                  <p className="card-text">Genel Yorum: {profile.generalComment}</p>
                </div>
              </div>
            </div>
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

export default ProfileDetail;
