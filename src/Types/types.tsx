export type CurrentUser = {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rentedMovies: {
    movieName: string;
    genre: string;
    rentalPrice: number;
    inStock: number;
    count?: number;
  }[];
};

export type Movie = {
  movieName: string;
  genre: string;
  rentalPrice: number;
  inStock: number;
  count?: number;
};

export interface UserRootState {
    user: {
        currentUser: CurrentUser
    }
}