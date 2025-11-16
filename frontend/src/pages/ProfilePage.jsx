export default function ProfilePage() {
    const profile = {
      username: "testuser",
      bio: "lorem ipsum sit dolor amet.",
      favoriteMovie: "C'est arrivé près de chez vous",
      groups: ["Group 1", "Group 2"]
    };
  
    return (
      <div>
        <h2>Profile</h2>
  
        <div
          style={{
            width: "120px",
            height: "120px",
            backgroundColor: "#ccc",
            marginBottom: "10px"
          }}
        >
          Profile picture
        </div>
  
        <p>Username: {profile.username}</p>
        <p>Bio: {profile.bio}</p>
        <p>Favourite movie: {profile.favoriteMovie}</p>
  
        <h3>Groups</h3>
        <ul>
          {profile.groups.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    );
  }
  