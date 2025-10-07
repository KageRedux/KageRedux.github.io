// ============================
// Theme Toggle & Persistence
// ============================

// Check saved theme in localStorage, default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

// Optional: Update toggle button text if present
function updateToggleButtonText() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  const current = document.documentElement.getAttribute("data-theme");
  toggle.textContent = current === "dark" ? "🌙" : "☀️"; // Short symbols
}

// Initialize toggle button text
updateToggleButtonText();

// Listen for toggle button click
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // Move the button to bottom-left dynamically
  toggle.style.position = "fixed";
  toggle.style.bottom = "1rem";
  toggle.style.left = "1rem";
  toggle.style.width = "3rem";
  toggle.style.height = "3rem";
  toggle.style.padding = "0";          // Keep it compact
  toggle.style.borderRadius = "0.5rem";
  toggle.style.fontSize = "1.2rem";    // readable but small
  toggle.style.zIndex = "1000";

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateToggleButtonText();
  });
});
