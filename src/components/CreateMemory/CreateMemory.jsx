import { IoMdClose } from "react-icons/io";
import "./createMemory.css";
import { useState } from "react";
import { usePostStore } from "../../stores/postStore";
import { ToastContainer, toast } from "react-toastify";

export default function CreateMemory({onClose}) {
  const { createPost, getPosts, uploadPostMedia } = usePostStore();

  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const success = () => toast.success("Memory created successfully!");
  const error = () => toast.error("Failed to create memory");


   const onMediaChange = (event) => {
     if (event.target.files && event.target.files[0]) {
       const file = event.target.files[0];
       const fileURL = URL.createObjectURL(file);

       if (file.type.startsWith("image/")) {
         setMediaType("image");
       } else if (file.type.startsWith("video/")) {
         setMediaType("video");
       }
       setMediaPreview(fileURL);
       setSelectedFile(file);
     }
   };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        // Step 1: Create the post without media
        const newPost = await createPost({ title, content, date });

        console.log("Response from createPost:", newPost); // Debugging

        // Vérifie si newPost est valide
        if (!newPost || !newPost._id) {
          throw new Error("Invalid response from createPost");
        }

        // Step 2: Get the post ID from the response
        const postId = newPost._id; // Assure-toi que le backend retourne bien _id

        // Step 3: Upload the media using the post ID
        if (selectedFile) {
          const formData = new FormData();
          formData.append("media", selectedFile);
          await uploadPostMedia(postId, formData);
        }

        // Close the modal after successful creation
        onClose();
        success();
      } catch (error) {
        error();
        console.error("Failed to create post or upload media:", error);
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
