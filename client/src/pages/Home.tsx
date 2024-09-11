import axios from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { logout, setUser } from '../redux/userSlice';
import { Sidebar } from '../components/Sidebar';

export const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log('redux user', user);

  const fetchUserDetails = async () => {
    try {
      const URL: string = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.logout) {
        dispatch(logout());
        navigate('/email');
      }
      console.log('currentUserDetails', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className="bg-white">
        <Sidebar />
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  );
};
