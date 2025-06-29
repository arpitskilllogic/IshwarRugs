import { Link } from "wouter";
import { Users, Award, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-soft-gray">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-brown mb-6">
            OUR HERITAGE
          </h1>
          <p className="text-xl text-primary-brown opacity-80 leading-relaxed max-w-4xl mx-auto">
            Since 1881, Ishwar Rugs has been synonymous with the finest handcrafted carpets, 
            carrying forward a legacy of traditional artisanship combined with contemporary design sensibilities.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-primary-brown mb-6">
                A Legacy of Excellence
              </h2>
              <p className="text-lg text-primary-brown leading-relaxed mb-6">
                Our journey began in 1881 when master artisan Ishwar Singh established our first workshop 
                in the heart of India's carpet-making region. What started as a small family business has 
                grown into one of the world's most respected luxury carpet manufacturers, while never losing 
                sight of our artisanal roots.
              </p>
              <p className="text-lg text-primary-brown leading-relaxed mb-6">
                For over 140 years, we have been creating carpets that are not merely floor coverings, 
                but works of art that tell stories, evoke emotions, and transform spaces. Each piece 
                represents the culmination of generations of knowledge, skill, and passion passed down 
                through our master craftsmen.
              </p>
              <p className="text-lg text-primary-brown leading-relaxed">
                Today, while we embrace modern design sensibilities and contemporary aesthetics, we remain 
                true to the traditional techniques that have defined our craft for centuries. Every carpet 
                we create is a testament to this perfect balance between heritage and innovation.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Historical carpet workshop"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-warm-gold text-primary-brown p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold">1881</div>
                  <div className="text-sm font-semibold">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-primary-brown">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-transparent border-warm-gold text-center">
              <CardContent className="p-8">
                <Clock className="h-12 w-12 text-warm-gold mx-auto mb-4" />
                <div className="font-serif text-4xl font-bold text-warm-gold mb-2">140+</div>
                <div className="text-cream font-semibold">Years of Heritage</div>
              </CardContent>
            </Card>
            
            <Card className="bg-transparent border-warm-gold text-center">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-warm-gold mx-auto mb-4" />
                <div className="font-serif text-4xl font-bold text-warm-gold mb-2">500+</div>
                <div className="text-cream font-semibold">Master Artisans</div>
              </CardContent>
            </Card>
            
            <Card className="bg-transparent border-warm-gold text-center">
              <CardContent className="p-8">
                <Globe className="h-12 w-12 text-warm-gold mx-auto mb-4" />
                <div className="font-serif text-4xl font-bold text-warm-gold mb-2">50+</div>
                <div className="text-cream font-semibold">Countries Served</div>
              </CardContent>
            </Card>
            
            <Card className="bg-transparent border-warm-gold text-center">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-warm-gold mx-auto mb-4" />
                <div className="font-serif text-4xl font-bold text-warm-gold mb-2">25+</div>
                <div className="text-cream font-semibold">Design Awards</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-brown mb-6">
              THE ART OF CRAFTSMANSHIP
            </h2>
            <p className="text-xl text-primary-brown opacity-80 max-w-4xl mx-auto">
              Our commitment to excellence is reflected in every aspect of our craft, from the selection 
              of the finest materials to the meticulous attention to detail in every knot.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Hand Knotting */}
            <div className="text-center">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Hand knotting process"
                  className="w-full h-64 object-cover image-hover-scale"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-brown mb-4">
                Hand Knotting
              </h3>
              <p className="text-primary-brown opacity-80 leading-relaxed">
                Each carpet is meticulously hand-knotted by master artisans using techniques 
                passed down through generations. This traditional method ensures unparalleled 
                quality and durability.
              </p>
            </div>

            {/* Material Selection */}
            <div className="text-center">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Premium materials"
                  className="w-full h-64 object-cover image-hover-scale"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-brown mb-4">
                Premium Materials
              </h3>
              <p className="text-primary-brown opacity-80 leading-relaxed">
                We source only the finest materials - from hand-spun wool and silk to 
                botanical dyes - ensuring each carpet meets our exacting standards for 
                beauty and longevity.
              </p>
            </div>

            {/* Design Innovation */}
            <div className="text-center">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1541960071727-c531398e7494?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Design innovation"
                  className="w-full h-64 object-cover image-hover-scale"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-brown mb-4">
                Design Innovation
              </h3>
              <p className="text-primary-brown opacity-80 leading-relaxed">
                Our in-house design studio constantly pushes creative boundaries, 
                blending traditional motifs with contemporary aesthetics to create 
                truly unique and timeless pieces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-soft-gray">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-brown mb-6">
              OUR MISSION & VALUES
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-3xl font-bold text-primary-brown mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-primary-brown leading-relaxed mb-6">
                To create exceptional handcrafted carpets that honor traditional artisanship 
                while embracing contemporary design, bringing beauty and elegance to homes 
                and spaces around the world.
              </p>
              <p className="text-lg text-primary-brown leading-relaxed">
                We believe that a carpet is more than a functional object - it's a piece 
                of art that can transform a space, tell a story, and create an emotional 
                connection between the owner and their environment.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-3xl font-bold text-primary-brown mb-6">
                Our Values
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-warm-gold rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-primary-brown mb-1">Excellence</h4>
                    <p className="text-primary-brown opacity-80">Uncompromising quality in every aspect of our craft</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-warm-gold rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-primary-brown mb-1">Heritage</h4>
                    <p className="text-primary-brown opacity-80">Preserving traditional techniques while embracing innovation</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-warm-gold rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-primary-brown mb-1">Sustainability</h4>
                    <p className="text-primary-brown opacity-80">Responsible sourcing and ethical manufacturing practices</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-warm-gold rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-primary-brown mb-1">Innovation</h4>
                    <p className="text-primary-brown opacity-80">Continuously pushing creative boundaries in design</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-brown">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-warm-gold mb-6">
            Experience the Ishwar Difference
          </h2>
          <p className="text-xl text-cream mb-8 leading-relaxed max-w-4xl mx-auto">
            Discover our collections or work with our design team to create a custom carpet 
            that perfectly reflects your vision and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections">
              <Button className="btn-secondary text-lg px-8 py-4">
                EXPLORE COLLECTIONS
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                className="text-cream border-cream hover:bg-cream hover:text-primary-brown text-lg px-8 py-4"
              >
                START CUSTOM DESIGN
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
