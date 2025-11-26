import { useEffect, useState } from "react";
import { searchMovies, searchGenres } from "./TMDB_api_calls.js";
import "./App.css";
import ReactPaginate from "react-paginate";
import styles from "./search.module.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://image.tmdb.org/t/p/w200";
// you can search up posters with "https://image.tmdb.org/t/p/w200/POSTER_PATH
let title = "";
let language = "";
let year = "";
let genre = "";

function Search() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const Movies = () => {
    const navigate = useNavigate();
    return (
      <div className={styles.Container}>
        <main className={styles.main}>
          <h1>Movies</h1>
          <div className={styles.movieBox}>
            {movies &&
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className={styles.movieCard}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <img
                    className={styles.poster}
                    src={`${BASE_URL}${movie.poster_path}`}
                    width="200"
                    height="280"
                    alt={movie.title}
                  />
                  <p>Title: {movie.title}</p>
                  <p>ID: {movie.id}</p>
                  <p>Release: {movie.release_date}</p>
                  <p>Genre: {movie.genre}</p>
                </div>
              ))}
          </div>
        </main>
      </div>
    );
  };

  const SearchMovies = (title, language, year, genre) => {
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
    searchGenres()
      .then((genreData) => {
        setGenres(genreData.genres);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={styles.Container}>
      <h1>Movies</h1>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(event) => {
          setPage(event.selected + 1);
          SearchMovies(title, language, year, genre);
        }}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
      <input
        className={styles.searchInput}
        type="text"
        id="input_title"
      ></input>
      <input
        className={styles.searchInput}
        type="text"
        id="input_language"
        defaultValue="en-US"
      ></input>
      <input className={styles.searchInput} type="text" id="input_year"></input>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className={styles.dropdown}
        id="input_genre"
      >
        <option value="">Genre</option>
        {genres &&
          genres.map((genre) => <option value={genre.id}>{genre.name}</option>)}
      </select>
      <button
        className={styles.searchButton}
        onClick={(event) => {
          (title = input_title.value),
            (language = input_language.value),
            (year = input_year.value);
          genre = input_genre.value;
          Search(title, language, year, genre, page);
        }}
      >
        Search
      </button>
      <Movies />
    </div>
  );
}

export default Search;
