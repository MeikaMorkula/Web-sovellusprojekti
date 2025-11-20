import { useEffect, useState } from "react";
import { searchMovies, searchGenres } from "./TMDB_api_calls.js";
import "./App.css";
import ReactPaginate from "react-paginate";
import styles from "./search.module.css"

const BASE_URL = "https://image.tmdb.org/t/p/w185";
// you can search up posters with "https://image.tmdb.org/t/p/w185/POSTER_PATH
let title = "";
let language = "";
let year = "";
let genre ="";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const Movies = () => {
    return (
      <table className={styles.grid}>
        <tr>
          <th>Title</th>
          <th>Movie id</th>
          <th>Release date</th>
          <th>Poster</th>
          <th>Genre</th>
        </tr>
        {movies &&
          movies.map((movie) => (
            <tr>
              <td>{movie.title}</td>
              <td>{movie.id}</td>
              <td>{movie.release_date}</td>
              <td>{movie.genre}</td>
              <td>
                <img
                  style={styles.poster}
                  src={`${BASE_URL}${movie.poster_path}`}
                  width="100"
                  height="140"
                ></img >
              </td>
            </tr>
          ))}
      </table>
    );
  };

  const Search = (title, language, year, genre) => {
    const tempTitle = "" + title;
    const tempLanguage = "&language=" + language;
    const tempYear = "&primary_release_year=" + year;
    const tempPage = "&page=" + page;
    const tempGenre = "&genre=" + genre;
    searchMovies(tempTitle, tempLanguage, tempYear, tempGenre, tempPage)
      .then((json) => {
        setMovies(json.results), setPageCount(json.total_pages);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Search();
  }, [page]);

  return (
    <div className={styles.Container}>
      <h1>Movies</h1>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(event) => {
          setPage(event.selected + 1);
        }}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
      <input className={styles.searchInput} type="text" id="input_title"></input>
      <input className={styles.searchInput}type="text" id="input_language" defaultValue="en-US"></input>
      <input className={styles.searchInput} type="text" id="input_year"></input>
      <select value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={styles.dropdown} id="input_genre">
          <option value="">Genre</option>
          {genres &&
              genres.map((genre) => (
                <option value={genre.id}>{genre.name}</option>
              ))}
        </select> 
      <button
        className={styles.searchButton}
        onClick={(event) => {
          (title = input_title.value),
            (language = input_language.value),
            (year = input_year.value);
            (genre = input_genre.value);
          Search(title, language, year, genre, page);
        }}
      >
        Search
      </button>
      <Movies />
    </div>
  );
}

export default App;