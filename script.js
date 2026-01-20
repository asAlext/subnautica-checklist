document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progressText = document.getElementById("progress");

  function updateProgress() {
    if (!progressText) return;

    const total = checkboxes.length;
    let checked = 0;

    checkboxes.forEach(cb => {
      if (cb.checked) checked++;
    });

    const percent = total === 0 ? 0 : Math.round((checked / total) * 100);
    progressText.textContent = `Progression : ${percent}% (${checked} / ${total})`;
  }

  checkboxes.forEach((checkbox, index) => {
    const saved = localStorage.getItem("checkbox_" + index);
    checkbox.checked = saved === "true";

    checkbox.addEventListener("change", () => {
      localStorage.setItem("checkbox_" + index, checkbox.checked);
      updateProgress();
    });
  });

  updateProgress();
});
