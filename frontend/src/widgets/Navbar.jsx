import React, { useDebugValue, useState } from "react";
import notifications from "../../assets/notifications.svg";
import UserList from "../components/UserList";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../state/reducers";

export default function Navbar() {
  let search= useSelector(state=>state.search);
  let dispatch= useDispatch();

  return (
    <nav className="bg-white flex border-gray-200 justify-between m-2">
      <div className="relative">
        <form>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 pl-10 m-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 "
              placeholder="Search User"
              value={search}
              onChange={(e) => {
                dispatch(setSearch({search: e.target.value}))
              }}
            />
          </div>
        </form>
            
        <UserList/>
        
      </div>

      <h1 className=" text-3xl font-extrabold leading-none text-black tracking-tight text-gray-900 md:text-4xl lg:text-5xl ">
        Chatify
      </h1>

      <div className="flex">
        <button className="p-3 m-2">
          <img src={notifications} className="w-6  h-6" />
        </button>
        <div className="relative ">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white p-3 m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Dropdown button{" "}
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-[100%] absolute"
          >
            <ul
              className="py-2 text-right pr-5 text-sm text-gray-700 "
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a href="#" className="block  py-2 hover:bg-gray-100">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
