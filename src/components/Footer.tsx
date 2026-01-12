import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold font-serif text-card mb-4">
              Highway 40 Grill
            </h3>
            <p className="text-card/80">
              A classic American diner serving hearty comfort food since generations. 
              Your favorite roadside grill in Brazil, Indiana.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-card mb-4">Contact</h4>
            <div className="space-y-3 text-card/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                1421 E National Ave, Brazil, IN 47834
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+18124203330" className="hover:text-card transition-colors">
                  (812) 420-3330
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Open Daily: 7AM - 8PM
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-card mb-4">Quick Links</h4>
            <div className="space-y-2 text-card/80">
              <a href="#about" className="block hover:text-card transition-colors">About Us</a>
              <a href="#menu" className="block hover:text-card transition-colors">Menu</a>
              <a href="#contact" className="block hover:text-card transition-colors">Contact</a>
              <a 
                href="https://www.google.com/maps/dir//39.5274,-87.1086" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-card transition-colors"
              >
                Directions
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-card/20 pt-8 text-center text-card/60">
          <p>© {currentYear} Highway 40 Grill. All rights reserved.</p>
          <p className="text-sm mt-1">
            Family-owned classic American diner on US-40
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
