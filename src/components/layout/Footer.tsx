import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Music2 } from "lucide-react";
import logo from "@/assets/logo.png";
import config from "@/data/config.json";

const contact = config.contact;

const campuses = [
  {
    name: "Inicial",
    address: contact.address,
    phone: contact.phone,
  },
  {
    name: "Primaria",
    address: contact.address,
    phone: contact.phone,
  },
  {
    name: "Secundaria",
    address: contact.address,
    phone: contact.phone,
  },
];

const quickLinks = [
  { name: "Nosotros", path: "/about" },
  { name: "Eventos", path: "/events" },
  { name: "Noticias", path: "/news" },
  { name: "Galería", path: "/gallery" },
  { name: "Contacto", path: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: config.social.facebook, label: "Facebook" },
  { icon: Instagram, href: config.social.instagram, label: "Instagram" },
  { icon: Music2, href: config.social.tiktok, label: "TikTok" },
  { icon: Youtube, href: config.social.youtube, label: "YouTube" },
].filter((social) => typeof social.href === "string" && social.href.trim().length > 0);

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
                <img 
                  src={logo} 
                  alt="Logo del colegio"
                  className="h-12 w-12 object-contain"
                />  
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">I.E.P Mayor De San Marcos</span>
                <span className="text-xs text-primary-foreground/70">
                  Excelencia en Educación
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Formando alumnos triunfadores desde el colegio.
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
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
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
            <h3 className="text-lg font-semibold mb-6">Nuestros Campus</h3>
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
            © {new Date().getFullYear()} I.E.P Mayor De San Marcos . Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <Mail className="h-4 w-4" />
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-primary-foreground transition-colors"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
