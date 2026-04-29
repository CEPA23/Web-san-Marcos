import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "side" | "bottom";
  className?: string;
};

export function PageHero({
  title,
  description,
  eyebrow,
  imageSrc,
  imageAlt,
  imagePosition = "side",
  className,
}: PageHeroProps) {
  const hasBottomImage = imageSrc && imagePosition === "bottom";
  const hasSideImage = imageSrc && imagePosition === "side";

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
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container-custom relative py-12 md:py-16 lg:py-20">
        <div
          className={cn(
            "items-center gap-8 lg:gap-12",
            hasBottomImage
              ? "flex flex-col"
              : hasSideImage
                ? "grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]"
                : "block"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("max-w-3xl", hasBottomImage && "w-full max-w-4xl text-center")}
          >
            {eyebrow ? (
              <span className="inline-flex rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary/75 shadow-subtle backdrop-blur-sm sm:text-xs">
                {eyebrow}
              </span>
            ) : null}

            <h1 className="mt-5 text-balance text-4xl font-bold leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <div
              className={cn(
                "mt-5 flex items-center gap-4",
                hasBottomImage && "justify-center"
              )}
            >
              <div className="h-1.5 w-20 rounded-full gold-gradient shadow-card" />
              <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>

            <p
              className={cn(
                "mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9",
                hasBottomImage && "mx-auto"
              )}
            >
              {description}
            </p>
          </motion.div>

          {imageSrc ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 }}
              className={cn(
                "relative mx-auto w-full overflow-hidden rounded-[32px] border border-white/70 shadow-elevated",
                hasBottomImage
                  ? "mt-2 h-[280px] max-w-5xl bg-primary/5 md:h-[360px] lg:h-[440px]"
                  : "h-[260px] max-w-xl bg-primary/5 md:h-[340px] lg:mx-0 lg:h-[430px] lg:max-w-none"
              )}
            >
              <>
                <img
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.18)_38%,rgba(15,23,42,0.78)_100%)]" />
                <div className="absolute left-5 top-5 h-1.5 w-20 rounded-full gold-gradient sm:left-6 sm:top-6" />
                <div className="absolute right-5 top-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 sm:right-6 sm:top-6">
                  Desde 1997
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div
                    className={cn(
                      "rounded-[24px] border border-white/15 bg-white/10 p-4 text-white shadow-card backdrop-blur-md",
                      hasBottomImage ? "max-w-sm" : "max-w-xs"
                    )}
                  >
                    <div className="mb-3 h-1 w-14 rounded-full gold-gradient" />
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
                      Formacion con proposito
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/90">
                      Una propuesta educativa cercana, solida y orientada al crecimiento integral.
                    </p>
                  </div>
                </div>
              </>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
