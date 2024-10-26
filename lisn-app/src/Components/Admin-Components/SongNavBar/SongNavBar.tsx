import { NavLink, useParams } from "react-router-dom";
import style from "./SongNavBar.module.css";

export default function UserNavBar() {
  const params = useParams();
  return (
    <div className={style.navigation}>
      <div className={style.navigationDiv}>
        <NavLink to="/admin/song-service/song-genres">
          <h4 style={params.table === "song-genres" ? { opacity: 0.7 } : {}}>
            Genres
          </h4>
        </NavLink>
      </div>
      <div className={style.navigationDiv}>
        <NavLink to="/admin/song-service/song-sub-genres">
          <h4
            style={params.table === "song-sub-genres" ? { opacity: 0.7 } : {}}
          >
            Sub Genres
          </h4>
        </NavLink>
      </div>
    </div>
  );
}
