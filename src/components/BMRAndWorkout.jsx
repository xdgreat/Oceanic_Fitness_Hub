import React, { useState } from "react";

const BMRAndWorkout = ({ userData, onUpdate, onNext }) => {
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("maintain");

  const calculateBMR = () => {
    if (userData.gender === "male") {
      return Math.round(
        88.362 +
          13.397 * userData.weight +
          4.799 * userData.height -
          5.677 * userData.age
      );
    } else if (userData.gender === "female") {
      return Math.round(
        447.593 +
          9.247 * userData.weight +
          3.098 * userData.height -
          4.33 * userData.age
      );
    } else {
      return 0;
    }
  };

  const calculateCalories = (bmr, activityLevel) => {
    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      superActive: 1.9,
    };

    const maintenanceCalories = Math.round(
      bmr * activityFactors[activityLevel]
    );

    if (goal === "increase") {
      return Math.round(maintenanceCalories * 1.1);
    } else if (goal === "decrease") {
      return Math.round(maintenanceCalories * 0.9);
    } else {
      return maintenanceCalories;
    }
  };

  const handleNext = () => {
    const updatedUserData = {
      ...userData,
      activityLevel: activityLevel,
      goal: goal,
      bmr: calculateBMR(),
      calories: calculateCalories(calculateBMR(), activityLevel),
    };
    onUpdate(updatedUserData);
    onNext();
  };

  return (
    <div>
      <h2>Step 2: BMR and Activity Level</h2>
      <p>Basal Metabolic Rate (BMR): {calculateBMR()}</p>

      <label htmlFor="activityLevel">Select Activity Level:</label>
      <select
        id="activityLevel"
        value={activityLevel}
        onChange={(e) => setActivityLevel(e.target.value)}
      >
        <option value="">Select Activity Level</option>
        <option value="sedentary">Sedentary</option>
        <option value="lightlyActive">Lightly Active</option>
        <option value="moderatelyActive">Moderately Active</option>
        <option value="veryActive">Very Active</option>
        <option value="superActive">Super Active</option>
      </select>

      <label htmlFor="goal">Select Goal:</label>
      <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="maintain">Maintain Weight</option>
        <option value="increase">Bulk (Increase Calories)</option>
        <option value="decrease">Cut (Decrease Calories)</option>
      </select>

      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default BMRAndWorkout;
