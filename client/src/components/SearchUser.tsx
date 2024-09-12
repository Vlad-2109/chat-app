import { useEffect, useState } from 'react';
import { IoSearchOutline, IoClose } from 'react-icons/io5';
import { Loading } from './Loading';
import { UserSearchCard } from './UserSearchCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SearchUserProps, SearchUserState } from '../types/types';

export const SearchUser: React.FC<SearchUserProps> = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState<SearchUserState[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const handleSearchUser = async () => {
    const URL: string = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/search-user`;

    try {
      setLoading(true);
      const response = await axios.post(URL, { search });
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  console.log('searchUser', searchUser);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            placeholder="Search user by name, email..."
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>
        <div className="bg-white mt-2 w-full p-4 rounded">
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}
          {loading && (
            <p>
              <Loading />
            </p>
          )}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user) => (
              <UserSearchCard key={user._id} user={user} onClose={onClose} />
            ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white" onClick={onClose}>
        <button>
          <IoClose />
        </button>
      </div>
    </div>
  );
};
