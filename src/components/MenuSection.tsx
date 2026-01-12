import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Check } from "lucide-react";
import { menuData, MenuItem } from "@/data/menuData";

interface MenuSectionProps {
  selectedItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (itemId: string) => void;
}

const MenuSection = ({ selectedItems, onAddItem, onRemoveItem }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);

  const isItemSelected = (itemId: string) => {
    return selectedItems.some(item => item.id === itemId);
  };

  const handleItemClick = (item: MenuItem) => {
    if (isItemSelected(item.id)) {
      onRemoveItem(item.id);
    } else {
      onAddItem(item);
    }
  };

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious selection of classic American comfort food
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8">
            {menuData.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuData.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <p className="text-center text-muted-foreground mb-8">{category.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <Card 
                    key={item.id} 
                    className={`overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                      isItemSelected(item.id) ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                        <span className="font-bold text-primary">{item.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                      <Button 
                        variant={isItemSelected(item.id) ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                      >
                        {isItemSelected(item.id) ? (
                          <>
                            <Check className="w-4 h-4 mr-1" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-1" /> Add to Order
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MenuSection;
