import { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Sidebar from "./Components/Home-Components/Sidebar/Sidebar";
import ThemeToggle from "./Components/Home-Components/Toggle/ThemeToggle";
import Messages from "./Pages/Messages/Messages";
import AdminPage from "./Pages/AdminPage/AdminPage";

// import getUserRoles from "./paths";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import AdminRoute from "./Components/Admin-Components/AdminRoute/AdminRoute";
import NoContent from "./Pages/NoContent/NoContent";
import { refreshToken } from "./Data/authentication";
import secureLocalStorage from "react-secure-storage";

function App() {
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await refreshToken();
        if (response.data.status !== 200) {
          console.error(
            `Error code ${response.data.status}. ${response.data.message}`
          );
        }
        secureLocalStorage.setItem("access-token", response.data.ACCESS_TOKEN);
      } catch (error) {
        console.error(error);
      }
    };
    setInterval(() => {
      if (secureLocalStorage.getItem("refresh-token") !== undefined) {
        fetchResponse();
      }
    }, 600000);
    document.title = "LISN - Free Music Sharing Website";
  }, []);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin-page/:service?/:table?/:function?/:id?"
            element={<AdminPage />}
          />
          <Route path="/messages/:id?" element={<Messages />} />
          <Route path="*" element={<NoContent />} />
        </Routes>
        <ThemeToggle />
        <AdminRoute />
      </Router>
    </>
  );
}

export default App;
