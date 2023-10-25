import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedChat: null,
    search: "",
    user: null,
  },
  reducers: {
    setSelectedChat: (state,action) => {
        state.selectedChat= action.payload.chat;
      },
    setSearch: (state,action)=>{
        state.search= action.payload.search;
    },
    setUser: (state,action)=>{
      state.user= action.payload.user;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSearch,setSelectedChat,setUser } = chatSlice.actions

export default chatSlice.reducer