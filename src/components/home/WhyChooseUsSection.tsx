import { motion } from "framer-motion";
import { GraduationCap, Users, Trophy, BookOpen, Globe, Heart } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: "Rigorous curriculum designed to challenge and inspire students to reach their full potential.",
  },
  {
    icon: Users,
    title: "Experienced Faculty",
    description: "Dedicated teachers with advanced degrees and a passion for nurturing young minds.",
  },
  {
    icon: Trophy,
    title: "Extracurricular Programs",
    description: "Diverse activities from sports to arts, fostering well-rounded development.",
  },
  {
    icon: BookOpen,
    title: "Modern Facilities",
    description: "State-of-the-art labs, libraries, and learning spaces across all campuses.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "International exchange programs and multicultural education experiences.",
  },
  {
    icon: Heart,
    title: "Character Development",
    description: "Values-based education emphasizing integrity, respect, and community service.",
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

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Horizon Academy?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine academic rigor with a nurturing environment to prepare 
            students for success in an ever-changing world.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group text-center p-8 rounded-xl bg-card border border-border card-hover"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
