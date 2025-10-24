document.getElementById("calculate-btn").addEventListener("click", () => {
  const type = document.getElementById("salary-type").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const hoursPerWeek = parseFloat(document.getElementById("hours-per-week").value) || 40;
  const resultDiv = document.getElementById("result");

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerHTML = "<p style='color:red;'>⚠️ Please enter a valid amount.</p>";
    return;
  }

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

  resultDiv.innerHTML = `
    <div style="margin-top:1rem; line-height:1.6;">
      <strong>Estimated Salary Breakdown:</strong><br>
      🕓 Hourly: $${hourly.toFixed(2)}<br>
      📅 Weekly: $${weekly.toFixed(2)}<br>
      🗓️ Monthly: $${monthly.toFixed(2)}<br>
      💰 Annual: $${annual.toFixed(2)}
    </div>
  `;
});
