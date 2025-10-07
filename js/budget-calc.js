// =============================
// Budget Calculator Logic
// =============================
document.addEventListener("DOMContentLoaded", () => {
    // ---- Elements ----
    const expensesInput = document.getElementById("expenses");
    const monthsInput = document.getElementById("months");
    const incomeInput = document.getElementById("income");
    const resultBox = document.getElementById("result");
    const calcButton = document.getElementById("calculate-btn");

    const saveButton = document.getElementById("save-budget");
    const loadButton = document.getElementById("load-budget");
    const clearButton = document.getElementById("clear-budget");

    // ---- Event Listeners ----
    calcButton.addEventListener("click", calculateBudget);
    if (saveButton) saveButton.addEventListener("click", saveBudget);
    if (loadButton) loadButton.addEventListener("click", loadBudget);
    if (clearButton) clearButton.addEventListener("click", clearBudget);

    // =============================
    // Helper: Calculate Budget Values
    // =============================
    function calculateBudgetValues(expenses, months, income) {
        let comfort, buffer;
        if (months <= 2) {
            comfort = 1.2;
            buffer = 1000;
        } else if (months <= 6) {
            comfort = 1.35;
            buffer = 2500;
        } else {
            comfort = 1.5;
            buffer = 5000;
        }

        const netMonthly = Math.max(expenses - income, 0);
        const total = (netMonthly * months * comfort) + buffer;

        return { comfort, buffer, total };
    }

    // =============================
    // Main Calculation Function
    // =============================
    function calculateBudget() {
        const expenses = parseFloat(expensesInput.value) || 0;
        const months = parseInt(monthsInput.value) || 0;
        const income = parseFloat(incomeInput.value) || 0;

        if (expenses <= 0 || months <= 0) {
            resultBox.innerHTML = "⚠️ Please enter valid values for expenses and months.";
            return;
        }

        const { comfort, buffer, total } = calculateBudgetValues(expenses, months, income);

        // === Display Result ===
        resultBox.innerHTML = `
            <h3>🧾 Budget Summary</h3>
            <p><strong>Duration:</strong> ${months} months</p>
            <p><strong>Comfort Level:</strong> ${comfort}</p>
            <p><strong>Emergency Buffer:</strong> $${buffer.toLocaleString()}</p>
            <p style="margin-top:1rem;font-size:1.1rem;">
                💰 <strong>$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong><br>
                needed to stay financially stable for ${months} months.
            </p>
            <button class="pdf-btn" id="pdfButton">📄 Save as PDF</button>
        `;

        // Attach PDF listener dynamically
        const pdfButton = document.getElementById("pdfButton");
        if (pdfButton) pdfButton.addEventListener("click", () => savePDF(expenses, months, income));
    }

    // =============================
    // PDF Generation Function
    // =============================
    async function savePDF(expenses, months, income) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const date = new Date().toLocaleDateString();

        // Use values passed from calculateBudget or fallback to inputs
        expenses = expenses || parseFloat(expensesInput.value) || 0;
        months = months || parseInt(monthsInput.value) || 0;
        income = income || parseFloat(incomeInput.value) || 0;

        if (expenses <= 0 || months <= 0) {
            alert("Please enter valid values before exporting PDF.");
            return;
        }

        const { comfort, buffer, total } = calculateBudgetValues(expenses, months, income);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("💰 Budget Calculator Summary", 20, 25);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 20, 40);
        doc.text(`Average Expenses: $${expenses.toLocaleString()}`, 20, 50);
        doc.text(`Months Covered: ${months}`, 20, 60);
        doc.text(`Recurring Income: $${income.toLocaleString()}`, 20, 70);
        doc.text(`Comfort Level: ${comfort}`, 20, 80);
        doc.text(`Emergency Buffer: $${buffer.toLocaleString()}`, 20, 90);
        doc.text(`Estimated Total Needed: $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 20, 100);

        doc.text("Keep this as your budgeting snapshot.", 20, 115);
        doc.text("Stay smart. Stay on budget. 🌱", 20, 125);

        doc.save("Budget_Calculator_Summary.pdf");
    }

    // =============================
    // Local Storage Functions
    // =============================
    function saveBudget() {
        const data = {
            expenses: expensesInput.value,
            months: monthsInput.value,
            income: incomeInput.value,
            result: resultBox.innerHTML
        };
        localStorage.setItem("budgetData", JSON.stringify(data));
        alert("💾 Budget saved locally!");
    }

    function loadBudget() {
        const saved = localStorage.getItem("budgetData");
        if (!saved) {
            alert("⚠️ No saved budget found.");
            return;
        }
        const data = JSON.parse(saved);
        expensesInput.value = data.expenses;
        monthsInput.value = data.months;
        incomeInput.value = data.income;
        resultBox.innerHTML = data.result;
    }

    function clearBudget() {
        localStorage.removeItem("budgetData");
        expensesInput.value = "";
        monthsInput.value = "";
        incomeInput.value = "";
        resultBox.innerHTML = "";
        alert("🧹 Saved budget cleared. You can start fresh!");
    }
});
