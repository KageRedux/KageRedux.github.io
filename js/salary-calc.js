document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const rateInput = document.getElementById("rate");
  const hoursDayInput = document.getElementById("hours-day");
  const hoursWeekInput = document.getElementById("hours-week");
  const calcBtn = document.getElementById("calc-salary");
  const resultBox = document.getElementById("result");

  // --- Create toggle button ---
  const toggleViewBtn = document.createElement("button");
  toggleViewBtn.id = "toggle-view";
  toggleViewBtn.textContent = "Switch to Full View";
  toggleViewBtn.classList.add("pdf-btn");
  calcBtn.insertAdjacentElement("afterend", toggleViewBtn);

  // --- Default state ---
  let fullView = false;

  // --- Calculate Salary ---
  function calculateSalary() {
    const name = nameInput.value.trim();
    const rate = parseFloat(rateInput.value);
    const hoursDay = parseFloat(hoursDayInput.value);
    const hoursWeek = parseFloat(hoursWeekInput.value);

    if (!name || isNaN(rate) || isNaN(hoursDay) || isNaN(hoursWeek)) {
      resultBox.innerHTML = "<p>⚠️ Please fill in all fields correctly.</p>";
      return;
    }

    // Salary formulas
    let yearlySalary = rate * hoursWeek * 52;
    const monthlySalary = yearlySalary / 12;
    const weeklySalary = rate * hoursWeek;
    const dailySalary = rate * hoursDay;

    // Overtime calculation
    let overtimePay = 0;
    if (hoursWeek > 40) {
      const overtimeHours = hoursWeek - 40;
      const overtimeRate = rate * 1.5;
      overtimePay = overtimeHours * overtimeRate;
    }

    // Result display (concise or full)
    if (fullView) {
      resultBox.innerHTML = `
        <p>Hello, <strong>${name}</strong></p>
        <p>💰 Yearly: $${yearlySalary.toFixed(2)}</p>
        <p>📅 Monthly: $${monthlySalary.toFixed(2)}</p>
        <p>🗓️ Weekly: $${weeklySalary.toFixed(2)}</p>
        <p>🕑 Daily: $${dailySalary.toFixed(2)}</p>
        <p>⏱️ Overtime Pay: $${overtimePay.toFixed(2)}</p>
      `;
    } else {
      resultBox.innerHTML = `
        <p>Hello, <strong>${name}</strong></p>
        <p>💰 Yearly Salary: $${yearlySalary.toFixed(2)}</p>
      `;
    }
  }

  // --- Event Listeners ---
  calcBtn.addEventListener("click", calculateSalary);

  toggleViewBtn.addEventListener("click", () => {
    fullView = !fullView;
    toggleViewBtn.textContent = fullView ? "Switch to Concise View" : "Switch to Full View";
    calculateSalary();
  });
});
