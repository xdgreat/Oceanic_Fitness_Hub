import React, { createContext, useState } from "react";

export const StoreContext = createContext();

const initiaState = {
  isPageLoaded: false,
  auth: {
    isLoggedIn: false,
    username: "",
  },
};

const reducer = async (state, action) => {
  switch (action.type) {
    case "LOGIN":
      try {
        const loginRes = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: action.payload.email,
            password: action.payload.password,
          }),
        }).then((res) => res.json());

        if (loginRes.success) {
          console.log("Login successful:", loginRes);
          return {
            ...state,
            auth: { isLoggedIn: true, email: action.payload.email },
            loginResponse: loginRes,
          };
        } else {
          console.error("Login error:", loginRes.error);
          return {
            ...state,
            loginResponse: loginRes,
          };
        }
      } catch (error) {
        console.error("Error logging in:", error);
        return state;
      }
    case "LOGOUT":
      const logoutRes = await fetch("/api/logout").then((res) => res.json());
      if (logoutRes.success) {
        return {
          ...state,
          auth: { isLoggedIn: false, username: "" },
        };
      } else {
        console.error(logoutRes.error);
      }
      break;
    case "GET_USER":
      const getUserRes = fetch("/api/user").then((res) => res.json());
      if (getUserRes.success) {
        return {
          ...state,
          auth: { isLoggedIn: true },
          userData: getUserRes,
        };
      } else {
        console.error("Error trying to fetch user data:", getUserRes.error);
        return {
          ...state,
          loginResponse: loginRes,
        };
      }
    case "ISLOGGEDIN":
      const getIsLoggedIn = await fetch("/api/user/islogged").then((res) =>
        res.json()
      );
      console.log(getIsLoggedIn);
      if (getIsLoggedIn.success) {
        return {
          ...state,
          isLoggedRes: getIsLoggedIn,
        };
      } else {
        console.error("Error trying to fetch user data:", getIsLoggedIn.error);
        return {
          ...state,
          isLoggedRes: getIsLoggedIn,
        };
      }
      return state;
  }
};

const useAsyncReducer = (reducer, initialState = null) => {
  const [state, setState] = useState(initialState);

  const dispatch = async (action) => {
    const result = reducer(state, action);
    if (typeof result.then === "function") {
      try {
        const newState = await result;
        setState(newState);
      } catch (err) {
        setState({ ...state, error: err });
      }
    } else {
      setState(result);
    }
  };

  return [state, dispatch];
};

const Store = ({ children }) => {
  const [state, dispatch] = useAsyncReducer(reducer, initiaState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
