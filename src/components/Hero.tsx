import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import heroFood1 from "@/assets/hero-food-1.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import heroTenderloin from "@/assets/hero-tenderloin.jpg";
import heroFood2 from "@/assets/hero-food-2.jpg";

interface HeroProps {
  onMenuClick: () => void;
  onReservationClick: () => void;
}

const heroImages = [
  heroTenderloin,
  heroFood1,
  heroInterior,
  heroFood2,
];

const Hero = ({ onMenuClick, onReservationClick }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32">
      {/* Background Images with Crossfade */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/50" />

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

          {/* Image Indicators */}
          <div className="mt-8 flex gap-2 justify-center md:justify-start">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-accent w-6"
                    : "bg-card/50 hover:bg-card/80"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
