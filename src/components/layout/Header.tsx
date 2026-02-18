import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/about" },
  { name: "Eventos", path: "/events" },
  { name: "Noticias", path: "/news" },
  { name: "Galeria", path: "/gallery" },
  { name: "Contacto", path: "/contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <nav className="container-custom">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
              <img src={logo} alt="Logo del colegio" className="h-12 w-12 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">I.E.P Mayor De San Marcos</span>
              <span className="text-xs text-muted-foreground">Formando Alumnos Triunfadores desde el colegio</span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/5 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Contactanos</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/contact">Inscribete</Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 text-foreground transition-colors hover:bg-muted"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="space-y-2 border-t border-border py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary/5 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex gap-3 px-4 pt-4">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Contacto
                    </Link>
                  </Button>
                  <Button variant="hero" size="sm" className="flex-1" asChild>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Inscribete
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
