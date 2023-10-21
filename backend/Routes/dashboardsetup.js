import express from "express";
import { getDB } from "../Database/db.js";
import { isLoggedIn } from "./authroutes.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/user/profilesetup", async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("users");

    const userId = req.session.username;
    console.log(userId);
    const user = await collection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      calories: user.calories,
      protein: user.protein,
      carbs: user.carbs,
      fats: user.fats,
      macrosSetupCompleted: user.macrosSetupCompleted,
    });
  } catch (error) {
    console.error("Error getting user profile setup data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/user/update", async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("users");

    const userId = req.session.username;
    const user = await collection.findOne({ _id: userId });
    console.log("inn");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const { protein, carbs, fats, calories, macrosSetupCompleted } = req.body;

    // Add the current date to the trackingData.calories array
    const currentDate = new Date().toISOString().slice(0, 10);
    const newCaloriesData = {
      date: currentDate,
      dailyTargetCalories: parseInt(calories),
      caloriesConsumed: 0, // Initialize caloriesConsumed as 0
      caloriesBurned: 0, // Initialize caloriesBurned as 0
    };

    const updatedUser = {
      protein: parseInt(protein),
      carbs: parseInt(carbs),
      fats: parseInt(fats),
      calories: parseInt(calories),
      macrosSetupCompleted: macrosSetupCompleted,
    };

    // Use $push to add the new calories data to the trackingData.calories array
    await collection.updateOne(
      { _id: userId },
      {
        $set: updatedUser,
        $push: {
          "trackingData.calories": newCaloriesData,
        },
      }
    );
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
