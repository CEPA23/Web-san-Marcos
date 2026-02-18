import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Clock } from "lucide-react";
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
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const News = () => {
  const announcements = useMemo(() => {
    return (announcementsData as Announcement[])
      .map((announcement, idx) => ({
        ...announcement,
        category: (announcement.category ?? "General").trim(),
        featured: Boolean(announcement.featured),
        originalIndex: idx,
      }))
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.originalIndex - b.originalIndex);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Todas las Noticias");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(announcements.map((announcement) => announcement.category).filter(Boolean)));
    return ["Todas las Noticias", ...unique];
  }, [announcements]);

  const filteredAnnouncements = useMemo(() => {
    if (selectedCategory === "Todas las Noticias") {
      return announcements;
    }
    return announcements.filter((announcement) => announcement.category === selectedCategory);
  }, [announcements, selectedCategory]);

  const featuredAnnouncement = useMemo(
    () => filteredAnnouncements.find((announcement) => announcement.featured) ?? null,
    [filteredAnnouncements]
  );

  const regularAnnouncements = useMemo(
    () => filteredAnnouncements.filter((announcement) => announcement !== featuredAnnouncement),
    [filteredAnnouncements, featuredAnnouncement]
  );

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
              Mantente informado con las ultimas actualizaciones y anuncios del colegio.
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

          {featuredAnnouncement && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-12"
            >
              <span className="mb-6 inline-block rounded-full px-4 py-1 text-sm font-medium gold-gradient text-foreground">
                Destacado
              </span>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">{featuredAnnouncement.title}</h2>
              <p className="mb-6 max-w-3xl text-lg text-primary-foreground/85">{featuredAnnouncement.description}</p>
              {featuredAnnouncement.image && (
                <div className="mb-6 overflow-hidden rounded-xl border border-primary-foreground/20">
                  <img
                    src={featuredAnnouncement.image}
                    alt={featuredAnnouncement.title}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/75">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(featuredAnnouncement.date)}</span>
                </div>
                <span>{featuredAnnouncement.category}</span>
              </div>
            </motion.article>
          )}
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {regularAnnouncements.map((article, idx) => (
              <motion.article
                key={`${article.title}-${article.date}-${idx}`}
                variants={item}
                className="card-hover rounded-xl border border-border bg-card p-6 md:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
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
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/80">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Leer Mas
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-semibold text-foreground">{article.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{article.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredAnnouncements.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No hay anuncios publicados para esta categoria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
