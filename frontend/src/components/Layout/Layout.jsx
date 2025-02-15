import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import layoutStyles from './Layout.module.scss';

const AppLayout = () => (
  <>
    <Header />
    <div className={layoutStyles.content}>
      <Outlet />
    </div>
  </>
);

export default AppLayout;
