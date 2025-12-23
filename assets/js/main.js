// Enhanced GSAP & ScrollTrigger Setup
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {

    // ================ MOBILE NAV TOGGLE ================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
            
            // Animate menu items when opening
            if (navLinks.classList.contains('active')) {
                gsap.fromTo('.nav-links li',
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }
                );
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            });
        });
    }

    // ================ PAGE LOAD ANIMATIONS ================
    // Homepage specific animations
    if (document.body.classList.contains('home-page')) {
        const tl = gsap.timeline();
        tl.from('.hero-content', {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "power3.out"
        })
        .from('.hero-buttons a', {
            duration: 0.8,
            opacity: 0,
            y: 30,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5")
        .from('.hero-section img', {
            duration: 1.2,
            opacity: 0,
            scale: 1.1,
            ease: "power3.out"
        }, "-=1");
    }

    // About page animations
    if (document.body.classList.contains('about-page')) {
        gsap.from('.team-member', {
            scrollTrigger: {
                trigger: '.team-section',
                start: "top 80%"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    // Services page animations
    if (document.body.classList.contains('services-page')) {
        gsap.from('.service-detail', {
            scrollTrigger: {
                trigger: '.service-detail',
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        });
    }

    // Contact page animations
    if (document.body.classList.contains('contact-page')) {
        gsap.from('.contact-form', {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out"
        });
    }

    // ================ ENHANCED SCROLL REVEAL ANIMATIONS ================
    const scrollElements = document.querySelectorAll('.js-scroll');
    
    // Create ScrollTriggers for each element
    scrollElements.forEach((el, index) => {
        // Set stagger delay for children
        const children = el.querySelectorAll('.stagger-child');
        children.forEach((child, childIndex) => {
            child.style.setProperty('--stagger-index', childIndex);
        });

        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            end: "bottom 20%",
            onEnter: () => animateElement(el, index),
            onEnterBack: () => animateElement(el, index),
            once: true // Only animate once
        });
    });

    function animateElement(element, index) {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.05,
            ease: "power2.out"
        });
        
        // Animate staggered children
        const staggeredChildren = element.querySelectorAll('.stagger-child');
        if (staggeredChildren.length > 0) {
            gsap.to(staggeredChildren, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.2,
                ease: "power2.out"
            });
        }
    }

    // ================ ENHANCED PORTFOLIO HOVER EFFECTS ================
    const portfolioItems = document.querySelectorAll('.portfolio-item, .portfolio-card');
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;
        
        item.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(item, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(item, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // ================ FORM INPUT ANIMATIONS ================
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const parent = this.closest('.form-group');
            if (parent) {
                gsap.to(parent, {
                    y: -2,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
        
        input.addEventListener('blur', function() {
            const parent = this.closest('.form-group');
            if (parent) {
                gsap.to(parent, {
                    y: 0,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
    });

    // ================ LAZY LOADING IMAGES ================
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
                
                // Fade in image
                gsap.fromTo(img,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.6, ease: "power2.out" }
                );
            }
        });
    }, { rootMargin: '50px 0px' });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ================ PARALLAX EFFECTS ================
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        const depth = el.dataset.depth || 0.5;
        
        ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                const y = self.progress * 100 * depth;
                gsap.set(el, { y: `${y}px` });
            }
        });
    });

    // ================ CURSOR EFFECT (Optional) ================
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50
        });
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .portfolio-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 1.5,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
        
        // Hide cursor on mobile
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
        }
    }

    // ================ PAGE TRANSITION ANIMATIONS ================
    const pageLinks = document.querySelectorAll('a[href^="http"]:not([href*="#"])');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').includes(window.location.hostname) || 
                !link.getAttribute('href').startsWith('http')) {
                
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Add page transition
                gsap.to('main', {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });

    // ================ COUNTER ANIMATIONS ================
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                const target = parseInt(counter.dataset.target);
                const duration = parseFloat(counter.dataset.duration) || 2;
                const suffix = counter.dataset.suffix || '';
                
                gsap.fromTo(counter,
                    { innerHTML: 0 },
                    {
                        innerHTML: target,
                        duration: duration,
                        ease: "power2.out",
                        snap: { innerHTML: 1 },
                        onUpdate: function() {
                            counter.innerHTML = Math.floor(this.targets()[0].innerHTML) + suffix;
                        }
                    }
                );
            },
            once: true
        });
    });

    // ================ INITIALIZE ANIMATIONS ON LOAD ================
    window.addEventListener('load', () => {
        // Trigger initial scroll reveal
        scrollElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add('scrolled');
                gsap.set(el, { opacity: 1, y: 0 });
            }
        });
        
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
    });

});

// Add CSS for custom cursor
const cursorCSS = `
.custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    background: var(--color-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.2s ease;
}

@media (max-width: 768px) {
    .custom-cursor {
        display: none;
    }
}
`;

// Inject cursor styles
const style = document.createElement('style');
style.textContent = cursorCSS;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            // Update any scroll-based animations here
        }, 100);
    }
});

// Handle browser resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});