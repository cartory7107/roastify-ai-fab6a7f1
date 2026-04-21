import { useEffect, useRef, useState } from "react";

interface AdNativeBannerProps {
  /** Unique placement ID for tracking different positions */
  placement?: "hero" | "results" | "footer" | "default";
  /** Minimum height to prevent layout shift */
  minHeight?: number;
}

/**
 * Adsterra Native Banner Component
 * 
 * This component creates a container for Adsterra Native Banner ads.
 * The ad script is loaded globally in index.html for optimal performance.
 * 
 * Features:
 * - Lazy loading via Intersection Observer
 * - Duplicate prevention per container
 * - CLS protection with reserved space
 * - Smooth fade-in animation
 * - Responsive design
 * 
 * Placement Strategy:
 * - hero: Below hero section, captures initial scroll
 * - results: After roast output, high engagement moment
 * - footer: Above footer, additional impression opportunity
 */
const AdNativeBanner = ({ 
  placement = "default",
  minHeight = 120 
}: AdNativeBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const adIdRef = useRef(`adsterra-${placement}-${Math.random().toString(36).substr(2, 9)}`);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") {
      setIsVisible(true); // Fallback: load immediately
      return;
    }

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

  // Handle ad loading when visible
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const container = containerRef.current;
    
    // Set unique ID for this ad instance
    container.id = adIdRef.current;
    container.setAttribute("data-adsterra-placement", placement);
    container.setAttribute("data-adsterra-loaded", "true");

    // Trigger ad refresh if Adsterra API is available
    const tryRefreshAd = () => {
      const win = window as any;
      if (win.adsterra && typeof win.adsterra.refresh === "function") {
        try {
          win.adsterra.refresh(container);
        } catch {
          // Silent fail - ad will render on next cycle
        }
      }
    };

    // Try immediately and after a delay
    tryRefreshAd();
    const timer = setTimeout(() => {
      setIsLoaded(true);
      tryRefreshAd();
    }, 500);

    return () => {
      clearTimeout(timer);
      // Cleanup: mark as unloaded
      if (container) {
        container.setAttribute("data-adsterra-loaded", "false");
      }
    };
  }, [isVisible, placement]);

  // Placement-specific styling
  const placementClasses = {
    hero: "my-6 md:my-8",
    results: "my-8 md:my-12",
    footer: "my-6 md:my-8",
    default: "my-8"
  };

  return (
    <div
      ref={containerRef}
      className={`adsterra-native-banner-wrapper ${placementClasses[placement]} mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8`}
      data-placement={placement}
    >
      {/* Ad container with reserved space to prevent CLS */}
      <div
        className={`
          relative overflow-hidden rounded-xl border border-border/20 bg-muted/10
          transition-all duration-500 ease-out
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
        style={{ 
          minHeight: isVisible ? minHeight : 0,
          // Reserve space to prevent layout shift
          contain: "layout paint style"
        }}
      >
        {/* Loading placeholder */}
        {!isLoaded && isVisible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <div className="h-3 w-3 animate-pulse rounded-full bg-primary/40" />
              <span className="text-xs">Loading ad...</span>
            </div>
          </div>
        )}

        {/* Ad content container - Adsterra injects here */}
        <div 
          className="adsterra-native-ad-content flex items-center justify-center p-2"
          data-adsterra-placement={placement}
        />
      </div>
    </div>
  );
};

export default AdNativeBanner;
