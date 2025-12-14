import { useState, useEffect } from "react";
import { fetchFavourites } from "../database_api_calls.js";
import { searchMovieById } from "../TMDB_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import ReactPaginate from "react-paginate";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [movieData, setMovieData] = useState([]);

  const style = {
    pagination: {
      display: "flex",
      liststyletype: "none",
      gap: "30px",
    },
  };
  const Favourites = () => {
    return (
      <div>
        {favourites.map((favourite) => (
          <div key={favourite.favourite_id}>
            <h2>Poster, movie name and other information</h2>
            <p>movie_id: {favourite.movie_id}</p>
            <p>user_id: {favourite.user_id}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  };

  const fetchMovieData = (favourites, pageCount) => {
    console.log("hello");
    for (let index = pageCount; index < favourites.length; index++) {
      const element = favourites.movie_id;
      /*searchMovieById(element).then((data) => {
        console.log(data);
        setMovieData(data);
      });*/
    }
  };

  useEffect(() => {
    fetchFavourites(1).then((data) => {
      console.log(data);
      setFavourites(data);
      setPageCount(data.total_pages);
    });
    fetchMovieData(favourites, pageCount);
  }, [page]);

  return (
    <div>
      <ReactPaginate
        className={style.pagination}
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
      <Favourites />
    </div>
  );
}
