import { useEffect, useRef } from "react";

const SCRIPT_SRC =
  "https://pl29106259.profitablecpmratenetwork.com/8d/02/b8/8d02b8cbd28898c543dffbe7e601bda9.js";

let scriptInjected = false;

function injectScript() {
  if (scriptInjected) return;
  scriptInjected = true;
  const s = document.createElement("script");
  s.src = SCRIPT_SRC;
  s.async = true;
  s.type = "text/javascript";
  document.body.appendChild(s);
}

const AdNativeBanner = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectScript();
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto my-8 flex w-full max-w-4xl items-center justify-center px-4"
      style={{ minHeight: 90 }}
    >
      {/* Adsterra native banner renders here via injected script */}
    </div>
  );
};

export default AdNativeBanner;
