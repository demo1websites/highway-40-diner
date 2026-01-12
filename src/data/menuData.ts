import tenderloinImg from "@/assets/tenderloin.jpg";
import burgerImg from "@/assets/burger.jpg";
import omeletImg from "@/assets/omelet.jpg";
import pieImg from "@/assets/pie.jpg";
import countryFriedSteakImg from "@/assets/country-fried-steak.jpg";
import saladImg from "@/assets/salad.jpg";
import friedPicklesImg from "@/assets/fried-pickles.jpg";
import bltImg from "@/assets/blt.jpg";
import friedOreosImg from "@/assets/fried-oreos.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "breakfast",
    name: "Breakfast & Brunch",
    description: "Start your day right with our hearty breakfast options",
    items: [
      { id: "b1", name: "Western Omelet", description: "Ham, green peppers, onions, cheese — served with toast", price: "$11.49", image: omeletImg },
      { id: "b2", name: "Mainstreet Omelet", description: "Tomatoes, onions, mushrooms, peppers, sausage, bacon, cheese", price: "$11.49" },
      { id: "b3", name: "Meat Lovers Omelet", description: "Bacon, ham, sausage, cheese", price: "$11.49" },
      { id: "b4", name: "Idaho Omelet", description: "Sausage & cheese with sausage gravy", price: "$11.49" },
      { id: "b5", name: "Cheese Lovers Omelet", description: "Loaded with cheese only", price: "$9.99" },
      { id: "b6", name: "Countryman Omelet", description: "Bacon, ham, peppers, onions, hash browns, cheese", price: "$11.49" },
      { id: "b7", name: "Veggie Omelet", description: "Tomatoes, onions, peppers, mushrooms, Swiss cheese", price: "$10.99" },
      { id: "b8", name: "The Platter", description: "3 eggs, bacon & sausage, potatoes & toast/pancakes", price: "$11.99" },
      { id: "b9", name: "Country Fried Steak & Eggs", description: "Classic comfort with eggs", price: "$11.99", image: countryFriedSteakImg },
      { id: "b10", name: "French Toast Breakfast Sandwich", description: "Sweet and savory perfection", price: "$10.99" },
      { id: "b11", name: "Top Hat", description: "Biscuits & gravy with 2 eggs", price: "$9.29" },
      { id: "b12", name: "Mountain Man Skillet", description: "Hash browns, bacon, sausage, onion, & cheese with gravy & eggs", price: "$11.29" },
    ]
  },
  {
    id: "burgers",
    name: "Burgers & Sandwiches",
    description: "Hand-crafted burgers and delicious sandwiches",
    items: [
      { id: "bs1", name: "Giant Fried Tenderloin", description: "Our famous crispy pork tenderloin sandwich", price: "$12.99", image: tenderloinImg },
      { id: "bs2", name: "Classic Cheeseburger", description: "Juicy beef patty with melted cheese", price: "$9.29" },
      { id: "bs3", name: "Bacon BBQ Cheeseburger", description: "Topped with crispy bacon and tangy BBQ sauce", price: "$11.99", image: burgerImg },
      { id: "bs4", name: "½ lb Steak Burger", description: "Half-pound burger with onions, peppers & cheese", price: "$12.99" },
      { id: "bs5", name: "Ranch Chicken Wrap", description: "Grilled chicken with creamy ranch", price: "$9.49" },
      { id: "bs6", name: "Philly Sandwich", description: "Classic Philly cheesesteak on hoagie", price: "$13.99" },
      { id: "bs7", name: "Crispy Buffalo Chicken", description: "Spicy buffalo chicken sandwich", price: "$9.99" },
      { id: "bs8", name: "Turkey Club Sandwich", description: "Triple-decker with turkey, bacon, lettuce, tomato", price: "$12.75" },
      { id: "bs9", name: "BLT", description: "Bacon, lettuce, and tomato classic", price: "$11.75", image: bltImg },
      { id: "bs10", name: "Grilled Chicken Sandwich", description: "Tender grilled chicken breast", price: "$10.99" },
    ]
  },
  {
    id: "salads",
    name: "Fresh Salads",
    description: "Crisp and refreshing salad options",
    items: [
      { id: "s1", name: "Chicken Chef Salad", description: "Fresh greens with grilled chicken, eggs, cheese", price: "$10.49", image: saladImg },
      { id: "s2", name: "Ham Chef Salad", description: "Loaded with ham, eggs, and fresh vegetables", price: "$10.49" },
      { id: "s3", name: "Turkey Chef Salad", description: "Turkey breast with all the fixings", price: "$10.99" },
      { id: "s4", name: "Sirloin Steak Salad", description: "Grilled sirloin over fresh greens", price: "$13.99" },
    ]
  },
  {
    id: "dinners",
    name: "Dinner Entrées",
    description: "Hearty dinner plates to satisfy your appetite",
    items: [
      { id: "d1", name: "Country Fried Steak", description: "Breaded and fried, smothered in creamy gravy", price: "$12.99", image: countryFriedSteakImg },
      { id: "d2", name: "Roasted Turkey Manhattan", description: "Open-faced with mashed potatoes and gravy", price: "$12.99" },
      { id: "d3", name: "Beef Liver & Onions", description: "Classic liver with caramelized onions and gravy", price: "$12.49" },
      { id: "d4", name: "Country Fried Chicken", description: "Golden fried chicken with all the fixings", price: "$12.49" },
      { id: "d5", name: "Chicken Parmesan", description: "Breaded chicken with marinara and garlic toast", price: "$12.99" },
      { id: "d6", name: "Chopped Steak", description: "Seasoned ground steak with gravy", price: "$11.99" },
    ]
  },
  {
    id: "appetizers",
    name: "Appetizers & Sides",
    description: "Perfect starters and accompaniments",
    items: [
      { id: "a1", name: "Fried Pickles", description: "Crispy breaded dill pickle chips", price: "$7.99", image: friedPicklesImg },
      { id: "a2", name: "Onion Rings", description: "Golden and crispy onion rings", price: "$6.99" },
      { id: "a3", name: "Fried Mushrooms", description: "Breaded and fried to perfection", price: "$7.49" },
      { id: "a4", name: "French Fries", description: "Classic golden fries", price: "$4.99" },
      { id: "a5", name: "Mashed Potatoes & Gravy", description: "Creamy homestyle potatoes", price: "$3.99" },
      { id: "a6", name: "Side Salad", description: "Fresh garden salad", price: "$4.49" },
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet endings to your meal",
    items: [
      { id: "ds1", name: "Homemade Fruit Pie", description: "Fresh baked daily with seasonal fruits", price: "$4.79", image: pieImg },
      { id: "ds2", name: "Homemade Cream Pie", description: "Rich and creamy, made in-house", price: "$4.79" },
      { id: "ds3", name: "Deep-Fried Oreos", description: "6 pieces of crispy, warm Oreo goodness", price: "$8.99", image: friedOreosImg },
    ]
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Refreshing drinks to complete your meal",
    items: [
      { id: "bv1", name: "Soft Drinks", description: "Coca-Cola products, free refills", price: "$2.99" },
      { id: "bv2", name: "Fresh Coffee", description: "Hot brewed coffee, free refills", price: "$2.49" },
      { id: "bv3", name: "Iced Tea", description: "Sweet or unsweetened", price: "$2.49" },
      { id: "bv4", name: "Milkshake", description: "Thick and creamy, various flavors", price: "$5.99" },
      { id: "bv5", name: "Orange Juice", description: "Fresh squeezed", price: "$3.49" },
    ]
  }
];
