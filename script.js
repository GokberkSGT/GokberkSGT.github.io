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