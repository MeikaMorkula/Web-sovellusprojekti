import React, { useEffect, useState } from "react";
import Favourites from "./Favourites";
import defaultUser from "./defaultuser.png";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);

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

      const groupsRes = await fetch(`http://localhost:3001/group/user/${meData.id}/groups`, {
        credentials: "include",
      });
      if (!groupsRes.ok) {
        return;
      }
      const groupsData = await groupsRes.json();
      setGroups(groupsData);
      
    }

    loadProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <div style={{padding: "20px"}}>
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

      <h3>Groups</h3>
      {groups.length === 0 ? (
        <p>No groups yet</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {groups.map((group) => (
            <div key={group.group_id} style={{ width: "150px", textAlign: "center" }}>
              <img
                src={
                  group.group_icon
                    ? `http://localhost:3001/${group.group_icon.replace("public/", "")}`
                    : defaultUser
                }
                alt="group icon"
                onClick={() => navigate(`/group/${group.group_id}`)}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p>{group.group_name}</p>
            </div>
          ))}
        </div>
      )}

      <h3 style={{ marginTop: "40px" }}>
        
      </h3>
      </div>
      <Favourites user_id={profile.user_id || profile.id} />
    </div>
  );
}