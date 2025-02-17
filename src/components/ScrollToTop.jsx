// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando cambie la ruta, se hace scroll al inicio
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No renderiza nada
}