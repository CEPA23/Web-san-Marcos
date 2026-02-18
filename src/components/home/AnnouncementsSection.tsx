import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import announcementsData from "@/data/announcements.json";

type Announcement = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category?: string;
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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function AnnouncementsSection() {
  const announcements = useMemo(() => {
    return (announcementsData as Announcement[])
      .map((announcement, idx) => ({
        ...announcement,
        category: (announcement.category ?? "General").trim(),
        featured: Boolean(announcement.featured),
        originalIndex: idx,
      }))
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.originalIndex - b.originalIndex)
      .slice(0, 5);
  }, []);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">Ultimos Anuncios</h2>
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
              className="card-hover rounded-lg border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    {announcement.featured && (
                      <span className="rounded-full gold-gradient px-2 py-0.5 text-xs font-semibold text-foreground">
                        Destacado
                      </span>
                    )}
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/80">
                      {announcement.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDate(announcement.date)}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{announcement.title}</h3>
                  <p className="text-muted-foreground">{announcement.description}</p>
                </div>

                <Link
                  to="/news"
                  className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Leer Mas
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
