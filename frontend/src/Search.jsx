import { useEffect, useState } from "react";
import { searchMovies, } from "./TMDB_api_calls.js";
import "./App.css";
import ReactPaginate from "react-paginate";
import styles from "./styles/search.module.css";
import { useNavigate } from "react-router-dom";

// you can search up posters with "https://image.tmdb.org/t/p/w200/POSTER_PATH
let title = "";
let language = "";
let year = "";
const BASE_URL = "https://image.tmdb.org/t/p/w200";

function Search() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  const Movies = () => {
    const navigate = useNavigate();
    return (
      <div className={styles.Container}>
        <main className={styles.main}>
          <h1>Movies</h1>
          <div className={styles.movieBox}>
            {movies && movies.map(movie => (
              <div key={movie.id} className={styles.movieCard}
                onClick={() => navigate(`/movie/${movie.id}`)}>
                <img className={styles.poster}
                  src={`${BASE_URL}${movie.poster_path}`} alt={movie.title}/> {/*Koko pitää jotenkin saada jokaiselle posterille sama, tuli aika stretched kuva.*/}
                <p>Title: {movie.title}</p>
                <p>ID: {movie.id}</p>
                <p>Release: {movie.release_date}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  };

  

  const Search = (title, language, year) => {
    const tempTitle = "" + title;
    const tempLanguage = "&language=" + language;
    const tempYear = "&primary_release_year=" + year;
    const tempPage = "&page=" + page;
    searchMovies(tempTitle, tempLanguage, tempYear, tempPage)
      .then((json) => {
        setMovies(json.results), setPageCount(json.total_pages);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (currentTitle || currentLanguage || currentYear) {
      Search(currentTitle, currentLanguage, currentYear); //tiedot mitä käyttää uudella sivulla, jos joku current osioista on true.
    }
  }, [currentTitle, currentLanguage, currentYear, page]);

  return (
    <div className={styles.Container}>
      <h1>Movies</h1>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(event) => {
          setPage(event.selected + 1); //search tapahtuu nyt useEffect.
        }}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
      <div className={styles.searchContainer}>
      <aside className={styles.sideBar}>
      <input className={styles.searchInput} type="text" id="input_title" placeholder="Title"></input>
      <input className={styles.searchInput}type="text" id="input_language" defaultValue="en-US" placeholder="Language (Example: en-US)"></input>
      <input className={styles.searchInput} type="text" id="input_year" placeholder="Year"></input>
      <button
        className={styles.searchButton}
        onClick={(event) => {
          (title = input_title.value),
            (language = input_language.value),
            (year = input_year.value);
            setPage(1);

            setCurrentTitle(title); //Pitää aikaisemmat tiedot ja käyttää niitä uuden sivun ladatessa.
            setCurrentLanguage(language);
            setCurrentYear(year);
        }}
      >
        Search
      </button>
      </aside>
      <Movies />
      </div>
      <ReactPaginate
        className={styles.pagination}
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
    </div>
  );
}

export default Search;
