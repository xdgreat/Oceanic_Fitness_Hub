import express from "express";
import { isLoggedIn } from "../Routes/authroutes.js";

const router = express.Router();

router.post("/login", isLoggedIn, async (req, res) => {
  return res.status(400).json({
    message: "Login functionality is disabled. Please log out first.",
  });
});

export default router;
