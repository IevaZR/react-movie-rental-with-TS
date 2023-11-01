import React, { useEffect } from "react";
import "./HomePage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import AvailableMoviesTable from "../../Components/AvailableMoviesTable/AvailableMoviesTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CurrentUser } from "../../Types/types";
import { UserRootState } from "../../Types/types";

const HomePage = () => {
  const currentUser: CurrentUser = useSelector(
    (state:UserRootState) => state.user.currentUser
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    console.log(currentUser);
  });

  return (
    <div className="HomePageWrapper">
      <Header />
      <div className="HomePageMainSectionWrapper">
        <div className="HomePageMainSection">
          <h2 className="HomePageMainSectionHeading">Available Movies</h2>
          <AvailableMoviesTable currentUser={currentUser} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
