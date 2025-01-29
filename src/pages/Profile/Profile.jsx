import "./profile.css";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import EditAvatar from "../../components/EditAvatar/EditAvatar";
import { useUserStore } from "../../stores/userStore";
import { useAuthStore } from '../../stores/authStore.js'


export default function Profile() {
  const {userInfo} = useAuthStore()
   const { getUserProfile } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
      getUserProfile(userInfo.user._id);
  }, []);



  const editorRef = useRef(null); // Ref for AvatarEditor in EditAvatar

  const handleSaveProfile = () => {
    if (editorRef.current) {
      const editedAvatar = editorRef.current
        .getImageScaledToCanvas()
        .toDataURL();
      setAvatar(editedAvatar); //Save the edited avatar to state
    }
    setIsEditing(!isEditing);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

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
          <EditAvatar
            avatar={avatar} //Pass current avatar
            editorRef={editorRef} //Pass ref to access AvatarEditor
            isEditing={isEditing}
          />
        </div>
        <form
          className="pformContainer"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveProfile(); //Save profile and avatar together
          }}
        >
          <label className="label" htmlFor="username">
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

          <label className="label" htmlFor="fname">
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

          <label className="label " htmlFor="lname">
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

          <label className="label" htmlFor="email">
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

          {/* <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="input"
            name="password"
            type="password"
            placeholder="••••••••••••••••"
          ></input> --> */}
          {isEditing ? (
            <button className="formButton" type="submit">
              Save Profile
            </button>
          ) : (
            <button className="formButton" type="submit">
              Edit Profile
            </button>
          )}
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
