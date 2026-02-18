import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import config from "@/data/config.json";

const contact = config.contact;
const campuses = Array.isArray(config.campuses) ? config.campuses : [];
const campusHours = "Lun-Vie: 8:00 AM - 5:00 PM";
const primaryCampusMapUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.4566363002045!2d-79.0238366899898!3d-8.119136457221831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d7ee873e45d%3A0x82d46e6f8573895e!2sColegio%20San%20Marcos!5e0!3m2!1ses-419!2spe!4v1771221885412!5m2!1ses-419!2spe";

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(100, "El nombre debe tener menos de 100 caracteres"),
  email: z.string().trim().email("Correo electrónico inválido").max(255, "El correo debe tener menos de 255 caracteres"),
  phone: z.string().trim().max(20, "El teléfono debe tener menos de 20 caracteres").optional(),
  campus: z.string().min(1, "Por favor selecciona un campus"),
  subject: z.string().trim().min(1, "El asunto es requerido").max(200, "El asunto debe tener menos de 200 caracteres"),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000, "El mensaje debe tener menos de 2000 caracteres"),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    campus: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const contactEmail = (contact?.email ?? "").toString().trim();

      if (!contactEmail) {
        toast({
          title: "No hay correo configurado",
          description: "Configura el correo de contacto en src/data/config.json.",
          variant: "destructive",
        });
        return;
      }

      const bodyLines = [
        `Nombre: ${formData.name}`,
        `Email: ${formData.email}`,
        `Teléfono: ${formData.phone || "-"}`,
        `Campus: ${formData.campus}`,
        "",
        "Mensaje:",
        formData.message,
      ];

      const mailtoHref = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      window.location.href = mailtoHref;

      toast({
        title: "Listo",
        description: "Se abrió tu aplicación de correo con el mensaje preparado para enviar.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        campus: "",
        subject: "",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
    return;

    /* Legacy mock submit (unreachable)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "¡Mensaje Enviado!",
      description: "Gracias por contactarnos. Te responderemos en 24-48 horas.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      campus: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
    */
  };

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
              Contáctanos
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              ¿Tienes preguntas sobre admisiones, programas o visitas a nuestros campus? 
              Estamos aquí para ayudarte. Contáctanos y te responderemos en 24-48 horas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Envíanos un Mensaje
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre Completo *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Juan Pérez"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Correo Electrónico *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="juan@ejemplo.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Número de Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="campus" className="block text-sm font-medium text-foreground mb-2">
                      Campus *
                    </label>
                    <select
                      id="campus"
                      value={formData.campus}
                      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        errors.campus ? "border-destructive" : "border-input"
                      }`}
                    >
                      <option value="">Selecciona un campus</option>
                      {campuses.map((campus) => (
                        <option key={campus.name} value={campus.name}>
                          {campus.name}
                        </option>
                      ))}
                      <option value="General">Consulta General</option>
                    </select>
                    {errors.campus && (
                      <p className="text-sm text-destructive mt-1">{errors.campus}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Asunto *
                  </label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Consulta de admisiones para Otoño 2026"
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Por favor proporciona detalles sobre tu consulta..."
                    rows={5}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </motion.div>

            {/* Campus Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Nuestros Campus
              </h2>
              {campuses.map((campus) => (
                <Card key={campus.name} className="card-hover">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      {campus.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>{campus.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="h-5 w-5 text-accent shrink-0" />
                        <span>{campus.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="h-5 w-5 text-accent shrink-0" />
                        <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock className="h-5 w-5 text-accent shrink-0" />
                        <span>{campusHours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-secondary">
        <div className="container-custom py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Encuéntranos
          </h2>
          <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-elevated">
            <iframe
              src={primaryCampusMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del Campus Principal"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
