import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { StoreContext } from "../store";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [{ loginResponse }, dispatch] = useContext(StoreContext);

  useEffect(() => {
    document.title = "Login | Oceanic Fitness Hub";
  }, []);

  async function tryLogin() {
    dispatch({
      type: "LOGIN",
      payload: {
        email: loginData.email,
        password: loginData.password,
      },
    });
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
              id="email-prefix"
            >
              @
            </span>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="email-prefix"
              value={loginData.email}
              onChange={(event) =>
                setLoginData({ ...loginData, email: event.target.value })
              }
            />
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text justify-content-center"
              id="password-prefix"
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
              value={loginData.password}
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
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
      <div>Response: {JSON.stringify(loginResponse)}</div>
      <BottomNav />
    </div>
  );
};

export default Login;
