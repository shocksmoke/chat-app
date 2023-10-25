import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
