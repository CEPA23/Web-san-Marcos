import config from "@/data/config.json";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const number = config?.whatsapp?.number?.trim?.() ?? "";
  const message = config?.whatsapp?.message ?? "";

  if (!number) return null;

  const href = `https://wa.me/${encodeURIComponent(number)}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      title="WhatsApp"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: "9999px",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        zIndex: 9999,
      }}
    >
      <MessageCircle color="white" size={26} />
    </a>
  );
}

