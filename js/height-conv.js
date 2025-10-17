document.addEventListener("DOMContentLoaded", () => {
  const cmInput = document.getElementById("height-cm");
  const ftInput = document.getElementById("height-ft");
  const resultBox = document.getElementById("result");
  const toggleButton = document.getElementById("unit-toggle"); // toggle button element

  let isUpdating = false;
  let useImperial = false; // default: metric mode

  // --- Helper Functions ---
  function cmToFeetInches(cm) {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  }

  function feetInchesToCm(value) {
    // Accepts flexible inputs like: 5'11, 5'11", 5 11, 5ft 11in
    const match = value.match(/(\d+)[^\d]+(\d+)?/);
    if (!match) return null;
    const feet = parseInt(match[1]) || 0;
    const inches = parseInt(match[2]) || 0;
    return (feet * 12 + inches) * 2.54;
  }

  // --- Real-Time Conversion: Metric → Imperial ---
  cmInput.addEventListener("input", () => {
    if (isUpdating || useImperial) return;
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

  // --- Real-Time Conversion: Imperial → Metric ---
  ftInput.addEventListener("input", () => {
    if (isUpdating || !useImperial) return;
    isUpdating = true;

    const cm = feetInchesToCm(ftInput.value);
    if (cm !== null && cm > 0) {
      cmInput.value = Math.round(cm);
      resultBox.textContent = `${ftInput.value} = ${Math.round(cm)} cm`;
    } else if (ftInput.value.trim() === "") {
      cmInput.value = "";
      resultBox.textContent = "";
    } else {
      resultBox.textContent = "⚠️ Format example: 5'11 or 5 11";
    }

    isUpdating = false;
  });

  // --- Unit Toggle Button ---
  toggleButton.addEventListener("click", () => {
    useImperial = !useImperial;

    // Clear both inputs and results on toggle for clarity
    cmInput.value = "";
    ftInput.value = "";
    resultBox.textContent = "";

    if (useImperial) {
      cmInput.disabled = true;
      ftInput.disabled = false;
      ftInput.focus();
      toggleButton.textContent = "Switch to Metric (cm)";
      resultBox.textContent = "Now entering height in feet/inches.";
    } else {
      cmInput.disabled = false;
      ftInput.disabled = true;
      cmInput.focus();
      toggleButton.textContent = "Switch to Imperial (ft/in)";
      resultBox.textContent = "Now entering height in centimeters.";
    }
  });

  // --- Initialize default state ---
  cmInput.disabled = false;
  ftInput.disabled = true;
  toggleButton.textContent = "Switch to Imperial (ft/in)";
});
