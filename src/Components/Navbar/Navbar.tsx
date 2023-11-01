import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/userSlice";
import { UserRootState } from "../../Types/types";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: UserRootState) => state.user.currentUser
  );

  const logOut = () => {
    dispatch(logoutUser());
    navigate("/");
    console.log(currentUser);
  };
  return (
    <nav className="NavBarWrapper">
      <div>
        <Link to="/home-page" className="NavBarLinkHome">
          Home
        </Link>
        <Link to="/your-movies-page" className="NavBarLink">
          Your movies
        </Link>
        <Link to="/profile-page" className="NavBarLink">
          Profile
        </Link>
      </div>
      <button className="LogOutButton" id="LogOutButton" onClick={logOut}>
        Log out
      </button>
    </nav>
  );
};

export default Navbar;
