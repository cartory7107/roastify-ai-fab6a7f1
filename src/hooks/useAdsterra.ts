import { useEffect, useRef } from "react";

const ADSTERRA_SCRIPT_URL = "//pl25713112.profitablegatecpm.com/a1/6e/44/a16e44b03b34bb09f319f45f1e2bb88b.js";

/**
 * Loads Adsterra Social Bar script once, triggered by user interaction.
 * Only loads after the first call with `trigger=true`.
 */
export function useAdsterra(trigger: boolean) {
  const loaded = useRef(false);

  useEffect(() => {
    if (!trigger || loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = ADSTERRA_SCRIPT_URL;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Don't remove — Social Bar manages its own lifecycle
    };
  }, [trigger]);
}
