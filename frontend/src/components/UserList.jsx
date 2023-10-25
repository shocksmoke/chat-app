import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSelectedChat } from "../state/reducers";

export default function UserList({ keyword }) {
  let search = useSelector((state) => state.search);
  const [userList, setuserList] = useState([]);

  const token= localStorage.getItem('token');
  let dispatch= useDispatch();

  const showChat= async(userId)=>{
    const url= "http://localhost:4000/chat";
    const data= {
      userId: userId
    };

    const response= await axios.post(url,JSON.stringify(data),{
      headers: {
        "Content-Type": 'application/json',
        'Authorization': "Bearer "+token
      }
    });

    const chat= response.data;
    dispatch(setSelectedChat({chat: chat}));
    dispatch(setSearch({search: ""}));
  }


  const fetchDetails = async () => {
    const url = `http://localhost:4000/user/?search=${search}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setuserList(response.data.users);
  };

  useEffect(() => {
    fetchDetails();
  }, [search]);

  if (search === "") return null;
  return (
    <div className="absolute ">
      {userList.map((user) => {
        return (
          <div onClick={()=>{
            showChat(user._id)
          }}>
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
