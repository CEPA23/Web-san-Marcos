import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Heart, Building, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import libraryImage from "@/assets/library.jpg";
import classroomImage from "@/assets/classroom.jpg";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue the highest standards in academic achievement and personal growth.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We uphold honesty, ethical behavior, and accountability in all we do.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We foster a supportive environment where every member belongs and thrives.",
  },
];

const campuses = [
  {
    name: "Main Campus",
    grades: "K-12",
    students: "2,000+",
    address: "123 Education Boulevard, Downtown",
    description: "Our flagship campus featuring comprehensive facilities for all grade levels.",
  },
  {
    name: "North Campus",
    grades: "K-8",
    students: "1,500+",
    address: "456 Academic Way, North District",
    description: "A modern facility focused on elementary and middle school education.",
  },
  {
    name: "West Campus",
    grades: "9-12",
    students: "1,200+",
    address: "789 Learning Lane, West Side",
    description: "Specialized high school campus with advanced STEM and arts programs.",
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
              About Horizon Academy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Since 1985, Horizon Academy has been dedicated to nurturing young minds 
              and preparing students for a lifetime of learning and leadership.
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
                alt="Horizon Academy Library"
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
                  <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To provide an exceptional educational experience that empowers students 
                  to become thoughtful, innovative, and responsible global citizens through 
                  rigorous academics, character development, and community engagement.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be recognized as a leading institution in holistic education, 
                  inspiring a love of learning and cultivating leaders who make 
                  meaningful contributions to society.
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
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Horizon Academy
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
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 1985 by a group of dedicated educators, Horizon Academy 
                  began as a small school with a big vision: to create an educational 
                  environment where every child could thrive.
                </p>
                <p>
                  Over the past four decades, we have grown from a single classroom 
                  of 30 students to a multi-campus institution serving over 5,000 
                  students annually. Our alumni have gone on to become leaders in 
                  medicine, law, technology, arts, and public service.
                </p>
                <p>
                  Today, Horizon Academy continues to evolve, embracing innovative 
                  teaching methods while staying true to our founding principles of 
                  excellence, integrity, and community.
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
                alt="Classroom learning"
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
              Our Campuses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three modern facilities designed for optimal learning experiences
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
                          Grades {campus.grades}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{campus.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Users className="h-4 w-4 text-accent" />
                      <span>{campus.students} Students</span>
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
