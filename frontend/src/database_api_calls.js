const API_URL = process.env.REACT_APP_API_URL;

export async function fetchFavourite(movie_id, user_id) {
  try {
    const res = await fetch(API_URL + `/favourite/getFavourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie_id: movie_id, user_id: user_id }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function fetchFavourites(user_id) {
  try {
    const res = await fetch(API_URL + `/favourite/getFavourites` + user_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function addFavourite(body) {
  try {
    const res = await fetch(API_URL + `/favourite/addFavourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: body.movie_id,
        username: body.username,
        user_id: body.user_id,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function deleteFavourite(id) {
  try {
    const res = await fetch(API_URL + `/favourite/deleteFavourite` + id, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function fetchReviews(movie_id) {
  try {
    const res = await fetch(API_URL + `/review/getReviews` + movie_id);
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function addReview(review) {
  try {
    const res = await fetch(API_URL + `/review/addReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review_rating: review.review_rating,
        user_id: review.user_id,
        review_description: review.review_description,
        movie_id: review.movie_id,
      }),
    });
    console.log("Review added");
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function fetchGroups() {
  try {
    const res = await fetch(API_URL + `/group/getGroups`);
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function fetchGroup(id) {
  try {
    const res = await fetch(API_URL + `/group/getGroup/` + id);
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function requestGroupJoin(user_id, group_id) {
  try {
    const res = await fetch(API_URL + `/group/requestGroupJoin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        group_id: group_id,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}
