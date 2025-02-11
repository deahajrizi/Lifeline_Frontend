import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useUserStore } from "../../stores/userStore";
import "./friends.css";
import { useNavigate } from "react-router-dom";

export default function Friends() {
    const [friendUsername, setFriendUsername] = useState("");
    const {addFriend, getFriendsProfiles, friendsProfiles, loading, error ,success} = useUserStore()
    const navigate = useNavigate();

    useEffect(() => {
        getFriendsProfiles();
    }, [getFriendsProfiles]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addFriend(friendUsername);
        if (success) {
            console.log("Friend added");
            await getFriendsProfiles();
            setFriendUsername("")
        }
    };

    const showFriendLifeline = (friendId) => {
      navigate(`/friendsLifeline/${friendId}`);
    }


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
          {friendsProfiles.map((friend) => (
            <div className="friend" key={friend._id} onClick={() => showFriendLifeline(friend._id)}>
              <img src={friend.avatar} alt={`${friend.username}'s profile`} />
              <p className="friendName">
                {friend.first_name} {friend.last_name}
              </p>
              <p className="friendUsername">@{friend.username}</p>
            </div>
          ))}
          
        </div>
      </div>
    </>
  );
}
