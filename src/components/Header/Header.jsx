import "./header.css";
import bgImg from "../../assets/background.png";
import logo from "../../assets/Lifeline_Logo.png";
import HeaderButton from "../HeaderButton/HeaderButton";

export default function Header({ title, subtitle, showLogo = true, showButton = true, headerHeight, headerTitleMargin }) {
  return (
    <header className="header" style={{height: headerHeight}} >
      <div className="headerText">
        <div className="headerTitleContainer" style={{margin: headerTitleMargin}}>
          <h1 className="headerTitle">{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {showLogo && (
          <div className="headerImageContainer">
            <img className="headerLogo" src={logo} alt="Logo"></img>
          </div>
        )}
      </div>
      {showButton && <HeaderButton />}
      <div className="imgContainer">
        <img className="bgImg" src={bgImg} alt="Background"></img>
      </div>
    </header>
  );
}