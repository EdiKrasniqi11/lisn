import { NavLink, useLocation } from "react-router-dom";
import style from "./AdminPage.module.css";
import { useEffect, useState } from "react";
import UserRoles from "../../Components/UserRoles/UserRoles";
import axios from "axios";
import fetchUserRoles from "../../Data/dataFetching";
import USER_ROLE from "../../Data/Interfaces";
import { userInfo } from "os";

export default function AdminPage() {
  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    var locationParts = location.pathname.split("/");
    setPath(locationParts[locationParts.length - 1]);
  }, [location]);
  return (
    <div className={style.adminDiv}>
      <div className={style.contentDiv}>
        <NavLink to="/admin-page">
          <h2>Administrator</h2>
        </NavLink>
        <div className={style.navigation}>
          <div className={style.navigationDiv}>
            <NavLink to="/admin-page/user-roles">
              <h4 style={path == "user-roles" ? { opacity: 0.7 } : {}}>
                User Roles
              </h4>
            </NavLink>
          </div>
        </div>
        <div className={style.dataShowcaseDiv}>
          {path == "user-roles" ? <UserRoles /> : null}
        </div>
      </div>
    </div>
  );
}
