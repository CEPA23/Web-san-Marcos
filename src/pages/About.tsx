import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Heart, Building, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import libraryImage from "@/assets/library.jpg";
import classroomImage from "@/assets/classroom.jpg";

const values = [
  {
    icon: Target,
    title: "Excelencia",
    description: "Perseguimos los más altos estándares en logros académicos y crecimiento personal.",
  },
  {
    icon: Heart,
    title: "Integridad",
    description: "Mantenemos la honestidad, el comportamiento ético y la responsabilidad en todo lo que hacemos.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Fomentamos un ambiente de apoyo donde cada miembro pertenece y prospera.",
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

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Acerca de la I.E.P Mayor De San Marcos
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Desde 1985, Academia Horizonte se ha dedicado a formar jóvenes mentes 
              y preparar estudiantes para una vida de aprendizaje y liderazgo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={libraryImage}
                alt="Biblioteca Academia Horizonte"
                className="rounded-2xl shadow-elevated"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Nuestra Misión</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Proporcionar una experiencia educativa excepcional que empodere a los estudiantes 
                  para convertirse en ciudadanos globales reflexivos, innovadores y responsables a través 
                  de rigurosos académicos, desarrollo del carácter y compromiso comunitario.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Nuestra Visión</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconocidos como una institución líder en educación integral, 
                  inspirando el amor por el aprendizaje y cultivando líderes que hacen 
                  contribuciones significativas a la sociedad.
                </p>
              </div>
            </motion.div>
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
              Nuestros Valores Fundamentales
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían todo lo que hacemos en Academia Horizonte
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={item}>
                <Card className="h-full text-center card-hover">
                  <CardContent className="p-8">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-accent/20 mb-6">
                      <value.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
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
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fundada en 1985 por un grupo de educadores dedicados, La I.E.P Mayor De San Marcos 
                  comenzó como una pequeña escuela con una gran visión: crear un entorno 
                  educativo donde cada niño pudiera prosperar.
                </p>
                <p>
                  Durante las últimas cuatro décadas, hemos crecido de un solo salón 
                  de 30 estudiantes a una institución multicampus que atiende a más de 5,000 
                  estudiantes anualmente. Nuestros egresados se han convertido en líderes en 
                  medicina, derecho, tecnología, artes y servicio público.
                </p>
                <p>
                  Hoy, La I.E.P Mayor De San Marcos continúa evolucionando, adoptando métodos 
                  de enseñanza innovadores mientras nos mantenemos fieles a nuestros principios 
                  fundadores de excelencia, integridad y comunidad.
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
                src={classroomImage}
                alt="Aprendizaje en el aula"
                className="rounded-2xl shadow-elevated"
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
              Tres instalaciones modernas diseñadas para experiencias de aprendizaje óptimas
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
                <Card className="h-full card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {campus.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Grados {campus.grades}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{campus.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
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
