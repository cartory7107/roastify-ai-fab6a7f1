import { useEffect, useRef } from "react";

const ADSTERRA_SCRIPT_URL = "https://pl29106259.profitablecpmratenetwork.com/8d/02/b8/8d02b8cbd28898c543dffbe7e601bda9.js";

/**
 * useAdsterra Hook
 * 
 * Manages Adsterra Native Banner script loading.
 * Script is loaded AFTER user interaction to:
 * 1. Improve initial page load speed
 * 2. Comply with ad network best practices
 * 3. Only show ads to engaged users
 * 
 * @param trigger - Set to true after user interaction (e.g., click "Roast")
 * @returns void
 * 
 * @example
 * const [hasInteracted, setHasInteracted] = useState(false);
 * useAdsterra(hasInteracted);
 * 
 * // On button click
 * setHasInteracted(true);
 */
export function useAdsterra(trigger: boolean) {
  const loaded = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Only load once, triggered by user interaction
    if (!trigger || loaded.current) return;
    loaded.current = true;

    // Check if script already exists (from index.html or previous load)
    const existingScript = document.querySelector(`script[src="${ADSTERRA_SCRIPT_URL}"]`);
    
    if (existingScript) {
      // Script already loaded, just refresh ads
      const win = window as any;
      if (win.adsterra && typeof win.adsterra.refreshAll === "function") {
        try {
          win.adsterra.refreshAll();
        } catch {
          // Silent fail
        }
      }
      return;
    }

    // Create and inject script
    const script = document.createElement("script");
    script.src = ADSTERRA_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    script.setAttribute("data-adsterra-id", "5713112");
    script.setAttribute("data-adsterra-type", "native-banner");
    
    scriptRef.current = script;
    document.body.appendChild(script);

    // Cleanup not needed - script should persist for ad functionality
    return () => {
      // Intentionally not removing script to maintain ad state
    };
  }, [trigger]);
}

/**
 * Refresh all Adsterra ads on the page
 * Call this after route changes or when new ad containers are added
 */
export function refreshAdsterraAds() {
  const win = window as any;
  if (win.adsterra && typeof win.adsterra.refreshAll === "function") {
    try {
      win.adsterra.refreshAll();
    } catch {
      // Silent fail
    }
  }
}

/**
 * Refresh a specific ad container
 * @param container - The DOM element containing the ad
 */
export function refreshAdContainer(container: HTMLElement) {
  const win = window as any;
  if (win.adsterra && typeof win.adsterra.refresh === "function") {
    try {
      win.adsterra.refresh(container);
    } catch {
      // Silent fail
    }
  }
}
