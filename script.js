document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progressText = document.getElementById("progress");
  const sections = document.querySelectorAll(".section");

  function updateProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll("input[type='checkbox']:checked").length;
    const percent = Math.round((checked / total) * 100);
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

  sections.forEach((section, index) => {
    const title = section.querySelector(".section-title");
    const content = section.querySelector(".section-content");

    const open = localStorage.getItem("section_" + index);
    content.style.display = open === "false" ? "none" : "block";

    title.addEventListener("click", () => {
      const isOpen = content.style.display !== "none";
      content.style.display = isOpen ? "none" : "block";
      localStorage.setItem("section_" + index, !isOpen);
    });
  });

  updateProgress();
});
