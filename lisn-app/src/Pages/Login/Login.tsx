import style from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import googleLogo from "../../Assets/Images/google-logo.png";
import { FormEvent, useState } from "react";
import { USER } from "../../Data/Interfaces";
import { login } from "../../Data/authentication";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: USER = {
      USERNAME: username,
      USER_PASSWORD: password,
      INSERT_DATE: new Date(),
    };
    const response = await login(user);

    if (response.status === 200) {
      navigate("/");
      window.location.reload();
    } else {
      alert(alert(response.message));
    }
  };

  return (
    <div className={style.login}>
      <form
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
        className={style.loginForm}
      >
        <h1>Login with existing account</h1>
        <label className={style.inputLabel}>email/username</label>
        <input
          type="text"
          placeholder="email/username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={style.inputLabel}>password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={style.submitButton}>
          Login
        </button>
        <LoginSocialGoogle
          client_id={
            "249611269980-8n0tr1mh291cte36v5mm61pq3iqqc9v6.apps.googleusercontent.com"
          }
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log(provider, data);
            alert("successfully logged in through google");
          }}
          onReject={(err) => {
            console.log(err);
          }}
          className={style.googleContainer}
        >
          <button className={style.googleRegister}>
            <img src={googleLogo} />
            Login with Google
          </button>
        </LoginSocialGoogle>
      </form>
      <div className={style.registerContainer}>
        <p className={style.registerDirectory}>Don't have an account?</p>
        <NavLink to="/register" className={style.registerLink}>
          Sign up here
        </NavLink>
      </div>
    </div>
  );
}
