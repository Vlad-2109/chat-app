import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export const Layout: React.FC = () => {
  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
};
