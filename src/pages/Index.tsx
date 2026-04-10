import { useState, useRef, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";

const AdNativeBanner = lazy(() => import("@/components/AdNativeBanner"));
import { Flame, Rocket } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import URLInputSection from "@/components/URLInputSection";
import type { Industry } from "@/components/URLInputSection";
import ScoreDashboard from "@/components/ScoreDashboard";
import RoastReport from "@/components/RoastReport";
import QuickWins from "@/components/QuickWins";
import ExportSection from "@/components/ExportSection";
import PaywallSection from "@/components/PaywallSection";
import FooterSection from "@/components/FooterSection";
import FixGenerator from "@/components/FixGenerator";
import CompetitorComparison from "@/components/CompetitorComparison";
import BriefPromptEngine from "@/components/BriefPromptEngine";
import FeatureShowcase from "@/components/FeatureShowcase";
import TopCompetitors from "@/components/TopCompetitors";
import AIChat from "@/components/AIChat";
import { generateReportText, getScanMessages, type RoastResult } from "@/lib/mockRoast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { toast } from "sonner";
import { useAdsterra } from "@/hooks/useAdsterra";

const Index = () => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [result, setResult] = useState<RoastResult | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState("");
  const [competitorResult, setCompetitorResult] = useState<RoastResult | null>(null);
  const [competitorUrl, setCompetitorUrl] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  // Load Adsterra Social Bar only after user interacts (clicks roast)
  useAdsterra(hasInteracted);

  const scrollToInput = useCallback(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleSubmit = useCallback(async (url: string, industry: Industry, compUrl?: string) => {
    setIsLoading(true);
    setHasInteracted(true);
    setResult(null);
    setCompetitorResult(null);
    setScanLogs([]);
    setAnalyzedUrl(url);
    setCompetitorUrl(compUrl || "");

    const messages = getScanMessages();
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < messages.length) {
        setScanLogs((prev) => [...prev, messages[logIndex]]);
        logIndex++;
      }
    }, 600);

    try {
      // Main analysis
      const { data, error } = await supabase.functions.invoke('roast-website', {
        body: { url, industry, language },
      });

      clearInterval(logInterval);

      if (error) {
        toast.error(error.message || 'Failed to analyze website.');
        setIsLoading(false);
        setScanLogs([]);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        setIsLoading(false);
        setScanLogs([]);
        return;
      }

      setResult(data as RoastResult);

      // Competitor analysis if URL provided
      if (compUrl) {
        try {
          const { data: compData } = await supabase.functions.invoke('roast-website', {
            body: { url: compUrl, industry, language },
          });
          if (compData && !compData.error) {
            setCompetitorResult(compData as RoastResult);
          }
        } catch {
          // Competitor analysis is optional, don't block
        }
      }
    } catch (err) {
      clearInterval(logInterval);
      console.error('Roast error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setScanLogs([]);
    }
  }, [language]);

  const reportText = result ? generateReportText(analyzedUrl, result) : "";
  const roastSummary = result
    ? result.roastItems.map((r) => `${r.title}: ${r.problem}`).join("; ")
    : "";
  const overallScore = result
    ? Math.round((result.scores.design + result.scores.seo + result.scores.speed + result.scores.conversion) / 4)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onScrollToInput={scrollToInput} />
      <URLInputSection ref={inputRef} onSubmit={handleSubmit} isLoading={isLoading} scanLogs={scanLogs} />

      {/* Native Banner — below hero/input */}
      <Suspense fallback={null}><AdNativeBanner /></Suspense>

      {!result && <FeatureShowcase onScrollToInput={scrollToInput} />}

      {result && (
        <>
          <ScoreDashboard scores={result.scores} />
          <RoastReport items={result.roastItems} />

          {/* Native Banner — after roast output */}
          <Suspense fallback={null}><AdNativeBanner /></Suspense>

          <TopCompetitors url={analyzedUrl} roastSummary={roastSummary} industry={undefined} userScores={result.scores} />

          {competitorResult && competitorUrl && (
            <CompetitorComparison
              yourScores={result.scores}
              competitorScores={competitorResult.scores}
              competitorUrl={competitorUrl}
            />
          )}

          <FixGenerator url={analyzedUrl} roastSummary={roastSummary} />
          <BriefPromptEngine url={analyzedUrl} roastSummary={roastSummary} />
          <QuickWins tips={result.quickWins} />
          <ExportSection reportText={reportText} websiteUrl={analyzedUrl} overallScore={overallScore} />
          <PaywallSection />

          {/* Engagement CTAs */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mx-auto max-w-2xl px-4 py-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={scrollToInput}
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px hsla(24, 100%, 50%, 0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 fire-gradient rounded-xl px-8 py-3.5 text-sm font-bold text-primary-foreground heat-pulse"
            >
              <Flame className="h-4 w-4" /> 🔥 Roast Another Website
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px hsla(152, 60%, 45%, 0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl glass-surface px-8 py-3.5 text-sm font-semibold text-foreground transition-all"
              style={{ boxShadow: "inset 0 0 0 1px hsla(152, 60%, 45%, 0.3)" }}
            >
              <Rocket className="h-4 w-4 text-success" /> 🚀 Want us to fix your website?
            </motion.button>
          </motion.section>
        </>
      )}

      {/* Native Banner — above footer */}
      <Suspense fallback={null}><AdNativeBanner /></Suspense>

      <FooterSection />

      <AIChat websiteUrl={analyzedUrl || undefined} roastSummary={roastSummary || undefined} />
    </div>
  );
};

export default Index;
