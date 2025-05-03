
import React from 'react';
import { Link } from 'react-router-dom';
import { GlobeIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-travel-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">R</span>
              </div>
              <span className="font-display font-semibold text-xl">Roam</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Discover and share remarkable travel experiences around the world.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <GlobeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Find Itineraries
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Popular Destinations
                </Link>
              </li>
              <li>
                <Link to="/itineraries" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Latest Itineraries
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Create Itinerary
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Roam. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Design by <span className="text-foreground">Lovable</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
