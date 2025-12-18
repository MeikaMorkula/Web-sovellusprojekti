import { useState, useEffect } from "react";

export default function CreateGroup() {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const meRes = await fetch("http://localhost:3001/user/me", {
        credentials: "include",
      });

      const meData = await meRes.json();

      if (meRes.status === 401) {
        alert("You must be logged in.");
        window.location.href = "http://localhost:3000/login";
        return;
      }

      const profileRes = await fetch(
        `http://localhost:3001/user/${meData.id}`,
        {
          credentials: "include",
        }
      );

      const data = await profileRes.json();
      setUserData(data);
    }

    loadUser();
  }, []);

  const handleCreate = async () => {
    if (!userData) return;
  
    const groupRes = await fetch("http://localhost:3001/group/addGroup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        group_name: name,
        group_owner: userData.user_id,
        group_description: description,
        owner_username: userData.username,
      }),
    });

    const newGroup = await groupRes.json();

    if (iconFile) {
      const fd = new FormData();
      fd.append("profilePicture", iconFile);

      const res = await fetch(`http://localhost:3001/group/${newGroup.group_id}/uploads`, {
        method: "PUT",
        credentials: "include",
        body: fd,
        
      });
      const data = await res.json();
    }
    alert("Group created successfully");
    window.location.href = "http://localhost:3000";
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "300px",
        }}
      >
        <button
          type="button"
          onClick={() => document.getElementById("groupIconInput").click()}
        >
          Add group icon
        </button>
        <input
          id="groupIconInput"
          type="file"
          name="profilePicture"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setIconFile(e.target.files[0])}
        />

        <label>
          Group name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Group description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button onClick={handleCreate}>Create group</button>
      </div>
    </div>
  );
}
