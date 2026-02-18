import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { X } from "lucide-react";
import galleryData from "@/data/gallery.json";

type GalleryItem = {
  title: string;
  image: string;
  category?: string;
};

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

const CATEGORY_ORDER = ["Campus", "Academico", "Deportes", "Eventos", "Comunidad", "General"];

const cleanText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const normalizeCategory = (value?: string) => {
  if (!value || !value.trim()) return "General";
  const normalized = cleanText(value).toLowerCase();

  if (normalized.includes("campus")) return "Campus";
  if (normalized.includes("academ")) return "Academico";
  if (normalized.includes("deporte")) return "Deportes";
  if (normalized.includes("evento")) return "Eventos";
  if (normalized.includes("comunidad")) return "Comunidad";

  return value.trim();
};

const sortCategories = (categories: string[]) => {
  return [...categories].sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    return a.localeCompare(b, "es");
  });
};

const Gallery = () => {
  const raw = galleryData as GalleryItem[];

  const images: GalleryImage[] = useMemo(
    () =>
      raw.map((g) => ({
        src: g.image,
        alt: g.title,
        category: normalizeCategory(g.category),
      })),
    [raw]
  );

  const categories = useMemo(() => {
    const dynamic = Array.from(new Set(images.map((img) => img.category)));
    return sortCategories(dynamic);
  }, [images]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  return (
    <Layout>
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Galeria de Fotos</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explora momentos de nuestros campus, aulas, eventos y actividades.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-secondary"
              }`}
            >
              Todas las Fotos
            </button>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image, idx) => (
              <motion.button
                key={`${image.src}-${image.alt}-${idx}`}
                variants={item}
                type="button"
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border text-left"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-background/90">{image.category}</p>
                  <p className="text-sm font-medium text-background">{image.alt}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No se encontraron fotos en esta categoria.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-background/20 p-2 text-background transition-colors hover:bg-background/30"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
