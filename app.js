/**
 * Tech Startup Homepage JavaScript
 * Handles mobile navigation, smooth scrolling, form validation, modal, and interactions
 * Prepared for future React.js conversion
 */

/**
 * DOM Content Loaded Event Handler
 * Initializes all functionality when the DOM is ready
 */
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    Navigation.init();
    SmoothScrolling.init();
    ContactForm.init();
    ScrollEffects.init();
    Modal.init();
    CardFlip.init();
    initializeTabs();

    console.log('Homepage initialized successfully');
});

/**
 * Navigation Module
 * Handles mobile menu toggle and navigation interactions
 */
const Navigation = {
    /**
     * Initialize navigation functionality
     */
    init() {
        this.bindEvents();
        this.handleActiveNavigation();
    },

    /**
     * Bind navigation event listeners
     */
    bindEvents() {
        const navToggle = document.getElementById('nav-toggle');
        const navClose = document.getElementById('nav-close');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Mobile menu close
        if (navClose) {
            navClose.addEventListener('click', () => this.closeMobileMenu());
        }

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    },

    /**
     * Toggle mobile menu visibility
     */
    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('show-menu');
            this.toggleBodyScroll();
        }
    },

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            this.enableBodyScroll();
        }
    },

    /**
     * Handle active navigation highlighting
     */
    handleActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('nav__link--active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('nav__link--active');
                        }
                    });
                }
            });
        });
    },

    /**
     * Toggle body scroll (prevent background scrolling when menu is open)
     */
    toggleBodyScroll() {
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
    },

    /**
     * Enable body scroll
     */
    enableBodyScroll() {
        document.body.style.overflow = '';
    }
};

/**
 * Smooth Scrolling Module
 * Handles smooth scrolling to anchor links
 */
