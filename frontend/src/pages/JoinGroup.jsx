import { useEffect, useState } from "react";

export default function GroupList() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function loadGroups() {
      const res = await fetch("http://localhost:3001/group/getGroups", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      setGroups(data);
    }

    loadGroups();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        gap: "20px",
      }}
    >
      <h2>Groups</h2>

      {groups.map((group) => {

        const filename = group.group_icon
          ? group.group_icon.replace("public/profile-pictures/", "")
          : null;

        return (
          <div
            key={group.group_id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >

            {filename ? (
              <img
                src={`http://localhost:3001/profile-pictures/${filename}`}
                alt="Group Icon"
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  background: "#eee",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Image
              </div>
            )}

            <strong>{group.group_name}</strong>

            <p style={{ fontSize: "14px", margin: 0 }}>
              {group.group_description || "No description"}
            </p>

            <button>Request to join</button>
          </div>
        );
      })}
    </div>
  );
}
