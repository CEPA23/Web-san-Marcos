import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";


const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/about" },
  { name: "Eventos", path: "/events" },
  { name: "Noticias", path: "/news" },
  { name: "Galería", path: "/gallery" },
  { name: "Contacto", path: "/contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <nav className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
                <img 
                  src={logo} 
                  alt="Logo del colegio"
                  className="h-12 w-12 object-contain"
                />
              </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">
                I.E.P Mayor De San Marcos
              </span>
              <span className="text-xs text-muted-foreground">
                Formando Alumnos Triunfadores desde el colegio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Contáctanos</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/contact">Inscríbete</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-md transition-colors"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-border">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex gap-3 pt-4 px-4">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Contacto
                    </Link>
                  </Button>
                  <Button variant="hero" size="sm" className="flex-1" asChild>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Inscríbete
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
