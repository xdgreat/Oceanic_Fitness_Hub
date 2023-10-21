import express from "express";
import bcrypt from "bcryptjs";
import { getDB } from "../Database/db.js";
import { isLoggedIn } from "../Routes/authroutes.js";

const router = express.Router();

router.post("/login", isLoggedIn, async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("users");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or Password" });
    }

    const user = await collection.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    req.session.logged = true;
    req.session.username = user._id;
    req.session.cookie.expires = Date.now() + 30 * 24 * 60 * 60 * 1000;
    req.session.save();

    res.json({
      success: true,
      username: user.firstName,
    });
    console.log(`Authenticated: ${user.firstName}`);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
