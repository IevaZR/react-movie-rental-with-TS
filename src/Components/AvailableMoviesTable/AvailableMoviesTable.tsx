import { useState, useEffect } from "react";
import "./AvailableMoviesTable.css";
import originalMovieList from "../../Database/MoviesInStock";
import HomePageMovieItem from "../HomePageMovieItem/HomePageMovieItem";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Redux/userSlice";
import { CurrentUser, Movie } from "../../Types/types";

interface AvailableMoviesTableProps {
  currentUser: CurrentUser;
  originalMovieList: Movie[];
}

const AvailableMoviesTable = ({ currentUser }: AvailableMoviesTableProps) => {
  const [availableMovies, setAvailableMovies] = useState<Movie[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = localStorage.getItem("reactMovieList");
    let movies;
    if (storedData !== null) {
      movies = JSON.parse(storedData);
    }
    if (movies && movies.length > 0) {
      setAvailableMovies(movies);
    } else {
      setAvailableMovies(originalMovieList);
    }
  }, []);

  const rentMovie = (rentedMovieName: string) => {
    const updatedAvailbaleMovies = availableMovies.map((movie) => {
      if (movie.movieName === rentedMovieName && movie.inStock > 0) {
        return {
          ...movie,
          inStock: movie.inStock - 1,
        };
      }
      return movie;
    });

    const rentedMovie = availableMovies.find(
      (movie) => movie.movieName === rentedMovieName
    );

    if (!rentedMovie || rentedMovie.inStock === 0) {
      return;
    }

    setAvailableMovies(updatedAvailbaleMovies);

    const userMovies = currentUser.rentedMovies;
    let updatedUserMovies;
    const movieToAdd = userMovies.find(
      (item) => item.movieName === rentedMovie.movieName
    );

    if (!movieToAdd) {
      const newMovie = { ...rentedMovie, count: 1 };

      updatedUserMovies = [...userMovies, newMovie];
    } else {
      updatedUserMovies = currentUser.rentedMovies.map((item) =>
        item.movieName === rentedMovieName
          ? { ...item, count: (item.count || 0) + 1 }
          : item
      );
    }

    const updatedUser = {
      ...currentUser,
      rentedMovies: updatedUserMovies,
    };

    dispatch(setCurrentUser(updatedUser));
    localStorage.setItem(
      "reactMovieList",
      JSON.stringify(updatedAvailbaleMovies)
    );

    const userData = localStorage.getItem("react-movie-rental-users");
    let users;

    if (userData) {
      users = JSON.parse(userData);
    }

    const userIndex = users.findIndex(
      (user: CurrentUser) => user.id === updatedUser.id
    );

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;

      localStorage.setItem("react-movie-rental-users", JSON.stringify(users));
    } else {
      alert("Email not valid");
    }
  };

  return (
    <div className="HomePageMovieTable">
      {availableMovies.map((movie) => (
        <HomePageMovieItem
          key={movie.movieName}
          movie={movie}
          rentMovie={rentMovie}
        />
      ))}
    </div>
  );
};

export default AvailableMoviesTable;
