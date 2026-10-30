
/* ========================================
   LOADING SCREEN
======================================== */

function hideMappingLoader() {
    const loader = document.getElementById("loader-overlay");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1000);
}

// Mobile navigation
document.addEventListener("DOMContentLoaded", function () {

    // Hide loading screen
    hideMappingLoader();

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.querySelectorAll("a").forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");
            navLinks.classList.remove("open");

            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            navLinks.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");
        }
    });
});

// Footer year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
