import express from "express";
import {createServer} from "http";
import {Server}  from "socket.io";
import mongoose from "mongoose";
import "dotenv/config"
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";

import cors from "cors";

 mongoose.connect(process.env.DB_STRING+"chatAppDB").then(()=>{
    console.log("Connect to DB");
 }).catch((err)=>{
    console.log("DB connection error: ",err);
 })

const app= express();
const port= 4000;
const server= createServer(app);
const io= new Server(server);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use('/user', userRoutes);
app.use('/chat',chatRoutes);
app.use('/message',messageRoutes);

app.use("/", (req,res)=>{
    res.send("hello")
})



server.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
