function calculateBudget() {
  const expenses = parseFloat(document.getElementById("expenses").value) || 0;
  const months = parseInt(document.getElementById("months").value) || 0;
  const income = parseFloat(document.getElementById("income").value) || 0;
  const result = document.getElementById("result");

  if (expenses <= 0 || months <= 0) {
    result.innerHTML = "⚠️ Please enter valid values for expenses and months.";
    return;
  }

  // === Intelligent Scaling ===
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

  result.innerHTML = `
    <h3>💰 Budget Calculator Summary</h3>
    <p><strong>Duration:</strong> ${months} months</p>
    <p><strong>Comfort Level:</strong> ${comfort}</p>
    <p><strong>Emergency Buffer:</strong> $${buffer.toLocaleString()}</p>
    <p style="margin-top:1rem;font-size:1.1rem;">
      💵 <strong>$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong><br>
      needed for ${months} months.
    </p>
    <button class="pdf-btn" onclick="savePDF(${months}, ${comfort}, ${buffer}, ${total})">📄 Save as PDF</button>
  `;
}

async function savePDF(months, comfort, buffer, total) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const date = new Date().toLocaleDateString();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("💰 Budget Calculator Summary", 20, 25);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${date}`, 20, 40);
  doc.text(`Duration: ${months} months`, 20, 55);
  doc.text(`Comfort Level: ${comfort}`, 20, 65);
  doc.text(`Emergency Buffer: $${buffer.toLocaleString()}`, 20, 75);
  doc.text(`Estimated Total: $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 20, 90);

  doc.text("Keep this as your short-term budgeting snapshot.", 20, 110);
  doc.text("Stay smart. Stay on budget. 🌱", 20, 120);

  doc.save("Budget_Calculator_Summary.pdf");
}