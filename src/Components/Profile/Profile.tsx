import React from "react";
import "./Profile.css";
import ProfilePicture from "../../Assets/profile-photo.png";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Redux/userSlice";
import { CurrentUser } from "../../Types/types";

interface ProfileProps {
  currentUser: CurrentUser;
}

const Profile = ({ currentUser }: ProfileProps) => {
  const dispatch = useDispatch();

  function emailValidationCheck(email: string) {
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email !== "" && email.match(validEmailRegex)) {
      return true;
    } else {
      return false;
    }
  }

  const resetEmail = () => {
    const email = prompt("Please enter a new email address");
    if (email !== null) {
      if (emailValidationCheck(email)) {
        const updatedUser = {
          ...currentUser,
          email: email,
        };
        dispatch(setCurrentUser(updatedUser));

        const data = localStorage.getItem("react-movie-rental-users");
        let users;
        if (data) {
          users = JSON.parse(data);
        }

        const userIndex = users.findIndex(
          (user: CurrentUser) => user.id === updatedUser.id
        );

        if (userIndex !== -1) {
          users[userIndex] = updatedUser;

          localStorage.setItem(
            "react-movie-rental-users",
            JSON.stringify(users)
          );
        } else {
          alert("Email not valid");
        }
      }
    }
  };

  return (
    <div>
      <div className="ProfilePagePersonalInfoWrapper">
        <img
          src={ProfilePicture}
          className="ProfilePageProfilePhoto"
          alt="profile-icon"
        />
        <div className="ProfilePagePersonalInfo">
          <div className="ProfilePagePersonalInfoText">
            <p>
              <strong>Name: {currentUser?.firstName}</strong>
            </p>
            <p id="UserName"></p>
          </div>
          <div className="ProfilePagePersonalInfoText">
            <p>
              <strong>Surname: {currentUser?.lastName}</strong>
            </p>
            <p id="UserSurname"></p>
          </div>
          <div className="ProfilePagePersonalInfoText">
            <p>
              <strong>Email: {currentUser?.email}</strong>
            </p>
            <p id="UserEmail"></p>
          </div>
        </div>
      </div>
      <div className="ProfilePageButtonsWrapper">
        <button className="BlackButton">Reset password</button>
        <button className="BlackButton" id="ResetEmail" onClick={resetEmail}>
          Reset email
        </button>
      </div>
    </div>
  );
};

export default Profile;
