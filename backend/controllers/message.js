import Message from "../models/message.js";

export const createMessage = async (req, res) => {
  const { content, chatId } = req.body;

  let message = new Message({
    content: content,
    sender: req.user._id,
    chat: chatId,
  });

  await message.save();

    await message.populate("sender");
  await message.populate('chat');

  res.send(message);
};

export const allMessages = async (req, res) => {
  const chatId = req.params.chatId;
  const messages = await Message.find({ chat: chatId })
    .populate("sender")
    .populate("chat");

  res.send(messages);
};
