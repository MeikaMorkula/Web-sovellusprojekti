import React, { useEffect, useState } from "react";

export default function ProfileTest() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const meRes = await fetch(`${process.env.REACT_APP_API_URL}http://localhost:3001/user/me`, {
        credentials: "include",
      });
  
      if (meRes.status === 401) {
        setError("You must be logged in to view this page.");
        return;
      }
  
      const meData = await meRes.json(); 
      const profileRes = await fetch(`${process.env.REACT_APP_API_URL}/user/${meData.id}`, {
        credentials: "include",
      });
  
      if (!profileRes.ok) {
        setError("Could not load profile.");
        return;
      }
  
      const profileData = await profileRes.json();
      setProfile(profileData);
    }
  
    loadProfile();
  }, []);

  if (error) return <p>{error}</p>;

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile Test</h2>

      <div
        style={{
          width: "120px",
          height: "120px",
          backgroundColor: "#ccc",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {profile.profile_picture ? (
          <img
            src={`${process.env.REACT_APP_API_URL}/profile-pictures/${profile.profile_picture}`}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          "Profile picture"
        )}
      </div>

      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Bio:</strong> {profile.profile_description || "(none)"}</p>
      <p><strong>Favourite movie:</strong> {profile.favourite_movie || "(none)"}</p>
    </div>
  );
}
