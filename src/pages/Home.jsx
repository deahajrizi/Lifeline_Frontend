import Header from "../components/Header/Header";
import Timeline from "../components/Timeline/Timeline";


export default function Home() {
  return (
    <div>
      <Header
        title="Welcome to"
        subtitle="Reminisce on your favorite memories and share them with your loved ones."
        showLogo={true}
        showButton={true}
        headerHeight="740px"
        headerTitleMargin="220px auto"
      />
      <Timeline />
    </div>
  );
}
