// Add particles effect
const initParticles = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    const particleCount = width > 768 ? 50 : 20;

    // Set canvas size
    const resizeCanvas = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.1})`;
        }


        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }


        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }


    // Create particles
    const init = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    };

    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });

    // Initialize
    resizeCanvas();
    init();
    animate();
};

// Initialize particles when the page loads
window.addEventListener('load', initParticles);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Add scroll reveal animation
const revealOnScroll = () => {
    const elements = document.querySelectorAll('.card, .skill-category, .experience-item, .education-item, h2, h3');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .skill-category, .experience-item, .education-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.card, .skill-category, .experience-item, .education-item');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 300);
});

window.addEventListener('scroll', () => {
    animateOnScroll();
    revealOnScroll();
});

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
const handleScroll = () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
};

window.addEventListener('scroll', handleScroll);

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

menuBtn.addEventListener('click', () => {
    body.classList.toggle('menu-open');
    
    // Prevent scrolling when menu is open
    if (body.classList.contains('menu-open')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
const navItems = document.querySelectorAll('.nav-item a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (body.classList.contains('menu-open')) {
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }
    });
});

// Close menu when clicking outside
window.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }
});

// Add loading animation
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = `
    <div class="spinner"></div>
    <p>Loading...</p>
`;

document.body.prepend(loadingScreen);

// Remove loading screen when page is fully loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }, 500);
});

// Add loading screen styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: all 0.5s ease;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border-top-color: var(--secondary-color);
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .loading-screen p {
        color: white;
        font-size: 1.2rem;
        margin-top: 1rem;
    }
`;
document.head.appendChild(loadingStyle);
