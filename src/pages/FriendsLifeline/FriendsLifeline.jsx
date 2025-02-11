import './friendsLifeline.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { alwaysScrollToTop } from '../../utils/functions';
import Header from '../../components/Header/Header';
import Timeline from '../../components/Timeline/Timeline';
import { useAuthStore } from '../../stores/authStore';
import { useUserStore } from '../../stores/userStore';

export default function FriendsLifeline() {
  const { getUserProfile } = useUserStore();
  const { friendId } = useParams(); // Get the friend's ID from the URL
  const [friend, setFriend] = useState(null); // State to store the friend's profile data

    useEffect(() => {
      alwaysScrollToTop();
      if (friendId) {
        getUserProfile(friendId)
          .then((response) => {
            console.log("Fetched profile:", response.data); // Debugging: Log the fetched profile
            setFriend(response.data); // Store the friend's profile data in the state
          })
          .catch((error) => {
            console.error("Failed to fetch friend's profile:", error);
          });
      }
    }, [friendId, getUserProfile]);

     if (!friend) {
       return <div>Loading...</div>; // Show a loading message while fetching data
     }


  return (
    <>
      <Header
        title={`${friend.first_name} ${friend.last_name}'s Lifeline`}
        subtitle={`@${friend.username}`}
        showLogo={false}
        showButton={false}
        headerHeight="720px"
        headerTitleMargin="220px 200px"
        headerTitleWidth="100%"
      />
      <Timeline friendId={friendId} />{" "}

    </>
  );
}