import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import heroImage from "@/assets/hero-diner.jpg";

interface HeroProps {
  onMenuClick: () => void;
  onReservationClick: () => void;
}

const Hero = ({ onMenuClick, onReservationClick }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
        <div className="max-w-2xl">
          <div className="flex items-center gap-1 justify-center md:justify-start mb-4">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
            <Star className="w-5 h-5 text-accent" />
            <span className="ml-2 text-card text-sm">3.5+ Rating</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-card mb-4">
            Highway 40 Grill
          </h1>
          
          <p className="text-xl md:text-2xl text-card/90 mb-2">
            Classic American Comfort Food
          </p>
          
          <p className="text-lg text-card/80 mb-8 max-w-lg">
            A beloved roadside diner serving hearty breakfast, juicy burgers, and 
            homestyle favorites since generations. Located on historic US-40 in Brazil, Indiana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button variant="hero" size="xl" onClick={onMenuClick}>
              View Our Menu
            </Button>
            <Button variant="heroOutline" size="xl" onClick={onReservationClick}>
              Reserve a Table
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-start text-card/90 text-sm">
            <span className="flex items-center gap-2">
              ✓ Family Friendly
            </span>
            <span className="flex items-center gap-2">
              ✓ Large Portions
            </span>
            <span className="flex items-center gap-2">
              ✓ Budget Friendly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
