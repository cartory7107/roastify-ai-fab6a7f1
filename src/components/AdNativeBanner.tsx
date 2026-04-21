import { useEffect, useRef } from "react";

interface AdNativeBannerProps {
  /** Unique placement ID for tracking */
  placement?: string;
}

/**
 * Adsterra Native Banner Component
 * 
 * This component creates a container for Adsterra Native Banner ads.
 * The ad script is loaded globally via useAdsterra hook after user interaction.
 * 
 * Placement Strategy:
 * - Below hero: High visibility after user commits
 * - After results: Captures engaged users
 * - Above footer: Additional impression opportunity
 */
const AdNativeBanner = ({ placement = "default" }: AdNativeBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const adLoadedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate ad loads in the same container
    if (adLoadedRef.current || !containerRef.current) return;

    // Mark as loaded to prevent duplicates
    adLoadedRef.current = true;

    // Adsterra Native Banner container
    // The global script handles the actual ad rendering
    const container = containerRef.current;
    container.setAttribute("data-adsterra-placement", placement);
    
    // Trigger ad refresh if script is already loaded
    if (typeof window !== "undefined" && (window as any).adsterra) {
      try {
        (window as any).adsterra.refresh(container);
      } catch {
        // Silent fail - ad will render on next cycle
      }
    }

    return () => {
      // Cleanup: remove ad content but keep container
      if (container) {
        container.innerHTML = "";
        adLoadedRef.current = false;
      }
    };
  }, [placement]);

  return (
    <div
      ref={containerRef}
      className="adsterra-native-banner mx-auto my-8 flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg px-4"
      style={{ 
        minHeight: 120,
        // Smooth fade-in for ad content
        animation: "fadeIn 0.5s ease-in-out"
      }}
    >
      {/* Adsterra Native Banner renders here */}
      {/* Script loaded globally via useAdsterra hook */}
    </div>
  );
};

export default AdNativeBanner;
