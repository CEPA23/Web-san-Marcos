import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Comienza el Camino de Tu Hijo Hacia la Excelencia
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Únete a miles de familias que han confiado en nuestra institucion para 
            la educación de sus hijos. Las inscripciones para el nuevo año académico 
            ya están abiertas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Solicitar Inscripción
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/about">Agendar una Visita</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
