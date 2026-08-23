import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options;
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements?.forEach((el) => observer.observe(el));

    if (
      ref.current?.classList.contains('reveal') ||
      ref.current?.classList.contains('reveal-left') ||
      ref.current?.classList.contains('reveal-right') ||
      ref.current?.classList.contains('reveal-scale')
    ) {
      observer.observe(ref.current);
    }

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold, rootMargin]);

  return ref;
}
