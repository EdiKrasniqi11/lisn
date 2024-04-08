import { useEffect, useState } from "react";
import { Follow, FollowPage, USER } from "../../../Data/Interfaces";
import FollowerContainer from "../../Home-Components/FollowerContainer/FollowerContainer";
import style from "./FollowersModal.module.css";
import { fetchFollowers, fetchFollowings } from "../../../Data/dataFetching";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "../../Icons/MyIcons";

interface FollowersModalProps {
  user: USER | undefined;
  updateCount: any;
}

export default function FollowersModal({
  user,
  updateCount,
}: FollowersModalProps) {
  const [followers, setFollowers] = useState<Follow[]>();
  const [followPage, setFollowPage] = useState<FollowPage>();
  const [page, setPage] = useState<number>(1);
  const [confirmPage, setConfirmPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, [user, page]);

  const fetchData = async () => {
    try {
      if (confirmPage !== page) {
        console.log(confirmPage === page);
        console.log(page, confirmPage);
        if (params.function === "followers") {
          const fetchedFollowers = user?._id
            ? await fetchFollowers(user?._id, 10, page)
            : null;
          if (fetchedFollowers) {
            if (fetchedFollowers.totalPages === page) {
              setHasMore(false);
            }
            setFollowPage(fetchedFollowers);
            const allFollowers = followers
              ? followers.concat(fetchedFollowers.followers)
              : fetchedFollowers.followers;
            setFollowers(Array.from(new Set(allFollowers)));
          }
        } else if (params.function === "following") {
          const fetchedFollowers = user?._id
            ? await fetchFollowings(user._id, 10, page)
            : null;
          if (fetchedFollowers) {
            if (fetchedFollowers.totalPages === page) {
              setHasMore(false);
            }
            setConfirmPage(page);
            setFollowPage(fetchedFollowers);
            const allFollowers = followers
              ? followers.concat(fetchedFollowers.following)
              : fetchedFollowers.following;
            setFollowers(Array.from(new Set(allFollowers)));
          }
        }
        if (page !== 1) {
          setConfirmPage(page);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const incrementPage = () => {
    if (followPage && hasMore) {
      console.log("page");
      setPage(page + 1);
    }
  };

  return (
    <div className={style.coverDiv}>
      <div className={style.modalDiv}>
        <div className={style.exitDiv} onClick={() => navigate(-1)}>
          <X id={style.exit} />
        </div>
        <h1>{params.function}</h1>
        {followers?.map((follower) => (
          <FollowerContainer
            user={follower.follower ? follower.follower : follower.followed}
            updateCount={updateCount}
          />
        ))}
        {hasMore ? (
          <button onClick={() => incrementPage()} className={style.loadPage}>
            Show More
          </button>
        ) : null}
      </div>
    </div>
  );
}
