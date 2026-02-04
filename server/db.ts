import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient> | null = null;

export async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI. Set it in your environment before starting the server.");
  }

  if (!clientPromise) {
    const client = new MongoClient(mongoUri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export function getDatabaseName() {
  return process.env.MONGODB_DB ?? "highway40";
}
