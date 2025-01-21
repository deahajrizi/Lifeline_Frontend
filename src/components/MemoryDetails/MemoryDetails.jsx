import "./memoryDetails.css";
import bgImg from "../../assets/background.png";
import { IoMdClose } from "react-icons/io";

export default function MemoryDetails({ setShowDetails }) {
  return (
    <div className="mainDetailsContainer">
      <div className="detailsContainer">
        <div className="mediaContainer">
          <img src={bgImg}></img>
        </div>

        <div className="textContainer">
          <div className="topText">
            <h2>My fondest memory</h2>
            <div className="closeModal">
              <IoMdClose
                className="close"
                onClick={() => setShowDetails(false)}
              />
            </div>
          </div>
          <div className="middleText">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation{" "}
            </p>
            <div className="memoryAuthor">
              <div className="memoryAuthorAvatar">
                <img src={bgImg}></img>
              </div>
              <p>Author Name</p>
            </div>

            <div className="bottomText">
              <h3 className="commentsTitle">Comments</h3>
              <div className="commentsContainer">
                <div className="singleComment">
                  <div className="commentAuthorAvatar">
                    <img src={bgImg}></img>
                  </div>
                  <div className="commentInfo">
                    <div className="commentAuthorName">
                      <strong> Author Name</strong>
                    </div>
                    <div className="commentDate">Posted on: 02.08.2024</div>
                  </div>
                  <div className="comment">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
