import { useEffect } from 'react';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register';
import Sidebar from './Components/Sidebar/Sidebar';
import ThemeToggle from './Components/Toggle/ThemeToggle';
import Messages from './Components/Messages/Messages';


import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";

function App() {

  useEffect(() => {
    document.title = "LISN - Free Music Sharing Website";
  },[])

  return (
    <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/messages/*" element={<Messages/>}/>
        </Routes>
        <ThemeToggle/>
      </Router>
    </>
  );
}

export default App;
