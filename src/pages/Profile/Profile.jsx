import "./profile.css";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useAuthStore } from "../../stores/authStore.js";
import defaultAvatar from "../../assets/default-avatar.png";

export default function Profile() {
  const { userInfo } = useAuthStore();
  const { getUserProfile, user, editProfile, uploadAvatar } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate()
  useEffect(() => {
    if (!user && !userInfo) {
      // If no user information is available, redirect to login page
      navigate("/login");
    } else {
      // Proceed to get the user profile
      if (userInfo && userInfo._id) {
        getUserProfile(userInfo._id);
      } else if (user && user._id) {
        getUserProfile(user._id);
      }
    }
  }, [userInfo, user, getUserProfile]);
  useEffect(() => {
    if (user) {
      setUsername(user.username),
        setFirstName(user.first_name),
        setLastName(user.last_name),
        setEmail(user.email);
      setAvatar(user.avatar);
      setAvatarPreview(user.avatar || defaultAvatar); // Set initial avatar preview
    }
  }, [user]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log(file); // Debug: Check if the file is selected correctly

    if (file) {
      setAvatar(file);
      //temporary url to display it in the preview
      const fileUrl = URL.createObjectURL(file);
      setAvatarPreview(fileUrl);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    try {
      // Update user profile
      await editProfile(userData);

      // Upload avatar if it exists
      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        await uploadAvatar(userInfo._id, formData);
      }

      // Fetch updated profile to reflect changes
      await getUserProfile(userInfo._id);

      setIsEditing(false);
    } catch (error) {
      console.error("Profile update or avatar upload failed:", error);
    }
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
          <div className="avatar">
            {isEditing ? (
              <>
                <input
                  type="file"
                  id="avatarInput"
                  name="avatar"
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  className="avatarInput"
                  onChange={handleAvatarChange}
                />
                <label className="avatarLabel" htmlFor="avatarInput">
                  Click to change Avatar
                </label>
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    className="avatarImg"
                    alt="Avatar Preview"
                  />
                ) : (
                  <img
                    src={defaultAvatar}
                    className="avatarImg"
                    alt="Default Avatar"
                  />
                )}
              </>
            ) : (
              <img
                src={avatar ? avatar : defaultAvatar}
                className="avatarImg"
                alt="User Avatar"
              />
            )}
          </div>
        </div>

        <form className="pformContainer" onSubmit={handleSaveProfile}>
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
            <button
              className="formButton"
              type="submit"
              onClick={handleEditClick}
            >
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
