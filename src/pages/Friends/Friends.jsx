import { useState } from "react";
import Header from "../../components/Header/Header";
import { useUserStore } from "../../stores/userStore";
import "./friends.css";

export default function Friends() {
    const [friendUsername, setFriendUsername] = useState("");
    const {addFriend, loading, error ,success} = useUserStore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addFriend(friendUsername);
        if (success) {
            console.log("Friend added");
        }
    };
  return (
    <>
      <Header
        title="My Friends"
        subtitle="Share your memories with your friends and family."
        showLogo={false}
        showButton={false}
        headerHeight="280px"
        headerTitleMargin="150px auto 0"
      />
      <div className="friendsContainer">
        <form className="friendsForm" onSubmit={handleSubmit}>
          <label>Add a friend</label>
          <input
            type="text"
            placeholder="Enter friend username"
            value={friendUsername}
            onChange={(e) => setFriendUsername(e.target.value)}
            required
          />
          <button>Add</button>
        </form>
        <div className="friendsList">
          <div className="friend">
            <img src=""></img>
            <p className="friendName">Layla King</p>
            <p className="friendUsername">@Layla12</p>
          </div>
          <div className="friend">
            <img src=""></img>
            <p className="friendName">Sam Dun</p>
            <p className="friendUsername">@samdun213</p>
          </div>
          <div className="friend">
            <img src=""></img>
            <p className="friendName">Jon Maverick</p>
            <p className="friendUsername">@JonMav</p>
          </div>
        </div>
      </div>
    </>
  );
}
