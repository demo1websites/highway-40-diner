import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { DbReservation, deleteReservation, updateReservationStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Props {
  items: DbReservation[];
  onRefresh: () => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-secondary text-secondary-foreground",
  confirmed: "bg-primary/10 text-primary",
  cancelled: "bg-destructive/10 text-destructive",
};

const ReservationsManager = ({ items, onRefresh }: Props) => {
  const { toast } = useToast();

  const handleStatus = async (id: string, status: string) => {
    try {
      await updateReservationStatus(id, status);
      toast({ title: `Reservation ${status}` });
      onRefresh();
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this reservation?")) return;
    try {
      await deleteReservation(id);
      toast({ title: "Deleted" });
      onRefresh();
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    }
  };

  if (items.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No reservations yet.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map(r => (
        <Card key={r._id}>
          <CardContent className="p-4">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold text-foreground">{r.fullName}</h3>
                <p className="text-sm text-muted-foreground">{r.phone} {r.email && `• ${r.email}`}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  📅 {r.date} at {r.time} • 👥 {r.guests} guests
                </p>
                {r.specialRequests && <p className="text-sm text-muted-foreground mt-1">📝 {r.specialRequests}</p>}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={statusColors[r.status] ?? ""}>{r.status}</Badge>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" onClick={() => handleStatus(r._id, "confirmed")} className="text-primary">
                <CheckCircle className="w-4 h-4 mr-1" /> Confirm
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleStatus(r._id, "pending")}>
                <Clock className="w-4 h-4 mr-1" /> Pending
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleStatus(r._id, "cancelled")} className="text-destructive">
                <XCircle className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(r._id)} className="text-destructive ml-auto">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReservationsManager;
