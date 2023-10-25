import React from 'react'
import Navbar from '../widgets/Navbar'
import ChatBox from '../widgets/ChatBox'
import MyChats from '../widgets/MyChats'

export default function Chat() {
  return (
    <div className='gradient w-screen h-screen flex flex-col'>
        <Navbar/>
        <div className='flex grow'>
          <MyChats/>
          <ChatBox/>
        </div>
    </div>
  )
}
