import { useAuthStore } from "../../stores/authStore";
import { usePostStore } from "../../stores/postStore";
import Memory from "../Memory/Memory";
import MemoryDetails from "../MemoryDetails/MemoryDetails";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./timeline.css";
import { useEffect, useState } from "react";

export default function Timeline() {
  const [showDetails, setShowDetails] = useState(false); // Memory Details Modal
  const { posts, loading, error, getPosts } = usePostStore(); // Fetch posts from the store
  const { userInfo } = useAuthStore();
    // Fake posts to display when the user isn't logged in
  const fakePosts = [
    { id: 1, title: "First Memory", date: "01.01.2021", media: "fake-image1.jpg" },
    { id: 2, title: "Second Memory", date: "15.03.2021", media: "fake-image2.jpg" },
    { id: 3, title: "Third Memory", date: "22.06.2021", media: "fake-image3.jpg" },
  ];

  useEffect(() => {
    if(userInfo){
    getPosts();

    }
  }, [getPosts]);

  return (
    <>
      <div className="timelineContainer">
        {showDetails && <MemoryDetails setShowDetails={setShowDetails} />}

        {/* Left Memory Container */}
        <div className="leftMemoryContainer">
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : userInfo ? (
            // If user is logged in, show their posts
            posts.map((post, index) => {
              console.log(post.id);
              if (index % 2 === 0) {
                return (
                  <Memory
                    key={post.id}
                    post={post}
                    className="leftMemory"
                    onClick={() => setShowDetails(!showDetails)} // Toggle Memory Details modal
                  />
                );
              }
              return null; // Do not render anything for right-side posts here
            })
          ) : (
            // If user is not logged in, show fake posts
            fakePosts.map((post, index) => {
              if (index % 2 === 0) {
                return (
                  <Memory
                    key={post.id}
                    post={post}
                    className="leftMemory"
                    onClick={() => setShowDetails(!showDetails)} // Toggle Memory Details modal
                  />
                );
              }
              return null; // Do not render anything for right-side posts here
            })
          )}
        </div>

        {/* Progress Bar */}
        <ProgressBar />

        {/* Right Memory Container */}
        <div className="rightMemoryContainer">
          {userInfo
            ? // If user is logged in, show their posts
              posts.map((post, index) => {
                if (index % 2 !== 0) {
                  return (
                    <Memory
                      key={post.id}
                      post={post}
                      className="rightMemory"
                      onClick={() => setShowDetails(!showDetails)} // Toggle Memory Details modal
                    />
                  );
                }
                return null; // Do not render anything for left-side posts here
              })
            : // If user is not logged in, show fake posts
              fakePosts.map((post, index) => {
                if (index % 2 !== 0) {
                  return (
                    <Memory
                      key={post.id}
                      post={post}
                      className="rightMemory"

                      onClick={() => setShowDetails(!showDetails)} // Toggle Memory Details modal
                    />
                  );
                }
                return null; // Do not render anything for left-side posts here
              })}
        </div>
      </div>
    </>
  );
}
