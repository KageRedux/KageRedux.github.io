document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const rateInput = document.getElementById("rate");
    const hoursDayInput = document.getElementById("hours-day");
    const hoursWeekInput = document.getElementById("hours-week");
    const calcBtn = document.getElementById("calc-salary");
    const toggleViewBtn = document.createElement("button");
    const resultBox = document.getElementById("result");

    // --- State ---
    let fullView = false; // false = Concise (default)

    // --- Setup toggle button ---
    toggleViewBtn.id = "toggle-view";
    toggleViewBtn.textContent = "Switch to Full View";
    toggleViewBtn.style.marginTop = "0.75rem";
    calcBtn.insertAdjacentElement("afterend", toggleViewBtn);

    toggleViewBtn.addEventListener("click", () => {
        fullView = !fullView;
        toggleViewBtn.textContent = fullView ? "Switch to Concise View" : "Switch to Full View";

        // Optional: Recalculate if inputs are filled
        if(nameInput.value && rateInput.value && hoursDayInput.value && hoursWeekInput.value) {
            calcBtn.click();
        }
    });

    // --- Salary Calculation ---
    calcBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const rate = parseFloat(rateInput.value);
        const hoursDay = parseFloat(hoursDayInput.value);
        const hoursWeek = parseFloat(hoursWeekInput.value);

        if(!name || isNaN(rate) || isNaN(hoursDay) || isNaN(hoursWeek)) {
            resultBox.textContent = "⚠️ Please fill in all fields correctly.";
            return;
        }

        // Basic salary calculations
        let yearlySalary = rate * hoursWeek * 52;
        const monthlySalary = yearlySalary / 12;
        const weeklySalary = rate * hoursWeek;
        const dailySalary = rate * hoursDay;

        // Overtime
        let overtimePay = 0;
        if(hoursWeek > 40) {
            const overtimeHours = hoursWeek - 40;
            const overtimeRate = rate * 1.5;
            overtimePay = overtimeHours * overtimeRate;
        }

        // --- Display ---
        if(fullView) {
            resultBox.innerHTML = `
                <p>Hello, ${name}</p>
                <p>Yearly: $${yearlySalary.toFixed(2)}</p>
                <p>Monthly: $${monthlySalary.toFixed(2)}</p>
                <p>Weekly: $${weeklySalary.toFixed(2)}</p>
                <p>Daily: $${dailySalary.toFixed(2)}</p>
                <p>Overtime Pay: $${overtimePay.toFixed(2)}</p>
            `;
        } else {
            resultBox.innerHTML = `
                <p>Hello, ${name}</p>
                <p>Yearly Salary: $${yearlySalary.toFixed(2)}</p>
            `;
        }
    });
});
