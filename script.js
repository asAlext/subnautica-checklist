// Données de la checklist pour Subnautica
// Structure : chapitres avec sous-sections et items à cocher
const data = {
    chapters: [
        {
            id: "crash-landing",
            title: "I. Atterrissage Forcé (Survie Initiale)",
            sections: [
                {
                    title: "🌄 Exploration & Survie Basique",
                    items: [
                        "Réparer le Lifepod endommagé",
                        "Fabriquer un Scanner",
                        "Fabriquer un Couteau de Survie",
                        "Collecter des Bladderfish pour l'eau",
                        "Scanner des fragments dans les Safe Shallows",
                        "Augmenter l'oxygène avec un Air Bladder",
                        "Collecter du Titanium et du Copper"
                    ]
                },
                {
                    title: "🧰 Blueprints Initiaux",
                    items: [
                        "Débloquer le Habitat Builder",
                        "Débloquer le Repair Tool",
                        "Débloquer le Seaglide",
                        "Scanner des Flora comme Creepvine pour des seeds"
                    ]
                }
            ]
        },
        {
            id: "shallows-exploration",
            title: "II. Exploration des Safe Shallows & Kelp Forest",
            sections: [
                {
                    title: "🏞️ Biomes Proches",
                    items: [
                        "Explorer les Kelp Forests pour Acid Mushrooms",
                        "Scanner des creatures comme Peeper et Boomerang",
                        "Trouver des fragments pour le Seamoth",
                        "Collecter du Quartz pour le verre"
                    ]
                },
                {
                    title: "💀 Premiers Dangers",
                    items: [
                        "Éviter les Stalkers",
                        "Fabriquer une Fins pour nager plus vite",
                        "Débloquer le Compass via Data Box"
                    ]
                }
            ]
        },
        {
            id: "base-building",
            title: "III. Construction de Base",
            sections: [
                {
                    title: "🏠 Habitat",
                    items: [
                        "Construire une base avec des compartiments",
                        "Installer des Solar Panels pour l'énergie",
                        "Fabriquer un Fabricator et un Medical Kit Fabricator",
                        "Ajouter un Locker pour le stockage"
                    ]
                },
                {
                    title: "🔧 Améliorations",
                    items: [
                        "Débloquer le Moonpool pour charger les véhicules",
                        "Fabriquer un Modification Station"
                    ]
                }
            ]
        },
        {
            id: "aurora",
            title: "IV. L'Aurora",
            sections: [
                {
                    title: "🚀 Exploration du Vaisseau",
                    items: [
                        "Réparer les fuites radioactives avec le Repair Tool",
                        "Entrer dans l'Aurora et scanner des fragments",
                        "Débloquer le Prawn Suit",
                        "Trouver le code pour le Captain's Quarters",
                        "Scanner le Cyclops Engine"
                    ]
                },
                {
                    title: "🛡️ Protection",
                    items: [
                        "Fabriquer une Radiation Suit",
                        "Éviter les Crashfish et Bleeders"
                    ]
                }
            ]
        },
        {
            id: "deeper-biomes",
            title: "V. Biomes Profonds (Grassy Plateaus, Mushroom Forest)",
            sections: [
                {
                    title: "🌿 Exploration Avancée",
                    items: [
                        "Explorer les Grassy Plateaus pour Ruby et Lithium",
                        "Scanner des blueprints pour le Seamoth Depth Module",
                        "Trouver des Data Boxes dans les Wrecks",
                        "Scanner des Fauna comme Reaper Leviathan (à distance !)"
                    ]
                },
                {
                    title: "🚗 Véhicules",
                    items: [
                        "Construire le Seamoth",
                        "Débloquer le Cyclops",
                        "Ajouter des armes comme Torpedo System"
                    ]
                }
            ]
        },
        {
            id: "lost-river",
            title: "VI. Lost River & Inactive Lava Zone",
            sections: [
                {
                    title: "🔥 Profondeurs",
                    items: [
                        "Trouver l'entrée du Lost River",
                        "Collecter du Nickel et Sulphur",
                        "Scanner des blueprints pour le Prawn Suit Drill Arm",
                        "Explorer les Degasi Seabases"
                    ]
                },
                {
                    title: "🦠 Histoire",
                    items: [
                        "Trouver des PDA pour l'histoire Degasi",
                        "Débloquer le cure pour la Kharaa Bacterium"
                    ]
                }
            ]
        },
        {
            id: "endgame",
            title: "VII. Fin du Voyage (Neptune Rocket)",
            sections: [
                {
                    title: "🚀 Évasion",
                    items: [
                        "Construire le Neptune Launch Platform",
                        "Fabriquer les phases de la fusée",
                        "Désactiver la Quarantine Enforcement Platform",
                        "Lancer la fusée et quitter la planète"
                    ]
                },
                {
                    title: "🏆 Achèvements",
                    items: [
                        "Scanner 100% des Flora/Fauna",
                        "Construire tous les véhicules",
                        "Compléter l'histoire principale"
                    ]
                }
            ]
        }
    ]
};

