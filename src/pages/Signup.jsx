import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import bcrypt from "bcryptjs";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tosChecked, setTosChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Register | Oceanic Fitness Hub";
  });

  async function handleSubmit(event) {
    event.preventDefault();

    if (username && password && tosChecked) {
      const saltRounds = 9;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      setUsername("");
      setPassword("");
      setTosChecked(false);
      setErrorMessage("");

      const registerRes = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: hashedPassword,
        }),
        credentials: "include",
      }).then((res) => res.json());

      if (registerRes.success) {
      } else {
        console.error(registerRes.error);
      }
    } else {
      setErrorMessage(
        "Please complete all fields and accept the Terms of Service."
      );
    }
  }

  return (
    <>
      <Navbar />
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <label htmlFor="tos">I agree to the Terms of Service:</label>
        <input
          type="checkbox"
          id="tos"
          name="tos"
          checked={tosChecked}
          onChange={(e) => setTosChecked(e.target.checked)}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <BottomNav />
    </>
  );
};

export default Signup;
