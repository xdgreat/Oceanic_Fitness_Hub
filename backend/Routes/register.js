import express from "express";
import bcrypt from "bcryptjs";
import { getDB } from "../Database/db.js";
import defaultUsers from "../Database/schema.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const db = getDB();
  const collection = db.collection("users");

  let {
    firstName,
    lastName,
    email,
    password,
    age,
    height,
    weight,
    weightUnit,
    workoutType,
    gender,
  } = req.body;

  const existingUser = await collection.findOne({ email: email });

  if (existingUser) {
    res.status(400).json("User already exists. Please login instead.");
    console.log("user exists");
  } else {
    try {
      const saltRounds = 9;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUserDb = defaultUsers;
      newUserDb.firstName = firstName;
      newUserDb.lastName = lastName;
      newUserDb.email = email;
      newUserDb.password = hashedPassword;
      newUserDb.height = parseInt(height);
      newUserDb.weight = parseInt(weight);
      newUserDb.weightUnit = weightUnit;
      newUserDb.workoutType = workoutType;
      newUserDb.age = parseInt(age);
      newUserDb.gender = gender;

      const newUser = await collection.insertOne(newUserDb);
      console.log(newUserDb);
      console.log("New user registered:", newUser);
      res.status(201).json({
        success: true,
        message: "User registered successfully, Login Now",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
});

export default router;
