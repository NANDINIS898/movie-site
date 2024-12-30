import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional: for styling

function App() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('28'); // Default genre: Action
  const [genres, setGenres] = useState([]); // State to store genres


  // Fetch movies whenever the genre changes
  useEffect(() => {
    axios
        .get("https://movie-site-server.onrender.com/api/genres")
        .then((response) => setGenres(response.data))
        .catch((error) => console.error("Error fetching genres:", error));
}, []);

   // Fetch movies whenever the selected genre changes
   useEffect(() => {
    if (genre) {
        axios
            .get(`https://movie-site-server.onrender.com/api/movies/${genre}`)
            .then((response) => setMovies(response.data))
            .catch((error) => console.error("Error fetching movies:", error));
    }
}, [genre]);


  return (
    <div className="App">
      {/* Navbar with Genre Buttons */}
      <h1>My Movie Mate</h1>
      <nav className="navbar">
        <button onClick={() => setGenre('28')}>Action</button>
        <button onClick={() => setGenre('35')}>Comedy</button>
        <button onClick={() => setGenre('18')}>Drama</button>
        <button onClick={() => setGenre('10749')}>Romance</button>
        <button onClick={() => setGenre('53')}>Thriller</button>
      </nav>

      <h2>Movie Recommendations</h2>

      {/* Movie list */}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width="200"
            />
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
