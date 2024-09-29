// src/components/Signup.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../Actions/authActions"; // Ensure this path is correct
import "../assets/register.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = (event) => {
    event.preventDefault();

    if (!email || !password || !username) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(register(email, password, username));
  };

  return (
    <div className="signup">
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        value={email}
      />
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
        value={username}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <p>
        Already have an account? <a href="/login">Log in here</a>
      </p>
    </div>
  );
}

export default Signup;



