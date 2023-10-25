import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSelectedChat } from "../state/reducers";

export default function User({userId, userName, userEmail, userPicture }) {
  
  return (
    <div className="bg-white rounded m-2 w-[100%]">
      <div className="flex">
      <img
          src={`http://localhost:4000/uploads/${userPicture}`}
          className="w-10 h-10"
        />
        <div>
            <h1>{userName}</h1>
            <h3>Email: {userEmail}</h3>
        </div>
      </div>
    </div>
  );
}
