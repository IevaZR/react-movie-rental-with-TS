import React from "react";
import "./YourMoviesTable.css";
import YourMoviesItem from "../YourMoviesItem/YourMoviesItem";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Redux/userSlice";
import { CurrentUser, Movie } from "../../Types/types";

interface YourMoviesTableProps {
  currentUser: CurrentUser;
}

const YourMoviesTable = ({ currentUser }: YourMoviesTableProps) => {
  const [yourMovies, setYourMovies] = useState(currentUser?.rentedMovies || []);

  const dispatch = useDispatch();

  const removeMovie = (movieToRemove: Movie) => {
    const removedMovieIndex = yourMovies.findIndex(
      (movie) => movie.movieName === movieToRemove.movieName
    );
    let updatedUserMovies;

    if (removedMovieIndex !== -1) {
      const updatedMovies = [...yourMovies];
      const removedMovie = updatedMovies[removedMovieIndex];

      if (removedMovie.count && removedMovie.count > 1) {
        updatedUserMovies = currentUser.rentedMovies.map((item) =>
          item.movieName === removedMovie.movieName && item.count
            ? { ...item, count: item.count - 1 }
            : item
        );
        setYourMovies(updatedUserMovies);

        const updatedUser = {
          ...currentUser,
          rentedMovies: updatedUserMovies,
        };

        dispatch(setCurrentUser(updatedUser));

        const usersData = localStorage.getItem("react-movie-rental-users");
        let users;
        if (usersData) {
          users = JSON.parse(usersData);
        }

        const userIndex = users.findIndex((user:CurrentUser) => user.id === updatedUser.id);

        if (userIndex !== -1) {
          users[userIndex] = updatedUser;

          localStorage.setItem(
            "react-movie-rental-users",
            JSON.stringify(users)
          );
        } else {
          alert("Email not valid");
        }
      } else if (removedMovie.count === 1) {
        updatedMovies.splice(removedMovieIndex, 1);
        setYourMovies(updatedMovies);
        const updatedUser = {
          ...currentUser,
          rentedMovies: updatedMovies,
        };

        dispatch(setCurrentUser(updatedUser));

        const usersData =  localStorage.getItem("react-movie-rental-users")
        let users;
        if(usersData) {
          users = JSON.parse(usersData);
        }
       
        const userIndex = users.findIndex((user:CurrentUser) => user.id === updatedUser.id);

        if (userIndex !== -1) {
          users[userIndex] = updatedUser;

          localStorage.setItem(
            "react-movie-rental-users",
            JSON.stringify(users)
          );
        }
      }
    }

    const data = localStorage.getItem("reactMovieList");
    let availableMovies;
    if (data) {
      availableMovies = JSON.parse(data);
    }

    const moveToUpdateIndex = availableMovies.findIndex(
      (item: Movie) => item.movieName === movieToRemove.movieName
    );

    const updatedAvailableMovies = [...availableMovies];
    const moveToUpdate = updatedAvailableMovies[moveToUpdateIndex];

    moveToUpdate.inStock++;
    updatedAvailableMovies[moveToUpdateIndex] = moveToUpdate;
    localStorage.setItem(
      "reactMovieList",
      JSON.stringify(updatedAvailableMovies)
    );
  };

  if (yourMovies.length === 0) {
    return <div>No movies to show</div>;
  }

  return (
    <div className="YourMoviesPageMovieTable">
      {yourMovies.map((movie) => (
        <YourMoviesItem
          key={movie.movieName}
          movie={movie}
          removeMovie={removeMovie}
        />
      ))}
    </div>
  );
};

export default YourMoviesTable;
