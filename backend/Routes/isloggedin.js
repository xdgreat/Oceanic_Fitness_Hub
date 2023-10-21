import { Router, json } from "express";

const app = Router();

app.use(json());

app.get("/user/islogged", (req, res) => {
  if (req.session.username) {
    console.log("is logged in");
    res.status(200).json({ isLogged: true, success: true });
  } else {
    console.log("is not logged in");
    res.status(200).json({
      success: true,
      isLogged: false,
    });
  }
});
export default app;
