import { motion } from "framer-motion";

import logo from "@/assets/logo.webp";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  className?: string;
};

export function PageHero({ title, description, eyebrow, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60 bg-[linear-gradient(180deg,#f8f3ea_0%,#fdfaf5_55%,#ffffff_100%)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(42,96%,55%,0.16),transparent_24%),radial-gradient(circle_at_85%_15%,hsla(222,47%,20%,0.1),transparent_22%)]" />
      <div className="absolute left-0 top-0 h-full w-2 gold-gradient" />
      <div className="absolute -left-20 top-12 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-custom relative py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            {eyebrow ? (
              <span className="inline-flex rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary/75 shadow-subtle backdrop-blur-sm sm:text-xs">
                {eyebrow}
              </span>
            ) : null}

            <h1 className="mt-5 text-balance text-4xl font-bold leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <div className="mt-5 flex items-center gap-4">
              <div className="h-1.5 w-20 rounded-full gold-gradient shadow-card" />
              <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 }}
            className="relative mx-auto hidden h-[230px] w-full max-w-[280px] overflow-hidden rounded-[32px] border border-white/70 bg-primary shadow-elevated lg:block"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
            <div className="absolute -right-8 top-5 h-24 w-24 rounded-full border border-white/10" />
            <div className="absolute -left-10 bottom-4 h-28 w-28 rounded-full bg-white/5" />
            <div className="absolute inset-x-6 top-6 h-px bg-white/15" />
            <div className="absolute inset-x-6 bottom-6 h-px bg-white/10" />

            <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
              <div className="rounded-full bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-sm">
                <img
                  src={logo}
                  alt="Logo del colegio"
                  className="h-24 w-24 object-contain"
                  width={642}
                  height={798}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-5 h-1 w-14 rounded-full bg-accent/90" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
