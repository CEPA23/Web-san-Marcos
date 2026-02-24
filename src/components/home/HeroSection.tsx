import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="lcp-hero relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="lcp-hero-media absolute inset-0">
        <img
          src="/images/hero/franja-hero-1920.webp"
          srcSet="/images/hero/franja-hero-1280.webp 1280w, /images/hero/franja-hero-1920.webp 1920w"
          sizes="100vw"
          alt="San Marcos"
          className="lcp-hero-img h-full w-full object-cover"
          width={1920}
          height={805}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          <span
            className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-accent/20 text-primary-foreground backdrop-blur-sm opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Inscripciones Abiertas 2026
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Formando alumnos <span className="text-accent">Triunfadores</span> desde el colegio
          </h1>

          <p
            className="text-lg sm:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl opacity-0 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            En la I.E.P Mayor de San Marcos, cultivamos mentes curiosas, forjamos caracter solido e
            inspiramos el aprendizaje para toda la vida en nuestros tres campus. Unete a una
            comunidad comprometida con la excelencia academica y el desarrollo integral.
          </p>

          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Comienza Tu Camino
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/about">Conoce Mas</Link>
            </Button>
          </div>

          <div
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20 max-w-lg opacity-0 animate-fade-in-up"
            style={{ animationDelay: "500ms" }}
          >
            {[
              { value: "30", label: "Anos de Excelencia" },
              { value: "4", label: "Sedes" },
              { value: "2,000+", label: "Estudiantes" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
