import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCampus from "@/assets/hero-campus.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroCampus}
          alt="Horizon Academy Campus"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-accent/20 text-primary-foreground backdrop-blur-sm"
          >
            Admissions Open for 2025-2026
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Shaping Tomorrow's{" "}
            <span className="text-accent">Leaders</span> Today
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl"
          >
            At Horizon Academy, we nurture curious minds, build strong character, and 
            inspire lifelong learning across our three campuses. Join a community 
            committed to academic excellence and holistic development.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20 max-w-lg"
          >
            {[
              { value: "40+", label: "Years of Excellence" },
              { value: "3", label: "Campuses" },
              { value: "5,000+", label: "Students" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
