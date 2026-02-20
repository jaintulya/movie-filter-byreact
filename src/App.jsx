import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Favorites from './pages/Favorites.jsx'
import About from './pages/About.jsx'
import './App.css'

function App() {
  // load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites")
    return saved ? JSON.parse(saved) : []
  })

  // save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // add movie ID to favorites (prevent duplicates)
  function addToFavorites(id) {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev // already exists, don't add again
      }
      return [...prev, id]
    })
  }

  // remove movie ID from favorites
  function removeFromFavorites(id) {
    setFavorites((prev) => prev.filter((favId) => favId !== id))
  }

  return (
    <div className="app">
      <Navbar favCount={favorites.length} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home addToFavorites={addToFavorites} favorites={favorites} />} />
          <Route path="/movie/:id" element={<MovieDetails addToFavorites={addToFavorites} favorites={favorites} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
