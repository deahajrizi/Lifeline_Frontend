import { useEffect } from "react";
import Header from "../components/Header/Header";
import Timeline from "../components/Timeline/Timeline";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import CreateMemory from "../components/CreateMemory/CreateMemory";


export default function Home() {

  const {userInfo} = useAuthStore()
  const {getUserProfile, user} = useUserStore()
  
   useEffect(() => {
     if (userInfo && userInfo._id) {
       getUserProfile(userInfo._id);
     }
   }, [userInfo, user]);


  return (
    <div>
      <CreateMemory />
      {userInfo ? (
        <Header
          title={`Welcome back ${user?.username || 'inconnu'}`}
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
