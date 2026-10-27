
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
  


document.addEventListener("DOMContentLoaded", function () {
    const mapElement = document.getElementById("locality-map");
  
    // Stop if this page doesn't contain the map.
    if (!mapElement) return;
  
    // Check that Leaflet has loaded.
    if (typeof L === "undefined") {
      console.error("Leaflet did not load. Check your internet connection.");
      return;
    }
  
    // Create the map.
    const map = L.map("locality-map").setView([-22.5, 145.5], 4.5);
  
    // Add the map tiles.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);
  
    // Approximate representative coordinates, not exact specimen locations.
    const localities = [
      {
        name: "Wenlock River",
        species: "Morelia spilota variegata",
        coords: [-12.0, 142.0]
      },
      {
        name: "Palmer River",
        species: "Morelia spilota variegata",
        coords: [-16.0, 144.0]
      },
      {
        name: "Archer River",
        species: "Morelia spilota variegata",
        coords: [-13.4, 142.9]
      },
      {
        name: "Mareeba",
        species: "Morelia spilota variegata",
        coords: [-17.0, 145.4]
      },
      {
        name: "Atherton",
        species: "Morelia spilota cheynei",
        coords: [-17.27, 145.48]
      },
      {
        name: "Brisbane",
        species: "Morelia spilota mcdowelli",
        coords: [-27.47, 153.03]
      },
      {
        name: "Pilliga",
        species: "Morelia spilota metcalfei",
        coords: [-30.35, 149.5]
      }
    ];
  
    localities.forEach(function (place) {
      const marker = L.marker(place.coords).addTo(map);
  
      marker.bindPopup(
        `<strong>${place.name}</strong><br>${place.species}`
      );
  
      marker.on("click", function () {
        map.flyTo(place.coords, 9, {
          duration: 1
        });
      });
    });
  
    // Fit the map around all seven markers.
    const bounds = L.latLngBounds(
      localities.map(function (place) {
        return place.coords;
      })
    );
  
    map.fitBounds(bounds, { padding: [25, 25] });
  });
  