import { UserState } from '../redux/types';

export interface AuthLayoutsProps {
  children: React.ReactNode;
}

export interface AvatarProps {
  userId: string;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
}

export interface EditUserDetailsProps {
  onClose: () => void;
  user: UserState;
}

export interface DataState {
  name: string;
  email: string;
  password: string;
  profile_pic: string;
}

export interface DataCheckEmailState {
  email: string;
}

export interface DataCheckPasswordState {
  userId: string;
  password: string;
}

export interface EditUserDetailsState {
  name: string;
  profile_pic: string;
}

export interface SearchUserState {
  createdAt: string;
  email: string;
  name: string;
  profile_pic: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface UserSearchCardProps {
  user: SearchUserState;
  onClose: () => void;
}

export interface SearchUserProps {
  onClose: () => void;
}
