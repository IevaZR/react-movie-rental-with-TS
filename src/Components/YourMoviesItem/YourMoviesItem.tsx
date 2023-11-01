import React, { useState } from "react";
import "./YourMoviesItem.css";
import { Movie } from "../../Types/types";

interface YourMoviesItemProps {
  movie: Movie,
  removeMovie: (movie:Movie)=> void
}

const YourMoviesItem = ({ movie, removeMovie }: YourMoviesItemProps) => {
  const [rentTime, setRentTime] = useState(12);

  const totalPrice = (price: number, quantity: number, time:number) => {
    return (price * quantity * (time / 12)).toFixed(2);
  };

  const increaseRentTime = () => {
    if (rentTime < 168) {
      let newRentTime = rentTime + 12;
      setRentTime(newRentTime);
    }
  };

  const decreaseRentTime = () => {
    if (rentTime > 12) {
      let newRentTime = rentTime - 12;
      setRentTime(newRentTime);
    }
  };

  return (
    <div>
      <table className="YourMoviesTable">
        <tbody>
          <tr className="YourMovieTableRow">
            <td>{movie.movieName}</td>
            <td>{movie.genre}</td>
            <td className="MovieTableTimeDataWrapper">
              <button
                className="ArrowButton"
                onClick={() => decreaseRentTime()}
              >
                {"<"}
              </button>
              <p className="MovieTableTimeData">{rentTime}</p>
              <button
                className="ArrowButton"
                onClick={() => increaseRentTime()}
              >
                {">"}
              </button>
            </td>
            <td>{movie.rentalPrice.toFixed(2)}$</td>
            <td>{movie.count}</td>
            <td>{totalPrice(movie.rentalPrice, movie.count || 0, rentTime)}$</td>
            <td>
              <button className="YourMoviePageMovieTableButton" onClick={() => removeMovie(movie)}>Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default YourMoviesItem;
