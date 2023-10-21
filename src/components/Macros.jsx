import React, { useState } from "react";

const Macros = ({ userData, onUpdate }) => {
  const [protein, setProtein] = useState(Math.round(userData.bmr * 0.25) / 4);
  const [carbs, setCarbs] = useState(Math.round((userData.bmr * 0.45) / 4));
  const [fats, setFats] = useState(Math.round((userData.bmr * 0.3) / 9));
  const [calories, setCalories] = useState(userData.calories);
  const [response, setResponse] = useState("");

  const handleUpdate = async () => {
    const updatedUserData = {
      ...userData,
      protein: protein,
      carbs: carbs,
      fats: fats,
      calories: calories,
      macrosSetupCompleted: true,
    };

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        setResponse("User data updated successfully");
      } else {
        setResponse("Failed to update user data");
      }
    } catch (error) {
      setResponse("Error updating user data");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Step 4: Your Macros and Calories</h2>
      <p>Protein: {protein}g</p>
      <p>Carbs: {carbs}g</p>
      <p>Fats: {fats}g</p>
      <p>Calories: {calories}</p>

      <label htmlFor="protein">Adjust Protein (g):</label>
      <input
        type="number"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
      />
      <label htmlFor="carbs">Adjust Carbs (g):</label>
      <input
        type="number"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
      />
      <label htmlFor="fats">Adjust Fats (g):</label>
      <input
        type="number"
        value={fats}
        onChange={(e) => setFats(e.target.value)}
      />
      <label htmlFor="calories">Adjust Calories:</label>
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
      <p>{response}</p>
    </div>
  );
};

export default Macros;
