import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from "./screens/Home";
import Chat from './screens/Chat';
import Modal from './components/Modal';
import AddGroupChat from './components/AddGroupChat';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/chat" element={<Chat/>} ></Route>
    </Routes>

    </BrowserRouter>
  )
}