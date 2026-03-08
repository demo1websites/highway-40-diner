import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, UtensilsCrossed, CalendarCheck, Truck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "@/components/admin/AdminLogin";
import MenuItemsManager from "@/components/admin/MenuItemsManager";
import ReservationsManager from "@/components/admin/ReservationsManager";
import DeliveryOrdersManager from "@/components/admin/DeliveryOrdersManager";
import EmployeesManager from "@/components/admin/EmployeesManager";
import { clearAdminPassword, getMenuItems, getReservations, getDeliveryOrders, getEmployees } from "@/lib/api";
import type { DbMenuItem, DbReservation, DbDeliveryOrder, DbEmployee } from "@/lib/api";

const Admin = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(!!sessionStorage.getItem("adminPassword"));
  const [menuItems, setMenuItems] = useState<DbMenuItem[]>([]);
  const [reservations, setReservations] = useState<DbReservation[]>([]);
  const [deliveryOrders, setDeliveryOrders] = useState<DbDeliveryOrder[]>([]);
  const [employees, setEmployees] = useState<DbEmployee[]>([]);

  const fetchAll = useCallback(async () => {
    try {
      const [m, r, d, e] = await Promise.all([getMenuItems(), getReservations(), getDeliveryOrders(), getEmployees()]);
      setMenuItems(m);
      setReservations(r);
      setDeliveryOrders(d);
      setEmployees(e);
    } catch {
      // API not available, leave empty
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchAll();
  }, [authenticated, fetchAll]);

  const handleLogout = () => {
    clearAdminPassword();
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold font-serif text-primary">Highway 40 Grill — Admin</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>View Site</Button>
            <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4 mr-1" /> Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="flex flex-wrap gap-1 h-auto bg-transparent mb-6">
            <TabsTrigger value="menu" className="gap-1"><UtensilsCrossed className="w-4 h-4" /> Menu Items ({menuItems.length})</TabsTrigger>
            <TabsTrigger value="reservations" className="gap-1"><CalendarCheck className="w-4 h-4" /> Reservations ({reservations.length})</TabsTrigger>
            <TabsTrigger value="orders" className="gap-1"><Truck className="w-4 h-4" /> Delivery Orders ({deliveryOrders.length})</TabsTrigger>
            <TabsTrigger value="employees" className="gap-1"><Users className="w-4 h-4" /> Employees ({employees.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="menu"><MenuItemsManager items={menuItems} onRefresh={fetchAll} /></TabsContent>
          <TabsContent value="reservations"><ReservationsManager items={reservations} onRefresh={fetchAll} /></TabsContent>
          <TabsContent value="orders"><DeliveryOrdersManager items={deliveryOrders} /></TabsContent>
          <TabsContent value="employees"><EmployeesManager items={employees} onRefresh={fetchAll} /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
