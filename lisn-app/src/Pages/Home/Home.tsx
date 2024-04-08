import { useState, useEffect } from "react";
import style from "./Home.module.css";
import Views from "../../Assets/Images/Views.jpg";
import { fetchMyUser } from "../../Data/authentication";
import { LoggedUser, USER } from "../../Data/Interfaces";
import PlaylistContainer from "../../Components/Home-Components/Playlist/PlaylistContainer";
import { Playlist } from "../../Data/Interfaces";
import Background from "../../Components/Home-Components/Background/Background";

export default function Home() {
  const [user, setUser] = useState<LoggedUser>();
  const [dummyPlaylists, setDummyPlaylists] = useState<Playlist[]>([
    {
      PLAYLIST_ID: "wbc",
      IMAGE: Views,
      TITLE: "Views",
    },
    {
      PLAYLIST_ID: "wbc",
      IMAGE: Views,
      TITLE: "Views",
    },
    {
      PLAYLIST_ID: "wbc",
      IMAGE: Views,
      TITLE: "Views",
    },
    {
      PLAYLIST_ID: "wbc",
      IMAGE: Views,
      TITLE: "Views",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUser: LoggedUser = await fetchMyUser();
        setUser(myUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Background>
      <div className={style.announcementDiv}>
        {user
          ? `Hi there ${user.username}. Ready for some music?`
          : "Hi there. Ready for some music?"}
      </div>
      <div className={style.playlistsContainer}>
        <h3>Your playlists</h3>
        <div className={style.playlists}>
          {dummyPlaylists.map((playlist) => (
            <PlaylistContainer playlist={playlist} />
          ))}
        </div>
      </div>
    </Background>
  );
}
