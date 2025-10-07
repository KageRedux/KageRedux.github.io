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
  toggle.textContent = current === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode";
}

// Initialize toggle button text
updateToggleButtonText();

// Listen for toggle button click
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateToggleButtonText();
  });
});
