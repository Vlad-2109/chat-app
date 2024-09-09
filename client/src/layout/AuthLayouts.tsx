import { AuthLayoutsProps } from '../types/types';
import logo from '../assets/logo.png';

export const AuthLayouts: React.FC<AuthLayoutsProps> = ({ children }) => {
  return (
    <>
      <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
        <div>
          <img src={logo} alt="logo" width={180} height={60} />
        </div>
      </header>
      {children}
    </>
  );
};
