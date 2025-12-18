import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { fetchFavourites } from "../database_api_calls.js";
import { searchMovieById } from "../TMDB_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import ReactPaginate from "react-paginate";
import styles from "../styles/favourites.module.css"
import { useNavigate } from "react-router-dom"

export default function Favourites({user_id}) {
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [movieData, setMovieData] = useState([]);
  const params = useParams();
  const resolvedUserId = user_id ?? params.id;
  const navigate = useNavigate();

  const style = {
    
  };
  const POSTER_URL = "https://image.tmdb.org/t/p/w342";

  const FavouritesList = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {favourites.map((fav) => {
          const movie = movieData[fav.movie_id];
          if (!movie) return null;

          return (
            <div key={fav.favourite_id} style={{ textAlign: "center" }}>
              <img
                src={`${POSTER_URL}${movie.poster_path}`}
                className={styles.poster}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "8px" }}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
              <h4 style={{ margin: "10px 0 4px" }}>{movie.title}</h4>
              <p style={{ margin: 0, opacity: 0.7 }}>
                {movie.release_date?.slice(0, 4)}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

//  const fetchMovieData = (favourites, pageCount) => {
  //  console.log("hello");
    //for (let index = pageCount; index < favourites.length; index++) {
      //const element = favourites.movie_id;
      /*searchMovieById(element).then((data) => {
        console.log(data);
        setMovieData(data);
      });*/
//    }
//  };

useEffect(() => {
  fetchFavourites(resolvedUserId).then((data) => {
    if (!data) {
      setFavourites([]);
      setPageCount(1);
      return;
    }
  
    setFavourites(data);
    setPageCount(1);
  });
  
}, [resolvedUserId]);


useEffect(() => {
  favourites.forEach((fav) => {
    if (!movieData[fav.movie_id]) {
      searchMovieById(fav.movie_id).then((data) => {
        setMovieData((prev) => ({
          ...prev,
          [fav.movie_id]: data,
        }));
      });
    }
  });
}, [favourites]);
  return (
    <div>
      {favourites.length > 0 && (
        <h2 style={{ marginBottom: "20px" }}>
             Favourite movies
          <button
            type="button"
            onClick={() => {
              const url = `${window.location.origin}/favourites/${favourites[0].user_id}`;
              navigator.clipboard.writeText(url);
              alert("Link copied!");
            }}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "0.9em",
            }}
          >
            (share it!)
          </button>
        </h2>
      )}
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
      <FavouritesList />
    </div>
  );
}
