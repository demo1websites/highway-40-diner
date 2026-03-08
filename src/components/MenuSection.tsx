import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Check } from "lucide-react";
import { menuData, MenuItem } from "@/data/menuData";
import { getMenuItems, DbMenuItem } from "@/lib/api";
import MenuItemImageCycler from "@/components/MenuItemImageCycler";

interface MenuSectionProps {
  selectedItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (itemId: string) => void;
}

interface DisplayItem {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
}

interface DisplayCategory {
  id: string;
  name: string;
  description: string;
  items: DisplayItem[];
}

const CATEGORY_META: Record<string, { name: string; description: string }> = {
  breakfast: { name: "Breakfast & Brunch", description: "Start your day right with our hearty breakfast options" },
  burgers: { name: "Burgers & Sandwiches", description: "Hand-crafted burgers and delicious sandwiches" },
  salads: { name: "Fresh Salads", description: "Crisp and refreshing salad options" },
  dinners: { name: "Dinner Entrées", description: "Hearty dinner plates to satisfy your appetite" },
  appetizers: { name: "Appetizers & Sides", description: "Perfect starters and accompaniments" },
  desserts: { name: "Desserts", description: "Sweet endings to your meal" },
  beverages: { name: "Beverages", description: "Refreshing drinks to complete your meal" },
};

const MenuSection = ({ selectedItems, onAddItem, onRemoveItem }: MenuSectionProps) => {
  const [dbItems, setDbItems] = useState<DbMenuItem[]>([]);
  const [useDb, setUseDb] = useState(false);

  useEffect(() => {
    getMenuItems()
      .then(items => {
        const visible = items.filter(i => i.showOnLanding);
        if (visible.length > 0) {
          setDbItems(visible);
          setUseDb(true);
        }
      })
      .catch(() => {/* fallback to static */});
  }, []);

  // Build display categories
  const categories: DisplayCategory[] = useDb
    ? Object.entries(
        dbItems.reduce<Record<string, DisplayItem[]>>((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push({
            id: item._id,
            name: item.name,
            description: item.description,
            price: `$${item.price.toFixed(2)}`,
            images: item.images,
          });
          return acc;
        }, {})
      )
        .map(([catId, items]) => ({
          id: catId,
          name: CATEGORY_META[catId]?.name ?? catId,
          description: CATEGORY_META[catId]?.description ?? "",
          items,
        }))
        .sort((a, b) => {
          const order = Object.keys(CATEGORY_META);
          return order.indexOf(a.id) - order.indexOf(b.id);
        })
    : menuData.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        items: cat.items.map(i => ({
          id: i.id,
          name: i.name,
          description: i.description,
          price: i.price,
          images: i.image ? [i.image] : [],
        })),
      }));

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.id === activeCategory)) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const isItemSelected = (itemId: string) => selectedItems.some(item => item.id === itemId);

  const handleItemClick = (item: DisplayItem) => {
    const menuItem: MenuItem = { id: item.id, name: item.name, description: item.description, price: item.price, image: item.images[0] };
    if (isItemSelected(item.id)) {
      onRemoveItem(item.id);
    } else {
      onAddItem(menuItem);
    }
  };

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">Our Menu</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our delicious selection of classic American comfort food</p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <p className="text-center text-muted-foreground mb-8">{cat.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map(item => (
                  <Card
                    key={item.id}
                    className={`overflow-hidden hover:shadow-lg transition-all cursor-pointer ${isItemSelected(item.id) ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.images.length > 0 && (
                      <MenuItemImageCycler images={item.images} alt={item.name} className="h-48" />
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
                        onClick={e => { e.stopPropagation(); handleItemClick(item); }}
                      >
                        {isItemSelected(item.id) ? <><Check className="w-4 h-4 mr-1" /> Added</> : <><Plus className="w-4 h-4 mr-1" /> Add to Order</>}
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
