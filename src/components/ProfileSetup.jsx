import React, { useState } from "react";

const ProfileSetup = ({ userData, onUpdate, onNext }) => {
  const [age, setAge] = useState(userData.age || "");
  const [height, setHeight] = useState(userData.height || "");
  const [weight, setWeight] = useState(userData.weight || "");
  const [gender, setGender] = useState(userData.gender || "");

  const handleNext = () => {
    onUpdate({ age, height, weight, gender });
    onNext();
  };

  console.log(age, height, weight, gender);
  return (
    <div>
      <h2>Step 1: Profile Setup</h2>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Height (cm)"
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight (kg)"
      />
      <select name="gender" onChange={(e) => setGender(e.target.value)}>
        <option value="gender" defaultChecked>
          Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ProfileSetup;
