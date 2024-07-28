import React, { useEffect } from 'react';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar }  from '../utils/helperfunctions';
import blogLogo from '../assets/img/logolar/fblog.webp';
import forumLogo from '../assets/img/logolar/fforum.webp';
import profilLogo from '../assets/img/logolar/fprofil.webp';
import { Link } from 'react-router-dom';
import bgImage from '../assets/img/logolar/bg-masthead.png';

const Home = () => {
  useEffect(() => {
    
  }, []);

  return (
    <div>
      <div>
      <Navbar navType="home" />
    </div>
      <header className="masthead"  style={{
         backgroundImage: `url(${bgImage})`,
        }}
         >
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                <h1 className="mb-5">Site İçerikleri 3'e Ayrılmaktadır</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <Link to="/fblog">
                <img src={blogLogo} alt="Blog Logo" className="img-fluid" />
              </Link>
            </div>
            <div className="col-lg-4">
              <Link to="/fforum">
                <img src={forumLogo} alt="Forum Logo" className="img-fluid" />
              </Link>
            </div>
            <div className="col-lg-4">
              <Link to="/fprofil">
                <img src={profilLogo} alt="Profil Logo" className="img-fluid" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="showcase">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{ backgroundImage: `url(${blogLogo})` }}></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>Fblog</h2>
              <p className="lead mb-0">Futbol dünyası ile ilgili en güncel ve en doğru kalemlerce ele alınmış haber başlıkları.</p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 text-white showcase-img" style={{ backgroundImage: `url(${forumLogo})` }}></div>
            <div className="col-lg-6 my-auto showcase-text">
              <h2>FForum</h2>
              <p className="lead mb-0">Fikirlerini bu konuyla ilgilenen başka insanlarla paylaşabileceğiniz başka insanların açtığı konu başlıklarında fikirlerinizi belirtebileceğiniz paylaşım bölümü.</p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{ backgroundImage: `url(${profilLogo})` }}></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>FProfil</h2>
              <p className="lead mb-0">Ünlü, tanınmış ya da ilk defa adını sizden duyacağımız futbolcuları bir gözlemci gibi yorumlama ve değerlendirme platformu.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
              <ul className="list-inline mb-2">
                <li className="list-inline-item"><a href="#!">Hakkında</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">İletişim</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">Kullanıcı Sözleşmesi</a></li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item"><a href="#!">Gizlilik Sözleşmesi</a></li>
              </ul>
              <p className="text-muted small mb-4 mb-lg-0">&copy; FForum 2024</p>
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

export default Home;
