import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit, X, Upload, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DbMenuItem, createMenuItem, updateMenuItem, deleteMenuItem, fileToBase64 } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { id: "breakfast", name: "Breakfast & Brunch" },
  { id: "burgers", name: "Burgers & Sandwiches" },
  { id: "salads", name: "Fresh Salads" },
  { id: "dinners", name: "Dinner Entrées" },
  { id: "appetizers", name: "Appetizers & Sides" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

interface Props {
  items: DbMenuItem[];
  onRefresh: () => void;
}

const emptyForm = { name: "", description: "", price: 0, category: "breakfast", images: [] as string[], showOnLanding: true };

const MenuItemsManager = ({ items, onRefresh }: Props) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  const openAdd = () => { setEditId(null); setForm(emptyForm); setIsFormOpen(true); };
  const openEdit = (item: DbMenuItem) => {
    setEditId(item._id);
    setForm({ name: item.name, description: item.description, price: item.price, category: item.category, images: item.images, showOnLanding: item.showOnLanding });
    setIsFormOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const base64 = await fileToBase64(files[i]);
      newImages.push(base64);
    }
    setForm(f => ({ ...f, images: [...f.images, ...newImages] }));
  };

  const removeImage = (index: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateMenuItem(editId, form);
        toast({ title: "Menu item updated" });
      } else {
        await createMenuItem(form);
        toast({ title: "Menu item added" });
      }
      setIsFormOpen(false);
      onRefresh();
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    try {
      await deleteMenuItem(id);
      toast({ title: "Deleted" });
      onRefresh();
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    }
  };

  const filtered = filterCategory === "all" ? items : items.filter(i => i.category === filterCategory);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button onClick={openAdd}><Plus className="w-4 h-4 mr-1" /> Add Item</Button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No menu items found. Add your first item!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <Card key={item._id} className="overflow-hidden">
              {item.images.length > 0 && (
                <div className="h-40 overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  {item.images.length > 1 && (
                    <span className="absolute top-2 right-2 bg-foreground/70 text-background text-xs px-2 py-1 rounded-full">
                      +{item.images.length - 1} photos
                    </span>
                  )}
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.showOnLanding ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {item.showOnLanding ? "Visible" : "Hidden"}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit" : "Add"} Menu Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($) *</Label>
                <Input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} required />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.showOnLanding} onCheckedChange={v => setForm(f => ({ ...f, showOnLanding: v }))} />
              <Label>Show on landing page</Label>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><ImageIcon className="w-4 h-4" /> Images</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-md overflow-hidden border border-border">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-bl-md p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-md p-3 hover:bg-muted/50 transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload images (multiple allowed)</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : editId ? "Update Item" : "Add Item"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuItemsManager;
