import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Star,
  Shield,
  Zap,
  BadgeCheck,
  CheckCircle2,
  Smartphone,
  ArrowLeft,
  Share,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const SCREENSHOTS = [
  {
    title: "Brutal Roast Report",
    desc: "AI exposes every UX flaw in 30s",
    gradient: "from-orange-500/40 via-red-500/30 to-yellow-500/20",
  },
  {
    title: "SEO + Speed Scores",
    desc: "Real metrics, no fluff",
    gradient: "from-red-500/40 via-orange-500/30 to-pink-500/20",
  },
  {
    title: "Quick Wins",
    desc: "Copy-paste fixes that work",
    gradient: "from-yellow-500/40 via-orange-500/30 to-red-500/20",
  },
  {
    title: "Competitor Compare",
    desc: "See who's beating you & why",
    gradient: "from-orange-600/40 via-yellow-500/30 to-red-500/20",
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: "Secure", sub: "HTTPS verified" },
  { icon: Zap, label: "Fast", sub: "<3s install" },
  { icon: BadgeCheck, label: "Verified", sub: "Trusted app" },
];

type InstallState = "idle" | "preparing" | "downloading" | "installing" | "done" | "unavailable";

const Install = () => {
  const [promptAvailable, setPromptAvailable] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [state, setState] = useState<InstallState>("idle");
  const [progress, setProgress] = useState(0);
  const [activeShot, setActiveShot] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(display-mode: standalone)").matches) {
      setInstalled(true);
    }
    if ((window as any).__deferredInstallPrompt) setPromptAvailable(true);
    const onAvail = () => setPromptAvailable(true);
    const onInstalled = () => {
      setInstalled(true);
      setState("done");
    };
    window.addEventListener("pwa-install-available", onAvail);
    window.addEventListener("pwa-installed", onInstalled);
    return () => {
      window.removeEventListener("pwa-install-available", onAvail);
      window.removeEventListener("pwa-installed", onInstalled);
    };
  }, []);

  // Auto-rotate screenshots
  useEffect(() => {
    const t = setInterval(() => setActiveShot((s) => (s + 1) % SCREENSHOTS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const isIOS = useMemo(
    () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    [],
  );

  const handleInstall = async () => {
    if (installed) return;
    setState("preparing");
    setProgress(0);

    // Fake APK-style progress
    await new Promise((r) => setTimeout(r, 500));
    setState("downloading");
    for (let i = 0; i <= 100; i += 4) {
      setProgress(i);
      await new Promise((r) => setTimeout(r, 35));
    }
    setState("installing");
    await new Promise((r) => setTimeout(r, 700));

    const deferred = (window as any).__deferredInstallPrompt as BeforeInstallPromptEvent | null;
    if (deferred) {
      try {
        await deferred.prompt();
        const choice = await deferred.userChoice;
        (window as any).__deferredInstallPrompt = null;
        if (choice.outcome === "accepted") {
          setState("done");
          setInstalled(true);
        } else {
          setState("idle");
          setProgress(0);
        }
      } catch {
        setState("idle");
      }
    } else {
      setState("unavailable");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-destructive/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex max-w-md items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="flex h-10 w-10 items-center justify-center rounded-full glass-surface glass-surface-hover transition-all active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          App Store
        </span>
        <button
          onClick={() =>
            navigator.share?.({
              title: "Roastify AI",
              text: "Get brutal AI roasts of your website",
              url: window.location.origin,
            })
          }
          className="flex h-10 w-10 items-center justify-center rounded-full glass-surface glass-surface-hover transition-all active:scale-95"
          aria-label="Share"
        >
          <Share className="h-4 w-4" />
        </button>
      </header>

      <main className="relative z-10 mx-auto max-w-md px-4 pb-32">
        {/* Hero card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass-surface p-5"
          style={{ boxShadow: "inset 0 0 0 1px var(--stroke-fire), var(--shadow-deep)" }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ boxShadow: ["0 0 20px hsla(24,100%,50%,0.3)", "0 0 40px hsla(24,100%,50%,0.6)", "0 0 20px hsla(24,100%,50%,0.3)"] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl fire-gradient p-[2px]"
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-card">
                <img src="/roastify-logo.png" alt="Roastify" className="h-12 w-12 object-contain" />
              </div>
            </motion.div>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-bold tracking-tight">Roastify AI</h1>
              <p className="text-xs text-muted-foreground">Cartory BD · Productivity</p>
              <div className="mt-2 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
                <span className="ml-1 text-xs font-semibold">4.9</span>
                <span className="text-xs text-muted-foreground">· 12.4k</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Brutal AI website roasts in 30s 🔥</p>
            </div>
          </div>

          {/* Meta strip */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-2xl bg-secondary/40 py-3 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Size</p>
              <p className="mt-0.5 text-sm font-semibold">12 MB</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Version</p>
              <p className="mt-0.5 text-sm font-semibold">v7.2</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Updated</p>
              <p className="mt-0.5 text-sm font-semibold">Today</p>
            </div>
          </div>

          {/* Install button */}
          <div className="mt-5">
            <AnimatePresence mode="wait">
              {installed || state === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-success/15 py-4 text-sm font-bold text-success"
                  style={{ boxShadow: "inset 0 0 0 1px hsla(152,60%,45%,0.4)" }}
                >
                  <CheckCircle2 className="h-5 w-5" /> Installed — Open from your home screen
                </motion.div>
              ) : state === "idle" || state === "unavailable" ? (
                <motion.button
                  key="cta"
                  onClick={handleInstall}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-full overflow-hidden rounded-2xl fire-gradient py-4 text-sm font-bold text-primary-foreground heat-pulse"
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                    style={{ mixBlendMode: "overlay" }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" /> Install App · Free
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl bg-secondary/60 p-4"
                  style={{ boxShadow: "inset 0 0 0 1px var(--stroke-fire)" }}
                >
                  <div className="mb-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-muted-foreground">
                      {state === "preparing" && "Preparing package…"}
                      {state === "downloading" && `Downloading roastify-v7.2.apk`}
                      {state === "installing" && "Installing…"}
                    </span>
                    <span className="font-semibold text-primary">{progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-background">
                    <motion.div
                      className="h-full fire-gradient"
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear", duration: 0.1 }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                    {state === "downloading"
                      ? `${((12 * progress) / 100).toFixed(1)} MB / 12 MB`
                      : "Verifying integrity…"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {state === "unavailable" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground"
              >
                {isIOS ? (
                  <>
                    <strong className="text-foreground">iOS install:</strong> tap{" "}
                    <Share className="inline h-3 w-3" /> Share → <em>Add to Home Screen</em>.
                  </>
                ) : (
                  <>
                    <strong className="text-foreground">Tip:</strong> Open this page in Chrome/Edge on
                    Android, then tap the browser menu → <em>Install app</em>.
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {TRUST_BADGES.map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-1 rounded-xl glass-surface py-3 text-center"
              >
                <b.icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold">{b.label}</span>
                <span className="text-[10px] text-muted-foreground">{b.sub}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Screenshots slider */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider">Preview</h2>
            <span className="text-[10px] font-mono text-muted-foreground">
              {activeShot + 1}/{SCREENSHOTS.length}
            </span>
          </div>
          <div
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3"
            style={{ scrollbarWidth: "none" }}
          >
            {SCREENSHOTS.map((s, i) => (
              <motion.div
                key={s.title}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveShot(i)}
                className={`relative aspect-[9/16] w-44 shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl glass-surface transition-all ${
                  activeShot === i ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`} />
                {/* Mock phone UI */}
                <div className="relative flex h-full flex-col p-3">
                  <div className="mx-auto h-1 w-10 rounded-full bg-foreground/40" />
                  <div className="mt-3 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-accent" />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/80">
                      Roastify
                    </span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2 w-3/4 rounded bg-foreground/20" />
                    <div className="h-2 w-1/2 rounded bg-foreground/20" />
                  </div>
                  <div className="mt-3 flex-1 rounded-lg bg-background/40 p-2 backdrop-blur-sm">
                    <div className="space-y-1">
                      <div className="h-1.5 w-full rounded bg-foreground/15" />
                      <div className="h-1.5 w-5/6 rounded bg-foreground/15" />
                      <div className="h-1.5 w-4/6 rounded bg-foreground/15" />
                    </div>
                    <div className="mt-2 h-8 rounded fire-gradient opacity-80" />
                  </div>
                  <div className="mt-2">
                    <p className="text-[10px] font-bold leading-tight">{s.title}</p>
                    <p className="text-[9px] text-foreground/70">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mt-8 rounded-3xl glass-surface p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider">About this app</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Roastify AI scans any website and delivers a brutal, honest report covering design,
            SEO, speed, and conversion. Built by Cartory BD. Works offline once installed.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl bg-secondary/40 p-3">
              <p className="text-muted-foreground">Developer</p>
              <p className="font-semibold">Cartory BD</p>
            </div>
            <div className="rounded-xl bg-secondary/40 p-3">
              <p className="text-muted-foreground">Compatibility</p>
              <p className="font-semibold">Android · iOS · Desktop</p>
            </div>
            <div className="rounded-xl bg-secondary/40 p-3">
              <p className="text-muted-foreground">Language</p>
              <p className="font-semibold">16+ supported</p>
            </div>
            <div className="rounded-xl bg-secondary/40 p-3">
              <p className="text-muted-foreground">Category</p>
              <p className="font-semibold">Productivity</p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">Reviews</h2>
          <div className="space-y-2">
            {[
              { name: "Sara K.", text: "Found 7 issues my agency missed. Wild.", stars: 5 },
              { name: "Dev M.", text: "Faster than Lighthouse and way more useful.", stars: 5 },
              { name: "Lina O.", text: "The roast was painful but accurate 😅", stars: 4 },
            ].map((r) => (
              <div key={r.name} className="rounded-2xl glass-surface p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{r.name}</span>
                  <div className="flex">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky bottom install bar */}
      {!installed && state !== "done" && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: "spring", damping: 20 }}
          className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/80 px-4 py-3 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-md items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl fire-gradient">
              <Smartphone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold">Roastify AI</p>
              <p className="truncate text-[11px] text-muted-foreground">Free · 12 MB · Productivity</p>
            </div>
            <motion.button
              onClick={handleInstall}
              whileTap={{ scale: 0.94 }}
              disabled={state !== "idle" && state !== "unavailable"}
              className="rounded-full fire-gradient px-5 py-2.5 text-xs font-bold text-primary-foreground disabled:opacity-60"
            >
              {state === "idle" || state === "unavailable" ? "Install" : `${progress}%`}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Install;
