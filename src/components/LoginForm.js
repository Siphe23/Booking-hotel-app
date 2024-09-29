// src/components/LoginForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Actions/authActions"; // Ensure this path is correct
import "../assets/Login.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Dispatch login action
    dispatch(login(email, password));
  };

  return (
    <div className="login">
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button onClick={handleLogin}>Log in</button>
      <p>
      don't have an account? <a href="/register">register in here</a>
      </p>
    </div>
  );
}

export default LoginForm;



