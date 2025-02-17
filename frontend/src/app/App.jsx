import 'react-i18next';
import '../i18next';
import { Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import RequireAuth from '../components/hoc/RequireAuth';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
