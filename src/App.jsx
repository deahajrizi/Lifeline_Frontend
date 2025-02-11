import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Redirect from "./pages/Redirect/Redirect";
import Friends from "./pages/Friends/Friends";
import FriendsLifeline from "./pages/FriendsLifeline/FriendsLifeline";



function App() {
  
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friendsLifeline/:friendId" element={<FriendsLifeline />} />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
