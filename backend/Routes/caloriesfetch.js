import { Router, json } from "express";
import { getDB } from "../Database/db.js"; // Import your database connection function here

const app = Router();

app.use(json());

app.get("/user/calories/:date", async (req, res) => {
  try {
    const userId = req.session.username;
    const date = req.params.date;

    if (!userId) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const db = getDB();
    const collection = db.collection("users");

    const user = await collection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if caloriesData for the given date exists
    let caloriesData = user.trackingData.calories.find(
      (entry) => entry.date === date
    );

    // If caloriesData doesn't exist, create a new object
    if (!caloriesData) {
      // Get the target calories value from the database object
      const dailyTargetCalories = user.calories;

      // Create a new object with default values
      const newCaloriesData = {
        date: date,
        dailyTargetCalories: dailyTargetCalories, // Set it to the target calories value
        caloriesConsumed: 0, // Set your default value
        caloriesBurned: 0, // Set your default value
      };

      console.log(dailyTargetCalories);
      // Add the new object to the calories array
      user.trackingData.calories.push(newCaloriesData);

      // Update the user document in the database
      await collection.updateOne(
        { _id: userId },
        { $set: { "trackingData.calories": user.trackingData.calories } }
      );

      // Set caloriesData to the newly created object
      caloriesData = newCaloriesData;
    }

    res.status(200).json(caloriesData);
  } catch (error) {
    console.error("Error getting calories data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/user/calories/:date", async (req, res) => {
  try {
    const userId = req.session.username;
    const date = req.params.date;
    const newCaloriesConsumed = parseInt(req.body.caloriesConsumed);

    console.log(newCaloriesConsumed, req.body.caloriesConsumed);
    if (!userId) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const db = getDB();
    const collection = db.collection("users");

    const user = await collection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const caloriesDataIndex = user.trackingData.calories.findIndex(
      (entry) => entry.date === date
    );

    if (caloriesDataIndex !== -1) {
      user.trackingData.calories[caloriesDataIndex].caloriesConsumed +=
        newCaloriesConsumed;
    } else {
      const newCaloriesData = {
        date,
        dailyTargetCalories: 0,
        caloriesConsumed: newCaloriesConsumed,
        caloriesBurned: 0, //TODO: change the calories based on the calories burnt during workouts etc
      };
      user.trackingData.calories.push(newCaloriesData);
    }

    await collection.updateOne(
      { _id: userId },
      { $set: { "trackingData.calories": user.trackingData.calories } }
    );

    res.status(200).json({ message: "Calories data updated successfully" });
  } catch (error) {
    console.error("Error updating calories data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default app;
