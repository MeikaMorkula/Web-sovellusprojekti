import { useState } from 'react';

const Home = () => {
  const [movies] = useState([
    { id: 1, title: 'movie' },
    { id: 2, title: 'movie' },
    { id: 3, title: 'movie' },
  ]);
  return (
    <div>
      <main style={styles.main}>
        <h1>Home</h1>
        <p>Welcome to the page</p>

        <h3>Recommended for you:</h3>
        <div style={styles.movieContainer}>
          {movies.length === 0 ? (
            <p>No movies</p>
          ) : (
            movies.map((movie) => (
              <div key={movie.id} style={styles.movieBox}>
                <img
                  src=""
                  alt={movie.title}
                  style={styles.poster}/>
                <p>{movie.title}</p>
              </div>
            ))
          )}
        </div>
      </main>

      <footer style={styles.footerBox}>&copy; 2025.</footer>
    </div>
  );
};
//Tyylit voi laittaa erilliseen tiedostoon sitten.
const styles = {
  main: {
    padding: '20px',
    textAlign: 'center',
  },
  movieContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  movieBox: {
    width: '200px',
    padding: '10px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  poster: {
    width: '100%',
    borderRadius: '5px',
  },
  footerBox: {
    marginTop: '40px',
    padding: '10px',
    backgroundColor: 'white',
    textAlign: 'center',
  },
};

export default Home;
