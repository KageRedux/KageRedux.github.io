// Wrap everything in DOMContentLoaded to ensure elements exist
document.addEventListener("DOMContentLoaded", () => {
  // Grab all relevant input elements
  const typeInput = document.getElementById("salary-type");
  const amountInput = document.getElementById("amount");
  const hoursInput = document.getElementById("hours-per-week");
  const resultDiv = document.getElementById("result");

  // Main salary calculation function
  function calculateSalary() {
    const type = typeInput.value;
    const amount = parseFloat(amountInput.value);
    const hoursPerWeek = parseFloat(hoursInput.value) || 40;

    // Validate input
    if (isNaN(amount) || amount <= 0) {
      resultDiv.innerHTML = "<p style='color:red;'>⚠️ Please enter a valid amount.</p>";
      return;
    }

    // Calculate annual salary
    let annual = 0;
    switch (type) {
      case "hourly":
        annual = amount * hoursPerWeek * 52;
        break;
      case "weekly":
        annual = amount * 52;
        break;
      case "monthly":
        annual = amount * 12;
        break;
      case "annual":
        annual = amount;
        break;
    }

    const monthly = annual / 12;
    const weekly = annual / 52;
    const hourly = weekly / hoursPerWeek;

    // Display results with disclaimer
    resultDiv.innerHTML = `
      <div style="margin-top:1rem; line-height:1.6;">
        <strong>Estimated Salary Breakdown:</strong><br>
        🕓 Hourly: $${hourly.toFixed(2)}<br>
        📅 Weekly: $${weekly.toFixed(2)}<br>
        🗓️ Monthly: $${monthly.toFixed(2)}<br>
        💰 Annual: $${annual.toFixed(2)}<br>
        <small style="color:gray;">Note: Overtime, taxes, and bonuses not included.</small>
      </div>
    `;
  }

  // Attach event listeners to all inputs to auto-update results
  typeInput.addEventListener("change", calculateSalary);
  amountInput.addEventListener("input", calculateSalary);
  hoursInput.addEventListener("input", calculateSalary);
});
