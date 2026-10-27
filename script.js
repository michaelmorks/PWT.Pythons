
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
});

// Highlight links and close the dropdown
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.querySelectorAll('a').forEach(item => {
            item.classList.remove('active');
        });

        link.classList.add('active');
        navLinks.classList.remove('open');

        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open navigation menu');
    });
});

// Close the menu using Escape
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open navigation menu');
    }
});



/* =========================
   SCROLL FADE-IN EFFECT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
  
    // Show sections immediately if reduced motion is preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => section.classList.add("show"));
      return;
    }
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );
  
    sections.forEach((section) => observer.observe(section));
  });
  