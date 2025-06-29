import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-warm-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary-brown mb-6">
              Ishwar Rugs
            </h3>
            <p className="text-primary-brown opacity-80 leading-relaxed mb-6">
              Fine handcrafted carpets since 1881. Creating timeless pieces that 
              transform spaces with elegance and sophistication.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-brown hover:text-warm-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-brown hover:text-warm-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-brown hover:text-warm-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-semibold text-primary-brown mb-6">Collections</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections?category=contemporary"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Contemporary
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=modern"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Modern
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=traditional"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Traditional
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=persian"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Persian
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Custom Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-primary-brown mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Craftsmanship
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-primary-brown mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Care Instructions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-brown opacity-80 hover:text-warm-gold transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-soft-gray pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-brown opacity-60 mb-4 md:mb-0">
              © 2024 Ishwar Rugs. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-primary-brown opacity-60 hover:opacity-100 transition-opacity"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-primary-brown opacity-60 hover:opacity-100 transition-opacity"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-primary-brown opacity-60 hover:opacity-100 transition-opacity"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
