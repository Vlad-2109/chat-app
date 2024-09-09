import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const Home: React.FC = () => {
  const fetchUserDetails = async () => {
    try {
      const URL: string = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: URL,
        withCredentials: true,
      });
      console.log('currentUserDetails', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};
