import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DbDeliveryOrder } from "@/lib/api";

interface Props {
  items: DbDeliveryOrder[];
}

const DeliveryOrdersManager = ({ items }: Props) => {
  if (items.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No delivery orders yet.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map(order => (
        <Card key={order._id}>
          <CardContent className="p-4">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold text-foreground">{order.fullName}</h3>
                <p className="text-sm text-muted-foreground">{order.phone}</p>
                <p className="text-sm text-muted-foreground">📍 {order.address}, {order.city} {order.zipCode}</p>
                {order.notes && <p className="text-sm text-muted-foreground mt-1">📝 {order.notes}</p>}
              </div>
              <div className="text-right">
                <Badge>{order.status}</Badge>
                <p className="font-bold text-primary mt-1">${order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {order.items.map((item, i) => (
                <span key={i}>{item.name} (${item.price.toFixed(2)}){i < order.items.length - 1 ? ", " : ""}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DeliveryOrdersManager;
