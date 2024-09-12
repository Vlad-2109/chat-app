import { Socket } from "socket.io-client";

export interface UserState {
  _id: string;
  name: string;
  email: string;
  profile_pic: string;
  token: string;
  onlineUser: string[];
  socketConnection: null | Socket;
}
