import { IoMdClose } from "react-icons/io";
import "./EditMemory.css";
import { useEffect, useState } from "react";
import { usePostStore } from "../../stores/postStore";
import { useAuthStore } from "../../stores/authStore";
import { formatDateInput } from "../../utils/functions";
import DeleteMemory from "../DeleteMemory/DeleteMemory";
import {  toast } from "react-toastify";

export default function EditMemory({ postId, setShowEditMemory }) {
  const { getPosts } = usePostStore();
  const { userInfo } = useAuthStore();
  const { updatePost, getSinglePost, uploadPostMedia } = usePostStore();
  const success = () => toast.success("Memory updated successfully!");
  const error = () => toast.error("Failed to update memory");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [ showDeleteMemory, setShowDeleteMemory] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    getSinglePost(postId).then((post) => {
      setTitle(post.title);
      setContent(post.content);
      setDate(formatDateInput(post.date));
      if (post.media) {
        setMediaPreview(post.media);
        const mediaType = post.media.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "webp", "gif"].includes(mediaType)) {
          setMediaType("image");
        } else if (["mp4", "webm", "mov"].includes(mediaType)) {
          setMediaType("video");
        }
      }
    });
  }, [getSinglePost, postId]);

  // Media preview when editing
  const onMediaChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileURL = URL.createObjectURL(file);

      // Check if the file is an image or video
      if (file.type.startsWith("image/")) {
        setMediaType("image");
      } else if (file.type.startsWith("video/")) {
        setMediaType("video");
      }
      setMediaPreview(fileURL);
      setSelectedFile(file);
    }
  };

  const handleClose = () => {
    setShowEditMemory(false);
    if (userInfo) {
      getPosts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      content,
      date,
    };

    try {
      // Update the post content
      await updatePost(postId, data);

      // Upload the media if a new file is selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("media", selectedFile);
        await uploadPostMedia(postId, formData);
      }

      // Close the modal after successful update
      handleClose();
      success();
    } catch (error) {
      error()
      console.error("Failed to update post or upload media:", error);
    }
  };

 
  const handleShowDeleteMemory = (e) => {
    e.preventDefault();
    setShowDeleteMemory(true);
  }

  return (
    <div className="backgroundBlur">
      <div className="createContainer">
        <div className="closeFlex">
          <div className="createCloseModal">
            <IoMdClose className="createClose" onClick={handleClose} />
          </div>
        </div>

        <div className="createTitleContainer">
          <h2>Edit Memory</h2>
          <p>Edit your memory from your timeline here.</p>
        </div>
        <form className="createMemoryForm" onSubmit={handleSubmit}>
          <div className="createLeft">
            <p className="createLabels">Update a photo or video</p>
            <input
              className="mediaInput"
              name="media"
              id="media"
              type="file"
              accept="image/*, video/*"
              onChange={onMediaChange}
            ></input>

            <label className="mediaLabel createLabels" htmlFor="media">
              {mediaPreview ? (
                mediaType === "image" ? (
                  <img
                    className="mediaPreview"
                    src={mediaPreview}
                    alt="Preview"
                  />
                ) : (
                  <video
                    className="mediaPreview"
                    src={mediaPreview}
                    autoPlay
                    loop
                  />
                )
              ) : (
                <div className="plus">
                  <p>+</p>
                </div>
              )}
            </label>

            <label className="createLabels" htmlFor="date">
              Date*
            </label>
            <input
              className="createDate"
              name="date"
              type="date"
              value={formatDateInput(date)}
              required
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>

          <div className="createRight">
            <label className="createLabels" htmlFor="title">
              Title*
            </label>
            <input
              className="createTitle"
              name="title"
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            ></input>

            <label className="createLabels" htmlFor="content" required>
              Description*
            </label>
            <textarea
              type="text"
              className="createContent"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <button className="createButton" type="submit">
              Save
            </button>
            <button className="deleteButton" onClick={handleShowDeleteMemory}>
              Delete
            </button>
          </div>
        </form>
      </div>
      {showDeleteMemory && (
        <DeleteMemory
          postId={postId}
          setShowDeleteMemory={setShowDeleteMemory}
          setShowEditMemory={setShowEditMemory}
        />
      )}
    </div>
  );
}
