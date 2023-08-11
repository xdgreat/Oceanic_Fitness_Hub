import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB, closeDB, getDB } from "./db.js";
import { auth } from "express-oauth2-jwt-bearer";
import request from "request";

const app = express();
const port = process.env.PORT || 3001;

const jwtCheck = auth({
  audience: "http://localhost:3001",
  issuerBaseURL: "https://dev-yzign61bxo3stxcg.au.auth0.com/",
  tokenSigningAlg: "RS256",
});
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' 'unsafe-inline'"
  );
  next();
});

app.use(jwtCheck);
// app.use(
//   auth({
//     issuerBaseURL: "https://dev-yzign61bxo3stxcg.au.auth0.com",
//     baseURL: "http://localhost:3001",
//     clientID: "wAniSj9oKbPpOZtq2oi3yTUzBJPXSfyX",
//     secret: "tpDKNoO3pBbSqGxKZcgup1T8diUnR0jeehpMVgvX78OvkjWw7z49mkX3mejP_VSX",
//     authRequired: false,
//     auth0Logout: true,
//   })
// );

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.post("/usercreate", async (req, res) => {
  const newData = req.body;

  try {
    const database = getDB();
    const collection = database.collection("user");

    await collection.insertOne(newData);

    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred while creating data" });
  }
});

app.get("/usercreated", async (req, res) => {
  try {
    const database = getDB();
    const collection = database.collection("user");

    const documents = await collection.find({}).toArray();

    res.json(documents);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.post("/api/add-data", async (req, res) => {
  const { data } = req.body;
  const { accessToken } = req.user;

  // Check if the access token is expired
  const isExpired = accessToken.expired();

  if (isExpired) {
    // Handle expired token
    res.status(401).json({ error: "Access token expired" });
    return;
  }

  // Access token is valid, proceed with adding data
  try {
    const database = getDB();
    const collection = database.collection("workoutData");

    await collection.insertOne({ userId: accessToken.claims.sub, data });

    res.status(201).json({ message: "Data added successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred while adding data" });
  }
});

app.get("/api/get-data", jwtCheck, (req, res) => {
  const userId = req.user;
  console.log(userId);

  try {
    const database = getDB();
    const collection = database.collection("workoutData");

    const userWorkoutData = collection.find({ userId }).toArray();

    res.json(userWorkoutData);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

var options = {
  method: "POST",
  url: "https://dev-yzign61bxo3stxcg.au.auth0.com/oauth/token",
  headers: { "content-type": "application/json" },
  body: '{"client_id":"b2km3m75OTQdi5PT96VoL09DI0wUaBHA","client_secret":"t_c3zDNNW63xfhE1I3UoRiqHSPJPlgR9QKq_UtmEPEQReR-K0kbQm8Tsjw3Fp8pd","audience":"http://localhost:3001","grant_type":"client_credentials"}',
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});
