import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DeliveryForm from "@/components/DeliveryForm";
import ReservationForm from "@/components/ReservationForm";
import { MenuItem } from "@/data/menuData";

const Index = () => {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAddItem = (item: MenuItem) => {
    setSelectedItems(prev => [...prev, item]);
  };

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearItems = () => {
    setSelectedItems([]);
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuClick={scrollToMenu}
        onDeliveryClick={() => setIsDeliveryOpen(true)}
        onReservationClick={() => setIsReservationOpen(true)}
      />
      
      <Hero 
        onMenuClick={scrollToMenu}
        onReservationClick={() => setIsReservationOpen(true)}
      />
      
      <About />
      
      <div ref={menuRef}>
        <MenuSection 
          selectedItems={selectedItems}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />
      </div>
      
      <Contact onReservationClick={() => setIsReservationOpen(true)} />
      
      <Footer />

      <DeliveryForm 
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
        selectedItems={selectedItems}
        onRemoveItem={handleRemoveItem}
        onClearItems={handleClearItems}
      />

      <ReservationForm 
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
};

export default Index;
