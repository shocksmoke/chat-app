import Chat from "../models/chat.js";
import User from "../models/user.js";

export const accessChat = async (req, res) => {
  let { userId } = req.body;

  let chat = await Chat.find({
    isGroup: false,
    users: { $all: [userId, req.user._id] },
  })
    .populate("users", "-password")
    .populate("lastMessage");

  await User.populate(chat, {
    path: "lastMessage.sender",
    select: "name picture email",
  });

  if (chat.length > 0) {
    res.send(chat[0]);
  } else {
    let newChat = new Chat({
      chatName: "sender",
      isGroup: false,
      users: [userId, req.user._id],
    });

    await newChat.save();

    await User.populate(newChat, {
      path: "users",
      select: "-passwoord",
    });

    res.send(newChat);
  }
};

export const fetchChats = async (req, res) => {
  try {
    let userId = req.user._id;
    let chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users", "-password")
      .populate("lastMessage")
      .populate("groupAdmin")
      .sort({updatedAt: -1})
    
    
  await User.populate(chats, {
    path: "lastMessage.sender",
    select: "name picture email",
  });

    res.send(chats);

  } catch (error) {
    res.status(400).send(err);
  }
};


export const createGroupChat= async(req,res)=>{
  const {groupName,users}= req.body;

  let groupChat= new Chat({
    chatName: groupName,
    isGroup: true,
    users: [req.user._id,...users],
    groupAdmin: req.user._id
  })

  await groupChat.save();

  await User.populate(groupChat, {
    path: "users",
    select: "-passwoord",
  });

  res.send(groupChat);
}

export const renameGroup= async(req,res)=>{
  const {groupId,newName}= req.body;

  let groupChat= await Chat.findOne({_id: groupId});
  
  groupChat.chatName= newName;

  await groupChat.save();

  res.send(groupChat);
}

export const addRemove= async(req,res)=>{
  const {groupId,newUsers}= req.body;
  
  let groupChat= await Chat.findOne({_id: groupId});

  groupChat.users= newUsers;

  await groupChat.save();
  
  res.send(groupChat);

  
}
