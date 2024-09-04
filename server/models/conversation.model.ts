import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    video: {
      type: String,
      default: '',
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    message: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const MessageModel = mongoose.model('Message', messageSchema);
export const ConversationModel = mongoose.model('Conversation', conversationSchema);
