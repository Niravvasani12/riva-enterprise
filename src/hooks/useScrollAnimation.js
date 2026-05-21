import { useInView } from "react-intersection-observer";

const useScrollAnimation = (options = {}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    ...options,
  });

  return {
    ref,
    inView,
    initial: { opacity: 0, y: 50 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, ease: "easeOut" },
  };
};

export default useScrollAnimation;
