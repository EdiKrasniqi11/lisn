import style from './Login.module.css'
import {NavLink} from 'react-router-dom';

export default function Login(){
    return (
        <div className={style.login}>
            <form className={style.loginForm}>
                <h1>Login with existing account</h1>
                <label className={style.inputLabel}>email/username</label>
                <input type="text" placeholder="email/username"/>
                <label className={style.inputLabel}>password</label>
                <input type="password" placeholder="password"/>
                <button type="submit" className={style.submitButton}>Login</button>
            </form>
            <div className={style.registerContainer}>
                <p className={style.registerDirectory}>Don't have an account?</p>
                <NavLink to="/register" className={style.registerLink}>Sign up here</NavLink>
            </div>
        </div>
    )
}