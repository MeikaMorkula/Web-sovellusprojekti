const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.REACT_APP_TMDB_API_KEY,
  },
};

const searchMovies = async (title, language, year, page) => {
  const response = await fetch(
    BASE_URL +
      "/search/movie?query=" +
      title +
      "&include_adult=false" +
      language +
      year +
      page,
    options
  )
    .then((response) => response.json(), console.log("api request"))
    .catch((error) => console.error(error));
  return response;
};

const searchMovieById = async (movieID) => {
  const response = await fetch(
    BASE_URL + "/movie/" + movieID + "?language=en-US",
    options
  )
    .then((response) => response.json(), console.log("api request"))
    .catch((error) => console.error(error));
  return response;
};

const searchGenres = async () => {
  const response = await fetch(
    BASE_URL + "/genre/movie/list?language=en",
    options
  )
    .then((response) => response.json(), console.log("api request"))
    .catch((error) => console.error(error));
  return response;
};

export { searchMovieById, searchMovies, searchGenres };