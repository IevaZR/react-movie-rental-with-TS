import React, { useEffect } from "react";
import "./LoginPage.css";
import Footer from "../../Components/Footer/Footer";
import LoginForm from "../../Components/LoginForm/LoginForm";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserRootState } from "../../Types/types";


const LoginPage = () => {
  const currentUser = useSelector((state: UserRootState) => state.user.currentUser)
  const navigate = useNavigate();
 

  useEffect(() => {
    if (currentUser) {
      navigate("/home-page");
    }
  });

  return (
    <div className="LoginPageWrapper">
      <h1 className="LoginPageHeading">Movie Rental</h1>
      <LoginForm />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
