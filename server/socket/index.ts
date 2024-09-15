import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { getUserDetailsFromToken } from '../helpers/getUserDetailsFromToken';
import { UserModel } from '../models/user.model';
import { ConversationModel, MessageModel } from '../models/conversation.model';

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
      profile_pic: userDetails?.profile_pic,
      online: onlineUser.has(userId),
    };

    socket.emit('message-user', payload);
  });

  socket.on('new message', async (data) => {
    let conversation = await ConversationModel.findOne({
      $or: [
        { sender: data.sender, receiver: data.receiver },
        { sender: data.receiver, receiver: data.sender },
      ],
    });

    if (!conversation) {
      const createConversation = new ConversationModel({
        sender: data.sender,
        receiver: data.receiver,
      });
      conversation = await createConversation.save();
    }

    const message = new MessageModel({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      msgByUserId: data.msgByUserId,
    });
    const saveMessage = await message.save();

    const updateConversation = await ConversationModel.updateOne(
      { _id: conversation._id },
      { $push: { messages: saveMessage._id } },
    );

    const getConversationMessage = await ConversationModel.findOne({
      $or: [
        { sender: data.sender, receiver: data.receiver },
        { sender: data.receiver, receiver: data.sender },
      ],
    })
      .populate('messages')
      .sort({ updatedAt: -1 });

    io.to(data?.sender).emit('message', getConversationMessage?.messages);
    io.to(data?.receiver).emit('message', getConversationMessage?.messages);
  });

  socket.on('disconnect', () => {
    if (user && '_id' in user) {
      onlineUser.delete(user._id.toString());
    }
    console.log('disconnect user', socket.id);
  });
});
