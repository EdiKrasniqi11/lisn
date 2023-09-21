import { NavLink, useNavigate } from "react-router-dom";
import style from "./AdminRoute.module.css";
import { fetchMyUser, logout } from "../../../Data/authentication";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";
import { USER } from "../../../Data/Interfaces";

export default function AdminRoute() {
  const navigate = useNavigate();
  const [user, setUser] = useState<USER>();

  useEffect(() => {
    const fetchData = async () => {
      if (secureLocalStorage.getItem("access-token") !== null) {
        try {
          const myUser: USER = await fetchMyUser();
          setUser(myUser);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

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

  return (
    <div className={style.quickMenu}>
      {user?.USER_ROLE_ID === 1 ? (
        <div className={style.wrenchDiv}>
          <NavLink title="Administrative Tools" to="/admin-page">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="white"
              className="bi bi-wrench-adjustable-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.705 8.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm-6.202-4.751 1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2a7.031 7.031 0 0 1-2.949-2.951ZM12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
            </svg>
          </NavLink>
        </div>
      ) : null}
      {user ? (
        <div className={style.logoutDiv} title="Logout" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-door-open-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
