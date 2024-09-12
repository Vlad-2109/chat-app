import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

export const MessagePage: React.FC = () => {
  const params = useParams();
  const socketConnection = useAppSelector(
    (state) => state.user.socketConnection,
  );

  console.log('params', params.userId);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);

      socketConnection.on('message-user', (data) => {
        console.log('user details', data);
      });
    }
  }, [socketConnection, params.userId]);
  return <div>MessagePage</div>;
};
