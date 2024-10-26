import style from "./Sidebar.module.css";
import Views from "../../../Assets/Images/Views.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoggedUser } from "../../../Data/Interfaces";
import { fetchMyUser, logout } from "../../../Data/authentication";

export default function Sidebar() {
  const [user, setUser] = useState<LoggedUser>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();

    if (response) {
      navigate("/");
      alert("Successful logout");
      window.location.reload();
    } else {
      alert(
        "Something wen't wrong with the logout process please check for any issues with logging in or your refresh token :)"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("access-token") !== null) {
        try {
          const myUser: LoggedUser = await fetchMyUser();
          setUser(myUser);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className={style.background}>
      <div className={style.sidebar}>
        <div className={style.leftSide}>
          <NavLink to="/" className={style.navTab}>
            <div title="Home">Home</div>
          </NavLink>
          {user ? (
            <NavLink to="/my-profile" className={style.navTab}>
              <div title="User Manager">My Account</div>
            </NavLink>
          ) : null}
          <NavLink to="/search" className={style.navTab}>
            <div title="Search">Search</div>
          </NavLink>
          <NavLink to="/messages" className={style.navTab}>
            <div title="Messages">Inbox</div>
          </NavLink>
        </div>
        <div className={style.rightSide}>
          {user?.role === "Artist" ? (
            <NavLink to="/upload" className={style.navTab}>
              <div title="Upload Music">Upload</div>
            </NavLink>
          ) : null}
          {user?.role === "Admin" ? (
            <NavLink to="/admin" className={style.navTab}>
              <div title="Admin">Admin</div>
            </NavLink>
          ) : null}
          {user ? (
            <NavLink to="/" className={style.navTab} onClick={handleLogout}>
              <div title="Logout">Logout</div>
            </NavLink>
          ) : null}
          {!user ? (
            <NavLink to="/login" className={style.navTab}>
              <div title="Login">Login</div>
            </NavLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}
