import { useEffect, useRef, useState } from "react";

interface AdNativeBannerProps {
  /** Unique placement ID for tracking different positions */
  placement?: "hero" | "results" | "footer" | "default";
  /** Minimum height to prevent layout shift */
  minHeight?: number;
}

const SCRIPT_SRC = "https://pl29106259.profitablecpmratenetwork.com/8d/02/b8/8d02b8cbd28898c543dffbe7e601bda9.js";

// Global script injection tracker
let globalScriptInjected = false;

/**
 * Injects Adsterra script globally once
 * Uses async loading to prevent blocking page render
 */
function injectGlobalScript() {
  if (globalScriptInjected || typeof document === "undefined") return;
  globalScriptInjected = true;

  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.async = true;
  script.type = "text/javascript";
  script.setAttribute("data-adsterra-type", "native-banner");
  
  // Append to body for global availability
  document.body.appendChild(script);
}

/**
 * Adsterra Native Banner Component
 * 
 * Optimized for:
 * - Maximum impression-based earnings
 * - Zero layout shift (CLS protection)
 * - Smooth loading animations
 * - Mobile + desktop responsive
 * 
 * Placement Strategy:
 * 1. Below hero: Captures users who scroll past CTA
 * 2. After results: High engagement moment
 * 3. Above footer: Additional impression opportunity
 */
const AdNativeBanner = ({ 
  placement = "default",
  minHeight = 120 
}: AdNativeBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: "100px", // Start loading 100px before visible
        threshold: 0.1 
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Inject script and handle ad loading
  useEffect(() => {
    if (!isVisible) return;

    // Inject global script (only runs once)
    injectGlobalScript();

    // Mark as loaded after a short delay for smooth animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [isVisible]);

  // Placement-specific styling
  const placementStyles = {
    hero: "my-6 md:my-8",
    results: "my-8 md:my-10",
    footer: "my-6 md:my-8",
    default: "my-8"
  };

  return (
    <div
      ref={containerRef}
      className={`adsterra-native-banner-container ${placementStyles[placement]} mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8`}
      data-placement={placement}
    >
      {/* Ad container with reserved space to prevent CLS */}
      <div
        className={`
          relative overflow-hidden rounded-xl border border-border/30 bg-muted/20
          transition-all duration-500 ease-out
          ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        style={{ 
          minHeight: isVisible ? minHeight : 0,
          // Reserve space to prevent layout shift
          contain: "layout paint"
        }}
      >
        {/* Loading state */}
        {!isLoaded && isVisible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-4 w-4 animate-pulse rounded-full bg-primary/60" />
              <span className="text-xs">Loading...</span>
            </div>
          </div>
        )}

        {/* Adsterra Native Banner renders here */}
        {/* The global script handles ad injection into this container */}
        <div 
          className="adsterra-native-ad flex items-center justify-center"
          data-adsterra-placement={placement}
        />
      </div>
    </div>
  );
};

export default AdNativeBanner;
