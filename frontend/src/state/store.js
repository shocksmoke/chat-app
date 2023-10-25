import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './reducers'


export default configureStore({
  reducer: chatReducer,
});