import style from "./DataPlaceholder.module.css";

export default function DataPlaceholder() {
  return (
    <div className={style.dataPlaceholderDiv}>
      <h1>Welcome to the Administrative Tools page</h1>
      <p>
        Select any of the navigation options above for further data managing
      </p>
    </div>
  );
}
