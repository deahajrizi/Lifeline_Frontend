import "./memoryDetails.css";
import bgImg from "../../assets/background.png";
import { IoMdClose } from "react-icons/io";
import { usePostStore } from "../../stores/postStore";

export default function MemoryDetails({ post, setShowDetails }) {
  const { getPosts } = usePostStore(); // Get getPosts from store

  const handleClose = () => {
    setShowDetails(false);
    getPosts(); // Refetch posts when closing
  };

  return (
    <div className="mainDetailsContainer">
      <div className="detailsContainer">
        <div className="mediaContainer">
          <img src={bgImg}></img>
        </div>

        <div className="textContainer">
          <div className="topText">
            <h2>{post.title}</h2>
            <div className="closeModal">
              <IoMdClose
                className="close"
                onClick={handleClose}
              />
            </div>
          </div>
          <div className="middleText">
            <p>.{post.date}</p>
            <p>{post.content}{" "}</p>
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
