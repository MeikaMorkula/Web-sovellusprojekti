import React from "react";

export default function SettingsPage() {
  return (
    <div
      className="settings-container"
      style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {/* vasen*/}
      <div
        className="settings-third left-third"
        style={{
          width: "33.33%",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <div
          className="profile-picture-placeholder"
          style={{
            width: "150px",
            height: "150px",
            border: "1px solid #aaa",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          PLACEHOLDER
        </div>
        <br />
        <button>Change profile picture</button>
        <br />
        <br />
        <button>Delete account</button>
      </div>

      {/*keski */}
      <div
        className="settings-third center-third"
        style={{
          width: "33.33%",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h3>Change username</h3>
        <input type="text" placeholder="New username" />
        <br />
        <button>Apply</button>
        <br />
        <br />
        <h3>Change password</h3>
        New password:
        <br />
        <input type="password" />
        <br />
        <br />
        Old password:
        <br />
        <input type="password" />
        <br />
        <br />
        Old password again:
        <br />
        <input type="password" />
        <br />
        <br />
        <button>Change password</button>
      </div>

      {/*oikea */}
      <div
        className="settings-third right-third"
        style={{ width: "33.33%", padding: "20px" }}
      >
        <h3>Edit profile text</h3>
        <textarea
          style={{ width: "100%", height: "300px", resize: "none" }}
          placeholder="Write something..."
        ></textarea>
        <br />
        <button>Apply</button>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button>Save changes</button>
        </div>
      </div>
    </div>
  );
}
