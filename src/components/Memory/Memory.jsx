import "./memory.css"
import bgImg from "../../assets/background.png";
import { formatDate } from "../../utils/functions";



export default function Memory({className,post, onClick}) {


  return (
    <div className={`memoryContainer ${className}`}  onClick={onClick}>
      
      <div className="memoryTitle">
        <p>{post.title}</p>
      </div>
      <div className="memoryMedia">
        <img src={bgImg} alt=""></img>
      </div>
      <div className="memoryDate">{formatDate(post.date)}</div>
    </div>
  );
}
