// ============================
// Theme Toggle & Persistence
// ============================

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

// --- Helper: Update toggle icon ---
function updateToggleButtonText() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  const current = document.documentElement.getAttribute("data-theme");
  toggle.textContent = current === "dark" ? "🌙" : "☀️";
  toggle.setAttribute("aria-label", current === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

// --- Apply on load ---
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // Consistent button placement and style
  Object.assign(toggle.style, {
    position: "fixed",
    bottom: "1rem",
    left: "1rem",
    width: "3rem",
    height: "3rem",
    borderRadius: "0.5rem",
    padding: "0",
    fontSize: "1.2rem",
    zIndex: "1000",
    cursor: "pointer",
  });

  // Apply correct icon
  updateToggleButtonText();

  // Toggle on click
  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateToggleButtonText();
  });
});
