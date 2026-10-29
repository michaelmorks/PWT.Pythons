
/* ========================================
   LOADING SCREEN
======================================== */

function hideProductsLoader() {
    const loader = document.getElementById("loader-overlay");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1000);
}

window.addEventListener("load", hideProductsLoader);

// Fallback in case the page has already finished loading.
if (document.readyState === "complete") {
    hideProductsLoader();
}

/* ========================================
   MOBILE NAVIGATION
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        function closeMenu() {
            navLinks.classList.remove("open");

            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close the menu if the screen becomes desktop-sized.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                closeMenu();
            }
        });
    }

    /* ========================================
       AUTOMATIC FOOTER YEAR
    ======================================== */

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
});
