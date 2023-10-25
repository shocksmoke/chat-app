import React from "react";
import Form from "../components/Form";

export default function Home() {
  return (
    <div className="gradient flex flex-col  items-center w-screen h-screen">
      <div className=" bg-white text-center w-[100%] md:w-1/3 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mt-10 ">
        Chatify
      </div>
      <Form />
    </div>
  );
}
