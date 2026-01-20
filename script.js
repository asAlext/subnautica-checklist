document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((checkbox, index) => {
    // Charger l'état sauvegardé
    const saved = localStorage.getItem("checkbox_" + index);
    checkbox.checked = saved === "true";

    // Sauvegarder quand on clique
    checkbox.addEventListener("change", () => {
      localStorage.setItem("checkbox_" + index, checkbox.checked);
    });
  });
});
