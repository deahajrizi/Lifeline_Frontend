import "./register.css";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

export default function Register() {

   const [username, setUsername] = useState("");
   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const { userLoading, register, error, success } = useUserStore();
   const { userInfo } = useAuthStore();

   const navigate = useNavigate();

   useEffect(() => {
     if (success) {
       setUsername("");
       setFirstName("");
       setLastName("");
       setEmail("");
       setPassword("");
       navigate("/");
     }
   }, [success]);

   useEffect(() => {
     if (userInfo) {
       navigate("/");
     }
   }, [userInfo]);

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await register({
         username, 
         first_name: firstName, 
         last_name: lastName, 
         email, 
         password });
     } catch (e) {
       console.log(e);
     }
   };

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
      {error && <h3>{error}</h3>}

      {userLoading ? (
        <Spinner className="h-12 w-12" color="purple" />
      ) : (
        <div className="rmainContainer">
          <form className="rformContainer">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              className="input"
              type="text"
              name="username"
              value={username}
              placeholder="JaneDoe123"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label className="label" htmlFor="fname">
              First Name
            </label>
            <input
              className="input"
              name="fname"
              type="text"
              value={firstName}
              placeholder="Jane"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label className="label " htmlFor="lname">
              Last Name
            </label>
            <input
              className="input"
              name="lname"
              type="text"
              value={lastName}
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
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
      )}
    </>
  );
}
