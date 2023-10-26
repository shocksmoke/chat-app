import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";

import cors from "cors";
import { log } from "console";

mongoose
  .connect(process.env.DB_STRING + "chatAppDB")
  .then(() => {
    console.log("Connect to DB");
  })
  .catch((err) => {
    console.log("DB connection error: ", err);
  });

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.use("/", (req, res) => {
  res.send("hello");
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

io.on("connection", (socket) => {
  console.log("connect to socket.io");

  socket.on("setup", (user) => {
    socket.join(user._id);
    socket.emit("connected");
  });

  socket.on("join room", (chat) => {
    socket.join(chat._id);
    console.log("Successfully joined room", chat._id);
  });

  socket.on("new message", (message) => {
    message.chat.users.forEach((user) => {
      if (user === message.sender) return;
      socket.in(user).emit("message recieved", message);
    });
  });
});
