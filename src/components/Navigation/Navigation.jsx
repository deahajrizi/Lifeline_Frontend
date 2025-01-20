import "./navigation.css"
import logo from "../../assets/Lifeline_Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navigation() {

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
    <nav className={bgColor ? 'nav navScrolled' : 'nav' }>
        <div className="logoContainer">
            <img className="logo" src={logo}></img>
        </div>
        <div className="linkContainer">
            <Link to="/">Home</Link>
            <button className="navButton">
                <Link to="/login" className="coloredLink" >Register / Login</Link>
            </button>
            
        </div>
    </nav>
  );
   
}
