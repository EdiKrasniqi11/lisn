import { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Sidebar from "./Components/Home-Components/Sidebar/Sidebar";
import ThemeToggle from "./Components/Home-Components/Toggle/ThemeToggle";
import Messages from "./Pages/Messages/Messages";
import AdminPage from "./Pages/AdminPage/AdminPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoContent from "./Pages/NoContent/NoContent";
import MyProfile from "./Pages/Profiles/MyProfile/MyProfile";
import UserProfile from "./Pages/Profiles/UserProfile/UserProfile";
import Search from "./Pages/Search/Search";
import Upload from "./Pages/Upload/Upload";

function App() {
  useEffect(() => {
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
          <Route path="/my-profile/:function?" element={<MyProfile />} />
          <Route
            path="/user-profile/:id/:function?"
            element={<UserProfile />}
          />
          <Route path="/search" element={<Search />} />
          <Route
            path="/admin/:service?/:table?/:function?/:id?"
            element={<AdminPage />}
          />
          <Route path="/messages/:id?" element={<Messages />} />
          <Route path='/upload/*' element={<Upload />} />
          <Route path="*" element={<NoContent />} />
        </Routes>
        <ThemeToggle />
      </Router>
    </>
  );
}

export default App;
