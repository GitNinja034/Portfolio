// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Thank you! Your message has been successfully submitted.');
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        alert('There was a problem with your submission. Please try again later.');
        console.error('Error:', error);
    });
});

// Simple animation for when elements come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation classes to CSS for when elements come into view
const style = document.createElement('style');
style.textContent = `
    .about, .projects, .contact {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animated {
        opacity: 1;
        transform: translateY(0);
        animation: bounceIn 0.8s ease-out, pulse 2s infinite alternate;
    }

    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
        }
        50% {
            opacity: 1;
            transform: translateY(-5px) scale(1.02);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
        }
        70% {
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
        }
    }
    
    .project-card {
        transition: all 0.3s ease;
    }
    
    .project-card:hover {
        animation: projectHover 0.5s ease;
    }
    
    @keyframes projectHover {
        0% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-10px) scale(1.03);
        }
        100% {
            transform: translateY(-10px) scale(1.05);
        }
    }
`;
document.head.appendChild(style);
