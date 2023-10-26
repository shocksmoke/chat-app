import React, { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import AddGroupChat from "../components/AddGroupChat";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setSelectedChat } from "../state/reducers";

export default function MyChats() {
  let token = localStorage.getItem("token");
  let user = useSelector((state)=>state.user);
  let chats= useSelector((state)=>state.chats);
  let dispatch= useDispatch();
  

  const fetchDetails = async () => {
    const url = `http://localhost:4000/chat/`;

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    dispatch(setChats({chats: response.data}));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const createChat = (chat) => {
    let name="";
    if (!chat.isGroup) {
       name = chat.users.find((chatUser) => chatUser._id != user._id).name;
    }
    else name= chat.chatName;

    return (
      <div className="bg-white rounded m-2" key={chat._id} onClick={()=>{
        dispatch(setSelectedChat({chat: chat}));
      }}>
        <h1>{name}</h1>
        {chat.lastMessage ? (
          <h1>
            {chat.lastMessage.sender}: {lastMessage.content}
          </h1>
        ) : null}
      </div>
    );
  };

  return (
    <div className="basis-[30%] items-stretch bg-white rounded m-2 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-4xl">My chats</h1>
       <AddGroupChat/>
      </div>
      <div className="bg-slate-300 grow h-[10vh] overflow-scroll">
        {chats.map(createChat)}
      </div>
    </div>
  );
}
