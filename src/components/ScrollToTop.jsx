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

function getScrollEl(containerSelector) {
  if (containerSelector) return document.querySelector(containerSelector);
  return document.scrollingElement || document.documentElement;
}

function scrollTopNow(containerSelector) {
  const el = getScrollEl(containerSelector);
  if (el) {
    el.scrollTop = 0;
    el.scrollLeft = 0;
  }
  window.scrollTo(0, 0);
}

export default function ScrollToTop({
  containerSelector = null,
  enableFade = true,
  fadeMs = 140,

  // ✅ nuevo: decide qué hacer en back/forward
  scrollOnPop = true,
} = {}) {
  const location = useLocation();
  const navType = useNavigationType(); // PUSH / REPLACE / POP
  const [showOverlay, setShowOverlay] = useState(false);

  const reduceMotion = useMemo(() => prefersReducedMotion(), []);

  useLayoutEffect(() => {
    // Evita “restauración” automática (a veces interfiere)
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    // Si hay hash (#section), deja que el navegador salte al anchor
    if (location.hash) return;

    // Si es POP y no quieres forzarlo, sales
    if (navType === "POP" && !scrollOnPop) return;

    const doFade = enableFade && !reduceMotion;

    if (doFade) setShowOverlay(true);

    scrollTopNow(containerSelector);

    const raf = requestAnimationFrame(() => {
      scrollTopNow(containerSelector);
    });

    const t = setTimeout(() => {
      scrollTopNow(containerSelector);
      if (doFade) setShowOverlay(false);
    }, fadeMs);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [
    location.pathname,
    location.search,
    location.hash,
    navType,
    scrollOnPop,
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