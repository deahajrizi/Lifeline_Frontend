import { useAuthStore } from "../../stores/authStore";
import { usePostStore } from "../../stores/postStore";
import Memory from "../Memory/Memory";
import MemoryDetails from "../MemoryDetails/MemoryDetails";
import EditMemory from "../EditMemory/EditMemory";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./timeline.css";
import { useEffect, useState } from "react";

export default function Timeline({friendId}) {
  const [showDetails, setShowDetails] = useState(false); // Memory Details Modal
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditMemory, setShowEditMemory] = useState(false);
  const { posts, loading, error, getPosts, getSinglePost } = usePostStore(); // Fetch posts from the store
  const { userInfo } = useAuthStore();
  // Fake posts to display when the user isn't logged in
  const fakePosts = [
    {_id: 1,title: "First Memory", content: "fake content here", date: "01.01.2021",media: "fake-image1.jpg",},
    {_id: 2,title: "Second Memory", content: "fake content here", date: "04.01.2020",media: "fake-image2.jpg",},
    {_id: 3,title: "Third Memory", content: "fake content here", date: "02.22.2020",media: "fake-image3.jpg", },
  ];

  useEffect(() => {
    if (userInfo) {
      if(friendId){
        getPosts(friendId);
      } else {
      getPosts();
      }
    }
  }, [getPosts, friendId, userInfo]);

  const handleShowDetails = async (post) => {
    if (userInfo) {
      const fetchedPost = await getSinglePost(post._id);
      setSelectedPost(fetchedPost);
      setSelectedPost(post);
      setShowDetails(true);
    } 
  };

  const handleEdit = () => {
    setShowDetails(false);
    setShowEditMemory(true);
  }

  return (
    <>
      <div className="timelineContainer">
        {showDetails && selectedPost && (
          <MemoryDetails post={selectedPost} friendId={friendId} setShowDetails={setShowDetails} handleEdit={handleEdit}/>
        )}
         {showEditMemory && selectedPost && (
          <EditMemory postId={selectedPost._id} setShowEditMemory={setShowEditMemory} />
        )}

        {/* Left Memory Container */}
        <div className="leftMemoryContainer">
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : userInfo ? (
            // If user is logged in, show their posts
            posts.map((post, index) => {
              if (index % 2 === 0) {
                return (
                  <Memory
                    key={post._id}
                    post={post}
                    className="leftMemory"
                    onClick={() => handleShowDetails(post)} // Toggle Memory Details modal
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
                    key={post._id}
                    post={post}
                    className="leftMemory"
                    onClick={() => handleShowDetails(post)} // Toggle Memory Details modal
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
                      key={post._id}
                      post={post}
                      className="rightMemory"
                      onClick={() => handleShowDetails(post)} // Toggle Memory Details modal
                      
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
                      key={post._id}
                      post={post}
                      className="rightMemory"
                      onClick={() => handleShowDetails(post)} // Toggle Memory Details modal
                
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
