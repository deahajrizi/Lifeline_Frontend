import Memory from "../Memory/Memory"
import MemoryDetails from "../MemoryDetails/MemoryDetails";
import ProgressBar from "../ProgressBar/ProgressBar"
import "./timeline.css"
import { useState } from "react";



export default function Timeline() {

  const [showDetails, setShowDetails] = useState(false); // Memory Details Modal

  return (
    <>
      <div className="timelineContainer">
        {showDetails && <MemoryDetails setShowDetails={setShowDetails} />}
        <div className="leftMemoryContainer">
          <Memory onClick={() => setShowDetails(!showDetails)} />
        </div>
        <ProgressBar />
        <div className="rightMemoryContainer">
          <Memory />
        </div>
      </div>
    </>
  );
}
