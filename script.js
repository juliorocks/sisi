const phrases = [
    "Médico em Vila Velha",
    "Clínica em Vila Velha",
    "Restaurante em Vila Velha",
    "Imobiliária em Vila Velha",
    "Fisioterapia em Vila Velha",
    "Advogado em Vila Velha",
    "Academia em Vila Velha",
    "Dentista em Vila Velha",
    "Hotel em Vila Velha",
    "Oficina em Vila Velha"
];

const typingText = document.getElementById("typing-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Fade-in animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    // Start typing effect
    typeEffect();

    // Mobile menu toggle
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.querySelector(".nav");
    
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
            // Switch icon
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains("active")) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Header scroll effect
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
            header.style.background = "rgba(255, 255, 255, 0.95)";
        } else {
            header.style.boxShadow = "none";
            header.style.background = "rgba(255, 255, 255, 0.9)";
        }
    });

    // Close mobile menu when clicking links
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Add fade-in-up class to sections
    const sections = document.querySelectorAll('section, .pain-card, .plan-card, .step, .consultancy-card');
    sections.forEach(section => {
        section.classList.add('fade-in-up');
        observer.observe(section);
    });

    // --- Search Proof Real-time simulation (Constant Flow) ---
    const searchCards = document.querySelectorAll('.search-card span');
    const searchPhrases = [
        "restaurante em vila velha",
        "dentista vitória",
        "farmácia aberta agora",
        "oficina mecânica perto de mim",
        "hotel em vila velha",
        "advogado em vila velha",
        "academia aberta agora",
        "imobiliária em vitória",
        "fisioterapia em itapuã",
        "pet shop perto de mim",
        "pizzaria em vila velha",
        "salão de beleza",
        "médico especialista",
        "clínica 24h",
        "escola infantil",
        "manicure em vila velha",
        "ar condicionado conserto",
        "mecanico 24h vila velha",
        "entrega de gas pronto",
        "chaveiro perto de mim",
        "marmoraria em vila velha",
        "vidraçaria em vitória",
        "conserto de celular",
        "delivery de sushi",
        "estética facial"
    ];

    let currentCardIndex = 0;

    function updateSingleCard() {
        const card = searchCards[currentCardIndex];
        const randomPhrase = searchPhrases[Math.floor(Math.random() * searchPhrases.length)];
        
        // Quick fade-out/in for a "stream" feel
        card.parentElement.style.opacity = "0.2";
        card.parentElement.style.transform = "scale(0.98)";
        
        setTimeout(() => {
            card.textContent = randomPhrase;
            card.parentElement.style.opacity = "1";
            card.parentElement.style.transform = "scale(1)";
            
            // Move to next card in loop
            currentCardIndex = (currentCardIndex + 1) % searchCards.length;
        }, 150);
    }

    // Update ONE card every 1.2 seconds for constant non-stop movement
    setInterval(updateSingleCard, 1200);
});
