import React, { useEffect, useState } from "react";

const DailyCaloriesTracker = () => {
  const [caloriesData, setCaloriesData] = useState(null);
  const [caloriesEaten, setCaloriesEaten] = useState(null);

  const currentDate = new Date();

  useEffect(() => {
    handleSave;
    console.log("f");
  }, []);
  const handleSave = fetchCaloriesData(currentDate)
    .then((data) => {
      if (data) {
        setCaloriesData(data);
      }
    })
    .catch((error) => {
      // Handle the error
    });

  async function fetchCaloriesData(date) {
    try {
      const formattedDate = formatDateForAPI(date);
      const response = await fetch(`/api/user/calories/${formattedDate}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch calories data");
      }
    } catch (error) {
      console.error("Error fetching calories data:", error);
      return null;
    }
  }

  async function updateCaloriesData(newCaloriesData, date) {
    try {
      const formattedDate = formatDateForAPI(date);
      const response = await fetch(`/api/user/calories/${formattedDate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCaloriesData),
      });

      if (response.ok) {
        handleSave;
        console.log("aa");
      } else {
        throw new Error("Failed to update tracking data");
      }
    } catch (error) {
      console.error("Error updating tracking data:", error);
      return false;
    }
  }

  const handleUpdateCalories = async () => {
    console.log("aaaa");
    const newCaloriesData = {
      date: formatDateForAPI(currentDate),
      dailyTargetCalories: caloriesData.dailyTargetCalories,
      caloriesConsumed: caloriesEaten,
      caloriesBurned: 10,
    };

    console.log(caloriesData);
    const success = await updateCaloriesData(newCaloriesData, currentDate);
    if (success) {
      console.log("aa");
    } else {
      console.log("aad");
    }
  };

  function formatDateForAPI(date) {
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  }

  return (
    <div>
      <h2>Daily Calories Tracker</h2>
      {caloriesData ? (
        <>
          <p>Calories Eaten: {caloriesData.caloriesConsumed}</p>
          <input
            type="text"
            onChange={(e) => setCaloriesEaten(e.target.value)}
            placeholder="enter Calories"
          />
          <button onClick={handleUpdateCalories}>Update Calories</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DailyCaloriesTracker;
