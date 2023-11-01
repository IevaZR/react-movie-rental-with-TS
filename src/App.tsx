import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import YourMoviesPage from "./Pages/YourMoviesPage/YourMoviesPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/your-movies-page" element={<YourMoviesPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