const SmoothScrolling = {
    /**
     * Initialize smooth scrolling
     */
    init() {
        this.bindEvents();
    },

    /**
     * Bind smooth scrolling events
     */
    bindEvents() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement && href !== '#') {
                    e.preventDefault();
                    this.scrollToElement(targetElement);
                }
            });
        });
    },

    /**
     * Scroll to a specific element with offset for fixed header
     * @param {HTMLElement} element - Target element to scroll to
     */
    scrollToElement(element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
        const targetPosition = element.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Contact Form Module
 * Handles form validation and submission
 */
const ContactForm = {
    /**
     * Initialize contact form functionality
     */
    init() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.bindEvents();
        }
    },

    /**
     * Bind form event listeners
     */
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('.form__input, .form__textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    },

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const submitButton = this.form.querySelector('button[type="submit"]');
        const formData = new FormData(this.form);

        try {
            this.setLoadingState(submitButton, true);

            // Simulate API call (replace with actual endpoint)
            await this.simulateFormSubmission(formData);

            this.showSuccessMessage();
            this.resetForm();
        } catch (error) {
            this.showErrorMessage('Failed to send message. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            this.setLoadingState(submitButton, false);
        }
    },

    /**
     * Validate entire form
     * @returns {boolean} - Form validity
     */
    validateForm() {
        const inputs = this.form.querySelectorAll('.form__input, .form__textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    },

    /**
     * Validate individual field
     * @param {HTMLElement} field - Input field to validate
     * @returns {boolean} - Field validity
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Name validation (no numbers)
        if (field.name === 'name' && value) {
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!nameRegex.test(value)) {
                this.showFieldError(field, 'Name should only contain letters and spaces');
                return false;
            }
        }

        // Message minimum length
        if (field.name === 'message' && value && value.length < 10) {
            this.showFieldError(field, 'Message should be at least 10 characters long');
            return false;
        }

        return true;
    },

    /**
     * Show field validation error
     * @param {HTMLElement} field - Input field
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        field.classList.add('error');

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.form__error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('span');
        errorElement.className = 'form__error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    },

    /**
     * Clear field validation error
     * @param {HTMLElement} field - Input field
     */
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form__error-message');
        if (errorElement) {
            errorElement.remove();
        }
    },

    /**
     * Set button loading state
     * @param {HTMLElement} button - Submit button
     * @param {boolean} loading - Loading state
     */
    setLoadingState(button, loading) {
        if (loading) {
            button.classList.add('loading');
            button.textContent = 'Sending...';
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.textContent = 'Send Message';
            button.disabled = false;
        }
    },

    /**
     * Simulate form submission (replace with actual API call)
     * @param {FormData} formData - Form data
     * @returns {Promise} - Promise that resolves after delay
     */
    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // For demo purposes, always resolve
                // In real implementation, make actual API call here
                console.log('Form data:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    },

    /**
     * Show success message
     */
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form__success-message';
        message.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        message.style.cssText = `
            background: var(--success);
            color: white;
            padding: var(--space-md);
            border-radius: var(--radius-lg);
            margin-top: var(--space-md);
            text-align: center;
        `;

        this.form.appendChild(message);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
    },

    /**
     * Show error message
     * @param {string} text - Error message text
     */
    showErrorMessage(text) {
        const message = document.createElement('div');
        message.className = 'form__error-message';
        message.textContent = text;
        message.style.cssText = `
            background: var(--error);
            color: white;
            padding: var(--space-md);
            border-radius: var(--radius-lg);
            margin-top: var(--space-md);
            text-align: center;
        `;

        this.form.appendChild(message);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
    },

    /**
     * Reset form to initial state
     */
    resetForm() {
        this.form.reset();

        // Clear any remaining error states
        const inputs = this.form.querySelectorAll('.form__input, .form__textarea');
        inputs.forEach(input => this.clearFieldError(input));
    }
};

/**
 * Scroll Effects Module
 * Handles scroll-based animations and effects
 */
const ScrollEffects = {
    /**
     * Initialize scroll effects
     */
    init() {
        this.handleHeaderScroll();
        this.initializeIntersectionObserver();
    },

    /**
     * Handle header background change on scroll
     */
    handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 22, 40, 0.98)';
                header.style.borderBottom = '1px solid rgba(0, 188, 212, 0.3)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(10, 22, 40, 0.95)';
                header.style.borderBottom = '1px solid rgba(0, 188, 212, 0.2)';
                header.style.boxShadow = 'none';
            }
        });
    },

    /**
     * Initialize Intersection Observer for animations
     */
    initializeIntersectionObserver() {
        // Only animate if user prefers motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.value-proposition__card, .testimonial, .team__member'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
};

/**
 * Modal Module
 * Handles modal dialog functionality for contact form
 */
const Modal = {
    /**
     * Initialize modal functionality
     */
    init() {
        this.modal = document.getElementById('contact-modal');
        this.bindEvents();
    },

    /**
     * Bind modal event listeners
     */
    bindEvents() {
        // Contact links and buttons that should open the modal
        const contactTriggers = document.querySelectorAll('a[href="#contact"], .btn[href="#contact"]');
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = this.modal?.querySelector('.modal__overlay');

        // Open modal when clicking contact triggers
        contactTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });

        // Close modal when clicking close button
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        // Close modal when clicking overlay
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.closeModal());
        }

        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen()) {
                this.closeModal();
            }
        });
    },

    /**
     * Open modal
     */
    openModal() {
        if (this.modal) {
            this.modal.classList.add('modal--active');
            document.body.style.overflow = 'hidden';

            // Focus first input for accessibility
            const firstInput = this.modal.querySelector('.form__input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    },

    /**
     * Close modal
     */
    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('modal--active');
            document.body.style.overflow = '';
        }
    },

    /**
     * Check if modal is open
     * @returns {boolean} - Modal open state
     */
    isModalOpen() {
        return this.modal?.classList.contains('modal--active') || false;
    }
};

