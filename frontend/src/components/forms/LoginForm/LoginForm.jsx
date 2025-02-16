import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

import { loginUser } from '../../../features/loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loginError = useSelector((state) => state.login.loginError);
  const rollbar = useRollbar();
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      try {
        dispatch(loginUser(values));
      } catch (error) {
        rollbar.error('log error', error);
      }
    },
  });
  return (
    <form onSubmit={form.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required
          placeholder="Ваш ник"
          id="username"
          className={`form-control ${loginError ? 'is-invalid' : ''}`}
          onChange={form.handleChange}
          value={form.values.username}
        />
        <label htmlFor="username">{t('loginPage.form.login')}</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          className={`form-control ${loginError ? 'is-invalid' : ''}`}
          onChange={form.handleChange}
          value={form.values.password}
        />
        <label className="form-label" htmlFor="password">
          {t('loginPage.form.password')}
        </label>
        {loginError && <div className="invalid-feedback">{t(loginError)}</div>}
      </div>
      <button type="submit" className="w-100 mb-5 btn btn-outline-primary">
        {t('loginPage.form.loginBtn')}
      </button>
    </form>
  );
};

export default Login;
