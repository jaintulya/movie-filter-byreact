import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API_KEY = "b9a5e69d"

function MovieDetails({ addToFavorites, favorites }) {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data)
        } else {
          setError(data.Error || "Movie not found.")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Something went wrong.")
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>
  if (!movie) return null

  return (
    <div className="movie-details">
      <div className="details-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.Title}
        />
        <div className="details-info">
          <h1>{movie.Title}</h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <button
            onClick={() => addToFavorites(movie.imdbID)}
            className={favorites.includes(movie.imdbID) ? "fav-btn added" : "fav-btn"}
          >
            {favorites.includes(movie.imdbID) ? "★ Added to Favorites" : "☆ Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
