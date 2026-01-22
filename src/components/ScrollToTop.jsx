// ScrollToTop.jsx
import { useLayoutEffect, useMemo, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function prefersReducedMotion() {
  try {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  } catch {
    return false;
  }
}

function scrollTopNow(containerSelector) {
  // Si tu app usa un contenedor con overflow (ej: main), pásalo por selector.
  const el = containerSelector
    ? document.querySelector(containerSelector)
    : (document.scrollingElement || document.documentElement);

  if (!el) return;

  // “hard reset” (Safari a veces ignora el smooth/scrollTo simple)
  el.scrollTop = 0;
  el.scrollLeft = 0;

  // Por si acaso el navegador está usando scroll en window:
  window.scrollTo(0, 0);
}

export default function ScrollToTop({
  // Si NO tienes contenedor con overflow, déjalo como null.
  containerSelector = null,

  // Fade muy sutil para que no parezca “misma página”.
  enableFade = true,
  fadeMs = 140,
} = {}) {
  const location = useLocation();
  const navType = useNavigationType(); // PUSH / REPLACE / POP
  const [showOverlay, setShowOverlay] = useState(false);

  const reduceMotion = useMemo(() => prefersReducedMotion(), []);

  useLayoutEffect(() => {
    // Recomendado para evitar que el browser restaure scroll por su cuenta.
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    // Si hay hash (#section) dejamos que el navegador gestione el scroll al anchor.
    if (location.hash) return;

    // Si vienes con back/forward (POP), normalmente es mejor respetar la posición.
    // Si quieres forzar top incluso en back/forward, elimina este if.
    if (navType === "POP") return;

    const doFade = enableFade && !reduceMotion;

    if (doFade) setShowOverlay(true);

    // 1) scroll inmediato
    scrollTopNow(containerSelector);

    // 2) refuerzo en el siguiente frame (evita que una imagen/layout te “devuelva” abajo)
    requestAnimationFrame(() => {
      scrollTopNow(containerSelector);
    });

    // 3) refuerzo corto tras layout/pintado (casos raros: fuentes, imágenes, etc.)
    const t = setTimeout(() => {
      scrollTopNow(containerSelector);
      if (doFade) setShowOverlay(false);
    }, fadeMs);

    return () => clearTimeout(t);
  }, [
    location.key,          // más fiable que pathname: cambia siempre en navegación nueva
    location.hash,
    navType,
    containerSelector,
    enableFade,
    fadeMs,
    reduceMotion,
  ]);

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