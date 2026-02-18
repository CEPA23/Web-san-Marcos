import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock3, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import eventsData from "@/data/events.json";

type Event = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category?: string;
  time?: string;
  campus?: string;
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
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Events = () => {
  const events = useMemo(() => {
    return (eventsData as Event[])
      .map((event, idx) => ({
        ...event,
        category: (event.category ?? "Comunidad").trim(),
        time: event.time ?? "Por confirmar",
        campus: event.campus ?? "Todos los Campus",
        featured: Boolean(event.featured),
        originalIndex: idx,
      }))
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.originalIndex - b.originalIndex);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Todos los Eventos");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(events.map((event) => event.category).filter(Boolean)));
    return ["Todos los Eventos", ...unique];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "Todos los Eventos") {
      return events;
    }
    return events.filter((event) => event.category === selectedCategory);
  }, [events, selectedCategory]);

  return (
    <Layout>
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Eventos Escolares</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Mantente conectado con los proximos eventos, actividades y celebraciones.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event, idx) => (
              <motion.div key={`${event.title}-${event.date}-${idx}`} variants={item}>
                <Card className={`h-full card-hover ${event.featured ? "ring-2 ring-accent" : ""}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    {event.featured && (
                      <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-semibold rounded-full gold-gradient text-foreground">
                        Destacado
                      </span>
                    )}
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {event.category}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{event.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1">{event.description}</p>
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock3 className="h-4 w-4 text-accent" />
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
              <p className="text-muted-foreground">No se encontraron eventos.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
