import { useEffect } from 'react';
import Home from './Components/Home/Home';
import Sidebar from './Components/Sidebar/Sidebar';
import ThemeToggle from './Components/Toggle/ThemeToggle';
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
        </Routes>
        <ThemeToggle/>
      </Router>
    </>
  );
}

export default App;
