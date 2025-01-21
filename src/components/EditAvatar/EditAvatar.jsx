import "./editAvatar.css";
import defaultAvatar from "../../assets/avatar.jpeg";
import AvatarEditor from "react-avatar-editor";

export default function EditAvatar({ avatar, editorRef, isEditing }) {
  return (
    <>
      <div className="avatar">
        {isEditing ? (
          <AvatarEditor
            className="avatarEditor"
            ref={editorRef} // Attach the ref to access methods like getImageScaledToCanvas
            image={defaultAvatar}
            width="100"
            height="100"
            borderRadius="150"
          />
        ) : (
          <img
            src={avatar || defaultAvatar}
            className="avatarImg"
            alt="User Avatar"
          ></img>
        )}
      </div>
    </>
  );
}
