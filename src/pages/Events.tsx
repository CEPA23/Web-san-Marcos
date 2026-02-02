import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type EventCategory = "all" | "academic" | "sports" | "arts" | "community";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  campus: string;
  category: EventCategory;
  description: string;
  featured?: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: "Día de Puertas Abiertas",
    date: "15 de Febrero, 2026",
    time: "9:00 AM - 3:00 PM",
    campus: "Todos los Campus",
    category: "community",
    description: "Explora nuestras instalaciones y conoce a nuestro dedicado cuerpo docente. Tours del campus, sesiones informativas y preguntas y respuestas disponibles todo el día.",
    featured: true,
  },
  {
    id: 2,
    title: "Concierto de Primavera",
    date: "8 de Marzo, 2026",
    time: "6:00 PM - 8:00 PM",
    campus: "Campus Principal",
    category: "arts",
    description: "Muestra anual con presentaciones de estudiantes de todos los niveles incluyendo coro, orquesta y banda.",
  },
  {
    id: 3,
    title: "Feria de Ciencias",
    date: "22 de Marzo, 2026",
    time: "10:00 AM - 4:00 PM",
    campus: "Campus Norte",
    category: "academic",
    description: "Los estudiantes presentan proyectos científicos innovadores compitiendo por las finales regionales. Abierto a todas las familias.",
  },
  {
    id: 4,
    title: "Reunión de Padres y Maestros",
    date: "5 de Abril, 2026",
    time: "2:00 PM - 7:00 PM",
    campus: "Todos los Campus",
    category: "academic",
    description: "Agenda reuniones con los maestros para hablar sobre el progreso, metas y estrategias para el éxito continuo de los estudiantes.",
  },
  {
    id: 5,
    title: "Torneo Interescolar de Básquetbol",
    date: "12 de Abril, 2026",
    time: "8:00 AM - 6:00 PM",
    campus: "Campus Oeste",
    category: "sports",
    description: "Nuestros equipos varsity compiten contra escuelas de toda la región. ¡Ven a apoyar a nuestras Águilas!",
  },
  {
    id: 6,
    title: "Exposición de Arte de Primavera",
    date: "20 de Abril, 2026",
    time: "3:00 PM - 7:00 PM",
    campus: "Campus Principal",
    category: "arts",
    description: "Obras de arte de estudiantes de todos los niveles en exhibición. Recepción con refrigerios.",
  },
  {
    id: 7,
    title: "Día Anual de Atletismo",
    date: "5 de Mayo, 2026",
    time: "8:00 AM - 4:00 PM",
    campus: "Todos los Campus",
    category: "sports",
    description: "Un día de competencia amistosa con eventos de pista, deportes en equipo y actividades recreativas.",
  },
  {
    id: 8,
    title: "Ceremonia de Graduación",
    date: "15 de Junio, 2026",
    time: "10:00 AM - 12:00 PM",
    campus: "Campus Principal",
    category: "community",
    description: "Celebra a nuestra generación graduada mientras emprenden el siguiente capítulo de su viaje.",
    featured: true,
  },
];

const categories = [
  { value: "all", label: "Todos los Eventos" },
  { value: "academic", label: "Académico" },
  { value: "sports", label: "Deportes" },
  { value: "arts", label: "Artes" },
  { value: "community", label: "Comunidad" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("all");

  const filteredEvents = selectedCategory === "all"
    ? events
    : events.filter((event) => event.category === selectedCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Eventos Escolares
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Mantente conectado con los próximos eventos, actividades y celebraciones 
              en todos nuestros campus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value as EventCategory)}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event) => (
              <motion.div key={event.id} variants={item}>
                <Card className={`h-full card-hover ${event.featured ? "ring-2 ring-accent" : ""}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    {event.featured && (
                      <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-semibold rounded-full gold-gradient text-foreground">
                        Destacado
                      </span>
                    )}
                    <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                      {event.category === "academic" ? "Académico" : 
                       event.category === "sports" ? "Deportes" :
                       event.category === "arts" ? "Artes" : "Comunidad"}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1">
                      {event.description}
                    </p>
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>{event.campus}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron eventos en esta categoría.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
