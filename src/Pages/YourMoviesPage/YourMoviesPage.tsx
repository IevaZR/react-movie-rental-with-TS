import React, { useEffect } from "react";
import "./YourMoviesPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import YourMoviesTable from "../../Components/YourMoviesTable/YourMoviesTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserRootState } from "../../Types/types";

const YourMoviesPage = () => {
  const currentUser = useSelector((state:UserRootState) => state.user.currentUser)
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  });
  return (
    <div className="YourMoviesPageWrapper">
      <Header />
      <div className="YourMoviesPageMainSectionWrapper">
        <div className="YourMoviesPageMainSection">
          <h2 className="YourMoviesPageMainSectionHeading">Your Movies</h2>
          <YourMoviesTable currentUser={currentUser}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YourMoviesPage;
