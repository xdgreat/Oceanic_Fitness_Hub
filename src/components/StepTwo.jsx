import React, { useState } from "react";

const StepTwo = ({ onNext, onBack }) => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [gender, setGender] = useState("");

  const handleNext = () => {
    onNext({ age, weight, height, weightUnit, gender });
  };

  return (
    <div>
      <h2>Step 2: Additional Information</h2>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder={`Weight (${weightUnit})`}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        required
      />
      <button onClick={onBack}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default StepTwo;
