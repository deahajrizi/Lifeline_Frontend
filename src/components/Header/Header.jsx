import "./header.css";
import bgImg from "../../assets/background.png";
import logo from "../../assets/Lifeline_Logo.png";
import HeaderButton from "../HeaderButton/HeaderButton";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import CreateMemory from "../CreateMemory/CreateMemory";

export default function Header({ title, subtitle, showLogo = true, showButton = true, headerHeight, headerTitleMargin, headerTitleWidth }) {
  const {userInfo} = useAuthStore()
  const [showModal, setShowModal] = useState(false)

  const handleButtonClick = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false); 
  };
  return (
    <header className="header" style={{height: headerHeight}} >
      <div className="headerText">
        <div className="headerTitleContainer" style={{margin: headerTitleMargin, width: headerTitleWidth}}>
          <h1 className="headerTitle">{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {showLogo && (
          <div className="headerImageContainer">
            <img className="headerLogo" src={logo} alt="Logo"></img>
          </div>
        )}
      </div>
        {userInfo ? (
          <>
          <HeaderButton onClick={handleButtonClick} buttonText={"Create a new memory"} />
          {showModal && <CreateMemory onClose={handleCloseModal} />}
          </>
        ) : (
          showButton && ( 
          <>
          <HeaderButton buttonLink="/login" buttonText={"Create your own Lifeline"} />
          
          </>
          )
        )}
        <div className="imgContainer">
            <img className="bgImg" src={bgImg} alt="Background"></img>
          </div>
     
    </header>
  );
}