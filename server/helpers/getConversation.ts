import { ConversationModel } from "../models/conversation.model";

export const getConversation = async (currentUserId: string) => {
  if (currentUserId) {
    const currentUserConversation = await ConversationModel.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .sort({ updatedAt: -1 })
      .populate('messages')
      .populate('sender')
      .populate('receiver');

    const conversation = currentUserConversation.map((conv: any) => {
      const countUnseenMessages = conv.messages.reduce(
        (prev: any, curr: any) => prev + (curr.seen ? 0 : 1),
        0,
      );
      return {
        _id: conv._id,
        sender: conv.sender,
        receiver: conv.receiver,
        unseenMessage: countUnseenMessages,
        lastMessage: conv.messages[conv.messages.length - 1],
      };
    });

    return conversation;
  } else {
    return [];
  }
};
