import { useEffect, useRef } from "react";

const ADSTERRA_SCRIPT_URL = "https://pl29106259.profitablecpmratenetwork.com/8d/02/b8/8d02b8cbd28898c543dffbe7e601bda9.js";

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
