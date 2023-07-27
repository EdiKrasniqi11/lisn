import { useEffect, useState } from 'react'
import style from './Register.module.css';
import googleLogo from '../../Assets/Images/google-logo.png';
import {LoginSocialGoogle} from 'reactjs-social-login';

export default function Register(){
    const [months, setMonths] = useState<number[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        setMonths(Array.from({ length: 12 }, (_, index) => index + 1));
        setDays(Array.from({ length: 31 }, (_, index) => index + 1));
        setYears(Array.from({ length: 2023 - 1900 + 1 }, (_, index) => 2023 - index));
    },[]);

    return(
        <div className={style.register}>
            <form className={style.registerForm}>
                <div title="Return to login" onClick={() => {window.location.href = "/login"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" id={style.goBack}  className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                </div>
                <h1>Register</h1>
                <label className={style.inputLabel}>email</label>
                <input type="email" placeholder="email"/>
                <label className={style.inputLabel}>username</label>
                <input type="text" placeholder="username"/>
                <label className={style.inputLabel}>password</label>
                <input type="password" placeholder="password"/>
                <label className={style.inputLabel}>date of birth</label>
                <div className={style.ageDiv}>
                    <select className={style.dateSelect}>
                        <option selected disabled>month</option>
                        {months.map(month => (
                            <option value={month} className={style.dateOption}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select className={style.dateSelect}>
                        <option selected disabled>day</option>
                        {days.map(day => (
                            <option value={day} className={style.dateOption}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <select className={style.dateSelect}>
                        <option selected disabled>year</option>
                        {years.map(year => (
                            <option value={year} className={style.dateOption}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <label className={style.inputLabel}>gender</label>
                <select className={style.genderSelect}>
                    <option selected disabled>gender</option>
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                    <option>prefer not to say</option>
                </select>
                <label className={style.inputLabel}>location</label>
                <div className={style.locationSelect}>
                    <select className={style.countrySelect}>
                        <option selected disabled>country</option>
                        <option>Kosovo</option>
                        <option>Albania</option>
                        <option>United States</option>
                    </select>
                    <select className={style.citySelect}>
                        <option selected disabled>city</option>
                        <option>Prishtina</option>
                        <option>Tirana</option>
                        <option>San Diego, California</option>
                    </select>
                </div>
                <button type="submit" className={style.submitButton}>Register</button>
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
                    <button className={style.googleRegister}><img src={googleLogo}/>Register with Google</button>
                </LoginSocialGoogle>
            </form>
        </div>
    )
}