import { Link } from "react-router-dom";
import "./headerButton.css";

export default function HeaderButton({buttonText, buttonLink, onClick}) {
  return (
    <div className="headerButtonContainer">
      <Link className="headerButton" onClick={onClick} to={buttonLink}>{buttonText}</Link>
    </div>
  );
}
