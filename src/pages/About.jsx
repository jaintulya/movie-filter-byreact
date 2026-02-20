function About() {
  return (
    <div className="about">
      <h1>About Movie Explorer</h1>
      <p>
        Movie Explorer is a simple React application that lets you search for movies,
        view their details, and save your favorites.
      </p>
      <p>
        This app uses the <strong>OMDB API</strong> to fetch movie data.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Search movies by name</li>
        <li>Filter results by type (Movie / Series / Game)</li>
        <li>View detailed information about any movie</li>
        <li>Add movies to your Favorites list</li>
        <li>Favorites are saved in localStorage</li>
      </ul>
      <h2>Tech Stack</h2>
      <ul>
        <li>React (Functional Components)</li>
        <li>React Router</li>
        <li>useState, useEffect, useParams hooks</li>
        <li>localStorage for persistence</li>
        <li>OMDB API</li>
      </ul>
    </div>
  )
}

export default About
