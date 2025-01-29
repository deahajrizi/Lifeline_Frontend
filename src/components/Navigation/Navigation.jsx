import "./navigation.css"
import logo from "../../assets/Lifeline_Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";

export default function Navigation() {


    const {userInfo, logout} = useAuthStore()
    const {userLogout} = useUserStore()
    const navigate = useNavigate()

    useEffect(() => {
      if(!userInfo){
        navigate('/login')
      }
        
    }, [userInfo])
    const handleLogout = async () => {
        try {
            await userLogout()
            logout()
            console.log('before')
            navigate('/login')
            console.log("after ")
        } catch (err) {
            console.log(err)
        }
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
      <div className="logoContainer">
        <Link to={"/"}>
          <img className="logo" src={logo}></img>
        </Link>
      </div>
      {userInfo ? (
        <div className="linkContainer">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <button className="navButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="linkContainer">
          <Link to="/">Home</Link>
          <button className="navButton">
            <Link to="/login" className="coloredLink">
              Register / Login
            </Link>
          </button>
        </div>
      )}
    </nav>
  );
   
}
