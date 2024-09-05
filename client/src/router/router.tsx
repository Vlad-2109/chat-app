import { createBrowserRouter } from 'react-router-dom';
import { RegisterPage } from '../pages/RegisterPage';
import { CheckEmailPage } from '../pages/CheckEmailPage';
import { CheckPasswordPage } from '../pages/CheckPasswordPage';
import { Home } from '../pages/Home';
import { MessagePage } from '../components/MessagePage';
import { Layout } from '../components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [{ path: ':userId', element: <MessagePage /> }],
      },
      { path: 'register', element: <RegisterPage /> },
      { path: 'email', element: <CheckEmailPage /> },
      { path: 'password', element: <CheckPasswordPage /> },
    ],
  },
]);
