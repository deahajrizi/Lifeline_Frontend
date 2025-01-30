import { IoMdClose } from "react-icons/io";
import "./createMemory.css";
import { useState } from "react";

export default function CreateMemory({onClose}) {
   const [mediaPreview, setMediaPreview] = useState(null);
   const [mediaType, setMediaType] = useState(""); 

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
          <div className="createCloseModal" >
            <IoMdClose className="createClose" onClick={onClose} />
          </div>
        </div>

        <div className="createTitleContainer">
          <h2>New Memory</h2>
          <p>Post a new memory on your timeline here.</p>
        </div>
        <form className="createMemoryForm">
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

            <label className="createLabels" for="date">
              {" "}
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
            <label className="createLabels" for="title">
              Title*
            </label>
            <input
              className="createTitle"
              name="title"
              type="text"
              required
            ></input>

            <label className="createLabels" for="content" required>
              Description*
            </label>
            <textarea className="createContent" name="content"></textarea>

            <button className="createButton" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
