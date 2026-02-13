// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== Active Link Highlighting =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.15)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            service: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><span class="btn-arrow">⏳</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            // Log form data (in production, send to server)
            console.log('Form Data:', formData);
            
            // Show success message
            showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Create styles for notifications
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 12px;
                font-weight: 600;
                z-index: 9999;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            }

            .notification-success {
                background: linear-gradient(135deg, #00d4ff, #0066ff);
                color: white;
                border: 1px solid rgba(0, 212, 255, 0.3);
                box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
            }

            .notification-error {
                background: linear-gradient(135deg, #ff6b6b, #ff0066);
                color: white;
                border: 1px solid rgba(255, 0, 102, 0.3);
                box-shadow: 0 0 30px rgba(255, 0, 102, 0.3);
            }

            .notification-info {
                background: linear-gradient(135deg, #0066ff, #0052cc);
                color: white;
                border: 1px solid rgba(0, 102, 255, 0.3);
                box-shadow: 0 0 30px rgba(0, 102, 255, 0.3);
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @media (max-width: 768px) {
                .notification {
                    bottom: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove notification
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to elements
document.querySelectorAll('.service-card, .portfolio-item, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== Navbar Responsive =====
function handleResize() {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// ===== Smooth Scroll Behavior =====
document.addEventListener('DOMContentLoaded', () => {
    // Ensure smooth scroll on page load
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrollY < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        const increment = target / 30; // 30 frames animation
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.floor(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Trigger animation when element comes into view
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
        
        counterObserver.observe(counter);
    });
}

animateCounters();

// ===== Service Card Hover Effect =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'rgba(0, 212, 255, 0.5)';
        this.style.background = 'rgba(0, 51, 204, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(0, 212, 255, 0.15)';
        this.style.background = 'rgba(0, 51, 204, 0.1)';
    });
});

// ===== Pricing Card Toggle =====
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.opacity = '0.7';
        });
        this.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', function() {
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ===== Portfolio Item Click Handler =====
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const h3 = this.querySelector('h3').textContent;
        showNotification(`Project: ${h3}`, 'info');
        console.log('Portfolio Item Clicked:', h3);
    });
});

// ===== Button Ripple Effect =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles if not already added
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                .btn {
                    position: relative;
                    overflow: hidden;
                }
                
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: rippleAnimation 0.6s ease-out;
                    pointer-events: none;
                }
                
                @keyframes rippleAnimation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
    });
});

// ===== Form Input Focus Animation =====
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===== Floating Code Animation =====
const floatingCodes = document.querySelectorAll('.floating-code');
floatingCodes.forEach((code, index) => {
    code.style.animation = `float ${8 + index * 2}s ease-in-out infinite`;
});

// ===== Service Card Tilt Effect =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ===== Add CSS for Tilt Effect =====
if (!document.querySelector('style[data-tilt]')) {
    const style = document.createElement('style');
    style.setAttribute('data-tilt', 'true');
    style.textContent = `
        .service-card {
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// ===== Statistics Counter for About Section =====
function startCountUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            document.querySelectorAll('.about-stats .stat h3').forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                startCountUp(stat, number);
            });
            aboutObserver.unobserve(aboutSection);
        }
    });
    
    aboutObserver.observe(aboutSection);
}

// ===== Social Link Hover Effect =====
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Keyboard Navigation =====
let currentFocusIndex = 0;
const focusableElements = document.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

document.addEventListener('keydown', (e) => {
    // Tab navigation
    if (e.key === 'Tab') {
        e.preventDefault();
        currentFocusIndex += e.shiftKey ? -1 : 1;
        
        if (currentFocusIndex >= focusableElements.length) {
            currentFocusIndex = 0;
        } else if (currentFocusIndex < 0) {
            currentFocusIndex = focusableElements.length - 1;
        }
        
        focusableElements[currentFocusIndex].focus();
    }
    
    // Escape key to close menu
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===== Print Styles =====
if (!document.querySelector('style[data-print]')) {
    const style = document.createElement('style');
    style.setAttribute('data-print', 'true');
    style.textContent = `
        @media print {
            .navbar, .footer {
                display: none;
            }
            
            body {
                background: white;
                color: black;
            }
            
            section {
                page-break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Service Card Click to Learn More =====
document.querySelectorAll('.service-card').forEach(card => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        const price = this.querySelector('.service-price').textContent;
        
        showNotification(`${serviceName} - ${price}`, 'success');
        
        // Scroll to contact form
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });
});

// ===== Dynamic Year in Footer =====
document.addEventListener('DOMContentLoaded', () => {
    const footerContent = document.querySelector('.footer-bottom');
    if (footerContent) {
        const currentYear = new Date().getFullYear();
        footerContent.innerHTML = footerContent.innerHTML.replace('2026', currentYear.toString());
    }
});

// ===== Page Visibility Handler =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left the page');
    } else {
        console.log('User returned to the page');
    }
});

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// ===== Copy Email to Clipboard =====
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.href.replace('mailto:', '');
        // Don't prevent default, let email client open
        console.log('Email clicked:', email);
    });
});

// ===== Dynamic Meta Tags =====
function updateMetaTags() {
    const currentSection = document.querySelector('section:in-viewport');
    if (currentSection) {
        const sectionTitle = currentSection.querySelector('h2')?.textContent || 'TechOl';
        document.title = `${sectionTitle} | TechOl`;
    }
}

// Update meta tags on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateMetaTags, 1000);
});

// ===== Intersection Observer for Elements =====
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    elementObserver.observe(section);
});

// ===== Analytics Event Tracking =====
function trackEvent(eventName, eventData = {}) {
    console.log(`Event Tracked: ${eventName}`, eventData);
    
    // Send to analytics service (Google Analytics, Mixpanel, etc.)
    if (window.gtag) {
        window.gtag('event', eventName, eventData);
    }
}

// Track important interactions
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('cta_clicked', {
            button_text: btn.textContent.trim(),
            location: btn.closest('section')?.id || 'unknown'
        });
    });
});

// ===== Form Field Validation =====
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = 'rgba(0, 212, 255, 0.15)';
        }
    });
    
    return isValid;
}

// ===== Newsletter Subscription =====
function handleNewsletterSubscription(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
        trackEvent('newsletter_signup', { email: email });
        showNotification('Successfully subscribed to our newsletter!', 'success');
        return true;
    } else {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
}

// ===== Console Greeting =====
console.log(
    '%c🚀 Welcome to TechOl!',
    'font-size: 20px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px #00d4ff;'
);
console.log(
    '%cPremium Digital Design & Development Studio\n%cFounded by Vihaan Sankhla | Based in Kota, Rajasthan',
    'font-size: 14px; color: #0066ff;',
    'font-size: 12px; color: #c0d4ff;'
);
console.log(
    '%cEmail: cvatechol@gmail.com | Phone: +91 9549558023',
    'font-size: 12px; color: #7a8fcc;'
);

// ===== Initialize All Features =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('All scripts loaded successfully!');
    
    // Check if all images are loaded
    const images = document.querySelectorAll('img');
    if (images.length > 0) {
        let loadedImages = 0;
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                });
            }
        });
    }
});

// ===== Mobile Device Detection =====
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
}

// ===== Prevent Double Submission =====
document.querySelectorAll('form').forEach(form => {
    let isSubmitting = false;
    
    form.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        
        isSubmitting = true;
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        setTimeout(() => {
            isSubmitting = false;
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        }, 3000);
    });
});