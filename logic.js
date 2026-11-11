// ===============================
// Theme Toggle
// ===============================

const btn = document.getElementById("themeToggle");
const root = document.documentElement;

// Restore saved theme or use dark as default
const savedTheme = localStorage.getItem("theme") || "dark";

root.setAttribute("data-theme", savedTheme);

function updateThemeIcon(theme) {
  const icon = btn?.querySelector("i");

  if (!icon) return;

  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

// Set the correct icon when the page loads
updateThemeIcon(savedTheme);

btn?.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", newTheme);

  // Save selected theme
  localStorage.setItem("theme", newTheme);

  updateThemeIcon(newTheme);
});
// ===============================
// Motion Effects Toggle
// ===============================

const motionBtn = document.getElementById("motionToggle");
const motionText = motionBtn?.querySelector("span");

const motionPreference = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let motionEnabled =
  localStorage.getItem("motion") === null
   ? !motionPreference
    : localStorage.getItem("motion") === "on";

function updateMotionButton() {
  document.documentElement.setAttribute(
    "data-motion",
    motionEnabled ? "on" : "off"
  );

  if (motionText) {
    motionText.textContent = motionEnabled
      ? "Motion: ON"
      : "Motion: OFF";
  }
}
updateMotionButton();

motionBtn?.addEventListener("click", () => {
  motionEnabled = !motionEnabled;

  localStorage.setItem(
    "motion",
    motionEnabled ? "on" : "off"
  );

  updateMotionButton();
  location.reload();
});
// ===============================
// WhatsApp Contact Form
// ===============================

const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", function (event) {
  event.preventDefault();

  // WhatsApp number in international format
  const phoneNumber = "201227584841";

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate inputs
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Create WhatsApp message
  const whatsappMessage =
    `New Portfolio Message\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Message: ${message}`;

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");
});

// ===============================
// SCROLL REVEAL
// ===============================

const revealGroups = [
  {
    selector: ".section-heading",
    delay: 0,
  },
  {
    selector: ".project-card",
    delay: 150,
  },
  {
    selector: ".skill-card",
    delay: 100,
  },
  {
    selector: ".about-content, #contactForm",
    delay: 0,
  },
];

const allRevealElements = [];

// Prepare all elements before observing them
revealGroups.forEach(({ selector, delay }) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element, index) => {
    element.classList.add("reveal");

    element.style.transitionDelay = `${index * delay}ms`;

    allRevealElements.push(element);
  });
});

// Check user's motion preference
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Show everything if animations are unavailable or reduced
if (!motionEnabled || !("IntersectionObserver" in window)) {
  allRevealElements.forEach((element) => {
    element.classList.add("show");
  });
}     else {  
  // Create observer
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
      threshold: 0.15,
    },
  );

  // Observe elements after the initial render
  requestAnimationFrame(() => {
    allRevealElements.forEach((element) => {
      observer.observe(element);
    });
  });
}
