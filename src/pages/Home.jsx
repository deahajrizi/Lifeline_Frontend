import { useEffect } from "react";
import Header from "../components/Header/Header";
import Timeline from "../components/Timeline/Timeline";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { alwaysScrollToTop } from "../utils/functions";

export default function Home() {
  const { userInfo } = useAuthStore();
  const { getUserProfile, user } = useUserStore();
  useEffect(() => {
    alwaysScrollToTop()
    if (userInfo && userInfo._id) {
      getUserProfile(userInfo._id);
    }
    
  }, [userInfo, user]);

  return (
    <div>
      {userInfo ? (
        <Header
          title={`Welcome back ${user.first_name}`}
          subtitle="Reminisce on your favorite memories and share them with your loved ones."
          showLogo={false}
          showButton={true}
          headerHeight="720px"
          headerTitleMargin="220px auto"
          headerTitleWidth="100%"
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
