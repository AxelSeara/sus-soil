export const EASE_STANDARD = [0.22, 1, 0.36, 1];

export const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_STANDARD },
  },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: EASE_STANDARD },
  },
};

export const listReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.35,
      ease: EASE_STANDARD,
    },
  },
};

export const imageFadeScale = {
  initial: { opacity: 0, scale: 0.985 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.985 },
  transition: { duration: 0.35, ease: EASE_STANDARD },
};

export const hoverLift = {
  whileHover: { y: -2, scale: 1.015 },
  whileTap: { scale: 0.992 },
};
