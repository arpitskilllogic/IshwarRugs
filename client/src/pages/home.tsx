import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { Link } from "wouter";
import { api } from "@/lib/api";
import HeroCarousel from "@/components/hero-carousel";
import CollectionGrid from "@/components/collection-grid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const { data: featuredCollections, isLoading: collectionsLoading } = useQuery({
    queryKey: ["/api/collections/featured"],
    queryFn: api.collections.getFeatured,
  });

  const { data: contemporaryCollections, isLoading: contemporaryLoading } = useQuery({
    queryKey: ["/api/collections/category/contemporary"],
    queryFn: () => api.collections.getByCategory("contemporary"),
  });

  const { data: modernCollections, isLoading: modernLoading } = useQuery({
    queryKey: ["/api/collections/category/modern"],
    queryFn: () => api.collections.getByCategory("modern"),
  });

  const { data: traditionalCollections, isLoading: traditionalLoading } = useQuery({
    queryKey: ["/api/collections/category/traditional"],
    queryFn: () => api.collections.getByCategory("traditional"),
  });

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Brand Introduction */}
      <section className="py-32 px-4 bg-gradient-to-b from-background via-luxury-brown to-background">
        <div className="max-w-8xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-premium-gold leading-relaxed mb-8 font-light">
            Fine handcrafted carpets since 1881
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-6xl mx-auto font-light">
            An exclusive collection - designed to stir emotion, brought to life unlike any other. 
            The hand knotted carpet, woven inch by inch. And the hand tufted carpet, crafted with care and technique.
          </p>
        </div>
      </section>

      {/* Explore Our Rugs */}
      <section className="py-32 bg-gradient-to-b from-background to-luxury-brown">
        <div className="max-w-8xl mx-auto px-4">
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-center text-premium-gold mb-20">
            EXPLORE OUR RUGS
          </h2>
          
          <Tabs defaultValue="style" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-16 glass-effect h-14">
              <TabsTrigger value="style" className="font-semibold text-lg">BY STYLE</TabsTrigger>
              <TabsTrigger value="collection" className="font-semibold text-lg">BY COLLECTION</TabsTrigger>
            </TabsList>
            
            <TabsContent value="style" className="space-y-32">
              {/* Contemporary Section */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-premium-gold mb-8">
                    CONTEMPORARY
                  </h3>
                  <p className="text-xl text-foreground/80 leading-relaxed mb-10 font-light">
                    The bridge between past and present, these home carpets combine traditional carpet 
                    design elements with contemporary stylistics and colours, evoking sensations that 
                    are familiar yet altogether new.
                  </p>
                  <Link href="/collections?category=contemporary">
                    <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-bold px-12 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105 premium-shadow">
                      EXPLORE THE COLLECTION
                    </Button>
                  </Link>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="grid grid-cols-2 gap-6">
                    {!contemporaryLoading && contemporaryCollections?.slice(0, 4).map((collection, index) => (
                      <div key={collection.id} className="relative group overflow-hidden rounded-2xl premium-shadow">
                        <img
                          src={collection.heroImage}
                          alt={collection.name}
                          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <h4 className="text-white font-serif text-lg font-bold">{collection.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modern Section */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="grid grid-cols-2 gap-6">
                    {!modernLoading && modernCollections?.slice(0, 4).map((collection, index) => (
                      <div key={collection.id} className="relative group overflow-hidden rounded-2xl premium-shadow">
                        <img
                          src={collection.heroImage}
                          alt={collection.name}
                          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <h4 className="text-white font-serif text-lg font-bold">{collection.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-premium-gold mb-8">
                    MODERN
                  </h3>
                  <p className="text-xl text-foreground/80 leading-relaxed mb-10 font-light">
                    Contemporary carpet designs that are current and modern, reflecting new and diverse 
                    thematic, stylistic and colour orientation. The contemporary rugs reflect geometrics, 
                    organics, abstract art, pop art, from the minimal to the bold and vibrant.
                  </p>
                  <Link href="/collections?category=modern">
                    <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-bold px-12 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105 premium-shadow">
                      EXPLORE THE COLLECTION
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Traditional Section */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-premium-gold mb-8">
                    TRADITIONAL
                  </h3>
                  <p className="text-xl text-foreground/80 leading-relaxed mb-10 font-light">
                    Heralding age-old design themes, these are handmade Indian carpets with classic 
                    patterns, telling stories with traditional symbolism, motifs and cohesive colour. 
                    A varied range of carpet flooring in a combination of themes, materials and qualities.
                  </p>
                  <Link href="/collections?category=traditional">
                    <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-bold px-12 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105 premium-shadow">
                      EXPLORE THE COLLECTION
                    </Button>
                  </Link>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="grid grid-cols-2 gap-6">
                    {!traditionalLoading && traditionalCollections?.slice(0, 4).map((collection, index) => (
                      <div key={collection.id} className="relative group overflow-hidden rounded-2xl premium-shadow">
                        <img
                          src={collection.heroImage}
                          alt={collection.name}
                          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <h4 className="text-white font-serif text-lg font-bold">{collection.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="collection">
              {collectionsLoading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown"></div>
                </div>
              ) : (
                <CollectionGrid collections={featuredCollections || []} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Collections */}
      {!collectionsLoading && featuredCollections && (
        <CollectionGrid 
          collections={featuredCollections} 
          title="FEATURED COLLECTIONS" 
        />
      )}

      {/* Design Emotion Video Section */}
      <section className="py-20 bg-primary-brown">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-warm-gold mb-4">
              DESIGN EMOTION
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl text-cream">
              ISHWAR AND THE BIRTH OF THE BEAUTIFUL
            </h3>
          </div>
          
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
              alt="Carpet weaving process showing artisan craftsmanship"
              className="w-full h-96 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="bg-warm-gold text-primary-brown w-20 h-20 rounded-full hover:bg-opacity-90 transition-all"
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          </div>
          
          <p className="text-center text-cream text-lg mt-8 leading-relaxed">
            Watch our series of exclusive interviews with distinguished figures from the world of art, 
            architecture, and design. Where we explore the unique synergy between Art and Luxury and 
            how the two concepts intricately intertwine within the realm of interior design.
          </p>
        </div>
      </section>

      {/* Custom Design Process */}
      <section className="py-20 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-brown mb-4">
              DESIGN YOUR OWN RUG
            </h2>
            <p className="text-xl text-primary-brown opacity-80">
              From concept to creation, we bring your vision to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Conceptualization */}
            <div className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1541960071727-c531398e7494?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Designer conceptualizing carpet patterns"
                  className="w-full h-48 object-cover image-hover-scale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-warm-gold bg-opacity-20"></div>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-brown mb-4">
                Conceptualization
              </h3>
              <p className="text-primary-brown opacity-80 leading-relaxed">
                Have a fleeting notion or a well-rounded idea? We have an in-house design 
                studio that creates original, beautiful, bespoke designs.
              </p>
            </div>

            {/* Development */}
            <div className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Premium carpet materials and yarn selection"
                  className="w-full h-48 object-cover image-hover-scale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-warm-gold bg-opacity-20"></div>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-brown mb-4">
                Development
              </h3>
              <p className="text-primary-brown opacity-80 leading-relaxed">
                Following sound planning and estimation, only the finest materials are chosen 
                that allow extensive flexibility in design, colour, and pattern.
              </p>
            </div>

            {/* Creation */}
            <div className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Artisan weaving handmade carpet on loom"
                  className="w-full h-48 object-cover image-hover-scale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-warm-gold bg-opacity-20"></div>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-brown mb-4">
                Creation
              </h3>
              <p className="text-primary-brown opacity-80 leading-relaxed">
                Our expertise extends to almost all forms of carpet making - hand knotted, 
                hand tufted, and hand woven craftsmanship.
              </p>
            </div>

            {/* Installation */}
            <div className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Professional carpet installation service"
                  className="w-full h-48 object-cover image-hover-scale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-warm-gold bg-opacity-20"></div>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-brown mb-4">
                Installation
              </h3>
              <p className="text-primary-brown opacity-80 leading-relaxed">
                Professional installation ensures your custom carpet is perfectly placed 
                to enhance your interior space.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button className="btn-primary text-lg px-10 py-6">
                START YOUR CUSTOM DESIGN
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-brown mb-6">
                Our Heritage
              </h2>
              <p className="text-lg text-primary-brown leading-relaxed mb-6">
                Since 1881, Ishwar Rugs has been synonymous with the finest handcrafted carpets, 
                carrying forward a legacy of traditional artisanship combined with contemporary 
                design sensibilities. Each piece tells a story of generations of skilled craftsmen 
                who have perfected the art of carpet making.
              </p>
              <p className="text-lg text-primary-brown leading-relaxed mb-8">
                Our commitment to excellence extends beyond mere aesthetics. We believe in 
                preserving ancient techniques while embracing innovation, ensuring that every 
                carpet not only beautifies spaces but also stands as a testament to timeless craftsmanship.
              </p>
              <Link href="/about">
                <Button className="btn-secondary">
                  LEARN MORE ABOUT US
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Traditional carpet workshop heritage craftsmanship"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-warm-gold text-primary-brown p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold">140+</div>
                  <div className="text-sm font-semibold">Years of Heritage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
