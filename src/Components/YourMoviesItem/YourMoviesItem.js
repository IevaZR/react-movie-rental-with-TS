import React, { useState } from "react";
import "./YourMoviesItem.css";

const YourMoviesItem = ({ movie, removeMovie }) => {
  const [rentTime, setRentTime] = useState(12);

  const totalPrice = (price, quantity, time) => {
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
            <td>{totalPrice(movie.rentalPrice, movie.count, rentTime)}$</td>
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
