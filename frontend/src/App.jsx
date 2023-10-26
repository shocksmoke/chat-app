import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from "./screens/Home";
import Chat from './screens/Chat';
import Modal from './components/Modal';
import AddGroupChat from './components/AddGroupChat';
import { useSelector } from 'react-redux';

export default function App() {
  let user = useSelector(state=>state.user);

  let isAuth= user!=null;
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/chat" element={isAuth?<Chat/>: <Home/>} ></Route>
    </Routes>

    </BrowserRouter>
  )
}