import { useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/common/PageHero";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Heart, Building, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import historia from "@/assets/historia.webp";
import vision from "@/assets/nuestravisio-mision.webp";
import mision from "@/assets/mision.webp";

type IconComponent = ComponentType<{ className?: string }>;

const values = [
  {
    icon: Heart,
    title: "Formacion Integral Cristiana",
    description:
      "Promovemos la vivencia de los valores cristianos como el amor, el respeto, la solidaridad, la honestidad y el servicio, formando ninos con principios firmes que orienten su conducta y su proyecto de vida.",
  },
  {
    icon: Target,
    title: "Excelencia Academica y Aprendizajes Significativos",
    description:
      "Fortalecemos el desarrollo de competencias, capacidades y habilidades, asegurando aprendizajes de calidad que permitan a los estudiantes pensar criticamente, resolver problemas y desenvolverse con exito en su entorno.",
  },
  {
    icon: Users,
    title: "Convivencia Escolar y Bienestar Integral",
    description:
      "Garantizamos ambientes seguros, inclusivos y libres de violencia, fomentando la sana convivencia, el respeto mutuo y el desarrollo emocional y social de los estudiantes.",
  },
  {
    icon: Building,
    title: "Compromiso Educativo y Comunidad",
    description:
      "Trabajamos de manera articulada con docentes, familias y comunidad educativa, promoviendo la corresponsabilidad, el acompanamiento permanente y el compromiso con la formacion y el crecimiento de cada nino.",
  },
];

const campuses = [
  {
    id: "primaria",
    name: "Sede Primaria",
    grades: "Primaria",
    students: "1,000",
    address: "Tupac Yupanqui #631",
    description: "Nuestro campus insignia con instalaciones completas para todos los niveles escolares.",
  },
  {
    id: "inicial",
    name: "Sede Inicial",
    grades: "Inicial",
    students: "1,500+",
    address: "Mayta Capac #136",
    description: "Una sede para nuestros pequeños del hogar, con ambientes especializados para ellos.",
  },
  {
    id: "secundaria",
    name: "Sede Secundaria",
    grades: "Secundaria",
    students: "1,200+",
    address: "Tupac Yupanqui #561",
    description: "Sede especializada en el nivel secundaria.",
  },
  {
    id: "Inicial-Primaria-Secundaria",
    name: "Sede Santa Isabel",
    grades: "Inicial-Primaria-Secundaria",
    students: "1,200+",
    address: "Calle LiverPool #190",
    description: "Sede especializda en todos los niveles academicos",
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

const FlipCard = ({
  title,
  text,
  image,
  icon: Icon,
  imageWidth,
  imageHeight,
}: {
  title: string;
  text: string;
  image: string;
  icon: IconComponent;
  imageWidth: number;
  imageHeight: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[480px] w-full cursor-pointer perspective-1000 sm:h-[420px] md:h-[450px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-[28px] border border-white/60 bg-card backface-hidden shadow-elevated">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.18)_34%,rgba(15,23,42,0.88)_100%)] p-6 text-white sm:p-8">
            <div className="flex h-full flex-col justify-between">
              <div className="h-1.5 w-20 rounded-full gold-gradient" />
              <div className="flex flex-col items-center justify-end pb-2 text-center sm:pb-4">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-1 ring-white/30 sm:h-16 sm:w-16">
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h3>
                <div className="mt-4 h-1 w-16 rounded-full gold-gradient" />
                <p className="mt-3 text-sm font-medium text-white/80 sm:text-base">
                  Pasa el mouse para ver mas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col justify-center overflow-hidden rounded-[28px] border border-accent/50 bg-primary p-5 text-center text-primary-foreground shadow-elevated backface-hidden sm:p-8"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
          <div className="relative mx-auto mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 sm:mb-4 sm:h-16 sm:w-16 md:mb-6 md:h-20 md:w-20">
            <Icon className="h-6 w-6 text-accent sm:h-8 sm:w-8 md:h-10 md:w-10" />
          </div>
          <h3 className="relative mb-2 shrink-0 text-xl font-bold sm:mb-4 sm:text-2xl">{title}</h3>
          <div className="relative mx-auto mb-4 h-1 w-16 rounded-full gold-gradient" />
          <div className="relative w-full overflow-y-auto px-2 scrollbar-hide">
            <p className="text-sm leading-relaxed text-primary-foreground/90 sm:text-base md:text-lg">
              {text}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <Layout>
      <PageHero
        title="Acerca de la I.E.P Mayor De San Marcos"
        description="Desde 1997, la I.E.P Mayor De San Marcos se ha dedicado a formar jóvenes mentes y preparar estudiantes para una vida de aprendizaje, liderazgo y valores."
        eyebrow="Identidad institucional"
        imageSrc={historia}
        imageAlt="Estudiantes y docentes de la I.E.P Mayor de San Marcos"
        imagePosition="bottom"
      />

      {/* Mission & Vision */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Nuestra Esencia
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce el propósito y el futuro que construimos para nuestros estudiantes.
            </p>
          </motion.div>

          <div className="rounded-[32px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(248,243,234,0.82)_100%)] p-6 shadow-card sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-1.5 w-20 rounded-full gold-gradient" />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
                Mision y vision
              </p>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <FlipCard
                  title="Nuestra Misión"
                  icon={Target}
                  image={mision}
                  imageWidth={645}
                  imageHeight={1024}
                  text="Somos una Institución Educativa Privada que brinda aprendizajes cristianos y pedagógicos de calidad, en coherencia con los Compromisos de Gestión Escolar, para garantizar que todos nuestros estudiantes desarrollen aprendizajes significativos y de excelencia. Promovemos el desarrollo integral de los niños en ambientes seguros, inclusivos, de sana convivencia y libres de violencia, fortaleciendo permanentemente sus capacidades académicas, emocionales y sociales fortaleciendo su amor en Jesús, basadas en los fines y principios de la Educación Peruana."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <FlipCard
                  title="Nuestra Visión"
                  icon={Eye}
                  image={vision}
                  imageWidth={960}
                  imageHeight={640}
                  text="Ser una Institución Educativa Privada reconocida por su formación integral y cristiana, que educa a niños con sólidos valores humanos y cristianos, capaces de vivir su fe con coherencia, amor y respeto al prójimo. Aspiramos a formar estudiantes competentes, responsables y comprometidos con la sociedad, que fortalezcan continuamente sus aprendizajes, desarrollen su pensamiento crítico y construyan un proyecto de vida inspirado en los valores del Evangelio."
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Pilares Importantes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ejes que orientan la formacion integral de nuestros estudiantes
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={item}>
                <Card className="card-hover h-full border-border/70 bg-card/95 shadow-card">
                  <CardContent className="p-8 sm:p-9">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 ring-1 ring-accent/20">
                      <value.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="mb-4 max-w-md text-xl font-semibold leading-snug text-foreground">
                      {value.title}
                    </h3>
                    <div className="mb-5 h-px w-20 bg-gradient-to-r from-accent/80 to-transparent" />
                    <p className="text-base leading-7 text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  La Institución Educativa Privada Mayor de San Marcos fue creada en 1996 e inicia
                  sus actividades en 1997 en Trujillo, ofreciendo los niveles Inicial, Primaria y Secundaria.
                  Desde su primer año destacó por su alta demanda estudiantil, lo que impulsó la expansión de sus instalaciones.
                </p>
                <p>
                  A lo largo de los años ha obtenido diversos reconocimientos académicos, culturales y artísticos a nivel local, regional y nacional,
                  incluyendo premios en poesía, teatro, ciencia, danza y marinera, así como distinciones de instituciones públicas.
                </p>
                <p>
                  Actualmente, el consorcio cuenta con siete locales y atiende a más de dos mil estudiantes en educación básica regular,
                  educación no escolarizada, ademáis de integrar el Instituto Pedagógico Oxford y el Instituto Tecnológico Von Humboldt.
                  Su propuesta educativa se basa en una formación integral con programas holísticos orientados a la excelencia académica y al desarrollo
                  de estudiantes exitosos.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img
                src={historia}
                alt="Aprendizaje en el aula"
                className="rounded-[28px] border border-border/60 shadow-elevated"
                width={1600}
                height={1118}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campuses */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Nuestros Campus
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cuatro instalaciones modernas diseñadas para experiencias de aprendizaje óptimas
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {campuses.map((campus) => (
              <motion.div key={campus.name} variants={item}>
                <Card className="card-hover h-full border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,243,234,0.85)_100%)] shadow-card">
                  <CardContent className="p-6 sm:p-7">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/10">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {campus.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-primary/55">
                          {campus.grades}
                        </p>
                      </div>
                    </div>
                    <p className="mb-5 text-base leading-7 text-muted-foreground">{campus.description}</p>
                    <div className="mb-3 h-px w-full bg-gradient-to-r from-border via-border/60 to-transparent" />
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-accent" />
                      <span>{campus.students} Estudiantes</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-accent mt-0.5" />
                      <span>{campus.address}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
