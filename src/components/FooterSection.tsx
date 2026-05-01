import { useLanguage } from "@/lib/i18n";
import { Link } from "react-router-dom";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 px-4 py-10 text-center">
      <p className="mb-3 text-sm font-semibold fire-gradient-text">
        {t("footer.tagline")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <Link to="/install" className="font-semibold text-flame-orange hover:text-flame-yellow transition-colors">📲 Install App</Link>
        <span className="text-border">·</span>
        <Link to="/privacy" className="hover:text-flame-orange transition-colors">Privacy Policy</Link>
        <span className="text-border">·</span>
        <Link to="/contact" className="hover:text-flame-orange transition-colors">Contact</Link>
        <span className="text-border">·</span>
        <Link to="/about" className="hover:text-flame-orange transition-colors">👤 About</Link>
      </div>
    </footer>
  );
};

export default FooterSection;
