document.addEventListener("DOMContentLoaded", () => {
    
    // Animation au défilement
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Surlignage du menu
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer l'état actif et l'ajouter sur le nouveau bouton
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Animation fluide de réapparition
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Données détaillées des projets pour la modale
const projectsData = {
    'projet_academique': {
        title: 'Atelier de Développement Logiciel (BTS SIO)',
        img: 'img/projet-academique.svg',
        context: 'Cet atelier pratique obligatoire encadré par le CNED permet d\'apprendre à concevoir, développer et tester des architectures applicatives métiers. Il constitue l\'une des briques centrales de mon cursus BTS SIO option SLAM.',
        skills: [
            'Concevoir et développer une solution applicative',
            'Gérer le cycle de vie d\'une application (BTS SIO Bloc 1)',
            'Travailler dans un environnement de développement professionnel (IDE, Git)'
        ],
        link: 'https://github.com/Tylan-Ly'
    },
    'projet_valorant': {
        title: 'Chronique Valorant : tableau de bord de statistiques',
        img: 'img/projet-valorant.svg',
        meta: 'Novembre 2026 · Projet personnel · Python, API REST, JSON, HTML, CSS, JavaScript, SVG',
        context: 'Projet personnel réalisé en novembre 2026, en dehors du cadre scolaire, avec l\'aide d\'une IA (Claude) pour la conception. Objectif : analyser mes propres parties classées de Valorant pour comprendre où je progresse et où je perds.',
        details: [
            'Un script Python (valo_bilan.py) interroge l\'API REST HenrikDev pour récupérer mes dernières parties classées, en respectant la limite de 30 requêtes par minute. Il calcule des statistiques (ACS, ADR, K/D/A, pourcentage de tirs à la tête, premiers duels, résultats par agent et par carte) et les enregistre dans un fichier bilan.json, avec un résumé bilan.txt.',
            'Une page web (HTML, CSS, JavaScript, graphiques dessinés en SVG) charge ce fichier et affiche l\'évolution de ma forme et de mon rang, avec un thème clair ou sombre. Les données de la démonstration sont figées au 13 novembre 2026 (30 parties, du 29/09 au 11/11).',
            'Sécurité : la clé d\'API est saisie au clavier (masquée) ou lue dans une variable d\'environnement. Elle n\'est jamais écrite dans un fichier ni publiée dans le code.'
        ],
        gallery: [
            { src: 'img/valorant-schema.svg', caption: 'Schéma de fonctionnement : script Python, API, fichier JSON, page web.' },
            { src: 'img/valorant-capture-1.jpg', caption: 'Capture : résumé, évolution des parties et indicateurs clés.' },
            { src: 'img/valorant-capture-2.jpg', caption: 'Capture : évolution de la forme partie après partie.' },
            { src: 'img/valorant-capture-3.jpg', caption: 'Capture : résultats par agent et par carte, duels d\'ouverture.' }
        ],
        skills: [
            'Participer à l\'évolution d\'un site Web exploitant des données (ici les données JSON issues de l\'API)',
            'Déployer un service (page publiée sur GitHub Pages, accessible en ligne)',
            'Vérifier le respect des règles d\'utilisation des ressources numériques (limite de requêtes de l\'API, protection de la clé)',
            'Mettre en place son environnement d\'apprentissage personnel (Python, API REST, JSON, SVG)'
        ],
        link: 'valorant/index.html', linkLabel: 'Ouvrir le projet', linkIcon: 'fas fa-external-link-alt'
    },
    'projet_roblox': {
        title: 'Création d\'un Jeu Vidéo Multijoueur (Roblox Studio)',
        img: 'img/projet-roblox.svg',
        context: 'Projet personnel né d\'une passion pour le jeu vidéo et d\'une volonté de comprendre les mécaniques multi-joueurs. Développement de la logique en Lua (programmation événementielle) et gestion de la synchronisation réseau des joueurs (réseau Client-Serveur).',
        skills: [
            'Développer des algorithmes en langage Lua',
            'Comprendre et gérer une architecture Client-Serveur en temps réel',
            'Maîtriser les bases du Game Design et de la physique 3D'
        ],
        meta: 'En cours de développement · Projet personnel · Lua, Roblox Studio'
    }
};

// Gestion de la modale
function openModal(projectId) {
    const modal = document.getElementById('project-modal');
    const data = projectsData[projectId];

    if (data) {
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-img').src = data.img;
        document.getElementById('modal-context').innerText = data.context;
        const meta = document.getElementById('modal-meta');
        meta.innerText = data.meta || '';
        meta.style.display = data.meta ? 'block' : 'none';
        document.getElementById('modal-details').innerHTML = (data.details || []).map(p => `<p>${p}</p>`).join('');
        document.getElementById('modal-details-wrap').style.display = data.details ? 'block' : 'none';
        document.getElementById('modal-gallery').innerHTML = (data.gallery || []).map(g => `<figure><img src="${g.src}" alt="${g.caption}" loading="lazy"><figcaption>${g.caption}</figcaption></figure>`).join('');
        document.getElementById('modal-gallery-wrap').style.display = data.gallery ? 'block' : 'none';
        document.getElementById('modal-link').style.display = data.link ? '' : 'none';
        if (data.link) document.getElementById('modal-link').href = data.link;
        document.getElementById('modal-link').innerHTML = `<i class="${data.linkIcon || 'fab fa-github'}"></i> ${data.linkLabel || 'Voir le dépôt GitHub'}`;

        const skillsList = document.getElementById('modal-skills');
        skillsList.innerHTML = '';
        data.skills.forEach(skill => {
            skillsList.innerHTML += `<li><i class="fas fa-check-circle"></i> ${skill}</li>`;
        });
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) {
        closeModal();
    }
}
