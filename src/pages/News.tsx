import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Clock, ArrowRight } from "lucide-react";

const news = [
  {
    id: 1,
    title: "Nuevo Laboratorio STEM Abre en Campus Norte",
    excerpt: "Instalaciones de última generación para robótica, programación e investigación científica ahora disponibles para todos los estudiantes. El nuevo laboratorio cuenta con impresoras 3D, estaciones de programación y equipamiento científico avanzado.",
    content: "Estamos emocionados de anunciar la apertura de nuestro nuevo Laboratorio STEM en el Campus Norte...",
    date: "28 de Enero, 2026",
    category: "Instalaciones",
    featured: true,
  },
  {
    id: 2,
    title: "Inscripciones Abiertas para el Ciclo 2025-2026",
    excerpt: "Comienza tu solicitud para el próximo año académico. Descuentos por inscripción temprana y beneficios para hermanos disponibles para familias que apliquen antes del 31 de marzo.",
    date: "25 de Enero, 2026",
    category: "Admisiones",
  },
  {
    id: 3,
    title: "Estudiantes Ganan Olimpiada Regional de Matemáticas",
    excerpt: "Nuestros estudiantes obtuvieron el 1er lugar en la Olimpiada Regional de Matemáticas, clasificando para la competencia nacional. ¡Felicidades a nuestros talentosos matemáticos!",
    date: "20 de Enero, 2026",
    category: "Logros",
  },
  {
    id: 4,
    title: "Nuevos Programas Extracurriculares",
    excerpt: "Ofertas extracurriculares ampliadas incluyendo club de programación, equipo de debate y club de ciencias ambientales ahora disponibles para estudiantes de secundaria y preparatoria.",
    date: "15 de Enero, 2026",
    category: "Programas",
  },
  {
    id: 5,
    title: "Mensaje del Director: Bienvenida al Nuevo Año",
    excerpt: "Un mensaje del Director Dr. Carlos Rodríguez sobre nuestros logros en 2025 y nuestra visión para el año entrante. Juntos, continuamos construyendo un futuro más brillante.",
    date: "5 de Enero, 2026",
    category: "Liderazgo",
  },
  {
    id: 6,
    title: "Serie de Conciertos de Invierno Fue un Gran Éxito",
    excerpt: "Más de 500 familias asistieron a nuestra serie de Conciertos de Invierno con presentaciones de estudiantes de todos los niveles. ¡Gracias por su maravilloso apoyo!",
    date: "18 de Diciembre, 2025",
    category: "Artes",
  },
  {
    id: 7,
    title: "Día de Servicio Comunitario: Haciendo la Diferencia",
    excerpt: "Estudiantes y personal participaron en nuestro Día Anual de Servicio Comunitario, como voluntarios en bancos de alimentos locales, albergues e iniciativas de limpieza ambiental.",
    date: "10 de Diciembre, 2025",
    category: "Comunidad",
  },
  {
    id: 8,
    title: "Equipos Deportivos Destacan en Temporada de Otoño",
    excerpt: "Nuestros equipos de fútbol, voleibol y campo traviesa lograron resultados sobresalientes esta temporada, con múltiples campeonatos de conferencia y premios individuales.",
    date: "28 de Noviembre, 2025",
    category: "Deportes",
  },
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

const News = () => {
  const featuredNews = news.find((n) => n.featured);
  const regularNews = news.filter((n) => !n.featured);

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
              Noticias y Anuncios
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Mantente informado con las últimas actualizaciones, anuncios e historias 
              de Academia Horizonte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredNews && (
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {featuredNews.title}
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-6 max-w-3xl">
                {featuredNews.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Clock className="h-4 w-4" />
                  <span>{featuredNews.date}</span>
                </div>
                <span className="text-sm text-primary-foreground/70">
                  {featuredNews.category}
                </span>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* News Listing */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {regularNews.map((article) => (
              <motion.article
                key={article.id}
                variants={item}
                className="bg-card rounded-xl p-6 md:p-8 card-hover border border-border"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors lg:shrink-0">
                    Leer Más
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
