import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedChat: null,
    user: null,
    chats: []
  },
  reducers: {
    setSelectedChat: (state,action) => {
        state.selectedChat= action.payload.chat;
      },
    setUser: (state,action)=>{
      state.user= action.payload.user;
    },
    setChats: (state,action)=>{
      state.chats= action.payload.chats;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSearch,setSelectedChat,setUser,setChats } = chatSlice.actions

export default chatSlice.reducer