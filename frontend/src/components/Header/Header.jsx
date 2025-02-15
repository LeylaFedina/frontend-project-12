import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import { logoutUser } from '../../features/loginSlice';
import { resetChatState } from '../../features/chatSlice';

const Header = () => {
  const isAuthenticated = !!localStorage.getItem('userData');
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetChatState());
    navigate('/login', { replace: true });
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
        {t('header.title')}
        </Link>
        {isAuthenticated && (
          <button type="button" onClick={handleLogout} className="btn btn-primary">
            {t('header.logOutBtn')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
