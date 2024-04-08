import style from "./UserProfile.module.css";
import LoadingPage from "../../../Components/Home-Components/Loading/LoadingPage";
import { fetchMyData } from "../../../Data/authentication";
import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { USER } from "../../../Data/Interfaces";
import ImageContainer from "../UserImageContainer/UserImageContainer";
import {
  fetchFollowerCount,
  fetchFollowingCount,
  fetchUser,
  userFollows,
} from "../../../Data/dataFetching";
import { followUser } from "../../../Data/dataCreating";
import {
  Pen,
  Followers,
  CheckMark,
  X,
} from "../../../Components/Icons/MyIcons";
import { unfollowUser } from "../../../Data/dataDeleting";
import Background from "../../../Components/Home-Components/Background/Background";
import FollowersModal from "../../../Components/Modals/FollowersModal/FollowersModal";

export default function UserProfile() {
  const [user, setUser] = useState<USER>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchedUser, setSearchedUser] = useState<USER>();
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [follows, setFollows] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUser = await fetchMyData();
        if (myUser._id === params.id) {
          navigate("/my-profile");
        }
        setUser(myUser);
      } catch (e: any) {
        if (e.response.status === 403) {
          setIsLoggedIn(false);
        }
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const srcUser = params.id ? await fetchUser(params.id) : null;
        if (srcUser) {
          setSearchedUser(srcUser);
        } else {
          alert(
            "The user that has been searched does not exist or has been suspended."
          );
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      await updateCount();

      const followCheck = searchedUser?._id
        ? await userFollows(searchedUser._id)
        : false;

      setFollows(followCheck);
      setIsLoading(false);
    };
    fetchData();
  }, [searchedUser]);

  const updateCount = async () => {
    try {
      const myFollowerCount = searchedUser?._id
        ? await fetchFollowerCount(searchedUser._id)
        : 0;
      const myFollowingCount = searchedUser?._id
        ? await fetchFollowingCount(searchedUser._id)
        : 0;
      setFollowerCount(myFollowerCount.followerCount);
      setFollowingCount(myFollowingCount.followerCount);
    } catch (e) {
      console.error(e);
    }
  };

  const followUserProfile = async () => {
    try {
      if (!isLoggedIn) {
        alert("You must be logged in to follow users");
        navigate("/login");
        return;
      }
      const response = params.id ? await followUser(params.id) : null;
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const unfollowUserProfile = async () => {
    try {
      const response = params.id ? await unfollowUser(params.id) : null;
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Background>
      {isLoading ? <LoadingPage /> : null}
      <div className={style.profileCard}>
        <div className={style.top}>
          <h2>Profile</h2>
          <div className={style.flex_row}>
            <div className={style.entryInfo}>
              <ImageContainer user={searchedUser} page="user-profile" />
              <div className={style.mainInfo}>
                <h1>{searchedUser?.username}</h1>
                <p>
                  <NavLink to="./followers">
                    <Followers />
                    {` ${followerCount} ${
                      followerCount === 1 ? "Follower" : "Followers"
                    }`}
                  </NavLink>
                </p>
              </div>
            </div>
            {follows ? (
              <button
                className={style.unfollowButton}
                onClick={() => unfollowUserProfile()}
              >
                Unfollow <X />
              </button>
            ) : (
              <button
                className={style.followButton}
                onClick={() => followUserProfile()}
              >
                Follow <CheckMark />
              </button>
            )}
          </div>
          <div className={style.editableData}>
            <div className={style.nonEditableField}>
              <div className={style.editableContent}>
                <label>Username</label>
                <h4>{searchedUser?.username}</h4>
              </div>
              <div className={style.iconDiv}>
                <Pen />
              </div>
            </div>
            <div className={style.nonEditableField}>
              <div className={style.editableContent}>
                <label>Email</label>
                <h4>{searchedUser?.user_email}</h4>
              </div>
              <div className={style.iconDiv}>
                <Pen />
              </div>
            </div>
            <div className={style.nonEditableField}>
              <div className={style.editableContent}>
                <label>Status</label>
                <h4>{searchedUser?.user_state?.state_name}</h4>
              </div>
              <div className={style.iconDiv}>
                <Pen />
              </div>
            </div>
            <div className={style.nonEditableField}>
              <div className={style.editableContent}>
                <label>Role</label>
                <h4>{searchedUser?.user_role?.role_name}</h4>
              </div>
              <div className={style.iconDiv}>
                <Pen />
              </div>
            </div>
          </div>
        </div>
      </div>
      {params.function === "followers" ? (
        <FollowersModal user={searchedUser} updateCount={updateCount} />
      ) : null}
    </Background>
  );
}