/**
 * Card Flip Module
 * Handles flip card functionality for Future Technologies section
 */
const CardFlip = {
    /**
     * Initialize card flip functionality
     */
    init() {
        this.bindEvents();
        this.setupAccessibility();
    },

    /**
     * Bind flip card event listeners
     */
    bindEvents() {
        const cardContainers = document.querySelectorAll('.technology__card-container');
        
        cardContainers.forEach(container => {
            // Add click functionality for mobile devices
            container.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.toggleFlip(container);
                }
            });
            
            // Add keyboard accessibility
            container.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleFlip(container);
                }
            });

            // Touch event for better mobile experience
            container.addEventListener('touchstart', (e) => {
                if (window.innerWidth <= 768) {
                    // Add a small delay to distinguish from scroll
                    this.touchStartTime = Date.now();
                }
            });

            container.addEventListener('touchend', (e) => {
                if (window.innerWidth <= 768) {
                    const touchDuration = Date.now() - this.touchStartTime;
                    if (touchDuration < 200) { // Quick tap
                        e.preventDefault();
                        this.toggleFlip(container);
                    }
                }
            });
        });
    },

    /**
     * Toggle flip state for a card container
     * @param {HTMLElement} container - Card container element
     */
    toggleFlip(container) {
        container.classList.toggle('flipped');
        
        // Update ARIA state for accessibility
        const isFlipped = container.classList.contains('flipped');
        container.setAttribute('aria-pressed', isFlipped);
        
        // Announce the flip to screen readers
        const frontCard = container.querySelector('.technology__card--front .technology__title');
        const backCard = container.querySelector('.technology__card--back .value-proposition__title');
        
        if (frontCard && backCard) {
            const announcement = isFlipped 
                ? `Showing ${backCard.textContent}`
                : `Showing ${frontCard.textContent}`;
            
            this.announceToScreenReader(announcement);
        }
    },

    /**
     * Setup accessibility attributes
     */
    setupAccessibility() {
        const cardContainers = document.querySelectorAll('.technology__card-container');
        
        cardContainers.forEach((container, index) => {
            // Make container focusable and interactive
            container.setAttribute('tabindex', '0');
            container.setAttribute('role', 'button');
            container.setAttribute('aria-pressed', 'false');
            
            // Add descriptive label
            const frontTitle = container.querySelector('.technology__card--front .technology__title');
            const backTitle = container.querySelector('.technology__card--back .value-proposition__title');
            
            if (frontTitle && backTitle) {
                const label = `Flip card: ${frontTitle.textContent} to reveal ${backTitle.textContent}`;
                container.setAttribute('aria-label', label);
            }
            
            // Add unique IDs for better accessibility
            container.id = `flip-card-${index + 1}`;
        });
    },

    /**
     * Announce text to screen readers
     * @param {string} text - Text to announce
     */
    announceToScreenReader(text) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        document.body.appendChild(announcement);
        announcement.textContent = text;
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    },

    /**
     * Reset all cards to front side
     */
    resetAllCards() {
        const cardContainers = document.querySelectorAll('.technology__card-container');
        cardContainers.forEach(container => {
            container.classList.remove('flipped');
            container.setAttribute('aria-pressed', 'false');
        });
    }
};

/**
 * Tab functionality for About section
 */
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab__button');
  const tabPanels = document.querySelectorAll('.tab__panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('tab__button--active'));
      tabPanels.forEach(panel => panel.classList.remove('tab__panel--active'));
      
      // Add active class to clicked button and corresponding panel
      button.classList.add('tab__button--active');
      document.getElementById(targetTab).classList.add('tab__panel--active');
    });
  });
}

/**
 * Utility Functions
 */
const Utils = {
    /**
     * Debounce function to limit function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function to limit function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} - Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export modules for potential future use or testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        SmoothScrolling,
        ContactForm,
        ScrollEffects,
        Modal,
        CardFlip,
        Utils
    };
}