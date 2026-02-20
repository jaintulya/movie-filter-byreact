import { Link } from 'react-router-dom'

function Navbar({ favCount }) {
  return (
    <nav className="navbar">
      <h2 className="navbar-brand">🎬 Movie Explorer</h2>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites ({favCount})</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  )
}

export default Navbar
