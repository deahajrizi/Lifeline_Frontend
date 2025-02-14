import { useAuthStore } from "../../stores/authStore";
import { usePostStore } from "../../stores/postStore";
import Memory from "../Memory/Memory";
import MemoryDetails from "../MemoryDetails/MemoryDetails";
import EditMemory from "../EditMemory/EditMemory";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./timeline.css";
import { useEffect, useState } from "react";
import fakeImage1 from "../../assets/fake-image1.jpeg";
import fakeImage2 from "../../assets/fake-image-2.jpeg";
import fakeImage3 from "../../assets/fake-image-3.jpeg";


export default function Timeline({friendId}) {
  const [showDetails, setShowDetails] = useState(false); // Memory Details Modal
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditMemory, setShowEditMemory] = useState(false);
  const { posts, loading, error, getPosts, getSinglePost } = usePostStore(); // Fetch posts from the store
  const { userInfo } = useAuthStore();
  // Fake posts to display when the user isn't logged in
  const fakePosts = [
    {_id: 1,title: "First Memory", content: "Lalalala", date: "01.01.2021",media: fakeImage1},
    {_id: 2,title: "Second Memory", content: "Beeeep", date: "04.01.2020",media: fakeImage2},
    {_id: 3,title: "Third Memory", content: "Boooop", date: "02.22.2020",media: fakeImage3 },
  ];
  const filteredPosts = friendId 
  ? posts.filter(post => post.author === friendId) // Show only friend's posts
  : posts.filter(post => post.author === userInfo.user._id); // Show only your own posts


  useEffect(() => {
    if (userInfo) {
      usePostStore.setState({ posts: [] }); // Clear posts immediately
      if (friendId) {
        // Fetch posts for the friend only
        getPosts(friendId);
      } else {
        // Fetch posts for the logged-in user only (Jamie in your case)
        getPosts(userInfo._id);
      }
    }
  }, [getPosts, friendId, userInfo]);

  const handleShowDetails = async (post) => {
    if (userInfo) {
      const fetchedPost = await getSinglePost(post._id);
      setSelectedPost(fetchedPost);
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
          <MemoryDetails
            post={selectedPost}
            friendId={friendId || null}
            setShowDetails={setShowDetails}
            handleEdit={handleEdit}
          />
        )}
        {showEditMemory && selectedPost && (
          <EditMemory
            postId={selectedPost._id}
            setShowEditMemory={setShowEditMemory}
          />
        )}

        {/* Left Memory Container */}
        <div className="leftMemoryContainer">
          {loading ? (
            <p className="postMessage">Loading posts...</p>
          ) : error || filteredPosts.length === 0 ? (
            <p className="postMessage">No posts found.</p>
          ) : (
            filteredPosts.map((post, index) => {
              if (index % 2 === 0) {
                return (
                  <Memory
                    key={post._id}
                    post={post}
                    className="leftMemory"
                    onClick={() => handleShowDetails(post)}
                  />
                );
              }
              return null;
            })
          )}
        </div>

        {/* Progress Bar */}
        <ProgressBar />

        {/* Right Memory Container */}
        <div className="rightMemoryContainer">
          {loading ? (
            <p className="postMessage">Loading posts...</p>
          ) : error || filteredPosts.length === 0 ? (
            <p className="postMessage">No posts found.</p>
          ) : (
            filteredPosts.map((post, index) => {
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
          )}
        </div>
      </div>
    </>
  );
}
