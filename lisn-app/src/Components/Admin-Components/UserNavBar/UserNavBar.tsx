import { NavLink, useParams } from "react-router-dom";
import style from "./UserNavBar.module.css";

export default function UserNavBar() {
  const params = useParams();
  return (
    <div className={style.navigation}>
      <div className={style.navigationDiv}>
        <NavLink to="/admin-page/user-service/user-roles">
          <h4 style={params.table === "user-roles" ? { opacity: 0.7 } : {}}>
            User Roles
          </h4>
        </NavLink>
      </div>
      <div className={style.navigationDiv}>
        <NavLink to="/admin-page/user-service/user-states">
          <h4 style={params.table === "user-states" ? { opacity: 0.7 } : {}}>
            User States
          </h4>
        </NavLink>
      </div>
      <div className={style.navigationDiv}>
        <NavLink to="/admin-page/user-service/countries">
          <h4 style={params.table === "countries" ? { opacity: 0.7 } : {}}>
            Countries
          </h4>
        </NavLink>
      </div>
      <div className={style.navigationDiv}>
        <NavLink to="/admin-page/user-service/cities">
          <h4 style={params.table === "cities" ? { opacity: 0.7 } : {}}>
            Cities
          </h4>
        </NavLink>
      </div>
      <div className={style.navigationDiv}>
        <NavLink to="/admin-page/user-service/users">
          <h4 style={params.table === "users" ? { opacity: 0.7 } : {}}>
            Users
          </h4>
        </NavLink>
      </div>
    </div>
  );
}
