import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Clock } from "lucide-react";
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
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const News = () => {
  const announcements = announcementsData as Announcement[];
  const featured = announcements[0];
  const regular = announcements.slice(1);

  return (
    <Layout>
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Noticias y Anuncios</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Mantente informado con las últimas actualizaciones y anuncios del colegio.
            </p>
          </motion.div>
        </div>
      </section>

      {featured && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground"
            >
              <span className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full gold-gradient text-foreground">
                Destacado
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{featured.title}</h2>
              <p className="text-primary-foreground/80 text-lg mb-6 max-w-3xl">{featured.description}</p>
              {featured.image && (
                <div className="mb-6 overflow-hidden rounded-xl border border-primary-foreground/20">
                  <img src={featured.image} alt={featured.title} className="h-56 w-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Clock className="h-4 w-4" />
                <span>{formatDate(featured.date)}</span>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {regular.map((article, idx) => (
              <motion.article
                key={`${article.title}-${article.date}-${idx}`}
                variants={item}
                className="bg-card rounded-xl p-6 md:p-8 card-hover border border-border"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {article.image && (
                    <div className="overflow-hidden rounded-xl border border-border lg:w-64 lg:shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-44 w-full object-cover lg:h-full"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{article.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{article.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {announcements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay anuncios publicados.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;

