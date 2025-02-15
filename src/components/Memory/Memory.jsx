import "./memory.css"
import { formatDate } from "../../utils/functions";

export default function Memory({className,post, onClick}) {
  
  return (
    <div className={`memoryContainer ${className}`} onClick={onClick}>
      <div className="memoryTitle">
        <p>{post.title}</p>
      </div>
      <div className="memoryMedia">
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
                <video src={mediaUrl} autoPlay loop muted className="postMediaVideoMemory" />
              );
            } else {
              return <p>{post.content}</p>;
            }
          })()
        ) : (
          <p>{post.content}</p>
        )}
      </div>
      <div className="memoryDate">{formatDate(post.date)}</div>
    </div>
  );
}