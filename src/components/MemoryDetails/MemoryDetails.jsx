import "./memoryDetails.css";
import bgImg from "../../assets/background.png";
import { IoMdClose } from "react-icons/io";
import { usePostStore } from "../../stores/postStore";
import { formatDate } from "../../utils/functions";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";


export default function MemoryDetails({ post, setShowDetails }) {
  const { getPosts } = usePostStore(); 
  const { userInfo } = useAuthStore();
  const [showEditMemory, setShowEditMemory] = useState(false);

  const handleClose = () => {
    setShowDetails(false);
    if (userInfo) {
      getPosts(); 
    }
  };

  const handleEdit = () => {
    setShowDetails(false);
    setShowEditMemory(true);
  };

  if (showEditMemory) {
    return <EditMemory post={post} setShowEditMemory={setShowEditMemory} />;
  }


  return (
    <div className="mainDetailsContainer">
      <div className="detailsContainer">
        <div className="mediaContainer">
          <img src={bgImg} alt="Background" />
        </div>

        <div className="textContainer">
          <div className="topText">
            <div className="titleAndDate">
              <h2 className="postTitle">{post.title}</h2>
              <p>{formatDate(post.date)}</p>
            </div>
            <div className="rightActions">
                {userInfo && userInfo._id === post.user && (
                  <button className="editMemoryButton" onClick={handleEdit}>
                    Edit
                  </button>
                )}
                <div className="closeModal">
                  <IoMdClose className="close" onClick={handleClose} />
                </div>
            </div>
          </div>
          <div className="middleText">
            <p>{post.content} </p>
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
