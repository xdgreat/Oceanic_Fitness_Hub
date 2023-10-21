import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import FinalStep from "../components/FinalStep";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState("");

  useEffect(() => {
    document.title = "Register | Oceanic Fitness Hub";
  });
  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  async function tryRegister() {
    console.log(formData);
    const registerRes = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    }).then((res) => res.json());

    setResponse(registerRes);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={handleNext} />;
      case 2:
        return <StepTwo onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepThree onNext={handleNext} onBack={handleBack} />;
      case 4:
        return (
          <FinalStep
            data={formData}
            onSubmit={tryRegister}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      {renderStep()}
      <div>Response: {JSON.stringify(response)}</div>
      <BottomNav />
    </>
  );
};

export default Signup;
