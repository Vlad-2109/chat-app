import { createBrowserRouter } from 'react-router-dom';
import { RegisterPage } from '../pages/RegisterPage';
import { CheckEmailPage } from '../pages/CheckEmailPage';
import { CheckPasswordPage } from '../pages/CheckPasswordPage';
import { Home } from '../pages/Home';
import { MessagePage } from '../components/MessagePage';
import { Layout } from '../components/Layout';
import { AuthLayouts } from '../layout/AuthLayouts';

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
      {
        path: 'register',
        element: (
          <AuthLayouts>
            <RegisterPage />
          </AuthLayouts>
        ),
      },
      {
        path: 'email',
        element: (
          <AuthLayouts>
            <CheckEmailPage />
          </AuthLayouts>
        ),
      },
      {
        path: 'password',
        element: (
          <AuthLayouts>
            <CheckPasswordPage />
          </AuthLayouts>
        ),
      },
    ],
  },
]);
