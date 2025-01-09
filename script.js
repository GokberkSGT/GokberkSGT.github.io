// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Quotes rotation system
const quotes = [
    {
        text: "The sky is not the limit, it's just the beginning.",
        author: "Modern Space Engineering"
    },
    {
        text: "In the field of aerospace, innovation is not an option – it's a necessity.",
        author: "Aviation Pioneers"
    },
    {
        text: "Engineering is the art of making what was impossible, possible.",
        author: "Space Technology"
    },
    {
        text: "The future of aviation lies in the minds of today's dreamers.",
        author: "Aerospace Vision"
    },
    {
        text: "To most people, the sky is the limit. To those who love aviation, the sky is home.",
        author: "Aviation Spirit"
    },
    {
        text: "Space is not empty. It is filled with infinite possibilities.",
        author: "Space Exploration"
    },
    {
        text: "Every great achievement in aerospace began with a dream and ended with determination.",
        author: "Engineering Excellence"
    }
];

let currentQuoteIndex = 0;
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.quote-author');
const quoteContainer = document.querySelector('.quote-container');

function changeQuote() {
    quoteContainer.style.opacity = '0';

    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteElement.textContent = quotes[currentQuoteIndex].text;
        authorElement.textContent = "— " + quotes[currentQuoteIndex].author;
        quoteContainer.style.opacity = '1';
    }, 1000);
}

// Initial delay before starting rotation
setTimeout(() => {
    // Change quote every 15 seconds
    setInterval(changeQuote, 15000);
}, 3000);

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Theme Switcher
const themeSwitch = document.querySelector('#checkbox');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeSwitch.checked = true;
    }
}

themeSwitch.addEventListener('change', function () {
    if (this.checked) {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// EmailJS initialization
(function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact Form Handler
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        })
        .catch((error) => {
            alert('Oops! Something went wrong. Please try again later.');
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Newsletter Form Handler
const newsletterForm = document.querySelector('#newsletter-form');
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Here you would typically send the email to a newsletter service
    alert('Thank you for subscribing to my newsletter!');
    this.reset();
});

// Parallax Effect
window.addEventListener('scroll', function () {
    const parallaxSections = document.querySelectorAll('.parallax');
    parallaxSections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        section.style.backgroundPositionY = rate + 'px';
    });
});

// Add fade-in-up animation to elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .contact-form, .newsletter-form').forEach(el => {
    observer.observe(el);
}); 