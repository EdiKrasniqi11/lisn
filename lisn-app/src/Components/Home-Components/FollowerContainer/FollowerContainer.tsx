import { useEffect, useState } from "react";
import { USER } from "../../../Data/Interfaces";
import { IMAGE_URL } from "../../../Data/env_variables";
import style from "./FollowerContainer.module.css";
import { fetchUser, userFollows } from "../../../Data/dataFetching";
import { useNavigate } from "react-router-dom";
import { followUser } from "../../../Data/dataCreating";
import { unfollowUser } from "../../../Data/dataDeleting";
import { CheckMark, X } from "../../Icons/MyIcons";
import { fetchMyData, fetchMyUser } from "../../../Data/authentication";

interface FollowerContainerProps {
  user: USER | undefined;
  updateCount: any;
}

export default function FollowerContainer({
  user,
  updateCount,
}: FollowerContainerProps) {
  const imagePath = user?.user_image ? user.user_image : "";
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [follows, setFollows] = useState<boolean>(false);
  const [isMyUser, setIsMyUser] = useState<boolean>(true);
  const imageUrl = IMAGE_URL(imagePath);
  const navigate = useNavigate();

  const followUserProfile = async () => {
    try {
      if (user?._id) await followUser(user._id);
      setFollows(!follows);
      updateCount();
    } catch (e) {
      console.error(e);
    }
  };
  const unfollowUserProfile = async () => {
    try {
      if (user?._id) await unfollowUser(user._id);
      setFollows(!follows);
      updateCount();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMyData();
        setIsMyUser(response._id === user?._id);
      } catch (e: any) {
        if (e.response.status === 403) {
          setIsLoggedIn(false);
          setIsMyUser(false);
        }
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const followCheck = user?._id ? await userFollows(user._id) : false;

      setFollows(followCheck);
    };
    fetchData();
  }, [user]);

  return (
    <div
      className={style.followerContainer}
      onClick={() => {
        if (isMyUser) navigate("/my-profile");
        else navigate(`/user-profile/${user?._id}`);
      }}
    >
      <div className={style.briefInfo} title="Go to Profile">
        <img src={imageUrl} alt={user?.username} />
        <h4>{user?.username}</h4>
      </div>
      {follows && !isMyUser && isLoggedIn ? (
        <button
          className={style.unfollowButton}
          onClick={(e) => {
            e.stopPropagation();
            unfollowUserProfile();
          }}
        >
          Unfollow <X />
        </button>
      ) : !isMyUser && isLoggedIn ? (
        <button
          className={style.followButton}
          onClick={(e) => {
            e.stopPropagation();
            followUserProfile();
          }}
        >
          Follow <CheckMark />
        </button>
      ) : null}
    </div>
  );
}
