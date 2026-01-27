// Theme Management System

class ThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }
    
    init() {
        // Set initial theme
        this.applyTheme(this.theme);
        
        // Add event listener to toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.saveTheme(this.theme);
        
        // Send to server if user is logged in
        this.updateServerTheme(this.theme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateToggleIcon(theme);
        
        // Add animation class
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
    }
    
    updateToggleIcon(theme) {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
    
    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }
    
    getStoredTheme() {
        return localStorage.getItem('theme');
    }
    
    async updateServerTheme(theme) {
        try {
            const response = await fetch('/auth/update-theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ theme: theme })
            });
            
            if (!response.ok) {
                console.log('Could not update theme on server (user might not be logged in)');
            }
        } catch (error) {
            console.log('Theme update error:', error);
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    
    // Auto-hide flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.flash');
    flashMessages.forEach(flash => {
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transform = 'translateX(400px)';
            setTimeout(() => flash.remove(), 300);
        }, 5000);
    });
});

// Smooth scroll behavior
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

// Add loading state to forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn && !submitBtn.classList.contains('loading')) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Restore button after 30 seconds in case of error
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 30000);
        }
    });
});
