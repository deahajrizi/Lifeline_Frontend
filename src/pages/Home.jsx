import { useEffect } from "react";
import Header from "../components/Header/Header";
import Timeline from "../components/Timeline/Timeline";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";


export default function Home() {

  const {userInfo} = useAuthStore()
  const {getUserProfile, user} = useUserStore()
   useEffect(() => {
    console.log("userInfo:",userInfo, "userInfoID:", userInfo?._id)
    console.log(document.cookie); // Check if JWT is in the cookies

     if (userInfo && userInfo._id) {
      console.log("Hello")
       getUserProfile(userInfo._id);
     }
   }, [userInfo, user]);


  return (
    <div>
      {userInfo ? (
        <Header
          title={`Welcome back ${user.username}`}
          subtitle="Reminisce on your favorite memories and share them with your loved ones."
          showLogo={false}
          showButton={false}
          headerHeight="740px"
          headerTitleMargin="220px auto"
        />
      ) : (
        <Header
          title="Welcome to"
          subtitle="Reminisce on your favorite memories and share them with your loved ones."
          showLogo={true}
          showButton={true}
          headerHeight="740px"
          headerTitleMargin="220px auto"
        />
      )}

      <Timeline />
    </div>
  );
}