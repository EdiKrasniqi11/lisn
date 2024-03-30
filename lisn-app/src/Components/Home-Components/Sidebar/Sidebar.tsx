import style from "./Sidebar.module.css";
import Views from "../../../Assets/Images/Views.jpg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoggedUser } from "../../../Data/Interfaces";
import { fetchMyUser } from "../../../Data/authentication";
import {
  HomeIcon,
  LoginIcon,
  MessagesIcon,
  MyAccountIcon,
  SearchIcon,
} from "../../Icons/MyIcons";

export default function Sidebar() {
  const [user, setUser] = useState<LoggedUser>();

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
    <div className={style.sidebar}>
      <div className={style.staticNav}>
        <div title="Home" className={style.navIcons}>
          <NavLink to="/">
            <HomeIcon />
          </NavLink>
        </div>
        {user ? (
          <div title="User Manager" className={style.navIcons}>
            <NavLink to="/my-profile">
              <MyAccountIcon />
            </NavLink>
          </div>
        ) : (
          <div title="Login" className={style.navIcons}>
            <NavLink to="/login">
              <LoginIcon />
            </NavLink>
          </div>
        )}
        <div title="Search" className={style.navIcons}>
          <NavLink to="/search">
            <SearchIcon />
          </NavLink>
        </div>
        <div title="Messages" className={style.navIcons}>
          <NavLink to="/messages">
            <MessagesIcon />
          </NavLink>
        </div>
        <div className={style.navIcons}>
          <img
            src={Views}
            id={style.playlistButton}
            className={style.playlistImage}
          />
        </div>
        <div className={style.navIcons}>
          <img
            src={Views}
            id={style.playlistButton}
            className={style.playlistImage}
          />
        </div>
        <div className={style.navIcons}>
          <img
            src={Views}
            id={style.playlistButton}
            className={style.playlistImage}
          />
        </div>
      </div>
    </div>
  );
}
