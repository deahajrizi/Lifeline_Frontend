import "./login.css";

import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

export default function Login() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const { user, error, userLoading, login, success } = useUserStore();
      const { setCredentials, userInfo } = useAuthStore();

      const navigate = useNavigate();

      useEffect(() => {
        if (success) {
          setCredentials({ user });
          navigate('/');
          console.log("User logged in")
        }
      }, [navigate, success, user]);

      

      const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
        if (user && user._id) {
          setCredentials({ user });
          navigate('/');
        }
      };

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
      {error && <h3>{error}</h3>}

      {userLoading ? (
        <Spinner className="h-12 w-12" color="purple" />
      ) : (
        <div className="mainContainer">
          <form className="formContainer">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              name="email"
              type="email"
              value={email}
              placeholder="JaneDoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              className="input"
              name="password"
              type="password"
              value={password}
              placeholder="••••••••••••••••"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="formButton" type="submit" onClick={handleSubmit}>
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
      )}
    </>
  );
}
