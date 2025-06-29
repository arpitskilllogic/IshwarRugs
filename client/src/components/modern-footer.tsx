import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ModernFooter() {
  return (
    <footer className="w-full">
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-luxury-brown via-primary-brown to-deep-charcoal py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-premium-gold mb-6">
              Stay Connected
            </h2>
            <p className="text-cream/80 text-xl mb-8 max-w-2xl mx-auto">
              Be the first to discover our latest collections and exclusive designs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-premium-gold"
              />
              <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-semibold px-8">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <section className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <h3 className="font-serif text-3xl font-bold text-premium-gold mb-2">
                  ISHWAR
                </h3>
                <div className="text-xs tracking-[0.3em] text-foreground/60 font-sans uppercase mb-4">
                  Est. 1881
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  Fine handcrafted carpets since 1881. Creating timeless pieces that 
                  transform spaces with elegance and sophistication.
                </p>
              </div>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-foreground/60 hover:text-premium-gold transition-colors p-2 rounded-lg hover:bg-white/5"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-premium-gold transition-colors p-2 rounded-lg hover:bg-white/5"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-premium-gold transition-colors p-2 rounded-lg hover:bg-white/5"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Collections */}
            <div>
              <h4 className="font-serif text-xl font-bold text-foreground mb-6">Collections</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/collections?category=contemporary"
                    className="text-foreground/70 hover:text-premium-gold transition-colors group flex items-center"
                  >
                    <span>Contemporary</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections?category=modern"
                    className="text-foreground/70 hover:text-premium-gold transition-colors group flex items-center"
                  >
                    <span>Modern</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections?category=traditional"
                    className="text-foreground/70 hover:text-premium-gold transition-colors group flex items-center"
                  >
                    <span>Traditional</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections"
                    className="text-premium-gold font-semibold hover:text-warm-gold transition-colors group flex items-center"
                  >
                    <span>View All Collections</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-serif text-xl font-bold text-foreground mb-6">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-foreground/70 hover:text-premium-gold transition-colors group flex items-center"
                  >
                    <span>Our Heritage</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-foreground/70 hover:text-premium-gold transition-colors group flex items-center"
                  >
                    <span>Craftsmanship</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-foreground/70 hover:text-premium-gold transition-colors group flex items-center"
                  >
                    <span>Bespoke Design</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-premium-gold transition-colors group flex items-center"
                  >
                    <span>Sustainability</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-premium-gold transition-colors group flex items-center"
                  >
                    <span>Careers</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-xl font-bold text-foreground mb-6">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-premium-gold mt-1 flex-shrink-0" />
                  <div className="text-foreground/70">
                    <p className="text-sm">123 Artisan Quarter</p>
                    <p className="text-sm">Heritage District</p>
                    <p className="text-sm">Mumbai 400001, India</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-premium-gold flex-shrink-0" />
                  <a 
                    href="tel:+919876543210" 
                    className="text-foreground/70 hover:text-premium-gold transition-colors text-sm"
                  >
                    +91 98765 43210
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-premium-gold flex-shrink-0" />
                  <a 
                    href="mailto:info@ishwarrugs.com" 
                    className="text-foreground/70 hover:text-premium-gold transition-colors text-sm"
                  >
                    info@ishwarrugs.com
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    className="w-full border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-primary-brown"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="bg-luxury-brown border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm mb-4 md:mb-0">
              © 2024 Ishwar Rugs. All rights reserved. • Crafted with passion since 1881.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-foreground/60 hover:text-premium-gold transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-premium-gold transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-premium-gold transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}