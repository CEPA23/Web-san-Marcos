import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  {
    id: 1,
    title: "Open House Day",
    date: "February 15, 2026",
    campus: "All Campuses",
    description: "Explore our facilities and meet our dedicated faculty. Campus tours available throughout the day.",
    featured: true,
  },
  {
    id: 2,
    title: "Spring Music Concert",
    date: "March 8, 2026",
    campus: "Main Campus",
    description: "Annual showcase featuring performances from students across all grade levels.",
    featured: false,
  },
  {
    id: 3,
    title: "Science Fair Exhibition",
    date: "March 22, 2026",
    campus: "North Campus",
    description: "Students present innovative science projects competing for regional finals.",
    featured: false,
  },
  {
    id: 4,
    title: "Parent-Teacher Conference",
    date: "April 5, 2026",
    campus: "All Campuses",
    description: "Schedule meetings with teachers to discuss student progress and goals.",
    featured: false,
  },
];

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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              Stay connected with our school community
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/events">
              View All Events
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
          {events.map((event) => (
            <motion.div key={event.id} variants={item}>
              <Card className={`h-full card-hover ${event.featured ? "ring-2 ring-accent" : ""}`}>
                <CardContent className="p-6 flex flex-col h-full">
                  {event.featured && (
                    <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-semibold rounded-full gold-gradient text-foreground">
                      Featured
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {event.description}
                  </p>
                  <div className="space-y-2 mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>{event.date}</span>
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
      </div>
    </section>
  );
}
