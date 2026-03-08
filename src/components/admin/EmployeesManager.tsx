import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Upload, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DbEmployee, createEmployee, updateEmployee, deleteEmployee, fileToBase64 } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  items: DbEmployee[];
  onRefresh: () => void;
}

const emptyForm = { name: "", phone: "", email: "", role: "", salary: 0, schedule: "", hireDate: "", photo: "" };

const EmployeesManager = ({ items, onRefresh }: Props) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setIsFormOpen(true); };
  const openEdit = (emp: DbEmployee) => {
    setEditId(emp._id);
    setForm({ name: emp.name, phone: emp.phone, email: emp.email ?? "", role: emp.role, salary: emp.salary ?? 0, schedule: emp.schedule, hireDate: emp.hireDate, photo: emp.photo });
    setIsFormOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setForm(f => ({ ...f, photo: base64 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateEmployee(editId, form);
        toast({ title: "Employee updated" });
      } else {
        await createEmployee(form);
        toast({ title: "Employee added" });
      }
      setIsFormOpen(false);
      onRefresh();
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await deleteEmployee(id);
      toast({ title: "Deleted" });
      onRefresh();
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openAdd}><Plus className="w-4 h-4 mr-1" /> Add Employee</Button>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No employees yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(emp => (
            <Card key={emp._id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={emp.photo} />
                    <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{emp.name}</h3>
                    <p className="text-sm text-primary font-medium">{emp.role}</p>
                    <p className="text-sm text-muted-foreground">{emp.phone}</p>
                    {emp.email && <p className="text-sm text-muted-foreground truncate">{emp.email}</p>}
                    {emp.salary ? <p className="text-sm text-muted-foreground">${emp.salary.toLocaleString()}/yr</p> : null}
                    {emp.schedule && <p className="text-xs text-muted-foreground">📅 {emp.schedule}</p>}
                    {emp.hireDate && <p className="text-xs text-muted-foreground">Hired: {emp.hireDate}</p>}
                  </div>
                </div>
                <div className="flex gap-1 mt-3 justify-end">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(emp)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(emp._id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit" : "Add"} Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={form.photo} />
                <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
              </Avatar>
              <label className="cursor-pointer">
                <Button type="button" variant="outline" size="sm" asChild>
                  <span><Upload className="w-4 h-4 mr-1" /> Upload Photo</span>
                </Button>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Role *</Label>
                <Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Cook, Server, Manager..." required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Salary ($/yr)</Label>
                <Input type="number" min="0" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: Number(e.target.value) }))} />
              </div>
              <div className="space-y-2">
                <Label>Hire Date</Label>
                <Input type="date" value={form.hireDate} onChange={e => setForm(f => ({ ...f, hireDate: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Schedule</Label>
              <Input value={form.schedule} onChange={e => setForm(f => ({ ...f, schedule: e.target.value }))} placeholder="Mon-Fri 7AM-3PM" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : editId ? "Update Employee" : "Add Employee"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeesManager;
