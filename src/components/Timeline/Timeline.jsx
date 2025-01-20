import Memory from "../Memory/Memory"
import ProgressBar from "../ProgressBar/ProgressBar"
import "./timeline.css"


export default function Timeline() {
  return (
    <div className="timelineContainer">
        <div className="leftMemoryContainer">
            <Memory></Memory>
        </div>
        <ProgressBar></ProgressBar>
        <div className="rightMemoryContainer">
            <Memory></Memory>
        </div>
    </div>
  )
}
