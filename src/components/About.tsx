import { Utensils, Users, Clock, DollarSign } from "lucide-react";

const features = [
  {
    icon: Utensils,
    title: "Comfort Food",
    description: "Hearty American classics made with care and generous portions"
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Cozy atmosphere perfect for families, groups, and solo diners"
  },
  {
    icon: Clock,
    title: "Open Daily",
    description: "Serving breakfast, lunch & dinner 7 days a week, 7AM to 8PM"
  },
  {
    icon: DollarSign,
    title: "Great Value",
    description: "Affordable pricing with large portions, averaging $10-$20 per person"
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
            Welcome to Highway 40 Grill
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A classic American diner-style restaurant known for its hearty comfort food, 
            friendly atmosphere, and affordable prices. Popular among locals and travelers 
            along US-40.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-background rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Specials */}
        <div className="mt-16 bg-primary/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold font-serif text-foreground mb-4">
            🌮 Don&apos;t Miss Our Specials!
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-foreground">
            <span className="bg-card px-4 py-2 rounded-full shadow-sm">
              <strong>Taco Tuesday</strong> - Customer Favorite!
            </span>
            <span className="bg-card px-4 py-2 rounded-full shadow-sm">
              <strong>Daily Meal Specials</strong>
            </span>
            <span className="bg-card px-4 py-2 rounded-full shadow-sm">
              <strong>Soup & Salad Bar</strong> - Select Days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
