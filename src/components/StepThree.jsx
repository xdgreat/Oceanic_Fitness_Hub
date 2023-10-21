import React, { useState } from "react";

const StepThree = ({ onNext, onBack }) => {
  const [workoutType, setWorkoutType] = useState("");

  const handleNext = () => {
    onNext({ workoutType });
  };

  return (
    <div>
      <h2>Step 3: Workout Preferences</h2>
      <select
        value={workoutType}
        onChange={(e) => setWorkoutType(e.target.value)}
      >
        <option value="">Select Workout Type</option>
        <option value="bodybuilding">Bodybuilding</option>
        <option value="powerlifting">Powerlifting</option>
        <option value="calisthenics">Calisthenics</option>
        <option value="homeWorkout">Home Workout</option>
        {/* Add more options */}
      </select>
      <button onClick={onBack}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default StepThree;
