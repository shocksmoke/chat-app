import React from "react";
import { useSelector } from "react-redux";

export default function ScrollableChat({ messages }) {

  let user= useSelector((state)=>state.user);
  console.log(messages);

  const sameUser= (m,user)=>{
    return m.sender===user._id;
  }

  const rightMessage= (message)=>{
    return       <div class="flex items-center self-end rounded-xl rounded-tr bg-blue-500 py-2 px-3 text-white">

      {message.content}
    </div>
  }

  const leftMessage= (message)=>{
    return       <div class="flex items-center self-start rounded-xl rounded-tl bg-white py-2 px-3">
      {message.content}
    </div>
  }

  return (
    <div class="bg-slate-300 grow rounded m-2 h-[70vh] overflow-auto flex flex-col space-y-2 p-4 ">
      {messages.map((message) => {
        return sameUser(message,user)?
          rightMessage(message)
          :
          leftMessage(message);
      })}
    </div>
  );
}
