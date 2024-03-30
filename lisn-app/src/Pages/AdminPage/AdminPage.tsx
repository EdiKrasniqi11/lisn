import { NavLink, useParams } from "react-router-dom";
import style from "./AdminPage.module.css";
import UserRoles from "../../Pages-Admin/UserRoles/UserRoles";
import DataPlaceholder from "../../Components/Admin-Components/DataPlaceholder/DataPlaceholder";
import UserStates from "../../Pages-Admin/UserStates/UserStates";
import CreateButton from "../../Components/Admin-Components/CreateButton/CreateButton";
import UserNavBar from "../../Components/Admin-Components/UserNavBar/UserNavBar";
import { useEffect, useState } from "react";
import { LoggedUser } from "../../Data/Interfaces";
import { fetchMyUser } from "../../Data/authentication";
import Users from "../../Pages-Admin/Users/Users";
import LoadingPage from "../../Components/Home-Components/Loading/LoadingPage";

export default function AdminPage() {
  const params = useParams();
  const [user, setUser] = useState<LoggedUser>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUser: LoggedUser = await fetchMyUser();
        setUser(myUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={style.adminDiv}>
      {loading ? <LoadingPage /> : null}
      {user?.role === "Admin" ? (
        <div className={style.contentDiv}>
          <div className={style.titleSwitch}>
            <NavLink to="/admin-page">
              <h2>Administrator</h2>
            </NavLink>
            <h2>/</h2>
            <NavLink to="/admin-page/user-service">
              <h2
                style={
                  params.service === "user-service" ? { opacity: 0.7 } : {}
                }
              >
                Users
              </h2>
            </NavLink>
          </div>
          {params.service === "user-service" ? <UserNavBar /> : null}
          <div className={style.dataShowcaseDiv}>
            {params.table === undefined ? <DataPlaceholder /> : null}
            {params.table === "user-roles" ? <UserRoles /> : null}
            {params.table === "user-states" ? <UserStates /> : null}
            {params.table === "users" ? <Users /> : null}
            {params.function === undefined && params.table !== undefined ? (
              <CreateButton />
            ) : null}
          </div>
        </div>
      ) : (
        <div className={style.noContentDiv}>
          <h2>Hi there, seems like you're trying to acces a forbidden page</h2>
          <h4>
            Please refer to the login link below to gain access to your
            privileges
          </h4>
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </div>
  );
}
