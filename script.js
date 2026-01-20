// Données de la checklist pour Subnautica
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
        // ... (ajoute ici les autres chapitres que tu avais ou que tu veux garder)
        // Pour l'exemple je coupe, mais remets tous tes chapitres ici
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

document.addEventListener('DOMContentLoaded', () => {
    const chaptersList = document.getElementById('chapters-list');
    const content = document.getElementById('content');
    const resetLink = document.getElementById('reset-progress');

    // Charger la progression depuis localStorage
    let progress = JSON.parse(localStorage.getItem('subnautica-progress')) || {};

    // Fonction pour calculer le progrès d'un chapitre
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

    // Créer la liste des chapitres dans la sidebar
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

    // Fonction pour rendre un chapitre + highlight dans la nav
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
                checkbox.checked = !!progress[key];
                
                checkbox.addEventListener('change', () => {
                    progress[key] = checkbox.checked;
                    localStorage.setItem('subnautica-progress', JSON.stringify(progress));
                    
                    // Mise à jour du compteur dans la nav
                    const prog = updateChapterProgress(chapter.id);
                    const link = document.querySelector(`a[href="#${chapter.id}"]`);
                    if (link) {
                        link.textContent = `${chapter.title} (${prog.checked}/${prog.total})`;
                    }
                });

                const label = document.createElement('label');
                label.textContent = item;
                itemDiv.appendChild(checkbox);
                itemDiv.appendChild(label);
                sectionDiv.appendChild(itemDiv);
            });

            content.appendChild(sectionDiv);
        });

        // Highlight le chapitre actif dans la sidebar
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${chapter.id}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    // Charger le chapitre via hash ou le premier par défaut
    const hash = window.location.hash.substring(1);
    let initialChapter = data.chapters.find(ch => ch.id === hash);
    if (!initialChapter) initialChapter = data.chapters[0];
    renderChapter(initialChapter);

    // Réinitialiser tout
    resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment tout réinitialiser ?')) {
            localStorage.removeItem('subnautica-progress');
            progress = {};
            location.reload();
        }
    });
});
