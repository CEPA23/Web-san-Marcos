import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import eventsData from "@/data/events.json";

type Event = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  featured?: boolean;
  image?: string;
};

const formatDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" });
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function EventsSection() {
  const events = (eventsData as Event[])
    .map((event, idx) => ({
      ...event,
      featured: Boolean(event.featured),
      originalIndex: idx,
    }))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.originalIndex - b.originalIndex)
    .slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Próximos Eventos</h2>
            <p className="text-muted-foreground">Mantente conectado con nuestra comunidad escolar</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/events">
              Ver Todos los Eventos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {events.map((event, idx) => (
            <motion.div key={`${event.title}-${event.date}-${idx}`} variants={item}>
              <Card className={`h-full card-hover ${event.featured ? "ring-2 ring-accent" : ""}`}>
                <CardContent className="p-6 flex flex-col h-full">
                  {event.featured && (
                    <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-semibold rounded-full gold-gradient text-foreground">
                      Destacado
                    </span>
                  )}
                  {event.image && (
                    <div className="mb-4 overflow-hidden rounded-lg border border-border">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-32 w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-foreground mb-3">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{event.description}</p>
                  <div className="space-y-2 mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
