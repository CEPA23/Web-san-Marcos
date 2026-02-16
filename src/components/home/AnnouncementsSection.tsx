import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import announcementsData from "@/data/announcements.json";

type Announcement = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function AnnouncementsSection() {
  const announcements = (announcementsData as Announcement[]).slice(0, 5);

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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Últimos Anuncios</h2>
            <p className="text-muted-foreground">Actualizaciones importantes</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/news">
              Todas las Noticias
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
          {announcements.map((announcement, idx) => (
            <motion.article
              key={`${announcement.title}-${announcement.date}-${idx}`}
              variants={item}
              className="bg-card rounded-lg p-6 card-hover border border-border"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {announcement.image && (
                  <div className="shrink-0 overflow-hidden rounded-lg border border-border sm:w-40">
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="h-24 w-full object-cover sm:h-20"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(announcement.date)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{announcement.title}</h3>
                  <p className="text-muted-foreground">{announcement.description}</p>
                </div>
                <Link
                  to="/news"
                  className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                  Leer Más
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

