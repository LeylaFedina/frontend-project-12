import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import layoutStyles from './Layout.module.scss';

const AppLayout = () => {
  return (
    <>
      <Header />
      <div className={layoutStyles.content}>
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
