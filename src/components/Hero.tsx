import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-diner.jpg";
import heroFood1 from "@/assets/hero-food-1.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import heroTenderloin from "@/assets/hero-tenderloin.jpg";
import heroFood2 from "@/assets/hero-food-2.jpg";

interface HeroProps {
  onMenuClick: () => void;
  onReservationClick: () => void;
}

const heroImages = [
  { src: heroTenderloin, alt: "Giant Fried Tenderloin" },
  { src: heroFood1, alt: "Classic Breakfast Platter" },
  { src: heroInterior, alt: "Cozy Diner Interior" },
  { src: heroFood2, alt: "Sandwich & Soup Combo" },
];

const Hero = ({ onMenuClick, onReservationClick }: HeroProps) => {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  useEffect(() => {
    heroImages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleImages(prev => [...prev, index]);
      }, 400 * (index + 1));
    });
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center gap-1 justify-center lg:justify-start mb-4">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <Star className="w-5 h-5 text-accent" />
              <span className="ml-2 text-card text-sm">3.5+ Rating</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-card mb-4">
              Highway 40 Grill
            </h1>
            
            <p className="text-xl md:text-2xl text-card/90 mb-2">
              Classic American Comfort Food
            </p>
            
            <p className="text-base lg:text-lg text-card/80 mb-8 max-w-lg mx-auto lg:mx-0">
              A beloved roadside diner serving hearty breakfast, juicy burgers, and 
              homestyle favorites since generations. Located on historic US-40 in Brazil, Indiana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" onClick={onMenuClick}>
                View Our Menu
              </Button>
              <Button variant="heroOutline" size="xl" onClick={onReservationClick}>
                Reserve a Table
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 lg:gap-6 justify-center lg:justify-start text-card/90 text-sm">
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

          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 md:gap-4">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-700 ease-out ${
                  visibleImages.includes(index)
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                } ${index === 0 ? "row-span-2" : ""}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${
                    index === 0 ? "h-full min-h-[280px] md:min-h-[340px]" : "h-32 md:h-40"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute bottom-2 left-2 text-card text-xs md:text-sm font-medium">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
