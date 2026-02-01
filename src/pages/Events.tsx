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
    title: "Open House Day",
    date: "February 15, 2026",
    time: "9:00 AM - 3:00 PM",
    campus: "All Campuses",
    category: "community",
    description: "Explore our facilities and meet our dedicated faculty. Campus tours, information sessions, and Q&A available throughout the day.",
    featured: true,
  },
  {
    id: 2,
    title: "Spring Music Concert",
    date: "March 8, 2026",
    time: "6:00 PM - 8:00 PM",
    campus: "Main Campus",
    category: "arts",
    description: "Annual showcase featuring performances from students across all grade levels including choir, orchestra, and band.",
  },
  {
    id: 3,
    title: "Science Fair Exhibition",
    date: "March 22, 2026",
    time: "10:00 AM - 4:00 PM",
    campus: "North Campus",
    category: "academic",
    description: "Students present innovative science projects competing for regional finals. Open to all families.",
  },
  {
    id: 4,
    title: "Parent-Teacher Conference",
    date: "April 5, 2026",
    time: "2:00 PM - 7:00 PM",
    campus: "All Campuses",
    category: "academic",
    description: "Schedule meetings with teachers to discuss student progress, goals, and strategies for continued success.",
  },
  {
    id: 5,
    title: "Inter-School Basketball Tournament",
    date: "April 12, 2026",
    time: "8:00 AM - 6:00 PM",
    campus: "West Campus",
    category: "sports",
    description: "Our varsity teams compete against schools from across the region. Come cheer on our Eagles!",
  },
  {
    id: 6,
    title: "Spring Art Exhibition",
    date: "April 20, 2026",
    time: "3:00 PM - 7:00 PM",
    campus: "Main Campus",
    category: "arts",
    description: "Student artwork from all grade levels on display. Reception with refreshments.",
  },
  {
    id: 7,
    title: "Annual Athletics Day",
    date: "May 5, 2026",
    time: "8:00 AM - 4:00 PM",
    campus: "All Campuses",
    category: "sports",
    description: "A day of friendly competition featuring track events, team sports, and recreational activities.",
  },
  {
    id: 8,
    title: "Graduation Ceremony",
    date: "June 15, 2026",
    time: "10:00 AM - 12:00 PM",
    campus: "Main Campus",
    category: "community",
    description: "Celebrate our graduating class as they embark on the next chapter of their journey.",
    featured: true,
  },
];

const categories = [
  { value: "all", label: "All Events" },
  { value: "academic", label: "Academic" },
  { value: "sports", label: "Sports" },
  { value: "arts", label: "Arts" },
  { value: "community", label: "Community" },
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
              School Events
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay connected with upcoming events, activities, and celebrations 
              across all our campuses.
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
                        Featured
                      </span>
                    )}
                    <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                      {event.category}
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
              <p className="text-muted-foreground">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
