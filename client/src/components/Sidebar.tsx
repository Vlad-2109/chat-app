import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { useEffect, useState } from 'react';
import EditUserDetails from './EditUserDetails';
import { FiArrowUpLeft } from 'react-icons/fi';
import { SearchUser } from './SearchUser';
import { SearchUserState } from '../types/types';
import { FaImage, FaVideo } from 'react-icons/fa';
import { logout } from '../redux/userSlice';

export const Sidebar: React.FC = () => {
  const user = useAppSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState<boolean>(false);
  const [allUser, setAllUser] = useState<SearchUserState[] | []>([]);
  const [openSearchUser, setOpenSearchUser] = useState<boolean>(false);
  const socketConnection = useAppSelector(
    (state) => state.user.socketConnection,
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('sidebar', user._id);

      socketConnection.on('conversation', (data) => {
        console.log('conversation', data);

        const conversationUserData = data.map((conversationUser: any) => {
          if (conversationUser.sender?._id === conversationUser.receiver?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          } else if (conversationUser.receiver._id !== user._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });
        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/email');
    localStorage.clear();
  };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div className="">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && 'bg-slate-200'}`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>
          <div
            title="add friend"
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            title="logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            onClick={handleLogout}
          >
            <span className="-ml-2">
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-2xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}

          {allUser.map((conv: any) => (
            <NavLink
              to={'/' + conv.userDetails._id}
              key={conv._id}
              className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer"
            >
              <div className="">
                <Avatar
                  userId={conv.userDetails._id}
                  imageUrl={conv.userDetails.profile_pic}
                  name={conv.userDetails.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="">
                <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
                  {conv.userDetails.name}
                </h3>
                <div className="text-slate-500 text-xs flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    {conv.lastMessage.imageUrl && (
                      <div className="flex items-center gap-1">
                        <span>
                          <FaImage />
                        </span>
                        {!conv.lastMessage.text && <span>Image</span>}
                      </div>
                    )}
                    {conv.lastMessage.videoUrl && (
                      <div className="flex items-center gap-1">
                        <span>
                          <FaVideo />
                        </span>
                        {!conv.lastMessage.text && <span>Video</span>}
                      </div>
                    )}
                  </div>
                  <p className="text-ellipsis line-clamp-1">
                    {conv.lastMessage.text}
                  </p>
                </div>
              </div>
              {Boolean(conv.unseenMessage) && (
                <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">
                  {conv.unseenMessage}
                </p>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};
