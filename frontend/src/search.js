import React, { useState } from "react";

export default function MovieSearch() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const Movies = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: "Movie name",
    year: "Year",
    genre: "Genre"
  }));

  const handleSearch = () => {
    console.log("search:", { search, selectedGenre, selectedLanguage, selectedYear });
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchSection}>
        <input
          type="text"
          placeholder="Movie name"
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>
        <button style={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
      <div style={styles.filters}>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={styles.dropdown}>
          <option value="">Genre</option>
          <option>Action</option>
          <option>Fantasy</option>
          <option>Comedy</option>
        </select>

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={styles.dropdown}>
          <option value="">Language</option>
          <option value="en">English</option>
          <option value="fi">Finnish</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={styles.dropdown}>
            <option value="">Year</option>
          {Array.from({ length: 50 }, (_, i) => 2025 - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.tags}>
        <span>Fantasy</span>&nbsp;&nbsp;
        <span>Action</span>&nbsp;&nbsp;
        <span>English</span>&nbsp;&nbsp;
        <span>1999</span>
      </div>
      <div style={styles.grid}>
        {Movies.map((movie) => (
          <div key={movie.id} style={styles.movieCard}>
            <img src="Tähän source"
            alt={movie.title}
            style={styles.poster}/>
            <p>{movie.title}</p>
            <p>{movie.year}</p>
            <p>{movie.genre}</p>
          </div>
        ))}
      </div>

      <footer style={styles.footerBox}>&copy; 2025.</footer>
    </div>
  );
}

//jälleen testi tyylejä.

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "white",
    minHeight: "100vh",
    position: "relative",
  },
  searchSection: {
    textAlign: "center",
    marginTop: "45px",
  },
  searchInput: {
    width: "450px",
    padding: "10px",
    fontSize: "16px",
  },
  searchButton: {
    padding: "10px 20px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  filters: {
    position: "absolute",
    float: "left",
    left: "30px",
    top: "230px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  dropdown: {
    padding: "10px",
    width: "170px",
    border: "1px solid black",
  },
  tags: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 200px)",
    justifyContent: "center",
    gap: "40px",
    marginTop: "40px",
  },
  movieCard: {
    textAlign: "center",
  },
  footerBox: {
    marginTop: "50px",
    width: "100%",
    textAlign: "center",
    padding: "10px",
  },
};