// ============================
// Weight Converter (kg ↔ lbs)
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const kgInput = document.getElementById("weight-kg");
  const lbInput = document.getElementById("weight-lb");
  const resultBox = document.getElementById("result");

  let isUpdating = false;

  // --- Conversion functions ---
  function kgToLbs(kg) {
    return kg * 2.20462;
  }

  function lbsToKg(lbs) {
    return lbs / 2.20462;
  }

  // --- Real-time conversion (kg → lbs) ---
  kgInput.addEventListener("input", () => {
    if (isUpdating) return;
    isUpdating = true;

    const kg = parseFloat(kgInput.value);
    if (!isNaN(kg) && kg > 0) {
      const lbs = kgToLbs(kg);
      lbInput.value = lbs.toFixed(2);
      resultBox.textContent = `${kg.toFixed(2)} kg = ${lbs.toFixed(2)} lbs`;
    } else {
      lbInput.value = "";
      resultBox.textContent = "";
    }

    isUpdating = false;
  });

  // --- Real-time conversion (lbs → kg) ---
  lbInput.addEventListener("input", () => {
    if (isUpdating) return;
    isUpdating = true;

    const lbs = parseFloat(lbInput.value);
    if (!isNaN(lbs) && lbs > 0) {
      const kg = lbsToKg(lbs);
      kgInput.value = kg.toFixed(2);
      resultBox.textContent = `${lbs.toFixed(2)} lbs = ${kg.toFixed(2)} kg`;
    } else {
      kgInput.value = "";
      resultBox.textContent = "";
    }

    isUpdating = false;
  });
});
