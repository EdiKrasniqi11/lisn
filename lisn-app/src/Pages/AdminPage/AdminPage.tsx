import { NavLink, useParams } from "react-router-dom";
import style from "./AdminPage.module.css";
import UserRoles from "../../Pages-Admin/UserRoles/UserRoles";
import DataPlaceholder from "../../Components/Admin-Components/DataPlaceholder/DataPlaceholder";
import UserStates from "../../Pages-Admin/UserStates/UserStates";
import CreateButton from "../../Components/Admin-Components/CreateButton/CreateButton";
import Countries from "../../Pages-Admin/Countries/Countries";
import Cities from "../../Pages-Admin/Cities/Cities";

export default function AdminPage() {
  const params = useParams();
  return (
    <div className={style.adminDiv}>
      <div className={style.contentDiv}>
        <NavLink to="/admin-page">
          <h2>Administrator</h2>
        </NavLink>
        <div className={style.navigation}>
          <div className={style.navigationDiv}>
            <NavLink to="/admin-page/user-roles">
              <h4 style={params.table === "user-roles" ? { opacity: 0.7 } : {}}>
                User Roles
              </h4>
            </NavLink>
          </div>
          <div className={style.navigationDiv}>
            <NavLink to="/admin-page/user-states">
              <h4
                style={params.table === "user-states" ? { opacity: 0.7 } : {}}
              >
                User States
              </h4>
            </NavLink>
          </div>
          <div className={style.navigationDiv}>
            <NavLink to="/admin-page/countries">
              <h4 style={params.table === "countries" ? { opacity: 0.7 } : {}}>
                Countries
              </h4>
            </NavLink>
          </div>
          <div className={style.navigationDiv}>
            <NavLink to="/admin-page/cities">
              <h4 style={params.table === "cities" ? { opacity: 0.7 } : {}}>
                Cities
              </h4>
            </NavLink>
          </div>
        </div>
        <div className={style.dataShowcaseDiv}>
          {params.table === undefined ? <DataPlaceholder /> : null}
          {params.table === "user-roles" ? <UserRoles /> : null}
          {params.table === "user-states" ? <UserStates /> : null}
          {params.table === "countries" ? <Countries /> : null}
          {params.table === "cities" ? <Cities /> : null}
          {params.function === undefined && params.table !== undefined ? (
            <CreateButton />
          ) : null}
        </div>
      </div>
    </div>
  );
}
