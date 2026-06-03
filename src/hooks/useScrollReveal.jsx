import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-reveal');

    const reveal = () => {
      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // run on mount

    return () => window.removeEventListener('scroll', reveal);
  });
}
