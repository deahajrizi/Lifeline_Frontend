import "./login.css";

import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Header
        title="Login"
        subtitle="Access your timeline of cherished memories."
        showLogo={false}
        showButton={false}
        headerHeight="280px"
        headerTitleMargin="150px auto 0"
      />

      <div className="mainContainer">
        <form className="formContainer">
          <label className="label" for="email">
            Email
          </label>
          <input
            className="input"
            name="email"
            type="email"
            placeholder="JaneDoe@gmail.com"
          ></input>
          <label for="password" className="label">
            Password
          </label>
          <input
            className="input"
            name="password"
            type="password"
            placeholder="••••••••••••••••"
          ></input>
          <button className="formButton" type="submit">
            Login
          </button>
        </form>
        <p className="underFormText">
          Don't have an account? Register{" "}
          <Link className="formLink" to="/register">
            here
          </Link>
          .
        </p>
      </div>
    </>
  );
}
