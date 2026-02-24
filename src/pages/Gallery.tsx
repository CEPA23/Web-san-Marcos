import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Facebook, Play, X } from "lucide-react";
import galleryData from "@/data/gallery.json";

type GalleryItem = {
  title: string;
  image?: string;
  width?: number;
  height?: number;
  youtubeUrl?: string;
  video?: string;
  facebookUrl?: string;
  facebook?: string;
  category?: string;
};

type GalleryMedia = {
  src?: string;
  alt: string;
  category: string;
  type: "image" | "video";
  videoPlatform?: "youtube" | "facebook";
  embedUrl?: string;
  width: number;
  height: number;
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

const parseUrl = (url: string) => {
  try {
    return new URL(url);
  } catch {
    try {
      return new URL(`https://${url}`);
    } catch {
      return null;
    }
  }
};

const extractYouTubeId = (url: string) => {
  const parsed = parseUrl(url);
  if (!parsed) return null;

  const host = parsed.hostname.replace("www.", "");

  if (host === "youtu.be") {
    return parsed.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (host === "youtube.com" || host === "m.youtube.com") {
    const byParam = parsed.searchParams.get("v");
    if (byParam) return byParam;

    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") {
      return parts[1] ?? null;
    }
  }

  return null;
};

const buildFacebookEmbedUrl = (url: string) => {
  const parsed = parseUrl(url);
  if (!parsed) return null;

  const host = parsed.hostname.replace("www.", "");
  const normalized = parsed.href;
  const isFacebookDomain = host === "facebook.com" || host === "m.facebook.com" || host === "web.facebook.com";

  if (isFacebookDomain && parsed.pathname.startsWith("/plugins/")) {
    return normalized;
  }

  if (!isFacebookDomain && host !== "fb.watch") {
    return null;
  }

  const path = parsed.pathname.toLowerCase();
  const isVideo =
    path.includes("/videos/") ||
    path.includes("/watch") ||
    path.includes("/reel/") ||
    parsed.searchParams.has("v") ||
    host === "fb.watch";

  const base = isVideo
    ? "https://www.facebook.com/plugins/video.php"
    : "https://www.facebook.com/plugins/post.php";

  const params = new URLSearchParams({
    href: normalized,
    show_text: "false",
    width: "1280",
  });

  return `${base}?${params.toString()}`;
};

const youtubeThumbnail = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
const youtubeEmbedUrl = (youtubeId: string) =>
  `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;

const resolveDimensions = (
  width?: number,
  height?: number,
  fallback: { width: number; height: number } = { width: 1600, height: 1200 }
) => {
  if (typeof width === "number" && width > 0 && typeof height === "number" && height > 0) {
    return { width, height };
  }
  return fallback;
};

const normalizeImageSrc = (src?: string) => {
  if (!src) return undefined;
  const normalized = src.trim().replace(/\\/g, "/");
  if (!normalized) return undefined;
  if (/^https?:\/\//i.test(normalized)) return normalized;
  return encodeURI(normalized);
};

const imageCandidates = (src?: string) => {
  const normalized = normalizeImageSrc(src);
  if (!normalized) return [];

  const [path, query = ""] = normalized.split("?");
  const hasQuery = query.length > 0;
  const withQuery = (value: string) => (hasQuery ? `${value}?${query}` : value);
  const lower = path.toLowerCase();

  if (lower.endsWith(".webp")) {
    return [withQuery(path), withQuery(path.replace(/\.webp$/i, ".jpg")), withQuery(path.replace(/\.webp$/i, ".jpeg"))];
  }
  if (lower.endsWith(".jpg")) {
    return [withQuery(path), withQuery(path.replace(/\.jpg$/i, ".webp")), withQuery(path.replace(/\.jpg$/i, ".jpeg"))];
  }
  if (lower.endsWith(".jpeg")) {
    return [withQuery(path), withQuery(path.replace(/\.jpeg$/i, ".webp")), withQuery(path.replace(/\.jpeg$/i, ".jpg"))];
  }
  if (lower.endsWith(".png")) {
    return [withQuery(path), withQuery(path.replace(/\.png$/i, ".webp"))];
  }

  return [withQuery(path)];
};

const GalleryThumbnail = ({ media }: { media: GalleryMedia }) => {
  const candidates = useMemo(() => imageCandidates(media.src), [media.src]);
  const [activeSrcIndex, setActiveSrcIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const hasImage = candidates.length > 0 && !hasError;

  useEffect(() => {
    setHasError(false);
    setActiveSrcIndex(0);
  }, [media.src]);

  if (hasImage) {
    return (
      <img
        src={candidates[activeSrcIndex]}
        alt={media.alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        width={media.width}
        height={media.height}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (activeSrcIndex < candidates.length - 1) {
            setActiveSrcIndex((prev) => prev + 1);
            return;
          }
          setHasError(true);
        }}
      />
    );
  }

  if (media.type === "video" && media.videoPlatform === "facebook") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1877F2] to-[#0B4AA2]">
        <div className="text-center text-white">
          <Facebook className="mx-auto mb-2 h-10 w-10" />
          <p className="text-sm font-semibold tracking-wide">Video de Facebook</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sin portada</p>
    </div>
  );
};

const Gallery = () => {
  const raw = galleryData as GalleryItem[];

  const mediaItems: GalleryMedia[] = useMemo(
    () =>
      raw.flatMap((g) => {
        const category = normalizeCategory(g.category);
        const youtubeUrl = g.youtubeUrl || g.video;
        const facebookUrl = g.facebookUrl || g.facebook;

        if (youtubeUrl) {
          const youtubeId = extractYouTubeId(youtubeUrl);
          if (youtubeId) {
            const dimensions = g.image
              ? resolveDimensions(g.width, g.height, { width: 1280, height: 720 })
              : { width: 480, height: 360 };
            return [
              {
                src: normalizeImageSrc(g.image) ?? youtubeThumbnail(youtubeId),
                alt: g.title,
                category,
                type: "video" as const,
                videoPlatform: "youtube" as const,
                embedUrl: youtubeEmbedUrl(youtubeId),
                width: dimensions.width,
                height: dimensions.height,
              },
            ];
          }
        }

        if (facebookUrl) {
          const embedUrl = buildFacebookEmbedUrl(facebookUrl);
          if (embedUrl) {
            const dimensions = resolveDimensions(g.width, g.height, { width: 1280, height: 720 });
            return [
              {
                src: normalizeImageSrc(g.image),
                alt: g.title,
                category,
                type: "video" as const,
                videoPlatform: "facebook" as const,
                embedUrl,
                width: dimensions.width,
                height: dimensions.height,
              },
            ];
          }
        }

        if (g.image) {
          const dimensions = resolveDimensions(g.width, g.height);
          return [
            {
              src: normalizeImageSrc(g.image),
              alt: g.title,
              category,
              type: "image" as const,
              width: dimensions.width,
              height: dimensions.height,
            },
          ];
        }

        return [];
      }),
    [raw]
  );

  const categories = useMemo(() => {
    const dynamic = Array.from(new Set(mediaItems.map((media) => media.category)));
    return sortCategories(dynamic);
  }, [mediaItems]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const modalCandidates = useMemo(() => imageCandidates(selectedMedia?.src), [selectedMedia?.src]);
  const [modalSrcIndex, setModalSrcIndex] = useState(0);

  useEffect(() => {
    setModalSrcIndex(0);
  }, [selectedMedia?.src]);

  const filteredMedia = useMemo(() => {
    if (selectedCategory === "all") return mediaItems;
    return mediaItems.filter((media) => media.category === selectedCategory);
  }, [mediaItems, selectedCategory]);

  return (
    <Layout>
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Galeria Multimedia</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explora fotos y videos de YouTube de nuestros campus, aulas, eventos y actividades.
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
              Todo
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
            {filteredMedia.map((media, idx) => (
              <motion.button
                key={`${media.src || media.alt}-${media.alt}-${idx}`}
                variants={item}
                type="button"
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border text-left"
                onClick={() => setSelectedMedia(media)}
              >
                <GalleryThumbnail media={media} />
                {media.type === "video" && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-foreground/70 p-3 text-background">
                      <Play className="h-8 w-8 fill-current" />
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-background/90">{media.category}</p>
                  {media.type === "video" && media.videoPlatform && (
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-background/80">
                      Video {media.videoPlatform === "youtube" ? "YouTube" : "Facebook"}
                    </p>
                  )}
                  <p className="text-sm font-medium text-background">{media.alt}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {filteredMedia.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No se encontraron elementos en esta categoria.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-background/20 p-2 text-background transition-colors hover:bg-background/30"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="h-6 w-6" />
            </button>
            {selectedMedia.type === "image" ? (
              modalCandidates.length > 0 ? (
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={modalCandidates[modalSrcIndex]}
                  alt={selectedMedia.alt}
                  className="max-h-[90vh] max-w-full rounded-lg object-contain"
                  width={selectedMedia.width}
                  height={selectedMedia.height}
                  decoding="async"
                  onError={() => {
                    if (modalSrcIndex < modalCandidates.length - 1) {
                      setModalSrcIndex((prev) => prev + 1);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className="flex h-64 w-full max-w-xl items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  No se pudo cargar la imagen.
                </div>
              )
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                  {selectedMedia.embedUrl ? (
                    <iframe
                      src={selectedMedia.embedUrl}
                      title={selectedMedia.alt}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-background/90">
                      No se pudo cargar el video.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
