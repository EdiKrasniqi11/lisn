import style from "./PlaylistContainer.module.css";
import { Playlist } from "../../../Data/Interfaces";

interface PlaylistProps {
  playlist: Playlist;
}

export default function PlaylistContainer({ playlist }: PlaylistProps) {
  return (
    <div className={style.playlist}>
      <img
        src={playlist.IMAGE}
        alt="Playlist Cover"
        className={style.playlistImage}
      />
      <h3>{playlist.TITLE}</h3>
    </div>
  );
}
