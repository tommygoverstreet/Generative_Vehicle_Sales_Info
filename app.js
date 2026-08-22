(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.card, .profile-card, .aeo, .expert, .form-section, .v-card, .spec-item, .stats-row');

  revealItems.forEach((item) => item.classList.add('reveal'));
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('.faq-btn').forEach((button) => {
    button.setAttribute('aria-expanded', button.parentElement.classList.contains('open') ? 'true' : 'false');
    button.addEventListener('click', () => {
      window.setTimeout(() => {
        button.setAttribute('aria-expanded', button.parentElement.classList.contains('open') ? 'true' : 'false');
      }, 0);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const modal = document.getElementById('successModal');
      if (modal) modal.classList.remove('active');
      if (typeof closeSidebar === 'function') closeSidebar();
    }
  });
})();
