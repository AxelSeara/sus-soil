// ScrollToTop.jsx
import { useLayoutEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function prefersReducedMotion() {
  try {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  } catch {
    return false;
  }
}

function scrollAllToTop() {
  // 1) window
  window.scrollTo(0, 0);

  // 2) scrolling element (Safari/Chrome)
  const se = document.scrollingElement || document.documentElement;
  if (se) se.scrollTop = 0;

  // 3) cualquier contenedor con overflow que esté scrolleado
  const nodes = document.querySelectorAll("body *");
  for (const n of nodes) {
    const st = n.scrollTop;
    if (st > 0) {
      const s = getComputedStyle(n);
      if ((s.overflowY === "auto" || s.overflowY === "scroll") && n.scrollHeight > n.clientHeight + 5) {
        n.scrollTop = 0;
      }
    }
  }
}

export default function ScrollToTop({
  enableFade = true,
  fadeMs = 140,
} = {}) {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);

  useLayoutEffect(() => {
    try {
      if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    } catch {}

    // Si hay hash (#section), no lo rompas
    if (location.hash) return;

    const doFade = enableFade && !reduceMotion;
    if (doFade) setShowOverlay(true);

    // 1) inmediato
    scrollAllToTop();

    // 2) refuerzo 2 frames (layout + paint)
    const raf1 = requestAnimationFrame(() => scrollAllToTop());
    const raf2 = requestAnimationFrame(() => scrollAllToTop());

    // 3) refuerzo corto
    const t = setTimeout(() => {
      scrollAllToTop();
      if (doFade) setShowOverlay(false);
    }, fadeMs);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(t);
    };
  }, [location.pathname, location.search, location.hash, enableFade, fadeMs, reduceMotion]);

  if (!enableFade || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-150 ${
        showOverlay ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "rgba(255,255,255,0.55)" }}
    />
  );
}