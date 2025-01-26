import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

import "./redirect.css";


export default function Redirect() {
  return (
    <>
      <Header
        title="Sorry !"
        subtitle="404 - Page cannot be found"
        showLogo={false}
        showButton={false}
        headerHeight="1000px"
        headerTitleMargin="150px auto 0"
      />
      <div className="redirect">
        <div className="redirectButtonContainer">
          <Link to={"/"}  className="redirectButton">Go back to homepage</Link>
        </div>
      </div>
    </>
  );
}
