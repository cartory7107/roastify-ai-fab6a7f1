import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Capture beforeinstallprompt early so the Install page can use it
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  }
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  (window as any).__deferredInstallPrompt = e;
  window.dispatchEvent(new CustomEvent("pwa-install-available"));
});

window.addEventListener("appinstalled", () => {
  (window as any).__deferredInstallPrompt = null;
  window.dispatchEvent(new CustomEvent("pwa-installed"));
});

createRoot(document.getElementById("root")!).render(<App />);
