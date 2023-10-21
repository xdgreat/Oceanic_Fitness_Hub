import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB, closeDB, getDB } from "./backend/Database/db.js";
import session from "express-session";
import MongoDBSessionStore from "connect-mongodb-session";
import login from "./backend/Routes/login.js";
import registerRouter from "./backend/Routes/register.js";
import authRouter, { isLoggedIn } from "./backend/Routes/authroutes.js";
import dashboardRoute from "./backend/Routes/dashboardsetup.js";
import isLoggedRoute from "./backend/Routes/isloggedin.js";
import caloriesRoute from "./backend/Routes/caloriesfetch.js";

import userRoute from "./backend/Routes/user.js";

const MongoDBStore = MongoDBSessionStore(session);

const app = express();
const port = process.env.PORT || 3001;

const store = new MongoDBStore({
  uri: process.env.REACT_APP_ATLAS_URI,
  databaseName: "OceanicFitnessHub",
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' 'unsafe-inline'"
  );
  next();
});

app.use(
  session({
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "strict",
      secure: false,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/api", login);
app.use("/api", registerRouter);
app.use("/api", authRouter);
app.use("/api", dashboardRoute);
app.use("/api", userRoute);
app.use("/api", isLoggedRoute);
app.use("/api", caloriesRoute);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});
