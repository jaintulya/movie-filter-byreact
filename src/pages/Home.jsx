import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_KEY = "b9a5e69d"

function Home({ addToFavorites, favorites }) {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [currentQuery, setCurrentQuery] = useState("batman")

  // fetch movies from OMDB API
  function fetchMovies(query, pageNum = 1, append = false) {
    setLoading(true)
    setError("")
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${pageNum}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          if (append) {
            setMovies((prev) => [...prev, ...data.Search])
          } else {
            setMovies(data.Search)
          }
          setTotalResults(Number(data.totalResults))
        } else {
          if (!append) {
            setMovies([])
            setError(data.Error || "No movies found.")
          }
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Something went wrong.")
        setLoading(false)
      })
  }

  // load default movies on first render
  useEffect(() => {
    fetchMovies("batman")
  }, [])

  // handle search button click
  function handleSearch() {
    if (search.trim() !== "") {
      setPage(1)
      setCurrentQuery(search.trim())
      fetchMovies(search.trim(), 1, false)
    }
  }

  // load more movies (next page)
  function handleLoadMore() {
    const nextPage = page + 1
    setPage(nextPage)
    fetchMovies(currentQuery, nextPage, true)
  }

  // handle Enter key press
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // filter movies by type
  const filteredMovies = filterType === "all"
    ? movies
    : movies.filter((movie) => movie.Type === filterType)

  return (
    <div className="home">
      <h1>Search Movies</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Filter by Type */}
      <div className="filter-bar">
        <label>Filter by Type: </label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="game">Game</option>
        </select>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Movie Cards */}
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <p className="type-badge">{movie.Type}</p>
            <div className="card-buttons">
              <Link to={`/movie/${movie.imdbID}`}>
                <button>View Details</button>
              </Link>
              <button
                onClick={() => addToFavorites(movie.imdbID)}
                className={favorites.includes(movie.imdbID) ? "fav-btn added" : "fav-btn"}
              >
                {favorites.includes(movie.imdbID) ? "★ Added" : "☆ Add to Favorites"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {movies.length < totalResults && !loading && (
        <div className="load-more">
          <button onClick={handleLoadMore}>Load More Movies</button>
          <p>Showing {movies.length} of {totalResults} results</p>
        </div>
      )}
    </div>
  )
}

export default Home
