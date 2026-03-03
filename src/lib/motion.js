export const EASE_STANDARD = [0.22, 1, 0.36, 1];

export const sectionReveal = {
  hidden: { opacity: 0.01, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_STANDARD },
  },
};

export const cardReveal = {
  hidden: { opacity: 0.01, y: 10, scale: 0.992 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: EASE_STANDARD },
  },
};

export const listReveal = {
  hidden: { opacity: 0.01 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      duration: 0.25,
      ease: EASE_STANDARD,
    },
  },
};

export const imageFadeScale = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0.01, scale: 0.997 },
  transition: { duration: 0.22, ease: EASE_STANDARD },
};

export const hoverLift = {
  whileHover: { y: -2, scale: 1.015 },
  whileTap: { scale: 0.992 },
};
