import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  link: string;
  buttonText: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "KNOTION",
    subtitle: "~ Collection ~",
    description: "Masterful knotwork in every thread",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    link: "/collections/knotion",
    buttonText: "EXPLORE COLLECTION"
  },
  {
    id: 2,
    title: "NEW ARRIVAL",
    description: "Design emotion at its best. A preview of the latest from our core collections.",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    link: "/collections",
    buttonText: "VIEW NEW ARRIVALS"
  },
  {
    id: 3,
    title: "ANTONYM",
    description: "A rare beauty of opposites",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    link: "/collections/antonym",
    buttonText: "DISCOVER ANTONYM"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative mt-20 h-screen overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 carousel-slide transition-all duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-6xl px-4">
                <h2 className="font-serif text-7xl md:text-9xl lg:text-[10rem] font-bold mb-8 leading-none">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="text-2xl md:text-3xl mb-10 opacity-90 tracking-wide font-light">
                    {slide.subtitle}
                  </p>
                )}
                {slide.description && (
                  <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-4xl mx-auto font-light leading-relaxed">
                    {slide.description}
                  </p>
                )}
                <Link href={slide.link}>
                  <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-bold text-xl px-16 py-8 rounded-lg transition-all duration-300 hover:scale-105 premium-shadow tracking-wide">
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-warm-gold hover:bg-white/10 w-12 h-12"
        onClick={previousSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-warm-gold hover:bg-white/10 w-12 h-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-opacity ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            } hover:bg-white`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
