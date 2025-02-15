import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from '../../components/forms/LoginForm/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.entities?.token);

  useEffect(() => {
    if (localStorage.getItem('userData') && token) {
      navigate('fromPage');
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="col-10 col-md-6 col-lg-4">
        <div className="card shadow-lg">
          <div className="card-body p-4">
            <div className="d-flex flex-column align-items-center">
              <img
                src="./src/assets/login.jpg"
                alt="Login"
                className="rounded-circle mb-4"
                width="120"
                height="120"
              />
              <LoginForm />
            </div>
            <div className="card-footer bg-transparent text-center py-3">
              <span className="me-2">Нет аккаунта?</span>
              <Link to={'/signup'}>Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
