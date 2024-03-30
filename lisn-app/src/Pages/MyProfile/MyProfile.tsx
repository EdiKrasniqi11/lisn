/* eslint-disable jsx-a11y/img-redundant-alt */
import style from "./MyProfile.module.css";
import { useEffect, useState } from "react";
import { USER } from "../../Data/Interfaces";
import { fetchMyData } from "../../Data/authentication";
import ImageContainer from "./UserImageContainer/UserImageContainer";
import { Followers, Pen } from "../../Components/Icons/MyIcons";
import { NavLink, useParams } from "react-router-dom";
import PasswordChange from "../../Components/Modals/PasswordChange/PasswordChange";

export default function MyProfile() {
  const [user, setUser] = useState<USER>();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const myUser = await fetchMyData();
      setUser(myUser);
    };
    fetchData();
  }, []);

  return (
    <div className={style.my_profile}>
      <div className={style.profileCard}>
        <div className={style.top}>
          <h2>Profile</h2>
          <div className={style.entryInfo}>
            <ImageContainer user={user} />
            <div className={style.mainInfo}>
              <h1>{user?.username}</h1>
              <p>
                <NavLink to="/followers">
                  <Followers /> 454 Followers
                </NavLink>
              </p>
            </div>
          </div>
          <div className={style.editableData}>
            <div className={style.nonEditableField}>
              <div className={style.editableContent}>
                <label>Username</label>
                <h4>{user?.username}</h4>
              </div>
              <div className={style.iconDiv}>
                <Pen />
              </div>
            </div>
            <div className={style.nonEditableField}>
              <div className={style.editableContent}>
                <label>Email</label>
                <h4>{user?.user_email}</h4>
              </div>
              <div className={style.iconDiv}>
                <Pen />
              </div>
            </div>
            <div className={style.nonEditableField}>
              <div className={style.editableContent}>
                <label>Status</label>
                <h4>{user?.user_state?.state_name}</h4>
              </div>
              <div className={style.iconDiv}>
                <Pen />
              </div>
            </div>
            <div className={style.nonEditableField}>
              <div className={style.editableContent}>
                <label>Role</label>
                <h4>{user?.user_role?.role_name}</h4>
              </div>
              <div className={style.iconDiv}>
                <Pen />
              </div>
            </div>
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.actionDiv}>
            <NavLink to="./change-password" id={style.passwordButton}>
              CHANGE PASSWORD
            </NavLink>
            <NavLink to="./artist-application" id={style.artistButton}>
              BECOME AN ARTIST
            </NavLink>
            <NavLink to="./account-deactivation" id={style.deactivateButton}>
              DEACTIVATE ACCOUNT
            </NavLink>
          </div>
        </div>
      </div>
      {params.function == "change-password" ? (
        <PasswordChange user={user} />
      ) : null}
    </div>
  );
}
