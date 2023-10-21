import { MongoClient } from "mongodb";

const uri = process.env.REACT_APP_ATLAS_URI;

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export function getDB() {
  return client.db("OceanicFitnessHub");
}

export async function closeDB() {
  await client.close();
  console.log("MongoDB connection closed");
}
