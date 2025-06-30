// Toggle Hamburger Menu
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const menuLinks = document.querySelector('.menu-links');
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        if (menuLinks.classList.contains('open')) {
            menuLinks.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would typically send the form data to a server
        console.log({ name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.section, .project-card, .experience-item, .education-item, .contact-info-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.section, .project-card, .experience-item, .education-item, .contact-info-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation for hero section immediately
    document.querySelector('.hero').style.opacity = '1';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Dark Mode Toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-sun"></i><i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Create Animated Stars
function createStars() {
    const count = 50;
    const container = document.body;
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random properties
        const size = Math.random() * 2 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 3;
        const duration = Math.random() * 3 + 2;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}px`;
        star.style.top = `${posY}px`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        container.appendChild(star);
    }
}

// Only create stars in dark mode
if (document.documentElement.getAttribute('data-theme') === 'dark') {
    createStars();
}

// Recreate stars when theme changes
const observer = new MutationObserver(() => {
    document.querySelectorAll('.star').forEach(star => star.remove());
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        createStars();
    }
});

observer.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['data-theme'] 
});