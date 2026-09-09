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
});

// Données des projets
const projectsData = {
    'projet1': {
        title: 'Création de Site Web Vitrine',
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
        context: 'Projet réalisé en première année de BTS SIO dans le cadre des ateliers professionnels. L\'objectif était de concevoir un site from scratch respectant les normes d\'accessibilité et le responsive design.',
        skills: [
            'Gérer le patrimoine informatique',
            'Développer la présence en ligne de l\'organisation',
            'Mettre à disposition des utilisateurs un service informatique'
        ],
        link: 'https://github.com'
    },
    'projet2': {
        title: 'Gestion de Base de Données',
        img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
        context: 'Création d\'un script Python pour l\'automatisation des requêtes SQL et la gestion des données clients d\'une entreprise fictive.',
        skills: [
            'Travailler en mode projet',
            'Répondre aux incidents et aux demandes d\'évolution'
        ],
        link: 'https://github.com'
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