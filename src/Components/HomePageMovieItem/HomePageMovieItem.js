import React, { useState } from "react";
import "./HomePageMovieItem.css";
import AvailableIcon from "../../Assets/available-icon.png";
import NotAvailableIcon from "../../Assets/not-available-icon.png";

const HomePageMovieItem = ({ movie, rentMovie }) => {

  return (
    <div>
      <table className="MovieTable">
        <tbody>
          <tr className="MovieTableRow">
            <td>{movie.movieName}</td>
            <td>{movie.genre}</td>
            <td>{movie.rentalPrice.toFixed(2)}$</td>
            <td>
              <img
                src={movie.inStock > 0 ? AvailableIcon : NotAvailableIcon}
                alt="available"
              />
            </td>
            <td>
              <button
                className={
                  movie.inStock > 0
                    ? "HomePageMovieTableButton"
                    : "HomePageMovieTableButton OutOfStockButton"
                }
                onClick={() => rentMovie(movie.movieName)}
              >
                Rent
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomePageMovieItem;
