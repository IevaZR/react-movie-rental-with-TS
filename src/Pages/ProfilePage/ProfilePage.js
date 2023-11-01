import React, { useEffect } from "react";
import "./ProfilePage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Profile from "../../Components/Profile/Profile";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const currentUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  });

  return (
    <div className="ProfilePageWrapper">
      <Header />
      <div className="ProfilePageMainSectionWrapper">
        <div className="ProfilePageMainSection">
          <h2 className="ProfilePageMainSectionHeading">Profile</h2>
          <Profile currentUser={currentUser}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
