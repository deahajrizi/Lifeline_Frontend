import "./memoryDetails.css";
import bgImg from "../../assets/background.png";
import { IoMdClose } from "react-icons/io";
import { usePostStore } from "../../stores/postStore";
import { formatDate } from "../../utils/functions";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useState } from "react";
import { useCommentStore } from "../../stores/commentStore";


export default function MemoryDetails({ post, setShowDetails, handleEdit, friendId}) {
  const { getPosts } = usePostStore(); 
  const { userInfo } = useAuthStore();
   const { createComment, getComments } = useCommentStore();
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");

   useEffect(() => {
     if (post && post._id) {
       fetchComments(post._id);
     }
   }, []);

   const fetchComments = async (postId) => {
     try {
       const fetchedComments = await getComments(postId);
       setComments(fetchedComments || []);
     } catch (error) {
       setComments([]);
     }
   };

   const handleCreateComment = async (e) => {
      e.preventDefault();
      if (!newComment) {
        return;
      }
      try {
        await createComment({ 
          content: newComment, 
          post: post._id 
        });
        setNewComment("");
        fetchComments(post._id);
      }
      catch (error) {
        console.error("Failed to create comment:", error);
      }
   }

  const handleClose = () => {
    setShowDetails(false);
    if (userInfo) {
      if (friendId) {
        getPosts(friendId);
      } else {
        getPosts();
      }
    }
  };
 

  return (
    <div className="mainDetailsContainer">
      <div className="detailsContainer">
        <div className="mediaContainer">
          {post.media ? (
            (() => {
              const mediaUrl = post.media;
              const mediaType = mediaUrl.split(".").pop().toLowerCase();

              if (["jpg", "jpeg", "png", "webp", "gif"].includes(mediaType)) {
                return (
                  <img
                    src={mediaUrl}
                    alt="Post media"
                    className="postMediaImage"
                  />
                );
              } else if (["mp4", "webm", "mov"].includes(mediaType)) {
                return (
                  <video src={mediaUrl} controls className="postMediaVideo" />
                );
              } else {
                return <p>{post.content}</p>;
              }
            })()
          ) : (
            <p>{post.content}</p>
          )}
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
                <img src={post.author.avatar}></img>
              </div>
              <p>@{post.author.username}</p>
            </div>

            <div className="bottomText">
              <h3 className="commentsTitle">Comments</h3>
              <div className="commentsContainer">
                {comments?.length === 0 ? (
                  <p className="noCommentsText">
                    No comments for this post yet
                  </p>
                ) : (
                  comments?.map((comment) => (
                    <div className="singleComment" key={comment._id}>
                      <div className="commentAuthorAvatar">
                        <img src={comment.author.avatar} alt=" user avatar" />
                      </div>
                      <div className="commentInfo">
                        <div className="commentAuthorName">
                          <strong>
                            @{comment?.author?.username || "Unknown User"}
                          </strong>
                        </div>
                        <div className="commentDate">
                          {formatDate(comment.createdAt)}
                        </div>
                      </div>
                      <div className="comment">
                        <p>{comment?.content || "No Content"}</p>
                      </div>
                    </div>
                  ))
                )}
                
              </div>
              <form className="commentInput" onSubmit={handleCreateComment}>
                <textarea
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button className="commentButton" type="submit">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
