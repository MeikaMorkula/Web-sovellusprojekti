import React, { useEffect, useState } from "react";

export default function ProfileTest() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("You must be logged in to view this page.");
        return;
      }

      const response = await fetch("http://localhost:3001/user/1", {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      if (response.status === 401) {
        setError("You must be logged in to view this page.");
        return;
      }

      if (!response.ok) {
        setError("Could not load profile.");
        return;
      }

      const data = await response.json();
      setProfile(data);
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
            src={`http://localhost:3001/profile-pictures/${profile.profile_picture}`}
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
