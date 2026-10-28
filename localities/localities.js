/* ── LOADING SCREEN ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader-overlay').classList.add('hidden');
  }, 3000);
});


document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.getElementById("locality-map");

  // Stop if the map container or Leaflet library is missing.
  if (!mapElement || typeof L === "undefined") {
    return;
  }

  // Approximate example coordinates.
  // Confirm the exact locality positions before publishing.
  const localities = [
    {
      name: "Wenlock River",
      species: "Morelia spilota variegata",
      coords: [-12.5, 142.60],
      cardId: "wenlock-river"
    },
    {
      name: "Palmer River",
      species: "Morelia spilota variegata",
      coords: [-16.0, 144.0],
      cardId: "palmer-river"
    },
    {
      name: "Archer River",
      species: "Morelia spilota variegata",
      coords: [-13.4, 142.9],
      cardId: "archer-river"
    },
    {
      name: "Mareeba",
      species: "Morelia spilota variegata",
      coords: [-17.0, 145.4],
      cardId: "mareeba"
    },
    {
      name: "Atherton",
      species: "Morelia spilota cheynei",
      coords: [-17.27, 145.48],
      cardId: "atherton"
    },
    {
      name: "Brisbane",
      species: "Morelia spilota mcdowelli",
      coords: [-27.47, 153.03],
      cardId: "brisbane"
    },
    {
      name: "Pilliga",
      species: "Morelia spilota metcalfei",
      coords: [-30.35, 149.5],
      cardId: "pilliga"
    },
    {
      name: "Proserpine",
      species: "Morelia spilota mcdowelli",
      coords: [-20.40, 148.58],
      cardId: "proserpine"
    }
  ];

  // Create the map.
  const map = L.map("locality-map");

  // Add the map background.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  const markers = {};

  // Add a marker for every locality.
  localities.forEach(function (place) {
    const marker = L.marker(place.coords).addTo(map);

    marker.bindPopup(
      `<strong>${place.name}</strong><br>${place.species}`
    );

    markers[place.cardId] = marker;
  });

  // Automatically fit all markers inside the map.
  const bounds = L.latLngBounds(
    localities.map(function (place) {
      return place.coords;
    })
  );

  map.fitBounds(bounds, { padding: [25, 25] });

  // Clicking a locality card focuses its map marker.
  localities.forEach(function (place) {
    const card = document.getElementById(place.cardId);

    if (!card) {
      return;
    }

    card.style.cursor = "pointer";

    card.addEventListener("click", function (event) {
      if (event.target.closest("a, button")) {
        return;
      }

      map.flyTo(place.coords, 9, { duration: 1 });
      markers[place.cardId].openPopup();

      mapElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!menuBtn || !navLinks) return;

  // Open and close the dropdown
  menuBtn.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuBtn.setAttribute("aria-expanded", isOpen);
      menuBtn.setAttribute(
          "aria-label",
          isOpen ? "Close navigation menu" : "Open navigation menu"
      );
  });

  // Highlight links and close the dropdown
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

  // Close the menu using Escape
  document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
          navLinks.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
          menuBtn.setAttribute("aria-label", "Open navigation menu");
      }
  });
});
