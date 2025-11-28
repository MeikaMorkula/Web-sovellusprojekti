
const API_URL = process.env.REACT_APP_API_URL;


export async function fetchFavourite(movie_id, user_id) {
    try {
      const res = await fetch(
        API_URL +
        `/favourite/getFavourite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movie_id: movie_id, user_id: user_id }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
        return null;
    };
}
