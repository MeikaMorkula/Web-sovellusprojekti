import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton.js";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3001/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log("login response:", data);

    if (res.ok) {
      localStorage.setItem("accessToken", data.accessToken);

      alert("Login successful");
      //kun kirjautuminen onnistuu mennään kotisivulle
      navigate("/home") 
      
    } else {
      alert("login failed. wrong username or pwd");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <CustomButton text="LogIn" type="submit" color='success'></CustomButton>

    </form>
  );
}
