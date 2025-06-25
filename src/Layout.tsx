import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

const RootLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  );
};

export default RootLayout;