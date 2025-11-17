const BASE_URL = "https://api.themoviedb.org/3";

const searchMovies = async (title, language, year, page) => {
  const response = await fetch(
    BASE_URL +
      "/search/movie?query=" +
      title +
      "&include_adult=false" +
      language +
      year +
      page,
    {
      headers: {
        Authorization: `Bearer APIKEY`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return response;
};

export { searchMovies };
