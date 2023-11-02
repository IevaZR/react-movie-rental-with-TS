import React, { useState } from "react";
import "./RegisterForm.css";
import { CurrentUser } from "../../Types/types";

const RegisterForm = () => {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email1: "",
    email2: "",
    password1: "",
    password2: "",
  });
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(false);
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState(false);
  const [emailOneValidErrorMsg, setEmailOneValidErrorMsg] = useState(false);
  const [emailTwoValidErrorMsg, setEmailTwoValidErrorMsg] = useState(false);
  const [emailOneMatchErrorMsg, setEmailOneMatchErrorMsg] = useState(false);
  const [emailTwoMatchErrorMsg, setEmailTwoMatchErrorMsg] = useState(false);
  const [emailOneDuplicateErrorMsg, setEmailOneDuplicateErrorMsg] =
    useState(false);
  const [passwordOneTooShortErrorMsg, setPasswordOneTooShortErrorMsg] =
    useState(false);
  const [passwordTwoTooShortErrorMsg, setPasswordTwoTooShortErrorMsg] =
    useState(false);
  const [passwordOneMatchErrorMsg, setPasswordOneMatchErrorMsg] =
    useState(false);
  const [passwordTwoMatchErrorMsg, setPasswordTwoMatchErrorMsg] =
    useState(false);

  const handleInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const getUsers = () => {
    const usersData = localStorage.getItem("react-movie-rental-users")
    let users;
    if(usersData) {
      users = JSON.parse(usersData) 
    }
    return users
  }

  const addUser = (name: string, surname:string, email:string, password:string) => {
    const newUserToAdd = {
      id: Math.floor(Math.random() * 100000),
      firstName: name,
      lastName: surname,
      email: email,
      password: password,
      rentedMovies: [],
    };
    
    let users = getUsers()

    if (!Array.isArray(users)) {
      users = [];
    }
    const updatedUsers = [...users, newUserToAdd];

    localStorage.setItem(
      "react-movie-rental-users",
      JSON.stringify(updatedUsers)
    );
  };

  function validRegisterName() {
    if (inputData.firstName.length <= 2) {
      setFirstNameErrorMsg(true);
      return false;
    } else {
      setFirstNameErrorMsg(false);
      return true;
    }
  }

  function validRegisterSurname() {
    if (inputData.lastName.length <= 1) {
      setLastNameErrorMsg(true);
      return false;
    } else {
      setLastNameErrorMsg(false);
      return true;
    }
  }

  function registerEmailMatch() {
    if (inputData.email1 === inputData.email2) {
      setEmailOneMatchErrorMsg(false);
      setEmailTwoMatchErrorMsg(false);
      return true;
    } else {
      setEmailOneMatchErrorMsg(true);
      setEmailTwoMatchErrorMsg(true);
    }
  }

  function emailMatch() {
    const userData = getUsers();

    if(!userData) {
      return false
    }

    const emailFound = userData.some((item:CurrentUser) => item.email === inputData.email1);

    if (emailFound) {
      setEmailOneDuplicateErrorMsg(true);
      setEmailOneValidErrorMsg(false);
      setEmailOneMatchErrorMsg(false);
    }

    return emailFound;
  }

  function validRegisterEmail() {
    const emailFound = emailMatch();
    if (!emailFound) {
      setEmailOneDuplicateErrorMsg(false);
      const validEmailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (inputData.email1.match(validEmailRegex) && registerEmailMatch()) {
        setEmailOneValidErrorMsg(false);
        setEmailTwoValidErrorMsg(false);
        return true;
      } else if (
        inputData.email1.match(validEmailRegex) &&
        !registerEmailMatch()
      ) {
        setEmailOneValidErrorMsg(false);
        setEmailTwoValidErrorMsg(false);
      } else {
        setEmailOneValidErrorMsg(true);
        setEmailTwoValidErrorMsg(true);
      }
    }
  }

  function validRegisterPassword() {
    if (inputData.password1.length >= 8 && registerPasswordMatch()) {
      setPasswordOneTooShortErrorMsg(false);
      setPasswordTwoTooShortErrorMsg(false);
      return true;
    } else if (inputData.password1.length >= 8 && !registerPasswordMatch()) {
      setPasswordOneTooShortErrorMsg(false);
      setPasswordTwoTooShortErrorMsg(false);
    } else {
      setPasswordOneTooShortErrorMsg(true);
      setPasswordTwoTooShortErrorMsg(true);
    }
  }

  function registerPasswordMatch() {
    if (inputData.password1 === inputData.password2) {
      setPasswordOneMatchErrorMsg(false);
      setPasswordTwoMatchErrorMsg(false);
      return true;
    } else {
      setPasswordOneMatchErrorMsg(true);
      setPasswordTwoMatchErrorMsg(true);
    }
  }

  const registerValidationCheck = () => {
    validRegisterName();
    validRegisterSurname();
    validRegisterEmail();
    validRegisterPassword();
    if (
      validRegisterName() &&
      validRegisterSurname() &&
      validRegisterEmail() &&
      validRegisterPassword()
    ) {
      addUser(
        inputData.firstName,
        inputData.lastName,
        inputData.email1,
        inputData.password1
      );
      alert("Registration successful!");
      setInputData({
        firstName: "",
        lastName: "",
        email1: "",
        email2: "",
        password1: "",
        password2: "",
      });
    }
  };

  return (
    <form className="LoginPageFormWrapper">
      <label className="LoginPageFormLabel">Name</label>
      <input
        type="text"
        placeholder="name"
        className="LoginPageInput"
        id="registerName"
        name="firstName"
        value={inputData.firstName}
        onChange={handleInputData}
      />
      {firstNameErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterName"
        >
          Name should consist of at least 2 letters
        </p>
      )}
      <label className="LoginPageFormLabel">Surname</label>
      <input
        type="text"
        placeholder="surname"
        className="LoginPageInput"
        id="registerSurname"
        name="lastName"
        value={inputData.lastName}
        onChange={handleInputData}
      />
      {lastNameErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterSurname"
        >
          Surname should consist of at least 2 letters
        </p>
      )}
      <label className="LoginPageFormLabel">Email</label>
      <input
        type="email"
        placeholder="email"
        className="LoginPageInput"
        id="registerEmailOne"
        name="email1"
        value={inputData.email1}
        onChange={handleInputData}
      />
      {emailOneValidErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterEmailOneValid"
        >
          Please provide valid email address
        </p>
      )}
      {emailOneDuplicateErrorMsg && (
        <p className="LoginPageValidErrMsg" id="EmailExists">
          Email already registered
        </p>
      )}
      {emailOneMatchErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterEmailOneMatch"
        >
          Emails do not match
        </p>
      )}
      <label className="LoginPageFormLabel">Email again</label>
      <input
        type="email"
        placeholder="email again"
        className="LoginPageInput"
        id="registerEmailTwo"
        name="email2"
        value={inputData.email2}
        onChange={handleInputData}
      />
      {emailTwoValidErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterEmailTwoValid"
        >
          Please provide valid email address
        </p>
      )}
      {emailTwoMatchErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterEmailTwoMatch"
        >
          Emails do not match
        </p>
      )}
      <label className="LoginPageFormLabel">Password</label>
      <input
        type="password"
        placeholder="password"
        className="LoginPageInput"
        id="registerPasswordOne"
        name="password1"
        value={inputData.password1}
        onChange={handleInputData}
      />
      {passwordOneTooShortErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterPasswordOneValid"
        >
          Password should contain at least 8 characters
        </p>
      )}
      {passwordOneMatchErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterPasswordOneMatch"
        >
          Passwords do not match
        </p>
      )}
      <label className="LoginPageFormLabel">Password again</label>
      <input
        type="password"
        placeholder="password"
        className="LoginPageInput"
        id="registerPasswordTwo"
        name="password2"
        value={inputData.password2}
        onChange={handleInputData}
      />
      {passwordTwoTooShortErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterPasswordTwoValid"
        >
          Password should contain at least 8 characters
        </p>
      )}
      {passwordTwoMatchErrorMsg && (
        <p
          className="LoginPageValidErrMsg"
          id="LoginPageValidErrMsgRegisterPasswordTwoMatch"
        >
          Passwords do not match
        </p>
      )}
      <button
        type="button"
        className="BlackButton Centered"
        onClick={registerValidationCheck}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
