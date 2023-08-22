import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Login | Oceanic Fitness Hub";
  });

  async function tryLogin() {
    const loginRes = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    }).then((res) => res.json());

    if (loginRes.success) {
      return {
        auth: { isLoggedIn: true, username: username },
      };
    } else {
      console.error(loginRes.error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <div className="input-group mb-3">
            <span
              className="input-group-text justify-content-center"
              id="username-prefix"
              style={{
                width: "2.5rem",
              }}
            >
              @
            </span>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="username-prefix"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text justify-content-center"
              id="password-prefix"
              style={{
                width: "2.5rem",
              }}
            >
              *
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              aria-describedby="password-prefix"
              placeholder="Password..."
              aria-label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={tryLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Login;
