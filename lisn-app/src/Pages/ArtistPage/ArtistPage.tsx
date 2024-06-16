import { useEffect, useState } from "react";
import Background from "../../Components/Home-Components/Background/Background";
import style from "./ArtistPage.module.css";
import { LoggedUser } from "../../Data/Interfaces";
import { fetchMyUser } from "../../Data/authentication";

export default function ArtistPage() {
  const [user, setUser] = useState<LoggedUser>();

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
      <div className={style.contentDiv}>
        <h2>{user?.username}</h2>
      </div>
    </Background>
  );
}
