import "./memory.css"
import bgImg from "../../assets/background.png";



export default function Memory({className,post, onClick}) {


  return (
    <div className={`memoryContainer ${className}`}  onClick={onClick}>
      
      <div className="memoryTitle">
        <p>{post.title}</p>
      </div>
      <div className="memoryMedia">
        <img src={bgImg} alt=""></img>
      </div>
      <div className="memoryDate">{post.date}</div>
    </div>
  );
}
