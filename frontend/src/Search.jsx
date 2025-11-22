import { useEffect, useState } from "react";
import { searchMovies } from "./TMDB_api_calls.js";
import ReactPaginate from "react-paginate";

export default function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const BASE_URL = "https://image.tmdb.org/t/p/w185";
  // you can search up posters with "https://image.tmdb.org/t/p/w185/POSTER_PATH
  let title = "";
  let language = "";
  let year = "";

  const Movies = () => {
    return (
      <table>
        <tr>
          <th>Title</th>
          <th>Movie id</th>
          <th>Release date</th>
          <th>Poster</th>
        </tr>
        {movies &&
          movies.map((movie) => (
            <tr>
              <td>{movie.title}</td>
              <td>{movie.id}</td>
              <td>{movie.release_date}</td>
              <td>
                <a href={`movie/${movie.id}`}>
                  <img
                    src={`${BASE_URL}${movie.poster_path}`}
                    width="100"
                    height="140"
                  ></img>
                </a>
              </td>
            </tr>
          ))}
      </table>
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

  useEffect(() => {}, [page]);

  return (
    <div>
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
      <input type="text" id="input_title"></input>
      <input type="text" id="input_language" defaultValue="en-US"></input>
      <input type="text" id="input_year"></input>
      <button
        onClick={(event) => {
          (title = input_title.value),
            (language = input_language.value),
            (year = input_year.value);
          Search(title, language, year, page);
        }}
      >
        Search
      </button>
      <Movies />
    </div>
  );
}
