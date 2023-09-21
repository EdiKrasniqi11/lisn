import { useState, useEffect } from "react";
import style from "./Home.module.css";
import Views from "../../Assets/Images/Views.jpg";
import { fetchMyUser } from "../../Data/authentication";
import { USER } from "../../Data/Interfaces";

export default function Home() {
  const [user, setUser] = useState<USER>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUser: USER = await fetchMyUser();
        setUser(myUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={style.home}>
      <div className={style.announcementDiv}>
        {user
          ? `Hi ${user.USERNAME}. Ready for some music?`
          : "Hi there. Ready for some music?"}
      </div>
      <div className={style.playlistsContainer}>
        <h3>Your playlists</h3>
        <div className={style.playlists}>
          <div className={style.playlist}>
            <img
              src={Views}
              alt="Playlist Cover"
              className={style.playlistImage}
            />
            <h3>Views</h3>
          </div>
          <div className={style.playlist}>
            <img
              src={Views}
              alt="Playlist Cover"
              className={style.playlistImage}
            />
            <h3>To Pimp a Butterfly</h3>
          </div>
          <div className={style.playlist}>
            <img src={Views} className={style.playlistImage} />
            <h3>DAMN</h3>
          </div>
          <div className={style.playlist}>
            <img src={Views} className={style.playlistImage} />
            <h3>Vince Staples</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
