import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB, closeDB, getDB } from "./db.js";
import session from "express-session";
import bcrypt from "bcryptjs";
import MongoDBSessionStore from "connect-mongodb-session";

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
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.post("/login", async (req, res) => {
  const db = getDB();
  const collection = db.collection("users");
  if (!req.body.username || !req.body.password)
    res.status(400).send("Missing Username or Password");
  else {
    let { username, password } = req.body;

    const user = await collection.findOne({ username: username });
    console.log(user);

    if (!user) {
      res.status(404).send({ message: "No  User Found" });
    } else {
      let validatePassword = await bcrypt.compare(password, user.password);
      console.log(`user: ${password}, db: ${user.password}`);
      if (!validatePassword) {
        res.status(400).send({ message: "Invalid Password" });
        console.log("invalid pw");
      } else {
        const user = { username: req.body.username };
        req.session.logged = true;
        req.session.username = user.username;
        req.session.cookie.expires = 30 * 24 * 60 * 60 * 1000;
        req.session.save();

        console.log(`User authenticated: ${user.username}`);
        console.log(req.session);
        res.json({
          success: true,
          username: user.username,
        });
      }
    }
  }
});

app.post("/register", async (req, res) => {
  const db = getDB();
  const collection = db.collection("users");

  let { username, password } = req.body;

  const user = await collection.insertOne({
    username: username,
    password: password,
  });

  console.log(user);

  console.log("user authenticated");
  res.cookie("username", username, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
  res.redirect("/");
});

app.get("/allusers", async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("users");

    console.log(req.session.username);
    const allUsers = await collection.find({}).toArray();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/test", async (req, res) => {
  console.log(req.session);
  console.log(req.session.username);
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});
