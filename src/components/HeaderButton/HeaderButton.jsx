import "./headerButton.css";

export default function HeaderButton({buttonText}) {
  return (
    <div className="headerButtonContainer">
      <button className="headerButton">{buttonText}</button>
    </div>
  );
}
