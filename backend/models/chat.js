import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
    require: true,
  },
  chatName: {
    type: String,
    trim: true,
  },
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    require: true,
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
  ,
},
{
    timestamps: true
}

);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
