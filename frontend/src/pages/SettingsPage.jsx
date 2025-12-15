import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton.js";

export default function SettingsPage() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmOld, setConfirmOld] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("http://localhost:3001/user/me", {
          credentials: "include",
        });
        if (!meRes.ok) return;
        const me = await meRes.json();
        setUserId(me.id);

        const uRes = await fetch(`http://localhost:3001/user/${me.id}`, {
          credentials: "include",
        });
        if (!uRes.ok) return;
        const u = await uRes.json();

        setUsername(u.username || "");
        setBio(u.profile_description || "");
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    }

    load();
  }, []);

  async function handleUpload(e) {
    if (!userId) return;
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("profilePicture", file);

    try {
      const res = await fetch(`http://localhost:3001/user/${userId}/uploads`, {
        method: "PUT",
        credentials: "include",
        body: fd,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile picture updated");
        window.location.reload();
      } else {
        alert(data.error || "Failed to upload picture");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  }

  async function handleUsername() {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (res.ok) alert("Username updated");
      else alert("Failed to update username");
    } catch (err) {
      console.error("Update failed:", err);
    }
  }

  async function handleBio() {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile_description: bio }),
      });

      if (res.ok) alert("Profile text updated");
      else alert("Failed to update profile text");
    } catch (err) {
      console.error("Update failed:", err);
    }
  }

  async function handlePassword() {
    if (!userId) return;
    if (oldPassword !== confirmOld) {
      alert("Old password fields do not match");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/user/${userId}/password`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) alert("Password updated");
      else alert(data.error || "Failed to update password");
    } catch (err) {
      console.error("Password update failed:", err);
    }
  }

  async function handleDelete() {
    if (!userId) return;

    if (!confirm("Are you SURE you want to delete your account?")) return;

    try {
      const res = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Account deleted");
        window.location.href = "/";
      } else {
        alert("Failed to delete account");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {/* vasen  */}
      <div
        style={{
          width: "33.33%",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <div className="w-[150px] h-[150px] border border-gray-400 flex justify-center items-center">
          PROFILE PIC
        </div>

        <br />

        <input
          id="pfpInput"
          name="profilePicture"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        <CustomButton
          color="success"
          text="Change profile picture"
          onClick={() => document.getElementById("pfpInput").click()}
        />

        <br />
        <br />

        <CustomButton
          color="error"
          text="Delete account"
          onClick={handleDelete}
        />
      </div>

      {/* keski */}
      <div
        style={{
          width: "33.33%",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h3>Change username</h3>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-1"
        />
        <br />
        <CustomButton
          color="success"
          text="Update username"
          onClick={handleUsername}
        />

        <br />
        <br />
        <br />

        <h3>Change password</h3>

        <label>New password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-1 w-full"
        />

        <br />
        <br />

        <label>Old password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-1 w-full"
        />

        <br />
        <br />

        <label>Old password again:</label>
        <input
          type="password"
          value={confirmOld}
          onChange={(e) => setConfirmOld(e.target.value)}
          className="border p-1 w-full"
        />

        <br />
        <br />
        <CustomButton
          text="Change password"
          onClick={handlePassword}
          color="success"
        />
      </div>

      {/*oikea puoli */}
      <div style={{ width: "33.33%", padding: "20px" }}>
        <h3>Edit profile text</h3>
        <textarea
          className="w-full h-[300px] resize-none border p-2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <br />
        <br />
        <CustomButton
          text="Update profile text"
          onClick={handleBio}
          color="success"
        />
      </div>
    </div>
  );
}
