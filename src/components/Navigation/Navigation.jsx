import "./navigation.css"
import logo from "../../assets/Lifeline_Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { ToastContainer, toast } from "react-toastify";

export default function Navigation() {
    const {userInfo, logout} = useAuthStore()
    const {userLogout} = useUserStore()
    const navigate = useNavigate()
    const notify = () => toast.success("Logged out successfully!");

    
    const handleLogout = async () => {
        try {
            await userLogout()
            logout()
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
      notify();
    }


  // Nav color change on scroll
  const [bgColor, setBgColor] = useState(false)
  const changeBgColor = () => {
    if(window.scrollY > 100){
      setBgColor(true)
    } else {
      setBgColor(false)
    }
  }
  window.addEventListener('scroll', changeBgColor)

  return (
    <nav className={bgColor ? "nav navScrolled" : "nav"}>
      <ToastContainer position="bottom-right" />

      <div className="logoContainer">
        <Link to={"/"}>
          <img className="logo" src={logo}></img>
        </Link>
      </div>
      {userInfo ? (
        <div className="linkContainer">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/friends">Friends</Link>
          <button className="navButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="linkContainer">
          <Link to="/">Home</Link>
          <button className="navButton">
            <Link to="/login" className="coloredLink">
              Login / Register
            </Link>
          </button>
        </div>
      )}
    </nav>
  );
   
}
