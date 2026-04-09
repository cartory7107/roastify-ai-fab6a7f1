import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-flame-orange/6 blur-[160px] flame-flicker" />
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
            <Shield className="h-3.5 w-3.5" />
            Your Privacy Matters
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Privacy <span className="fire-gradient-text">Policy</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {[
            {
              title: "1. Information We Collect",
              content: "When you use Cartory Roastify AI, we may collect the website URLs you submit for analysis. We do not collect personal information unless you voluntarily provide it (e.g., via the contact page)."
            },
            {
              title: "2. How We Use Your Information",
              content: "The URLs you submit are used solely to generate AI-powered website analysis and roast reports. We do not sell, trade, or share your data with third parties for marketing purposes."
            },
            {
              title: "3. Data Storage & Security",
              content: "We use industry-standard security measures to protect your data. Analysis results are processed in real-time and are not permanently stored on our servers unless required for service improvement."
            },
            {
              title: "4. Cookies",
              content: "Our website may use essential cookies to ensure proper functionality. We do not use tracking cookies or third-party advertising cookies."
            },
            {
              title: "5. Third-Party Services",
              content: "We use AI services to power our analysis tools. These services process data according to their own privacy policies. We ensure all third-party providers meet our security standards."
            },
            {
              title: "6. Your Rights",
              content: "You have the right to request deletion of any data associated with your usage. Contact us at cartorymain@gmail.com for any privacy-related requests."
            },
            {
              title: "7. Changes to This Policy",
              content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date."
            },
            {
              title: "8. Contact Us",
              content: "If you have any questions about this Privacy Policy, please contact us at cartorymain@gmail.com or via WhatsApp at +880 1843253599."
            }
          ].map((section, i) => (
            <div key={i} className="glass-surface rounded-xl p-6" style={{ boxShadow: "inset 0 0 0 1px var(--stroke-subtle)" }}>
              <h2 className="text-lg font-semibold mb-3 text-foreground">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-12">
          © {new Date().getFullYear()} Cartory BD. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
