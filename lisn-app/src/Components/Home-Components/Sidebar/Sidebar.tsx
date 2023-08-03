import style from "./Sidebar.module.css";
import Views from "../../../Assets/Images/Views.jpg";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function Sidebar() {
  useEffect(() => {
    const sourceSvg = document.getElementById("blob1");
    const destinationSvg = document.getElementById("blob2");
  }, []);
  return (
    <div className={style.sidebar}>
      <div className={style.staticNav}>
        <div title="Home" className={style.navIcons}>
          <NavLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              id={style.sidebarButton}
              className="bi bi-house-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
            </svg>
          </NavLink>
        </div>
        <div title="User Manager" className={style.navIcons}>
          <NavLink to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              id={style.sidebarButton}
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </NavLink>
        </div>
        <div title="Search" className={style.navIcons}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            id={style.sidebarButton}
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
        <div title="Messages" className={style.navIcons}>
          <NavLink to="/messages">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              id={style.sidebarButton}
              className="bi bi-chat"
              viewBox="0 0 16 16"
            >
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
            </svg>
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
