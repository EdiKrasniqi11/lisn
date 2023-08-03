import { NavLink } from "react-router-dom";
import style from "./CreateButton.module.css";

export default function CreateButton() {
  return (
    <NavLink to="./create-item">
      <button className={style.createButton} title="Insert new object">
        +
      </button>
    </NavLink>
  );
}
