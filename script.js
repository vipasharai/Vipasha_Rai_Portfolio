// Smooth Scroll Function
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- NEW: Typewriter Effect ---
const typingElement = document.querySelector('.typing-effect');
// ##### EDIT: "Python Developer" removed from this line #####
const wordsToType = ["Aspiring Data Scientist", "Data Analyst"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenWords = 1500;

function type() {
    if (!typingElement) return;
    const currentWord = wordsToType[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % wordsToType.length;
            setTimeout(type, 500); 
        } else {
            setTimeout(type, deleteSpeed);
        }
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenWords); 
        } else {
            setTimeout(type, typeSpeed);
        }
    }
}
// --- End Typewriter ---


// --- Back to Top Button Logic ---
const backToTopBtn = document.getElementById('back-to-top-btn');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
}
// --- End Back to Top ---


// --- On-Scroll Reveal Animation Function ---
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 100; 

    for (let i = 0; i < reveals.length; i++) {
        const revealTop = reveals[i].getBoundingClientRect().top;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}

// --- Active Nav Link Highlighting ---
function setupNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav .nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Changed to 30%
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('onclick').includes(`'${sectionId}'`)) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}
// --- End Active Nav ---

// --- ##### NEW: Certificate Modal Logic ##### ---
const modal = document.getElementById('certificate-modal');
const modalImg = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');

function openModal(imgSrc, caption) {
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    modalCaption.textContent = caption;
}

function closeModal() {
    modal.style.display = 'none';
}

// Add listeners to close modal
document.querySelector('.close-btn').onclick = closeModal;
modal.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
// --- ##### END: Certificate Modal Logic ##### ---

// --- ##### Animated Cursor Logic REMOVED ##### ---


// --- Event Listeners ---
window.addEventListener('scroll', () => {
    revealOnScroll();
    toggleBackToTopButton();
});

document.addEventListener('DOMContentLoaded', () => {
    type(); // Start the typewriter
    revealOnScroll(); // Run once on load
    setupNavHighlighting(); // Setup active nav links

    // --- AJAX Form Submission Logic ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('form-success-message');
    const sendAnotherBtn = document.getElementById('send-another-btn'); 
    const formAction = "https://formspree.io/f/xkgplzvb"; 

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const formData = new FormData(contactForm);
        
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                contactForm.style.display = 'none'; 
                successMessage.style.display = 'block'; 
                contactForm.reset(); 
            } else {
                response.json().then(data => {
                    console.error('Formspree error:', data);
                    submitBtn.textContent = "Error! Try Again.";
                    submitBtn.classList.add('error');
                    submitBtn.disabled = false;
                });
            }
        })
        .catch(error => {
            console.error('Network error:', error);
            submitBtn.textContent = "Error! Check Network.";
            submitBtn.classList.add('error');
            submitBtn.disabled = false;
        });
    });

    sendAnotherBtn.addEventListener('click', () => {
        successMessage.style.display = 'none'; 
        contactForm.style.display = 'block'; 
        
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
        submitBtn.classList.remove('success', 'error');
    });
    // --- END Form Submission Logic ---
});

// --- ##### NEW: Preloader Logic ##### ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    document.body.classList.add('loaded');
});