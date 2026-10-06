/* ==========================================================================
   PORTFOLIO — IMANE MESLLEK
   JavaScript vanilla : menu mobile, apparition au scroll,
   lien actif dans la navigation, ombre de la barre au défilement.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  /* ------------------------------------------------------------------
     1. Menu mobile (burger)
     ------------------------------------------------------------------ */
  const setMenu = (open) => {
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };

  navToggle.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('is-open'));
  });

  // Ferme le menu après un clic sur un lien
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

  // Ferme le menu avec la touche Échap
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  // Ferme le menu si on clique en dehors
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) setMenu(false);
  });

  /* ------------------------------------------------------------------
     2. Ombre sous la navigation quand on fait défiler la page
     ------------------------------------------------------------------ */
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     3. Apparition progressive des éléments au scroll
     ------------------------------------------------------------------ */
  const revealItems = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // l'animation ne se joue qu'une fois
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    // Ancien navigateur : on affiche tout directement
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------
     4. Mise en évidence du lien de la section visible
     ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('main [id]');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ------------------------------------------------------------------
     5. Année automatique dans le pied de page
     ------------------------------------------------------------------ */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
