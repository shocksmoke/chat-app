import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import eye from "../../assets/eye.svg";
import ChatMessages from "../misc/ScrollableChat";
import axios from "axios";
import ScrollableChat from "../misc/ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

let socket, selectedChatCompare;

export default function ChatBox() {
  const [newMessage, setnewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  let selectedChat = useSelector((state) => state.selectedChat);
  let token = localStorage.getItem("token");
  let user = useSelector((state) => state.user);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    socket.on("connected", () => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("message recieved", (message) => {
      if (selectedChat && message.chat._id == selectedChat._id)
        setMessages([...messages, message]);

    });
  });

  const fetchMessages = async () => {
    if (!selectedChat) return;
    socket.emit("join room", selectedChat);

    const url = `http://localhost:4000/message/${selectedChat._id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setMessages(response.data);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const handleSendMessage = async (e) => {
    if (e.key !== "Enter") return;

    const url = `http://localhost:4000/message/`;
    const payload = {
      chatId: selectedChat._id,
      content: newMessage,
    };

    try {
      axios
        .post(url, JSON.stringify(payload), {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          socket.emit("new message", response.data);
          setMessages([...messages, response.data]);
        });

      setnewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!selectedChat)
    return (
      <div className="grow bg-white rounded m-2"> Please Select a Chat</div>
    );

  return (
    <div className="grow bg-white rounded m-2 flex flex-col ">
      <div className="flex justify-between">
        <h1 className="text-4xl">{selectedChat.chatName}</h1>
        <button>
          <img src={eye} />
        </button>
      </div>
      <ScrollableChat messages={messages} />
      <input
        onKeyDown={handleSendMessage}
        placeholder="Enter a message"
        value={newMessage}
        onChange={(e) => setnewMessage(e.target.value)}
      ></input>
    </div>
  );
}
