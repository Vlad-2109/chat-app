import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { getUserDetailsFromToken } from '../helpers/getUserDetailsFromToken';
import { UserModel } from '../models/user.model';

dotenv.config();

export const app = express();

export const server = http.createServer(app);
const io: Server = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
});

const onlineUser = new Set();

io.on('connection', async (socket) => {
  console.log('connect User', socket.id);

  const token = socket.handshake.auth.token;

  const user = await getUserDetailsFromToken(token);

  if (user && '_id' in user) {
    socket.join(user._id.toString());
    onlineUser.add(user?._id.toString());
  }

  io.emit('onlineUser', Array.from(onlineUser));

  socket.on('message-page', async (userId) => {
    console.log('userId', userId);
    const userDetails = await UserModel.findById(userId).select('-password');

    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      online: onlineUser.has(userId),
    };

    socket.emit('message-user', payload);
  });

  socket.on('disconnect', () => {
    if (user && '_id' in user) {
      onlineUser.delete(user._id.toString());
    }
    console.log('disconnect user', socket.id);
  });
});
