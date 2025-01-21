import "./memory.css"
import bgImg from "../../assets/background.png";



export default function Memory({onClick}) {


  return (
    <div className="memoryContainer" onClick={onClick}>
      
      <div className="memoryTitle">
        <p>Title</p>
      </div>
      <div className="memoryMedia">
        <img src={bgImg} alt=""></img>
      </div>
      <div className="memoryDate">10.05.2023</div>
    </div>
  );
}
