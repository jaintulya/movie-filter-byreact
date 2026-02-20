import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_KEY = "b9a5e69d"

function Favorites({ favorites, removeFromFavorites }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favorites.length === 0) {
      setMovies([])
      setLoading(false)
      return
    }

    setLoading(true)

    // fetch details for each favorite movie ID
    const promises = favorites.map((id) =>
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
        .then((res) => res.json())
    )

    Promise.all(promises)
      .then((results) => {
        const validMovies = results.filter((m) => m.Response === "True")
        setMovies(validMovies)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [favorites])

  if (loading) return <p>Loading favorites...</p>

  if (favorites.length === 0) {
    return (
      <div className="favorites">
        <h1>My Favorites</h1>
        <p className="no-favorites">No favorite movies added.</p>
      </div>
    )
  }

  return (
    <div className="favorites">
      <h1>My Favorites</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <div className="card-buttons">
              <Link to={`/movie/${movie.imdbID}`}>
                <button>View Details</button>
              </Link>
              <button className="remove-btn" onClick={() => removeFromFavorites(movie.imdbID)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
