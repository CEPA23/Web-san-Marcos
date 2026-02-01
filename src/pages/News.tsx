import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Clock, ArrowRight } from "lucide-react";

const news = [
  {
    id: 1,
    title: "New STEM Lab Opens at North Campus",
    excerpt: "State-of-the-art facilities for robotics, coding, and scientific research now available for all students. The new lab features 3D printers, programming stations, and advanced scientific equipment.",
    content: "We are thrilled to announce the opening of our new STEM Lab at North Campus...",
    date: "January 28, 2026",
    category: "Facilities",
    featured: true,
  },
  {
    id: 2,
    title: "Admission Applications Now Open for 2025-2026",
    excerpt: "Begin your application for the upcoming academic year. Early registration discounts and sibling benefits available for families who apply before March 31st.",
    date: "January 25, 2026",
    category: "Admissions",
  },
  {
    id: 3,
    title: "Students Win Regional Math Olympics",
    excerpt: "Our students secured 1st place in the Regional Mathematics Olympiad, qualifying for the national competition. Congratulations to our talented mathematicians!",
    date: "January 20, 2026",
    category: "Achievement",
  },
  {
    id: 4,
    title: "New After-School Programs Launched",
    excerpt: "Expanded extracurricular offerings including coding club, debate team, and environmental science club now available for middle and high school students.",
    date: "January 15, 2026",
    category: "Programs",
  },
  {
    id: 5,
    title: "Principal's Message: Welcome to the New Year",
    excerpt: "A message from Principal Dr. Sarah Mitchell on our achievements in 2025 and our vision for the coming year. Together, we continue to build a brighter future.",
    date: "January 5, 2026",
    category: "Leadership",
  },
  {
    id: 6,
    title: "Winter Concert Series a Huge Success",
    excerpt: "Over 500 families attended our Winter Concert series featuring performances from students across all grade levels. Thank you for your wonderful support!",
    date: "December 18, 2025",
    category: "Arts",
  },
  {
    id: 7,
    title: "Community Service Day: Making a Difference",
    excerpt: "Students and staff participated in our annual Community Service Day, volunteering at local food banks, shelters, and environmental cleanup initiatives.",
    date: "December 10, 2025",
    category: "Community",
  },
  {
    id: 8,
    title: "Sports Teams Excel in Fall Season",
    excerpt: "Our soccer, volleyball, and cross-country teams achieved outstanding results this season, with multiple conference championships and individual awards.",
    date: "November 28, 2025",
    category: "Sports",
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
              News & Announcements
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay informed with the latest updates, announcements, and stories 
              from Horizon Academy.
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
                Featured
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
                    Read More
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
