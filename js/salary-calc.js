// =============================
// Salary Calculator Logic
// =============================
document.addEventListener("DOMContentLoaded", () => {
    // ---- Elements ----
    const nameInput = document.getElementById("name");
    const rateInput = document.getElementById("rate");
    const hoursDayInput = document.getElementById("hours-day");
    const hoursWeekInput = document.getElementById("hours-week");
    const resultBox = document.getElementById("result");
    const calcButton = document.getElementById("calc-salary");

    // ---- View Toggle ----
    let fullView = false;

    const toggleButton = document.createElement("button");
    toggleButton.id = "toggle-view";
    toggleButton.classList.add("pdf-btn");
    toggleButton.textContent = "Switch to Full View";
    calcButton.insertAdjacentElement("afterend", toggleButton);

    // ---- Event Listeners ----
    calcButton.addEventListener("click", calculateSalary);
    toggleButton.addEventListener("click", toggleView);

    // =============================
    // Helper: Calculate Salary Values
    // =============================
    function calculateSalaryValues(rate, hoursDay, hoursWeek) {
        const yearly = rate * hoursWeek * 52;
        const monthly = yearly / 12;
        const weekly = rate * hoursWeek;
        const daily = rate * hoursDay;

        let overtimePay = 0;
        if (hoursWeek > 40) {
            const overtimeHours = hoursWeek - 40;
            const overtimeRate = rate * 1.5;
            overtimePay = overtimeHours * overtimeRate;
        }

        return { yearly, monthly, weekly, daily, overtimePay };
    }

    // =============================
    // Main Calculation Function
    // =============================
    function calculateSalary() {
        const name = nameInput.value.trim();
        const rate = parseFloat(rateInput.value) || 0;
        const hoursDay = parseFloat(hoursDayInput.value) || 0;
        const hoursWeek = parseFloat(hoursWeekInput.value) || 0;

        if (!name || rate <= 0 || hoursDay <= 0 || hoursWeek <= 0) {
            resultBox.innerHTML = "⚠️ Please fill in all fields correctly.";
            return;
        }

        const { yearly, monthly, weekly, daily, overtimePay } = calculateSalaryValues(rate, hoursDay, hoursWeek);

        // === Display Result ===
        if (fullView) {
            resultBox.innerHTML = `
                <h3>💼 Salary Breakdown</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Yearly:</strong> $${yearly.toFixed(2)}</p>
                <p><strong>Monthly:</strong> $${monthly.toFixed(2)}</p>
                <p><strong>Weekly:</strong> $${weekly.toFixed(2)}</p>
                <p><strong>Daily:</strong> $${daily.toFixed(2)}</p>
                <p><strong>Overtime Pay:</strong> $${overtimePay.toFixed(2)}</p>
                <button class="pdf-btn" id="pdfButton">📄 Save as PDF</button>
            `;
        } else {
            resultBox.innerHTML = `
                <h3>💰 Salary Summary</h3>
                <p>Hello, <strong>${name}</strong></p>
                <p>Estimated Yearly Salary: <strong>$${yearly.toFixed(2)}</strong></p>
                <button class="pdf-btn" id="pdfButton">📄 Save as PDF</button>
            `;
        }

        // PDF listener
        const pdfButton = document.getElementById("pdfButton");
        if (pdfButton) pdfButton.addEventListener("click", () => savePDF(name, rate, hoursDay, hoursWeek, fullView));
    }

    // =============================
    // Toggle View
    // =============================
    function toggleView() {
        fullView = !fullView;
        toggleButton.textContent = fullView ? "Switch to Concise View" : "Switch to Full View";
        calculateSalary();
    }

    // =============================
    // PDF Generation
    // =============================
    async function savePDF(name, rate, hoursDay, hoursWeek, fullView) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const date = new Date().toLocaleDateString();
        const { yearly, monthly, weekly, daily, overtimePay } = calculateSalaryValues(rate, hoursDay, hoursWeek);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("💼 Salary Calculator Summary", 20, 25);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 20, 40);
        doc.text(`Name: ${name}`, 20, 50);
        doc.text(`Hourly Rate: $${rate.toFixed(2)}`, 20, 60);
        doc.text(`Hours per Day: ${hoursDay}`, 20, 70);
        doc.text(`Hours per Week: ${hoursWeek}`, 20, 80);
        doc.text(`Yearly: $${yearly.toFixed(2)}`, 20, 90);
        doc.text(`Monthly: $${monthly.toFixed(2)}`, 20, 100);
        doc.text(`Weekly: $${weekly.toFixed(2)}`, 20, 110);
        doc.text(`Daily: $${daily.toFixed(2)}`, 20, 120);
        doc.text(`Overtime Pay: $${overtimePay.toFixed(2)}`, 20, 130);

        doc.text("Keep this as your salary snapshot.", 20, 145);
        doc.text("Work smart. Rest harder. 💪", 20, 155);

        doc.save("Salary_Calculator_Summary.pdf");
    }
});
