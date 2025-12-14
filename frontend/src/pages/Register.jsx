import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isPasswordValid = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasMinLength && hasUppercase && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid(password)) {
      setError(
        "Password needs to be at least 8 characters long, contain a number, and contain a capital letter."
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setError("Username already exists, choose a new one");
        return;
      }

      alert("Account registered successfully!");
      window.location.href = "http://localhost:3000/login";
    } catch (err) {
      setError("Server connection error.");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "100px auto" }}>
      <h2>Create Account</h2>

      {error && (
        <div
          style={{
            background: "#ffdddd",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
            color: "#a00",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <button
          type="submit"
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
