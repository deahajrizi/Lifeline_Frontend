import { useEffect } from "react";
import Header from "../components/Header/Header";
import Timeline from "../components/Timeline/Timeline";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";



export default function Home() {
  const {getUserProfile, user} = useUserStore()
  const {userInfo} = useAuthStore()

  
  console.log(userInfo)
  useEffect(() => {
    getUserProfile(userInfo.user._id)
    console.log("User",user)
  }, [])
  return (
    <div>
      {userInfo ? (
        <Header
          title={`Welcome back ${userInfo.user.username}`}
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
