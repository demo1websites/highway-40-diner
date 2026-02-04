import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import { connectToDatabase, getDatabaseName } from "./db.js";
import { COLLECTIONS } from "./collections.js";

dotenv.config();

const app = express();
const port = Number(process.env.SERVER_PORT ?? 3001);

app.use(express.json());

const reservationSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  guests: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  specialRequests: z.string().optional(),
});

const orderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
});

const deliveryOrderSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
  total: z.number().nonnegative(),
});

app.get("/api/health", async (_req, res) => {
  try {
    await connectToDatabase();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", message: (error as Error).message });
  }
});

app.post("/api/reservations", async (req, res) => {
  const parsed = reservationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ status: "error", errors: parsed.error.flatten() });
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const result = await db.collection(COLLECTIONS.reservations).insertOne({
      ...parsed.data,
      createdAt: new Date(),
      status: "pending",
    });
    res.status(201).json({ status: "ok", id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ status: "error", message: (error as Error).message });
  }
});

app.post("/api/delivery-orders", async (req, res) => {
  const parsed = deliveryOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ status: "error", errors: parsed.error.flatten() });
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const result = await db.collection(COLLECTIONS.deliveryOrders).insertOne({
      ...parsed.data,
      createdAt: new Date(),
      status: "received",
    });
    res.status(201).json({ status: "ok", id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ status: "error", message: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
