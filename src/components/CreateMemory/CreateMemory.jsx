import { IoMdClose } from "react-icons/io";
import "./createMemory.css";
import { useState } from "react";
import { usePostStore } from "../../stores/postStore";
import { toast } from "react-toastify";

export default function CreateMemory({ onClose }) {
  const { createPost, uploadPostMedia, getPosts } = usePostStore();

  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Notification messages
  const success = () => toast.success("Memory created successfully!");
  const Error = () => toast.error("Failed to create memory");

  // Function to handle the media change
  const onMediaChange = (event) => {
    // Check if a file was selected
    if (event.target.files && event.target.files[0]) {
      // Get the file and create a URL for preview
      const file = event.target.files[0];
      const fileURL = URL.createObjectURL(file);

      // Check if the file is an image or video
      if (file.type.startsWith("image/")) {
        setMediaType("image");
      } else if (file.type.startsWith("video/")) {
        setMediaType("video");
      }
      // Set the preview and selected file
      setMediaPreview(fileURL);
      setSelectedFile(file);
    }
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the post without media
      const newPost = await createPost({ title, content, date });

      // Check if newPost is valid
      if (!newPost || !newPost._id) {
        throw new Error("Invalid response from createPost.");
      }
      // Get the post ID
      const postId = newPost._id

      // Upload the media using the post ID
      if (selectedFile) {
        // Create a FormData object and append the media file for Cloudinary
        const formData = new FormData();
        formData.append("media", selectedFile);
        await uploadPostMedia(postId, formData);
      }

      // Fetch the updated posts after media upload
      await getPosts();

      // Close the modal after successful creation
      onClose();
      success();
    } catch (error) {
      Error();
      setErrorMsg("Failed to create post or upload media.");
    }
  };

  return (
    <div className="backgroundBlur">
      <div className="createContainer">
        <div className="closeFlex">
          <div className="createCloseModal">
            <IoMdClose className="createClose" onClick={onClose} />
          </div>
        </div>

        <div className="createTitleContainer">
          <h2>New Memory</h2>
          <p>Post a new memory on your timeline here.</p>
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        </div>
        <form onSubmit={handleSubmit} className="createMemoryForm">
          <div className="createLeft">
            <p className="createLabels">Add a photo or video</p>
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
              placeholder="dd.mm.yyyy"
              value={date}
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
              className="createContent"
              name="content"
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <button className="createButton" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}