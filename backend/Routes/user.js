import { Router, json } from "express";
import { getDB } from "../Database/db.js";

const app = Router();

app.use(json());

app.get("/user", async (req, res) => {
  try {
    const userId = req.session.username;

    if (!userId) {
      return res.status(200).json({ isLoggedIn: false });
    }

    const db = getDB();
    const collection = db.collection("users");

    const user = await collection.findOne({ _id: userId });

    if (!user) {
      return res.status(200).json({ isLoggedIn: false });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default app;
