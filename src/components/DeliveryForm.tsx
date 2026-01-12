import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2, MapPin } from "lucide-react";
import { MenuItem } from "@/data/menuData";
import { useToast } from "@/hooks/use-toast";

interface DeliveryFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: MenuItem[];
  onRemoveItem: (itemId: string) => void;
  onClearItems: () => void;
}

const DeliveryForm = ({ isOpen, onClose, selectedItems, onRemoveItem, onClearItems }: DeliveryFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    notes: ""
  });

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price;
    }, 0).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please add items from the menu before placing an order.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Your order of ${selectedItems.length} item(s) totaling $${calculateTotal()} will be delivered to ${formData.address}.`,
    });

    setFormData({ fullName: "", phone: "", address: "", city: "", zipCode: "", notes: "" });
    onClearItems();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-serif">
            <ShoppingCart className="w-6 h-6 text-primary" />
            Delivery Order
          </DialogTitle>
          <DialogDescription>
            Complete your order details for delivery
          </DialogDescription>
        </DialogHeader>

        {/* Selected Items */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3">Your Order ({selectedItems.length} items)</h3>
          {selectedItems.length === 0 ? (
            <p className="text-muted-foreground text-sm">No items selected. Add items from the menu.</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedItems.map((item) => (
                <Card key={item.id} className="bg-muted/50">
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-foreground">{item.name}</span>
                      <span className="text-primary ml-2">{item.price}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-bold text-foreground">Total:</span>
                <span className="font-bold text-primary text-xl">${calculateTotal()}</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(812) 555-0123"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Delivery Address *
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="1234 Main Street"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                placeholder="Brazil"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                placeholder="47834"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any special requests or delivery instructions..."
              rows={3}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={selectedItems.length === 0}>
            Place Order - ${calculateTotal()}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryForm;
