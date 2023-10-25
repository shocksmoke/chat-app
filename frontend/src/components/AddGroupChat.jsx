import React, { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../state/reducers";

export default function AddGroupChat() {
  const [groupName, setgroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal]= useState(false);
  let token = localStorage.getItem("token");
  let dispatch= useDispatch();

  let currUser = useSelector((state)=>state.user);

  const updateSearchUsers=async ()=>{
    const url = `http://localhost:4000/user/?search=${search}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    let foundUsers = response.data.users;

    foundUsers = foundUsers.filter((user) => {
        // Check if the user is not the current user and is not included in the users array
        return user._id !== currUser._id && !users.some(u => u._id === user._id);
      });
      

    setSearchUsers(foundUsers);
  }
  
  useEffect(() => {
    // This code will run whenever 'search' changes after a render.
    updateSearchUsers();
  }, [search,users]);

  const handleSubmit=async()=>{
    const url = `http://localhost:4000/chat/group`;
    const payload= {
        groupName: groupName,
        users: users
    };

    const response = await axios.post(url,JSON.stringify(payload),{
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
    });

    
    dispatch(setSelectedChat({chat: response.data}));
    setShowModal(false);
    setgroupName("");
    setUsers([]);


  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={()=>setShowModal(true)}
      >
        New Group Chat
      </button>

      {
        showModal
        ?
          <div
            tabIndex="-1"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex"
          >
            <div className="relative w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add group chat
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                    onClick={()=>{
                      setShowModal(false);
                        setSearch("");
                        setUsers([]);
                        setSearchUsers([]);
                        setgroupName("");
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div className="flex flex-col p-2 ">
                  <input
                    className="m-2 rounded"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setgroupName(e.target.value)}
                  />
                  <input
                    className="m-2 rounded"
                    placeholder="Add users"
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value);
                    }}
                  />
                </div>

                <div className="flex">

                {users.map((user) => {
                  return <div className="bg-white m-2 rounded p-1" key={user._id}>{user.name}</div>;
                })}
                </div>

                {searchUsers.map((user) => {
                  return (
                    <div
                    key={user._id}
                      onClick={() => {
                        setUsers([...users, user]);
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

                <div className="flex justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

        :
        null
      }
    </div>
  );
}
