// Chargement des données
const checklistData = [
  {
    title: "Bases",
    items: [
      "Fabriquer un Scanner",
      "Construire un Lit",
      "Construire un Fabricator"
    ]
  },
  {
    title: "Véhicules",
    items: [
      "Fabriquer Seamoth",
      "Construire Cyclops"
    ]
  },
  {
    title: "Progression",
    items: [
      "Explorer le Grand Reef",
      "Atteindre 200m de profondeur"
    ]
  }
];

// Références DOM
const checklistEl = document.getElementById("checklist");
const progressText = document.getElementById("progress");
const searchInput = document.getElementById("search");
const resetButton = document.getElementById("reset");

// Création des sections
function buildChecklist(data) {
  checklistEl.innerHTML = "";

  data.forEach((section, sIndex) => {
    const sec = document.createElement("div");
    sec.className = "section";

    const title = document.createElement("h2");
    title.textContent = section.title;
    sec.appendChild(title);

    section.items.forEach((text, iIndex) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      
      checkbox.type = "checkbox";
      checkbox.dataset.id = `${sIndex}-${iIndex}`;

      const saved = localStorage.getItem(`subnautica_${sIndex}_${iIndex}`);
      checkbox.checked = saved === "true";

      checkbox.addEventListener("change", () => {
        localStorage.setItem(`subnautica_${sIndex}_${iIndex}`, checkbox.checked);
        updateProgress();
      });

      label.appendChild(checkbox);
      label.append(text);

      sec.appendChild(label);
    });

    checklistEl.appendChild(sec);
  });

  updateProgress();
}

// Mise à jour du % de progression
function updateProgress() {
  const all = document.querySelectorAll("input[type='checkbox']");
  const count = all.length;
  const checked = document.querySelectorAll("input[type='checkbox']:checked").length;
  const percent = Math.round((checked / count) * 100);
  progressText.textContent = `Progression : ${percent}% (${checked}/${count})`;
}

// Fonction de recherche
searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase();
  document.querySelectorAll(".section").forEach(sec => {
    let visible = false;
    sec.querySelectorAll("label").forEach(label => {
      const text = label.textContent.toLowerCase();
      if (text.includes(val)) {
        label.style.display = "block";
        visible = true;
      } else {
        label.style.display = "none";
      }
    });
    sec.style.display = visible ? "block" : "none";
  });
});

// Reset complet
resetButton.addEventListener("click", () => {
  if (confirm("Effacer toute la progression ?")) {
    localStorage.clear();
    buildChecklist(checklistData);
  }
});

// Initialisation
buildChecklist(checklistData);
