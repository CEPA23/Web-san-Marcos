import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const campuses = [
  {
    name: "Main Campus",
    address: "123 Education Boulevard, Downtown",
    phone: "(555) 123-4567",
  },
  {
    name: "North Campus",
    address: "456 Academic Way, North District",
    phone: "(555) 234-5678",
  },
  {
    name: "West Campus",
    address: "789 Learning Lane, West Side",
    phone: "(555) 345-6789",
  },
];

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "News", path: "/news" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Horizon Academy</span>
                <span className="text-xs text-primary-foreground/70">
                  Excellence in Education
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Shaping tomorrow's leaders through academic excellence, character
              development, and community engagement since 1985.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campuses */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Our Campuses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {campuses.map((campus) => (
                <div key={campus.name} className="space-y-2">
                  <h4 className="font-medium">{campus.name}</h4>
                  <div className="flex items-start gap-2 text-sm text-primary-foreground/80">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{campus.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{campus.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Horizon Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:info@horizonacademy.edu"
              className="hover:text-primary-foreground transition-colors"
            >
              info@horizonacademy.edu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
