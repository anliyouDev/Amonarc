import { useEffect } from 'react';

// One observer, one reveal per element; no scroll loop or animation dependency.
export default function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches || !('IntersectionObserver' in window)) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], main > section > .section-heading, .project-card, .timeline article, .process-list li'));
    const reveal = (node: HTMLElement) => { node.classList.add('is-visible'); observer.unobserve(node); };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
    }, { threshold: 0.08 });
    nodes.forEach((node, index) => {
      // Do not hide content already in view or below very long sections.
      if (node.getBoundingClientRect().top < window.innerHeight) return;
      node.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 65}ms`);
      node.classList.add('reveal-ready'); observer.observe(node);
    });
    const stop = () => { if (reduce.matches) { nodes.forEach(n => n.classList.add('is-visible')); observer.disconnect(); } };
    reduce.addEventListener('change', stop);
    return () => { observer.disconnect(); reduce.removeEventListener('change', stop); nodes.forEach(n => n.classList.remove('reveal-ready', 'is-visible')); };
  }, []);
}
