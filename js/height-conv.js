document.addEventListener("DOMContentLoaded", () => {
  const cmInput = document.getElementById("height-cm");
  const ftInput = document.getElementById("height-ft");
  const resultBox = document.getElementById("result");

  let isUpdating = false;

  // --- Helper Functions ---
  function cmToFeetInches(cm) {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  }

  function feetInchesToCm(value) {
    // Accepts flexible formats: 5'11, 5'11", 5 11, 5ft11in, etc.
    const match = value.match(/(\d+)[^\d]+(\d+)?/);
    if (!match) return null;
    const feet = parseInt(match[1]) || 0;
    const inches = parseInt(match[2]) || 0;
    return (feet * 12 + inches) * 2.54;
  }

  // --- Real-Time Conversion Both Ways ---
  cmInput.addEventListener("input", () => {
    if (isUpdating) return;
    isUpdating = true;

    const cm = parseFloat(cmInput.value);
    if (!isNaN(cm) && cm > 0) {
      const { feet, inches } = cmToFeetInches(cm);
      ftInput.value = `${feet}'${inches}"`;
      resultBox.textContent = `${cm.toFixed(1)} cm = ${feet}'${inches}"`;
    } else {
      ftInput.value = "";
      resultBox.textContent = "";
    }

    isUpdating = false;
  });

  ftInput.addEventListener("input", () => {
    if (isUpdating) return;
    isUpdating = true;

    const cm = feetInchesToCm(ftInput.value);
    if (cm !== null && cm > 0) {
      cmInput.value = Math.round(cm);
      resultBox.textContent = `${ftInput.value} = ${Math.round(cm)} cm`;
    } else if (ftInput.value.trim() === "") {
      cmInput.value = "";
      resultBox.textContent = "";
    } else {
      resultBox.textContent = "⚠️ Format: 5'11 or 5 11";
    }

    isUpdating = false;
  });
});
