import { NavLink } from "react-router-dom";
import style from "./NoContent.module.css";
import Background from "../../Components/Home-Components/Background/Background";

export default function NoContent() {
  return (
    <Background>
      <div className={style.noContentDiv}>
        <h2>404</h2>
        <h3>
          Opps... seems like the url link is wrong or you're trying to access a
          non existing page.
        </h3>
        <NavLink to="/">Go back Home</NavLink>
      </div>
    </Background>
  );
}
