import "./profile.css";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useAuthStore } from "../../stores/authStore.js";
import defaultAvatar from "../../assets/default-avatar.png";
import { alwaysScrollToTop } from "../../utils/functions.js";
import {toast} from "react-toastify";

export default function Profile() {
  const { userInfo } = useAuthStore();
  const { getUserProfile, user, editProfile, uploadAvatar } = useUserStore();
  const success = () => toast.success("Profile updated successfully!");
  const Error = () => toast.error("Profile update failed!");

  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate()
  useEffect(() => {
      alwaysScrollToTop()
  }, [])
  useEffect(() => {
    if (!user && !userInfo) {
      // If no user information is available, redirect to login page
      navigate("/redirect");
    } else {
      // Proceed to get the user profile
      if (userInfo && userInfo._id) {
        getUserProfile(userInfo._id);
      } else if (user && user._id) {
        getUserProfile(user._id);
      }
    }
  }, [getUserProfile, user ]);
  useEffect(() => {
    if (user) {
      setUsername(user.username),
        setFirstName(user.first_name),
        setLastName(user.last_name),
        setEmail(user.email);
       setAvatar(user.avatar); // Set avatar from store
       setAvatarPreview(user.avatar || defaultAvatar); 
    }
  }, [user]);

  const handleEditClick = (e) => {
    e.preventDefault()
    setIsEditing(true)
  };
  const handleAvatarChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      //temporary url to display it in the preview
      const fileUrl = URL.createObjectURL(file)
      setAvatarPreview(fileUrl)
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault()

    const userData = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
    }

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
      const updatedProfile = await getUserProfile(userInfo._id);

      // Ensure `user` is not undefined before trying to access `avatar`
      if (updatedProfile && updatedProfile.data && updatedProfile.data.user) {
        setAvatar(updatedProfile.data.user.avatar);
        setAvatarPreview(updatedProfile.data.user.avatar || defaultAvatar);
      } else {
      }
      setIsEditing(false);
      success();
    } catch (error) {
      Error();
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
       
      </div>
    </>
  );
}
