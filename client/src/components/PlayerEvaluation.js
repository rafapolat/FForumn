import React, { useState } from 'react';
import '../styles/fforum_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navbar } from '../utils/helperfunctions';

const PlayerEvaluation = () => {
  const [formData, setFormData] = useState({
    playerName: '',
    teamName: '',
    nationality: '',
    recoveryAfterMistakes: '',
    consistency: '',
    physicalStrength: '',
    stamina: '',
    riskTaking: '',
    socialLife: '',
    criteria1Desc: '',
    criteria2Desc: '',
    criteria3Desc: '',
    criteria4Desc: '',
    criteria5Desc: '',
    criteria6Desc: '',
    criteria7Desc: '',
    criteria8Desc: '',
    criteria9Desc: '',
    criteria10Desc: '',
    criteria11Desc: '',
    criteria12Desc: '',
    criteria13Desc: '',
    criteria14Desc: '',
    criteria15Desc: '',
    criteria16Desc: '',
    criteria17Desc: '',
    generalComment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/playerEvaluation', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Evaluation submitted', response.data);
      alert('Değerlendirme başarıyla kaydedildi!');
      window.location.href = '/fprofil';
    } catch (error) {
      console.error('Error submitting evaluation', error);
    }
  };

  return (
    <div>
      <Navbar navType="profil" />
      <header className="py-5">
        <div className="container px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">Oyuncu Değerlendirme</h1>
              <p className="fs-4">Oyuncuyu değerlendirin ve puan verin</p>
            </div>
          </div>
        </div>
      </header>
      <section className="pt-4">
        <div className="container px-lg-5">
          <form id="evaluation-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="playerName" className="form-label">Oyuncu Adı</label>
              <input
                type="text"
                className="form-control"
                id="playerName"
                name="playerName"
                value={formData.playerName || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="teamName" className="form-label">Takım</label>
              <input
                type="text"
                className="form-control"
                id="teamName"
                name="teamName"
                value={formData.teamName || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nationality" className="form-label">Milliyet</label>
              <input
                type="text"
                className="form-control"
                id="nationality"
                name="nationality"
                value={formData.nationality || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recoveryAfterMistakes" className="form-label">Hata yaptıktan sonra toparlanma</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="recoveryAfterMistakes"
                  name="recoveryAfterMistakes"
                  value={formData.recoveryAfterMistakes || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria1Desc"
                  name="criteria1Desc"
                  value={formData.criteria1Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="consistency" className="form-label">Süreklilik</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="consistency"
                  name="consistency"
                  value={formData.consistency || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria2Desc"
                  name="criteria2Desc"
                  value={formData.criteria2Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="physicalStrength" className="form-label">Fizik gücü</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="physicalStrength"
                  name="physicalStrength"
                  value={formData.physicalStrength || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria3Desc"
                  name="criteria3Desc"
                  value={formData.criteria3Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="stamina" className="form-label">Stamina</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="stamina"
                  name="stamina"
                  value={formData.stamina || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria4Desc"
                  name="criteria4Desc"
                  value={formData.criteria4Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="riskTaking" className="form-label">Risk alma</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="riskTaking"
                  name="riskTaking"
                  value={formData.riskTaking || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria5Desc"
                  name="criteria5Desc"
                  value={formData.criteria5Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="socialLife" className="form-label">Sosyal hayat</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="socialLife"
                  name="socialLife"
                  value={formData.socialLife || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria6Desc"
                  name="criteria6Desc"
                  value={formData.criteria6Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria7" className="form-label">Oyuna ufak katkılar</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria7"
                  name="criteria7"
                  value={formData.criteria7 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria7Desc"
                  name="criteria7Desc"
                  value={formData.criteria7Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria8" className="form-label">Oyuna büyük katkılar</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria8"
                  name="criteria8"
                  value={formData.criteria8 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria8Desc"
                  name="criteria8Desc"
                  value={formData.criteria8Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria9" className="form-label">İkili mücadelelere girme</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria9"
                  name="criteria9"
                  value={formData.criteria9 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria9Desc"
                  name="criteria9Desc"
                  value={formData.criteria9Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria10" className="form-label">Topu kullanırken aldığı risk</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria10"
                  name="criteria10"
                  value={formData.criteria10 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria10Desc"
                  name="criteria10Desc"
                  value={formData.criteria10Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria11" className="form-label">Aldığı riski başarıya ulaştırma</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria11"
                  name="criteria11"
                  value={formData.criteria11 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria11Desc"
                  name="criteria11Desc"
                  value={formData.criteria11Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria12" className="form-label">İlk kontrol</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria12"
                  name="criteria12"
                  value={formData.criteria12 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria12Desc"
                  name="criteria12Desc"
                  value={formData.criteria12Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria13" className="form-label">Sosyal Hayat</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria13"
                  name="criteria13"
                  value={formData.criteria13 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria13Desc"
                  name="criteria13Desc"
                  value={formData.criteria13Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria14" className="form-label">Tanınırlık</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria14"
                  name="criteria14"
                  value={formData.criteria14 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria14Desc"
                  name="criteria14Desc"
                  value={formData.criteria14Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria15" className="form-label">Hız</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria15"
                  name="criteria15"
                  value={formData.criteria15 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria15Desc"
                  name="criteria15Desc"
                  value={formData.criteria15Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria16" className="form-label">Dar Alanda adam geçme</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria16"
                  name="criteria16"
                  value={formData.criteria16 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria16Desc"
                  name="criteria16Desc"
                  value={formData.criteria16Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="criteria17" className="form-label">Geniş Alanda adam geçme</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="criteria17"
                  name="criteria17"
                  value={formData.criteria17 || ''}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  step="1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="criteria17Desc"
                  name="criteria17Desc"
                  value={formData.criteria17Desc || ''}
                  onChange={handleChange}
                  placeholder="Açıklama (isteğe bağlı)"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="generalComment" className="form-label">Genel Yorum</label>
              <textarea
                className="form-control"
                id="generalComment"
                name="generalComment"
                rows="3"
                value={formData.generalComment || ''}
                onChange={handleChange}
                placeholder="Genel yorum veya ekleme (isteğe bağlı)"
              ></textarea>
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

export default PlayerEvaluation;
