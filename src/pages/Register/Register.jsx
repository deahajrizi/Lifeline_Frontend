import "./register.css";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <Header
        title="Register"
        subtitle="Start adding memories to your own Lifeline!"
        showLogo={false}
        showButton={false}
        headerHeight="280px"
        headerTitleMargin="150px auto 0"
      />

      <div className="rmainContainer">
        <form className="rformContainer">
          <label className="label" for="username">
            Username
          </label>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="JaneDoe123"
          ></input>
          <label className="label" for="fname">
            First Name
          </label>
          <input
            className="input "
            name="fname"
            type="text"
            placeholder="Jane"
          ></input>
          <label className="label " for="lname">
            Last Name
          </label>
          <input
            className="input"
            name="lname"
            type="text"
            placeholder="Doe"
          ></input>
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
            Register
          </button>
        </form>
        <p className="underFormText">
          Already have an account? Login{" "}
          <Link className="formLink" to="/login">
            here
          </Link>
          .
        </p>
      </div>
    </>
  );
}
