import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./Register.module.css";
import googleLogo from "../../Assets/Images/google-logo.png";
import { LoginSocialGoogle } from "reactjs-social-login";
import { COUNTRY, USER } from "../../Data/Interfaces";
import { fetchCountries } from "../../Data/dataFetching";
import { registerUser } from "../../Data/dataCreating";
import { useNavigate } from "react-router-dom";
import { login } from "../../Data/authentication";

export default function Register() {
  const navigate = useNavigate();

  const [months, setMonths] = useState<number[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const [countries, setCountries] = useState<COUNTRY[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRegistered, setUserRegistered] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    setMonths(Array.from({ length: 12 }, (_, index) => index + 1));
    setDays(Array.from({ length: 31 }, (_, index) => index + 1));
    setYears(
      Array.from({ length: 2023 - 1900 + 1 }, (_, index) => 2023 - index)
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCountries(setCountries, setIsLoading);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleLogin = async () => {
      if (userRegistered) {
        const user: USER = {
          username: username,
          user_password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const response = await login(user);

        if (response.status === 200) {
          navigate("/");
          window.location.reload();
        } else {
          alert(alert(response.message));
        }
      }
    };
    handleLogin();
  }, [userRegistered]);

  const changeCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword == password) {
      try {
        const birthDate = new Date(`${month}/${day}/${year}`);
        const user: USER = {
          username: username,
          user_email: email,
          user_password: password,
          birth_date: birthDate,
          user_country: country,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await registerUser(user);
        if (result && result.status == 200) {
          setUserRegistered(true);
        }
      } catch (error: any) {
        alert(error?.response?.data?.message);
      }
    } else {
      alert("Your password is not confirmed, please check again");
    }
  };

  return (
    <div className={style.register}>
      <form
        method="POST"
        className={style.registerForm}
        onSubmit={async (e) => handleSubmit(e)}
      >
        <div
          title="Return to login"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id={style.goBack}
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
        </div>
        <h1>Register</h1>
        <label className={style.inputLabel}>email</label>
        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label className={style.inputLabel}>username</label>
        <input
          type="text"
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={style.inputLabel}>password</label>
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className={style.inputLabel}>confirm password</label>
        <input
          type="password"
          placeholder="confirm password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label className={style.inputLabel}>date of birth</label>
        <div className={style.ageDiv}>
          <select
            className={style.dateSelect}
            value={month}
            required
            onChange={(e) => {
              const numberValue = parseInt(e.target.value);
              setMonth(numberValue);
            }}
          >
            <option value={0} disabled>
              month
            </option>
            {months.map((month) => (
              <option value={month} className={style.dateOption} key={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            className={style.dateSelect}
            value={day}
            required
            onChange={(e) => {
              const numberValue = parseInt(e.target.value);
              setDay(numberValue);
            }}
          >
            <option value={0} disabled>
              day
            </option>
            {days.map((day) => (
              <option value={day} className={style.dateOption} key={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            className={style.dateSelect}
            value={year}
            required
            onChange={(e) => {
              const numberValue = parseInt(e.target.value);
              setYear(numberValue);
            }}
          >
            <option value={0} disabled>
              year
            </option>
            {years.map((year) => (
              <option value={year} className={style.dateOption} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <label className={style.inputLabel}>location</label>
        <div className={style.locationSelect}>
          <select
            className={style.countrySelect}
            value={country}
            required
            onChange={(e) => changeCountry(e)}
          >
            <option value={""} disabled>
              country
            </option>
            {countries.map((country) => (
              <option key={country.name.common} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={style.submitButton}>
          Register
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
            Register with Google
          </button>
        </LoginSocialGoogle>
      </form>
    </div>
  );
}