// Fonctions pour rendre la checklist interactive
document.addEventListener('DOMContentLoaded', () => {
    const chaptersList = document.getElementById('chapters-list');
    const content = document.getElementById('content');
    const resetLink = document.getElementById('reset-progress');

    // Charger la progression depuis localStorage
    let progress = JSON.parse(localStorage.getItem('subnautica-progress')) || {};

    // Fonction pour mettre à jour le progrès d'un chapitre
    function updateChapterProgress(chapterId) {
        const chapter = data.chapters.find(ch => ch.id === chapterId);
        let total = 0;
        let checked = 0;
        chapter.sections.forEach(sec => {
            sec.items.forEach((item, index) => {
                const key = `${chapterId}-${sec.title}-${index}`;
                total++;
                if (progress[key]) checked++;
            });
        });
        return { checked, total };
    }

    // Rendre la liste des chapitres avec progrès
    data.chapters.forEach(chapter => {
        const li = document.createElement('li');
        const prog = updateChapterProgress(chapter.id);
        const a = document.createElement('a');
        a.href = `#${chapter.id}`;
        a.textContent = `${chapter.title} (${prog.checked}/${prog.total})`;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            renderChapter(chapter);
            window.location.hash = chapter.id;
        });
        li.appendChild(a);
        chaptersList.appendChild(li);
    });

    // Rendre un chapitre
    function renderChapter(chapter) {
        content.innerHTML = '';
        const h2 = document.createElement('h2');
        h2.textContent = chapter.title;
        content.appendChild(h2);

        chapter.sections.forEach(sec => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');
            const h3 = document.createElement('h3');
            h3.textContent = sec.title;
            sectionDiv.appendChild(h3);

            sec.items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                const key = `${chapter.id}-${sec.title}-${index}`;
                checkbox.checked = progress[key] || false;
                checkbox.addEventListener('change', () => {
                    progress[key] = checkbox.checked;
                    localStorage.setItem('subnautica-progress', JSON.stringify(progress));
                    // Mettre à jour les compteurs dans la nav
                    const prog = updateChapterProgress(chapter.id);
                    const link = document.querySelector(`a[href="#${chapter.id}"]`);
                    link.textContent = `${chapter.title} (${prog.checked}/${prog.total})`;
                });
                const label = document.createElement('label');
                label.textContent = item;
                itemDiv.appendChild(checkbox);
                itemDiv.appendChild(label);
                sectionDiv.appendChild(itemDiv);
            });

            content.appendChild(sectionDiv);
        });
    }

    // Charger le chapitre par défaut ou via hash
    const hash = window.location.hash.substring(1);
    const defaultChapter = data.chapters.find(ch => ch.id === hash) || data.chapters[0];
    renderChapter(defaultChapter);

    // Réinitialiser
    resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Voulez-vous réinitialiser toute la progression ?')) {
            localStorage.removeItem('subnautica-progress');
            progress = {};
            location.reload();
        }
    });
});
