import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import ProfileSetup from "../components/ProfileSetup";
import BMRAndWorkout from "../components/BMRAndWorkout";
import Macros from "../components/Macros";
import DailyCaloriesTracker from "../components/DailyCaloriesTracker";
import FoodSearch from "../components/FoodSearch";
import FoodData from "../assets/json/foodDictionary.json";

const Dashboard = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    age: 0,
    height: 0,
    weight: 0,
    gender: "",
    macrosSetupCompleted: false,
    calories: null,
    protein: 0,
    fats: 0,
    carbs: 0,
  });
  const [showComponents, setShowComponents] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Oceanic Fitness Hub";

    async function tryGetUserData() {
      try {
        const response = await fetch("/api/user/profilesetup");
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    tryGetUserData();
  }, []);

  const handleNextStep = (updatedData) => {
    setUserData((prevData) => ({ ...prevData, ...updatedData }));
    setStep(step + 1);
  };

  const handleSetupButtonClick = () => {
    setShowComponents(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ProfileSetup
            userData={userData}
            onNext={handleNextStep}
            onUpdate={handleNextStep}
          />
        );
      case 2:
        return (
          <BMRAndWorkout
            userData={userData}
            onUpdate={handleNextStep}
            onNext={handleNextStep}
          />
        );
      case 3:
        return <Macros userData={userData} />;
      default:
        return null;
    }
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
  };

  const renderFoodDetails = () => {
    if (selectedFood) {
      return <FoodDetails selectedFood={selectedFood} />;
    }
    return null; // If no food is selected, return null to hide the food details
  };
  return (
    <div>
      <Navbar />
      {!userData.macrosSetupCompleted ? (
        <button onClick={handleSetupButtonClick}>Set Up</button>
      ) : (
        <>
          <div>{userData.calories}</div>
          <DailyCaloriesTracker />
          <h1>Dashboard</h1>
          <FoodSearch foodData={FoodData} onFoodSelect={handleFoodSelect} />
        </>
      )}
      {showComponents && renderStep()}
      {renderFoodDetails()}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
