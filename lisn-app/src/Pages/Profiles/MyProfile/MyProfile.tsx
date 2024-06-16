/* eslint-disable jsx-a11y/img-redundant-alt */
import style from "./MyProfile.module.css";
import { useEffect, useState } from "react";
import { USER } from "../../../Data/Interfaces";
import { fetchMyData } from "../../../Data/authentication";
import ImageContainer from "../UserImageContainer/UserImageContainer";
import { Followers, Pen } from "../../../Components/Icons/MyIcons";
import { NavLink, useParams } from "react-router-dom";
import PasswordChange from "../../../Components/Modals/PasswordChange/PasswordChange";
import { useNavigate } from "react-router-dom";
import {
  fetchFollowerCount,
  fetchFollowingCount,
} from "../../../Data/dataFetching";
import FollowersModal from "../../../Components/Modals/FollowersModal/FollowersModal";
import Background from "../../../Components/Home-Components/Background/Background";

export default function MyProfile() {
  const [user, setUser] = useState<USER>();
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUser = await fetchMyData();
        setUser(myUser);
      } catch (e) {
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await updateCount();
    };
    fetchData();
  }, [user]);

  const updateCount = async () => {
    try {
      const myFollowerCount = user?._id
        ? await fetchFollowerCount(user._id)
        : 0;
      const myFollowingCount = user?._id
        ? await fetchFollowingCount(user._id)
        : 0;
      setFollowerCount(myFollowerCount.followerCount);
      setFollowingCount(myFollowingCount.followerCount);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Background>
      <div className={style.profileCard}>
        <div className={style.top}>
          <h2>Profile</h2>
          <div className={style.entryInfo}>
            <ImageContainer user={user} page="my-profile" />
            <div className={style.mainInfo}>
              <h1>{user?.username}</h1>
              <p>
                <NavLink to="./followers">
                  <Followers />
                  {` ${followerCount} ${
                    followerCount === 1 ? "Follower" : "Followers"
                  }`}
                </NavLink>
                <NavLink to="./following">
                  <Followers />
                  {` ${followingCount} Following`}
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
            {user?.user_role?.role_name !== "Artist" ? (
              <NavLink to="./artist-application" id={style.artistButton}>
                BECOME AN ARTIST
              </NavLink>
            ) : null}
            <NavLink to="./account-deactivation" id={style.deactivateButton}>
              DEACTIVATE ACCOUNT
            </NavLink>
          </div>
        </div>
      </div>
      {params.function == "change-password" ? (
        <PasswordChange user={user} />
      ) : params.function === "followers" || params.function === "following" ? (
        <FollowersModal user={user} updateCount={updateCount} />
      ) : null}
    </Background>
  );
}
