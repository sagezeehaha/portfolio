/*
 * ----------------------------------------------------
 * JAVASCRIPT: Distinctive Interactivity
 * - Enhanced Hero Staggered Intro.
 * - Dynamic Vertical Skill Gauge generation and animation.
 * ----------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. HERO INTRO ANIMATION SEQUENCING
    // ----------------------------------------------------
    
    // Define the elements and their delays
    const heroAnimations = [
        { selector: '.greeting', delay: 200, style: 'slide' },
        { selector: '.hero-name', delay: 400, style: 'slide' },
        { selector: '.hero-role', delay: 600, style: 'fade' },
        { selector: '.hero-tagline', delay: 800, style: 'fade' },
        { selector: '.hero-actions', delay: 1000, style: 'fade' },
        { selector: '.hero-location', delay: 1200, style: 'fade' },
    ];
    
    heroAnimations.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            setTimeout(() => {
                el.style.opacity = 1;
                el.style.transform = item.style === 'slide' ? 'translateX(0)' : 'none';
            }, item.delay);
        }
    });

    // ----------------------------------------------------
    // 2. HERO TAGLINE TYPING EFFECT
    // ----------------------------------------------------
    const typingElement = document.getElementById('animated-tagline');
    // ... (Typing/Erasing functions remain the same as they are clean vanilla JS) ...

    const taglinesData = typingElement ? typingElement.dataset.taglines : null;
    const taglines = taglinesData ? JSON.parse(taglinesData) : [];
    
    let taglineIndex = 0;
    let charIndex = 0;
    const typingSpeed = 70; 
    const erasingSpeed = 40; 
    const delayBetweenTaglines = 2000; 

    function type() {
        if (taglineIndex < taglines.length) {
            const currentTagline = taglines[taglineIndex];
            
            if (charIndex < currentTagline.length) {
                typingElement.textContent += currentTagline.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, delayBetweenTaglines);
            }
        }
    }

    function erase() {
        const currentTagline = taglines[taglineIndex];

        if (charIndex > 0) {
            typingElement.textContent = currentTagline.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            taglineIndex = (taglineIndex + 1) % taglines.length;
            setTimeout(type, 500);
        }
    }

    if (taglines.length > 0) {
        typingElement.textContent = ''; 
        setTimeout(type, 1500); // Start after the main hero text reveals
    }


    // ----------------------------------------------------
    // 3. SCROLL REVEAL & VERTICAL SKILL GAUGE (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const skillBarContainer = document.querySelector('.skill-bar-container');
    const skillListItems = document.querySelectorAll('#skills .skill-item');
    const skillsTotal = 9;

    // Dynamically generate the skill bars inside the track
    if (skillBarContainer) {
        const track = skillBarContainer.querySelector('.skill-bar-track');
        track.innerHTML = ''; // Clear any default content
        
        skillListItems.forEach((item, index) => {
            const bar = document.createElement('div');
            bar.className = 'skill-bar';
            bar.setAttribute('data-index', index);
            bar.setAttribute('data-level', item.getAttribute('data-level'));
            track.appendChild(bar);
        });
    }

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.15 
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                if (entry.target.id === 'skills') {
                    animateVerticalSkills();
                }
                
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    
    function animateVerticalSkills() {
        if (!skillBarContainer) return;
        
        const track = skillBarContainer.querySelector('.skill-bar-track');
        track.classList.add('active'); // Fade in the track container

        const bars = track.querySelectorAll('.skill-bar');

        bars.forEach(bar => {
            const level = parseInt(bar.getAttribute('data-level'), 10);
            const heightPercentage = level + '%';
            
            // Stagger the animation slightly
            const delay = 50 * parseInt(bar.getAttribute('data-index'), 10);

            setTimeout(() => {
                bar.style.height = heightPercentage;
            }, delay);
        });
    }

});