document.addEventListener("DOMContentLoaded", () => {
  const cmInput = document.getElementById("height-cm");
  const ftInput = document.getElementById("height-ft");
  const resultBox = document.getElementById("result");

  // Helper functions
  function cmToFeetInches(cm) {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  }

  function feetInchesToCm(ftIn) {
    const match = ftIn.match(/^(\d+)'(\d+)"?$/);
    if (!match) return null;
    const feet = parseInt(match[1]);
    const inches = parseInt(match[2]);
    return (feet * 12 + inches) * 2.54;
  }

  // Event listeners
  cmInput.addEventListener("input", () => {
    const cm = parseFloat(cmInput.value);
    if (!isNaN(cm)) {
      const { feet, inches } = cmToFeetInches(cm);
      ftInput.value = `${feet}'${inches}"`;
      resultBox.textContent = `${cm} cm = ${feet}'${inches}"`;
    } else {
      ftInput.value = "";
      resultBox.textContent = "";
    }
  });

  ftInput.addEventListener("input", () => {
    const cm = feetInchesToCm(ftInput.value);
    if (cm !== null) {
      cmInput.value = Math.round(cm);
      resultBox.textContent = `${ftInput.value} = ${Math.round(cm)} cm`;
    } else {
      resultBox.textContent = "⚠️ Enter format: 5'11\"";
    }
  });
});
