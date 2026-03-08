import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import { ObjectId } from "mongodb";
import { connectToDatabase, getDatabaseName } from "./db.js";
import { COLLECTIONS } from "./collections.js";

dotenv.config();

const app = express();
const port = Number(process.env.SERVER_PORT ?? 3001);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

app.use(express.json({ limit: "50mb" }));

// CORS
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-admin-password");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (_req.method === "OPTIONS") { res.sendStatus(200); return; }
  next();
});

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.headers["x-admin-password"] !== ADMIN_PASSWORD) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
    return;
  }
  next();
}

// ─── Schemas ───
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

const menuItemSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(500).optional().default(""),
  price: z.number().nonnegative(),
  category: z.string().min(1),
  images: z.array(z.string()).default([]),
  showOnLanding: z.boolean().default(true),
});

const employeeSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(1).max(30),
  email: z.string().email().max(255).optional().or(z.literal("")),
  role: z.string().min(1).max(100),
  salary: z.number().nonnegative().optional(),
  schedule: z.string().max(500).optional().default(""),
  hireDate: z.string().optional().default(""),
  photo: z.string().optional().default(""),
});

// ─── Health ───
app.get("/api/health", async (_req, res) => {
  try {
    await connectToDatabase();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", message: (error as Error).message });
  }
});

// ─── Admin auth check ───
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ status: "ok" });
  } else {
    res.status(401).json({ status: "error", message: "Invalid password" });
  }
});

// ─── Reservations ───
app.post("/api/reservations", async (req, res) => {
  const parsed = reservationSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ status: "error", errors: parsed.error.flatten() }); return; }
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const result = await db.collection(COLLECTIONS.reservations).insertOne({ ...parsed.data, createdAt: new Date(), status: "pending" });
    res.status(201).json({ status: "ok", id: result.insertedId.toString() });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.get("/api/reservations", requireAdmin, async (_req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const items = await db.collection(COLLECTIONS.reservations).find().sort({ createdAt: -1 }).toArray();
    res.json(items);
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.delete("/api/reservations/:id", requireAdmin, async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    await db.collection(COLLECTIONS.reservations).deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ status: "ok" });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.put("/api/reservations/:id/status", requireAdmin, async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    await db.collection(COLLECTIONS.reservations).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: req.body.status } }
    );
    res.json({ status: "ok" });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

// ─── Delivery Orders ───
app.post("/api/delivery-orders", async (req, res) => {
  const parsed = deliveryOrderSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ status: "error", errors: parsed.error.flatten() }); return; }
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const result = await db.collection(COLLECTIONS.deliveryOrders).insertOne({ ...parsed.data, createdAt: new Date(), status: "received" });
    res.status(201).json({ status: "ok", id: result.insertedId.toString() });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.get("/api/delivery-orders", requireAdmin, async (_req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const items = await db.collection(COLLECTIONS.deliveryOrders).find().sort({ createdAt: -1 }).toArray();
    res.json(items);
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

// ─── Menu Items ───
app.get("/api/menu-items", async (_req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const items = await db.collection(COLLECTIONS.menuItems).find().sort({ category: 1, name: 1 }).toArray();
    res.json(items);
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.post("/api/menu-items", requireAdmin, async (req, res) => {
  const parsed = menuItemSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ status: "error", errors: parsed.error.flatten() }); return; }
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const result = await db.collection(COLLECTIONS.menuItems).insertOne({ ...parsed.data, createdAt: new Date(), updatedAt: new Date() });
    res.status(201).json({ status: "ok", id: result.insertedId.toString() });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.put("/api/menu-items/:id", requireAdmin, async (req, res) => {
  const parsed = menuItemSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ status: "error", errors: parsed.error.flatten() }); return; }
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    await db.collection(COLLECTIONS.menuItems).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...parsed.data, updatedAt: new Date() } }
    );
    res.json({ status: "ok" });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.delete("/api/menu-items/:id", requireAdmin, async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    await db.collection(COLLECTIONS.menuItems).deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ status: "ok" });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

// ─── Employees ───
app.get("/api/employees", requireAdmin, async (_req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const items = await db.collection(COLLECTIONS.employees).find().sort({ name: 1 }).toArray();
    res.json(items);
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.post("/api/employees", requireAdmin, async (req, res) => {
  const parsed = employeeSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ status: "error", errors: parsed.error.flatten() }); return; }
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    const result = await db.collection(COLLECTIONS.employees).insertOne({ ...parsed.data, createdAt: new Date(), updatedAt: new Date() });
    res.status(201).json({ status: "ok", id: result.insertedId.toString() });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.put("/api/employees/:id", requireAdmin, async (req, res) => {
  const parsed = employeeSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ status: "error", errors: parsed.error.flatten() }); return; }
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    await db.collection(COLLECTIONS.employees).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...parsed.data, updatedAt: new Date() } }
    );
    res.json({ status: "ok" });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.delete("/api/employees/:id", requireAdmin, async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(getDatabaseName());
    await db.collection(COLLECTIONS.employees).deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ status: "ok" });
  } catch (error) { res.status(500).json({ status: "error", message: (error as Error).message }); }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
