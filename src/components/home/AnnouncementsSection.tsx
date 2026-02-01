import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const announcements = [
  {
    id: 1,
    title: "New STEM Lab Opens at North Campus",
    excerpt: "State-of-the-art facilities for robotics, coding, and scientific research now available for all students.",
    date: "January 28, 2026",
    category: "Facilities",
  },
  {
    id: 2,
    title: "Admission Applications Now Open",
    excerpt: "Begin your application for the 2025-2026 academic year. Early registration discounts available.",
    date: "January 25, 2026",
    category: "Admissions",
  },
  {
    id: 3,
    title: "Students Win Regional Math Olympics",
    excerpt: "Our students secured 1st place in the Regional Mathematics Olympiad, qualifying for nationals.",
    date: "January 20, 2026",
    category: "Achievement",
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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function AnnouncementsSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Latest Announcements
            </h2>
            <p className="text-muted-foreground">
              Important updates from Horizon Academy
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/news">
              All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {announcements.map((announcement) => (
            <motion.article
              key={announcement.id}
              variants={item}
              className="bg-card rounded-lg p-6 card-hover border border-border"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {announcement.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-muted-foreground">{announcement.excerpt}</p>
                </div>
                <Link
                  to="/news"
                  className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
