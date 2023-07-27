import { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Sidebar from "./Components/Sidebar/Sidebar";
import ThemeToggle from "./Components/Toggle/ThemeToggle";
import Messages from "./Pages/Messages/Messages";
import AdminPage from "./Pages/AdminPage/AdminPage";

import getUserRoles from "./paths";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import AdminRoute from "./Components/AdminRoute/AdminRoute";

function App() {
  const [userRoles, setUserRoles] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setUserRoles(await getUserRoles());
    };
    document.title = "LISN - Free Music Sharing Website";
    fetchData();
  }, []);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-page/*" element={<AdminPage />} />
          <Route path="/messages/*" element={<Messages />} />
        </Routes>
        <ThemeToggle />
        <AdminRoute />
      </Router>
    </>
  );
}

export default App;
