import { useState, useEffect } from "react";

interface Props {
  images: string[];
  alt: string;
  className?: string;
}

const MenuItemImageCycler = ({ images, alt, className = "" }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${alt} ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === currentIndex ? "bg-primary-foreground" : "bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItemImageCycler;
