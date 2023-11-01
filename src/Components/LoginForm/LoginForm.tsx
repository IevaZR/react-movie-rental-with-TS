import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/userSlice";
import { UserRootState } from "../../Types/types";

const LoginForm = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  
  const [loginErrorMsg, setLoginErrorMsg] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((state:UserRootState) => state.user.currentUser)

  const handleInputData = (event) => {
    setInputData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginUser = () => {
    const user = {
      email: inputData.email,
      password: inputData.password,
    };

    const userData = JSON.parse(localStorage.getItem("react-movie-rental-users"));
    if (userData) {
      const userFound = userData.some((item) => item.email === user.email);
      if (userFound) {
        const matchedUser = userData.find((item) => item.email === user.email);
        if (matchedUser.password === user.password) {
          dispatch(setCurrentUser(matchedUser))
          navigate('/home-page')
          console.log(matchedUser)
          console.log(currentUser)
        } else {
          setLoginErrorMsg(true);
        }
      } else {
        setLoginErrorMsg(true);
      }
    } else {
      alert("Please register");
    }
  };

  return (
    <form className="LoginPageFormWrapper">
      <label className="LoginPageFormLabel">Email</label>
      <input
        type="email"
        placeholder="email"
        className="LoginPageInput"
        id="loginEmail"
        name="email"
        onChange={handleInputData}
      />
      <label className="LoginPageFormLabel">Password</label>
      <input
        type="password"
        placeholder="password"
        className="LoginPageInput"
        id="loginPassword"
        name="password"
        onChange={handleInputData}
      />
      {loginErrorMsg && (
        <p className="LoginPageValidErrMsg" id="LoginUnsuccessful">
          Incorrect email or password
        </p>
      )}
      <button
        type="button"
        className="BlackButton Centered"
        onClick={handleLoginUser}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
