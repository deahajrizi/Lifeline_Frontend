import { IoMdClose } from "react-icons/io";
import "./createMemory.css";
import { useState } from "react";
import { usePostStore } from "../../stores/postStore";

export default function CreateMemory({onClose}) {
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [media, setMedia] = useState("")

  const { createPost } = usePostStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
      date,
    };

    await createPost(data); // Call the post store function
    onClose()
  };

  //Media preview
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
              {" "}
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
