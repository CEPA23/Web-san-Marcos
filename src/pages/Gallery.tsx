import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import classroomImage from "@/assets/classroom.jpg";
import scienceFairImage from "@/assets/science-fair.jpg";
import sportsImage from "@/assets/sports.jpg";
import graduationImage from "@/assets/graduation.jpg";
import libraryImage from "@/assets/library.jpg";
import heroCampusImage from "@/assets/hero-campus.jpg";

type GalleryCategory = "all" | "campus" | "academics" | "sports" | "events";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: heroCampusImage, alt: "Main Campus Exterior", category: "campus" },
  { id: 2, src: classroomImage, alt: "Classroom Learning", category: "academics" },
  { id: 3, src: scienceFairImage, alt: "Science Fair Exhibition", category: "events" },
  { id: 4, src: sportsImage, alt: "Soccer Team Practice", category: "sports" },
  { id: 5, src: graduationImage, alt: "Graduation Ceremony", category: "events" },
  { id: 6, src: libraryImage, alt: "Library Study Area", category: "campus" },
];

const categories = [
  { value: "all", label: "All Photos" },
  { value: "campus", label: "Campus" },
  { value: "academics", label: "Academics" },
  { value: "sports", label: "Sports" },
  { value: "events", label: "Events" },
];

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

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

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
              Photo Gallery
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore moments from our campuses, classrooms, events, and activities 
              that make Horizon Academy special.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value as GalleryCategory)}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                variants={item}
                className="aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No photos found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
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
              className="absolute top-4 right-4 p-2 rounded-full bg-background/20 text-background hover:bg-background/30 transition-colors"
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
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
