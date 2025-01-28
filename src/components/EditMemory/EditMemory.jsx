import { IoMdClose } from "react-icons/io";
import "./EditMemory.css";
import { useState } from "react";

export default function EditMemory() {

    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(""); // "image" or "video"

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
      }
    };

  return (
    <div className="backgroundBlur">
      <div className="createContainer">
        <div className="closeFlex">
          <div className="createCloseModal">
            <IoMdClose className="createClose" />
          </div>
        </div>

        <div className="createTitleContainer">
          <h2>Edit Memory</h2>
          <p>Edit your memory from your timeline here.</p>
        </div>
        <form className="createMemoryForm">
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
                  <video className="mediaPreview" src={mediaPreview} autoPlay loop />
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
              required
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
              required
            ></input>

            <label className="createLabels" htmlFor="content" required>
              Description*
            </label>
            <textarea className="createContent" name="content"></textarea>

            <button className="createButton" type="submit">
              Save
            </button>
            <button className="deleteButton">Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}
