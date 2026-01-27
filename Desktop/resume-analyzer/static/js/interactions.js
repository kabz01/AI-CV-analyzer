// Enhanced JavaScript Interactions for Resume Analyzer

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactions
    initializeTooltips();
    initializeModals();
    initializeDropdowns();
    initializeAnimations();
    initializeScrollEffects();
    initializeFormValidation();
    initializeNotifications();
    initializeCardInteractions();
});

// 1. TOOLTIPS - Show helpful hints on hover
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip animate-zoom';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(15, 23, 42, 0.95);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 10000;
                pointer-events: none;
                white-space: nowrap;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// 2. MODALS - Create dynamic modal dialogs
function initializeModals() {
    window.showModal = function(title, content, buttons = []) {
        const modalHTML = `
            <div class="custom-modal-overlay animate__animated animate__fadeIn" id="customModal">
                <div class="custom-modal animate__animated animate__zoomIn">
                    <div class="custom-modal-header">
                        <h3>${title}</h3>
                        <button class="custom-modal-close" onclick="closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="custom-modal-body">
                        ${content}
                    </div>
                    <div class="custom-modal-footer">
                        ${buttons.map(btn => `
                            <button class="btn ${btn.class || 'btn-secondary'}" onclick="${btn.onClick}">
                                ${btn.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
    };
    
    window.closeModal = function() {
        const modal = document.getElementById('customModal');
        if (modal) {
            modal.classList.add('animate__fadeOut');
            setTimeout(() => modal.remove(), 300);
        }
    };
}

// 3. DROPDOWNS - Enhanced dropdown menus
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.nextElementSibling;
            if (menu && menu.classList.contains('dropdown-menu')) {
                menu.classList.toggle('show');
                menu.classList.toggle('animate-slide-down');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    });
}

// 4. SCROLL ANIMATIONS - Animate elements on scroll
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Add scroll progress indicator
    createScrollProgress();
}

// 5. SCROLL PROGRESS BAR
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #14b8a6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 6. FORM VALIDATION - Real-time validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fix the errors before submitting', 'error');
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let message = '';
    
    // Remove existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    field.classList.remove('invalid', 'valid');
    
    // Check if required field is empty
    if (required && !value) {
        isValid = false;
        message = 'This field is required';
    }
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    // Password strength
    else if (type === 'password' && value && value.length < 8) {
        isValid = false;
        message = 'Password must be at least 8 characters';
    }
    
    if (!isValid) {
        field.classList.add('invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message animate-slide-down';
        errorDiv.style.cssText = 'color: #ef4444; font-size: 12px; margin-top: 4px;';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    } else if (value) {
        field.classList.add('valid');
    }
    
    return isValid;
}

// 7. NOTIFICATIONS - Show toast notifications
function initializeNotifications() {
    window.showNotification = function(message, type = 'info', duration = 3000) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#2563eb'
        };
        
        const notification = document.createElement('div');
        notification.className = 'custom-notification notification-enter';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            border-left: 4px solid ${colors[type]};
            min-width: 300px;
            max-width: 400px;
        `;
        
        notification.innerHTML = `
            <i class="fas ${icons[type]}" style="color: ${colors[type]}; font-size: 20px;"></i>
            <span style="flex: 1; color: #0f172a;">${message}</span>
            <button onclick="this.parentElement.remove()" style="
                background: none;
                border: none;
                color: #64748b;
                cursor: pointer;
                font-size: 18px;
            ">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    };
}

// 8. CARD INTERACTIONS - Interactive cards
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.interactive-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
}

// 9. COPY TO CLIPBOARD - Copy text with feedback
window.copyToClipboard = function(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.innerHTML;
        element.innerHTML = '<i class="fas fa-check"></i> Copied!';
        element.classList.add('animate-pulse');
        
        setTimeout(() => {
            element.innerHTML = originalText;
            element.classList.remove('animate-pulse');
        }, 2000);
    });
};

// 10. LAZY LOADING IMAGES
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('animate-zoom');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 11. DARK MODE ENHANCEMENT
function enhanceDarkMode() {
    const darkModeToggle = document.getElementById('themeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                document.body.classList.remove('animate__animated', 'animate__fadeIn');
            }, 500);
        });
    }
}

// 12. KEYBOARD SHORTCUTS
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) searchInput.focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 13. COUNTER ANIMATION - Animate numbers
window.animateCounter = function(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
};

// 14. PARALLAX EFFECT
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize additional features
initializeLazyLoading();
enhanceDarkMode();
initializeParallax();

console.log('✨ Enhanced interactions loaded successfully!');
