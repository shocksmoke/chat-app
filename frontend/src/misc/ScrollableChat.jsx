import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

export default function ScrollableChat({ messages }) {
  let user = useSelector((state) => state.user);

  const sameUser = (m, user) => {
    return m.sender === user._id;
  };

  const rightMessage = (message) => {
    return (
      <div
        key={message._id}
        className="flex items-center self-end rounded-xl rounded-tr bg-blue-500 py-2 px-3 text-white"
      >
        {message.content}
      </div>
    );
  };

  const leftMessage = (message) => {
    return (
      <div
        key={message._id}
        className="flex items-center self-start rounded-xl rounded-tl bg-white py-2 px-3"
      >
        {message.content}
      </div>
    );
  };

  return (
    <div className="bg-slate-300 grow rounded m-2 h-[75vh]  ">
    <ScrollableFeed className=" flex flex-col space-y-1 ">
        {messages.map((message) => {
          return sameUser(message, user)
            ? rightMessage(message)
            : leftMessage(message);
        })}
    </ScrollableFeed>
      </div>
  );
}
