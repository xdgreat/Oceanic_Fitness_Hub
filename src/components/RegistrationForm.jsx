import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import FinalStep from "./FinalStep";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };

  return (
    <div>
      {step === 1 && <StepOne onNext={handleNextStep} />}
      {step === 2 && <StepTwo onNext={handleNextStep} />}
      {step === 3 && <StepThree onNext={handleNextStep} />}
      {step === 4 && <FinalStep data={userData} onSubmit={handleSubmit} />}
    </div>
  );
};

export default RegistrationForm;
