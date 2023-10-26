import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setSearch, setSelectedChat } from "../state/reducers";

export default function UserList({ keyword, setKeyword }) {
  const [userList, setuserList] = useState([]);

  const token = localStorage.getItem("token");
  let currUser= useSelector(state=>state.user);
  let chats= useSelector(state=>state.chats);

  let dispatch = useDispatch();

  const showChat = async (userId) => {
    const url = "http://localhost:4000/chat";
    const data = {
      userId: userId,
    };

    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const chat = response.data;
    dispatch(setSelectedChat({ chat: chat }));
    if(!chats.includes(chat)) setChats({chats: [chat,...chats]});

    setKeyword("");
  };

  const fetchDetails = async () => {
    const url = `http://localhost:4000/user/?search=${keyword}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

     

    let users= response.data;

    users = users.filter((user) => {
      return user._id != currUser._id;
    });

    setuserList(users);
  };

  useEffect(() => {
    fetchDetails();
  }, [keyword]);

  if (keyword === "") return null;
  return (
    <div className="absolute ">
      {userList.map((user) => {
        return (
          <div
            key={user._id}
            onClick={() => {
              showChat(user._id);
            }}
          >
            <User
              key={user._id}
              userId={user._id}
              userName={user.name}
              userEmail={user.email}
              userPicture={user.picture}
            />
          </div>
        );
      })}
    </div>
  );
}
