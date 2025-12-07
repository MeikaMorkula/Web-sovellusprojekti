import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const meRes = await fetch("http://localhost:3001/user/me", {
        credentials: "include",
      });

      if (meRes.status === 401) {
        setError("You must be logged in to view your profile.");
        return;
      }

      const meData = await meRes.json();

      const profileRes = await fetch(`http://localhost:3001/user/${meData.id}`, {
        credentials: "include",
      });

      if (!profileRes.ok) {
        setError("Could not load profile.");
        return;
      }

      const data = await profileRes.json();
      setProfile(data);
    }

    loadProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>

      <div
        style={{
          width: "120px",
          height: "120px",
          backgroundColor: "#ccc",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
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

      <p>
        <strong>Username:</strong> {profile.username}
      </p>

      <p>
        <strong>Bio:</strong>{" "}
        {profile.profile_description || "(none)"}
      </p>

      <p>
        <strong>Favourite movie:</strong>{" "}
        {profile.favourite_movie || "(none)"}
      </p>

      {/* eyhmät placeholder*/}
      <h3>Groups</h3>
      <ul>
        <li>No groups yet</li>
      </ul>
    </div>
  );
}
