import { usePostStore } from "../../stores/postStore";
import "./DeleteMemory.css";
import { toast } from "react-toastify";

export default function DeleteMemory({ postId, setShowDeleteMemory, setShowEditMemory }) {
  const { deletePost, getPosts} = usePostStore();
  const success = () => toast.success("Memory deleted successfully!");


  const handleDelete = async (e) => {
    e.preventDefault();
    await deletePost(postId);
    setShowDeleteMemory(false);
    setShowEditMemory(false);
    getPosts();
    success();
  };
  const handleClose = () => {
    setShowDeleteMemory(false);
  };
  return (
    <div className="backgroundBlurDelete">
      <div className="deleteContainer">
        <div className="deleteTitleContainer">
          <h2>Delete Memory</h2>
          <p>Are you sure you want to delete this memory?</p>
        </div>
        <div className="deleteButtons">
          <button className="deleteButtonEdit" onClick={handleDelete}>
            Delete
          </button>
          <button className="cancelButton" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
