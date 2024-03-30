import style from "./LoadingPage.module.css";
import { ScaleLoader } from "react-spinners";

export default function LoadingPage() {
  return (
    <div className={style.backgroundDiv}>
      <ScaleLoader color="#9492ff" />
    </div>
  );
}
