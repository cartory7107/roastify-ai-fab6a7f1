import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageCircle, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-flame-orange/6 blur-[160px] flame-flicker" />
        <div className="absolute right-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full bg-flame-red/5 blur-[120px] flame-flicker" style={{ animationDelay: "1.5s" }} />
      </div>

      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Roastify
        </Link>
      </nav>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <Badge className="bg-flame-orange/10 text-flame-orange border-flame-orange/20 px-4 py-1.5 text-xs font-semibold gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            Get in Touch
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Contact <span className="fire-gradient-text">Us</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Have questions, feedback, or business inquiries? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
        >
          <a
            href="mailto:cartorymain@gmail.com"
            className="glass-surface glass-surface-hover group flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:border-flame-orange/20"
            style={{ boxShadow: "inset 0 0 0 1px var(--stroke-subtle)" }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-flame-orange/10 text-flame-orange group-hover:bg-flame-orange/20 transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Email Us</p>
              <p className="text-sm font-medium text-foreground">cartorymain@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/8801843253599"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-surface glass-surface-hover group flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:border-green-500/20"
            style={{ boxShadow: "inset 0 0 0 1px var(--stroke-subtle)" }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">WhatsApp</p>
              <p className="text-sm font-medium text-green-400">+880 1843253599</p>
            </div>
          </a>

          <a
            href="https://wa.me/01843253599"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-surface glass-surface-hover group flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:border-green-500/20"
            style={{ boxShadow: "inset 0 0 0 1px var(--stroke-subtle)" }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">WhatsApp</p>
              <p className="text-sm font-medium text-green-400">01843253599</p>
            </div>
          </a>

          <div
            className="glass-surface group flex items-center gap-4 rounded-xl p-5"
            style={{ boxShadow: "inset 0 0 0 1px var(--stroke-subtle)" }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Location</p>
              <p className="text-sm font-medium text-foreground">Bangladesh</p>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-12">
          © {new Date().getFullYear()} Cartory BD. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Contact;
