const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

function getAdminPassword(): string {
  return sessionStorage.getItem("adminPassword") ?? "";
}

export function setAdminPassword(password: string) {
  sessionStorage.setItem("adminPassword", password);
}

export function clearAdminPassword() {
  sessionStorage.removeItem("adminPassword");
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": getAdminPassword(),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

// Admin auth
export const adminLogin = (password: string) =>
  request("/api/admin/login", { method: "POST", body: JSON.stringify({ password }) });

// Menu items
export interface DbMenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  showOnLanding: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getMenuItems = () => request<DbMenuItem[]>("/api/menu-items");
export const createMenuItem = (data: Omit<DbMenuItem, "_id" | "createdAt" | "updatedAt">) =>
  request("/api/menu-items", { method: "POST", body: JSON.stringify(data) });
export const updateMenuItem = (id: string, data: Omit<DbMenuItem, "_id" | "createdAt" | "updatedAt">) =>
  request(`/api/menu-items/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteMenuItem = (id: string) =>
  request(`/api/menu-items/${id}`, { method: "DELETE" });

// Reservations
export interface DbReservation {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  guests: string;
  date: string;
  time: string;
  specialRequests?: string;
  status: string;
  createdAt: string;
}

export const getReservations = () => request<DbReservation[]>("/api/reservations");
export const deleteReservation = (id: string) =>
  request(`/api/reservations/${id}`, { method: "DELETE" });
export const updateReservationStatus = (id: string, status: string) =>
  request(`/api/reservations/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) });

// Delivery orders
export interface DbDeliveryOrder {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  notes?: string;
  items: { id: string; name: string; price: number }[];
  total: number;
  status: string;
  createdAt: string;
}

export const getDeliveryOrders = () => request<DbDeliveryOrder[]>("/api/delivery-orders");

// Employees
export interface DbEmployee {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role: string;
  salary?: number;
  schedule: string;
  hireDate: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export const getEmployees = () => request<DbEmployee[]>("/api/employees");
export const createEmployee = (data: Omit<DbEmployee, "_id" | "createdAt" | "updatedAt">) =>
  request("/api/employees", { method: "POST", body: JSON.stringify(data) });
export const updateEmployee = (id: string, data: Omit<DbEmployee, "_id" | "createdAt" | "updatedAt">) =>
  request(`/api/employees/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteEmployee = (id: string) =>
  request(`/api/employees/${id}`, { method: "DELETE" });

// File to base64 helper
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
