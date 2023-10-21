import React from "react";

const FinalStep = ({ data, onSubmit, onBack }) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      <h2>Final Step: Review Your Information</h2>
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Email: {data.email}</p>
      <p>Age: {data.age}</p>
      <p>
        Weight: {data.weight} {data.weightUnit}
      </p>
      <p>Height: {data.height} cm</p>
      <p>Workout Type: {data.workoutType}</p>
      <button onClick={onBack}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FinalStep;
