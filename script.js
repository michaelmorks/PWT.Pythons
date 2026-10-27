
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
