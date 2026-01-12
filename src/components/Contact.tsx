import { MapPin, Phone, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactProps {
  onReservationClick: () => void;
}

const Contact = ({ onReservationClick }: ContactProps) => {
  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
            Visit Us
          </h2>
          <p className="text-lg text-muted-foreground">
            We&apos;re conveniently located on historic US-40
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3064.5!2d-87.1086!3d39.5274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDMxJzM4LjYiTiA4N8KwMDYnMzEuMCJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Highway 40 Grill Location"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    1421 E National Ave<br />
                    Brazil, Indiana 47834, USA
                  </p>
                  <a 
                    href="https://www.google.com/maps/dir//39.5274,-87.1086"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm mt-2 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Phone</h3>
                  <a 
                    href="tel:+18124203330" 
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    (812) 420-3330
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Hours</h3>
                  <p className="text-muted-foreground">
                    <strong>Monday – Sunday</strong><br />
                    7:00 AM – 8:00 PM
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hours may vary on holidays
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Rating</h3>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                    <Star className="w-5 h-5 text-accent" />
                    <span className="ml-2 text-muted-foreground">3.5 - 3.9</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Popular among locals for comfort food
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={onReservationClick} size="lg" className="w-full">
              Reserve a Table
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
