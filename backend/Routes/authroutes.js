import { Router, json } from "express";
const app = Router();

app.use(json());

export const isLoggedIn = (req, res, next) => {
  if (req?.session?.logged) {
    return res
      .status(403)
      .json({ message: "You are already logged in. Please log out first." });
  }
  next();
};

app.get("/logout", (req, res) => {
  console.log(`${req.session.username} logged out`);
  req.session.destroy((err) => {
    if (err) console.log(`Error destroying session: ${err}`);
    res.json({
      success: true,
    });
  });
});

export default app;
