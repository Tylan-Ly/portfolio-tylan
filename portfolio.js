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
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
        context: 'Cet atelier pratique obligatoire encadré par le CNED permet d\'apprendre à concevoir, développer et tester des architectures applicatives métiers. Il constitue l\'une des briques centrales de mon cursus BTS SIO option SLAM.',
        skills: [
            'Concevoir et développer une solution applicative',
            'Gérer le cycle de vie d\'une application (BTS SIO Bloc 1)',
            'Travailler dans un environnement de développement professionnel (IDE, Git)'
        ],
        link: 'https://github.com/Tylan-Ly'
    },
    'projet_professionnel': {
        title: 'Mission technique en entreprise (Stage 1re année)',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        context: 'Projet à réaliser durant mon stage obligatoire de 4 à 5 semaines (prévu entre mars et juin 2027). J\'y mettrai en pratique mes apprentissages dans une équipe professionnelle de développement.',
        skills: [
            'Répondre aux besoins d\'une organisation et de ses utilisateurs',
            'Collaborer au sein d\'une équipe de développement informatique',
            'Assurer la maintenance ou l\'intégration de modules logiciels'
        ],
        link: 'https://github.com/Tylan-Ly'
    },
    'projet_roblox': {
        title: 'Création d\'un Jeu Vidéo Multijoueur (Roblox Studio)',
        img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
        context: 'Projet personnel né d\'une passion pour le jeu vidéo et d\'une volonté de comprendre les mécaniques multi-joueurs. Développement de la logique en Lua (programmation événementielle) et gestion de la synchronisation réseau des joueurs (réseau Client-Serveur).',
        skills: [
            'Développer des algorithmes en langage Lua',
            'Comprendre et gérer une architecture Client-Serveur en temps réel',
            'Maîtriser les bases du Game Design et de la physique 3D'
        ],
        link: 'https://github.com/Tylan-Ly/portfolio-tylan'
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
        document.getElementById('modal-link').href = data.link;

        const skillsList = document.getElementById('modal-skills');
        skillsList.innerHTML = '';
        data.skills.forEach(skill => {
            skillsList
