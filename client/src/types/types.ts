export interface AuthLayoutsProps {
  children: React.ReactNode;
}

export interface AvatarProps {
  name: string;
  imageUrl: string;
  width: number;
  height: number;
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
  password: string;
}
