import React, { useEffect } from 'react';
import '../styles/fforum_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RegisterScript , Navbar } from '../utils/helperfunctions';

const RegisterComponent = () => {
  useEffect(() => {
    RegisterScript.setupRegistrationForm();
  }, []);

  return (
    <div>
      <Navbar navType="login" />
      <header className="py-5">
        <div className="container px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">Konular</h1>
              <p className="fs-4">Kayıt Olun</p>
            </div>
          </div>
        </div>
      </header>
      <section className="pt-4">
        <div className="container px-lg-5">
          <form id="register-form" onSubmit={RegisterScript.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                name="username"
                placeholder="Kullanıcı Adı" 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-Posta</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email"
                placeholder="E-Posta" 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Şifre</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password"
                placeholder="Şifre" 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Kayıt ol</button>
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

export default RegisterComponent;
