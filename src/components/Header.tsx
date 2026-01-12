import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Phone, Clock } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onDeliveryClick: () => void;
  onReservationClick: () => void;
}

const Header = ({ onMenuClick, onDeliveryClick, onReservationClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      {/* Top info bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              1421 E National Ave, Brazil, IN
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              (812) 420-3330
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Open Daily: 7AM - 8PM
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-bold font-serif text-primary">
              Highway 40 Grill
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <button 
              onClick={onMenuClick}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Menus
            </button>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
            <Button variant="warm" onClick={onDeliveryClick}>
              Delivery
            </Button>
            <Button onClick={onReservationClick}>
              Reservation
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            <a href="#about" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              About
            </a>
            <button 
              onClick={() => { onMenuClick(); setIsOpen(false); }}
              className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Menus
            </button>
            <a href="#contact" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Contact
            </a>
            <div className="flex gap-3 pt-2">
              <Button variant="warm" onClick={() => { onDeliveryClick(); setIsOpen(false); }} className="flex-1">
                Delivery
              </Button>
              <Button onClick={() => { onReservationClick(); setIsOpen(false); }} className="flex-1">
                Reservation
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
