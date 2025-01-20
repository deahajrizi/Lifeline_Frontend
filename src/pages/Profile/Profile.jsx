import "./profile.css";
import avatar from "../../assets/avatar.jpeg";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("JaneDoe123");
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("JaneDoe@gmail.com");

  return (
    <>
      <Header
        title="Profile"
        subtitle="Edit and personalize your profile!"
        showLogo={false}
        showButton={false}
        headerHeight="280px"
        headerTitleMargin="150px auto 0"
      />

      <div className="pmainContainer">
        <div className="avatarContainer">
          <div className="avatar">
            <img
              src={avatar}
              className="avatarImg"
              alt="User's profile picture"
            ></img>
          </div>
        </div>
        <form
          className="pformContainer"
          onSubmit={(e) => {
            e.preventDefault();
            setIsEditing(!isEditing);
          }}
        >
          <label className="label" for="username">
            Username
          </label>
          {isEditing ? (
            <input
              className="input"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          ) : (
            <div className="userInfo">
              <p>{username}</p>
            </div>
          )}

          <label className="label" for="fname">
            First Name
          </label>
          {isEditing ? (
            <input
              value={firstName}
              className="input "
              name="fname"
              type="text"
              placeholder="Jane"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
          ) : (
            <div className="userInfo">
              <p>{firstName}</p>
            </div>
          )}

          <label className="label " for="lname">
            Last Name
          </label>
          {isEditing ? (
            <input
              value={lastName}
              className="input"
              name="lname"
              type="text"
              placeholder="Doe"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          ) : (
            <div className="userInfo">
              <p>{lastName}</p>
            </div>
          )}

          <label className="label" for="email">
            Email
          </label>
          {isEditing ? (
            <input
              value={email}
              className="input"
              name="email"
              type="email"
              placeholder="JaneDoe@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          ) : (
            <div className="userInfo">
              <p>{email}</p>
            </div>
          )}

          {/* <label for="password" className="label">
            Password
          </label>
          <input
            className="input"
            name="password"
            type="password"
            placeholder="••••••••••••••••"
          ></input> --> */}
          <button className="formButton" type="submit">
            {isEditing ? "Save " : "Edit "}
            profile
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
