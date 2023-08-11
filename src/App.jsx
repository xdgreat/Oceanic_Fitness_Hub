import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Hero from "./components/Hero";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [userData, setUserData] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [savedData, setSavedData] = useState([]);
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    document.title = "Home | Oceanic Fitness Hub";
    if (isAuthenticated) {
      setUserData(user);
    }
  }, [isAuthenticated, user]);

  console.log(isAuthenticated);

  const handleSaveData = async () => {
    if (userInput.trim() !== "") {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);
        const response = await fetch("http://localhost:3001/api/add-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ data: userInput }),
        });

        if (response.ok) {
          setSavedData([...savedData, userInput]);
          setUserInput("");
        } else {
          console.error("Failed to add data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: "http://localhost:3000/get-data",
          });
          const response = await fetch("http://localhost:3001/api/get-data", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setSavedData(data.map((entry) => entry.data));
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated]);

  return (
    <>
      <Navbar />
      <Hero />
      {isLoading ? (
        <div>Loading...</div>
      ) : isAuthenticated && userData ? (
        <>
          <h1>hi {userData.name}</h1>
          <div className="h-6 w-6 rounded-full outline outline-1 outline-text">
            <img src={userData.picture} alt="pfp" />
          </div>
          <div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your test data"
            />
            <button onClick={handleSaveData}>Save Data</button>
          </div>
          <div>
            <h2>Saved Data:</h2>
            <ul>
              {savedData.map((data, index) => (
                <li key={index}>{data}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <h1>hi guest</h1>
      )}
      <BottomNav />
    </>
  );
}

export default App;
