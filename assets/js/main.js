// Main JavaScript for Mohammed Othman Portfolio

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Initialize all components
    initNavigation();
    initMobileMenu();
    initSkillsAnimation();
    initPortfolioFilter();
    initPortfolioItemsAnimation();
    initSmoothScrolling();
    initContactForm();
    initContactInteractions();
    initScrollToTop();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-gray-900/95', 'backdrop-blur-lg');
        } else {
            navbar.classList.remove('bg-gray-900/95', 'backdrop-blur-lg');
        }
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

// Skills animation
function initSkillsAnimation() {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.classList.add('animate');
                        bar.style.transform = `scaleX(${width / 100})`;
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gradient-to-r', 'from-purple-500', 'to-blue-600', 'text-white');
                btn.classList.add('bg-slate-800/50', 'backdrop-blur-xl', 'border', 'border-slate-700/50', 'text-slate-300');
            });
            
            button.classList.add('active', 'bg-gradient-to-r', 'from-purple-500', 'to-blue-600', 'text-white');
            button.classList.remove('bg-slate-800/50', 'backdrop-blur-xl', 'border', 'border-slate-700/50', 'text-slate-300');
            
            // Filter items with animation
            portfolioItems.forEach((item, index) => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Form validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField.call(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showNotification('يرجى تصحيح الأخطاء في النموذج', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin ml-2"></i>جاري الإرسال...';
            submitBtn.disabled = true;
            lucide.createIcons();
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.', 'success');
                
                // Reset form
                this.reset();
                clearAllErrors();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Recreate icons
                lucide.createIcons();
            }, 2000);
        });
    }
}

// Field validation
function validateField() {
    const field = this;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'هذا الحقل مطلوب';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'يرجى إدخال رقم هاتف صحيح';
            isValid = false;
        }
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
    field.classList.remove('border-slate-600/50', 'focus:border-green-400', 'focus:ring-green-400/20');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-red-400 text-xs mt-1';
    errorElement.textContent = message;
    
    // Insert error message after field
    field.parentNode.appendChild(errorElement);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
    field.classList.add('border-slate-600/50', 'focus:border-green-400', 'focus:ring-green-400/20');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear errors on input
function clearErrors() {
    clearFieldError(this);
}

// Clear all form errors
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(element => element.remove());
    
    const fields = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    fields.forEach(field => {
        field.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
        field.classList.add('border-slate-600/50', 'focus:border-green-400', 'focus:ring-green-400/20');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}" class="w-5 h-5 mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = ['مصمم غرافيك محترف', 'متخصص في الموشن غرافيك', 'خبير في الهويات البصرية'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', initTypingAnimation);

// Contact info interactions
function initContactInteractions() {
    // Copy to clipboard functionality
    const contactItems = document.querySelectorAll('#contact .group');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const textElement = this.querySelector('p:last-child');
            if (textElement) {
                const text = textElement.textContent.trim();
                
                // Copy to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        showNotification(`تم نسخ: ${text}`, 'success');
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showNotification(`تم نسخ: ${text}`, 'success');
                }
            }
        });
    });
}

// Initialize contact interactions
document.addEventListener('DOMContentLoaded', initContactInteractions);

// Parallax effect for background elements
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', initParallax);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i data-lucide="arrow-up" class="w-5 h-5"></i>';
    scrollBtn.className = 'fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 opacity-0 pointer-events-none flex items-center justify-center';
    scrollBtn.id = 'scroll-to-top';
    
    document.body.appendChild(scrollBtn);
    lucide.createIcons();
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollBtn.classList.add('opacity-100');
        } else {
            scrollBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollBtn.classList.remove('opacity-100');
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', initScrollToTop);

// Portfolio Modal functionality
const portfolioData = {
    divo: {
        title: 'هوية بصرية Divo',
        images: [
            'assets/img/portfolio/branding/divo/00 (2).png',
            'assets/img/portfolio/branding/divo/01 (1).png',
            'assets/img/portfolio/branding/divo/01 (3).png',
            'assets/img/portfolio/branding/divo/01 (4).png',
            'assets/img/portfolio/branding/divo/01 (5).png',
            'assets/img/portfolio/branding/divo/01 (6).png',
            'assets/img/portfolio/branding/divo/01 (7).png',
            'assets/img/portfolio/branding/divo/01 (8).png',
            'assets/img/portfolio/branding/divo/01 (9).png',
            'assets/img/portfolio/branding/divo/01 (10).png',
            'assets/img/portfolio/branding/divo/01 (11).png',
            'assets/img/portfolio/branding/divo/01 (12).png',
            'assets/img/portfolio/branding/divo/01 (13).png'
        ]
    },
    vira: {
        title: 'هوية بصرية Vira',
        images: [
            'assets/img/portfolio/branding/vira/00Artboard 1_1.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 1_2.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 1_3.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 1_4.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 2.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 3_1.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 3_2.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 3_3.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 4.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 5.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 6.jpg',
            'assets/img/portfolio/branding/vira/00Artboard 7.jpg'
        ]
    },
    sky: {
        title: 'شعار Sky',
        images: [
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 1_1.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 1_2.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 2.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 3_1.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 3_2.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 3_3.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 3_4.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 3_6.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 3_7.jpg',
            'assets/img/portfolio/branding/sky/SKY LOGOArtboard 3_8.jpg'
        ]
    },
    himo: {
        title: 'هوية بصرية Himo',
        images: [
            'assets/img/portfolio/branding/himo/01.jpg',
            'assets/img/portfolio/branding/himo/02.jpg',
            'assets/img/portfolio/branding/himo/03.jpg',
            'assets/img/portfolio/branding/himo/04.jpg',
            'assets/img/portfolio/branding/himo/05.jpg',
            'assets/img/portfolio/branding/himo/06.jpg',
            'assets/img/portfolio/branding/himo/07.jpg'
        ]
    },
    scc: {
        title: 'هوية بصرية SCC',
        images: [
            'assets/img/portfolio/branding/scc/sccArtboard 1.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 2.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 3.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 4.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 5.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 6.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 7.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 8.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 9.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 10.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 11.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 12.jpg',
            'assets/img/portfolio/branding/scc/sccArtboard 13.jpg'
        ]
    },
    hango: {
        title: 'هوية بصرية Hango',
        images: [
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_1.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_2.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_3.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_4.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_6.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_7.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_8.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_9.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_10.jpg',
            'assets/img/portfolio/branding/hango/Untitled-1Artboard 1_11.jpg'
        ]
    },
    lederma: {
        title: 'هوية بصرية Le Derma Code',
        images: [
            'assets/img/portfolio/branding/Le Derma Code/01 (1).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (2).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (4).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (5).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (6).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (7).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (9).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (11).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (12).png',
            'assets/img/portfolio/branding/Le Derma Code/01 (13).png'
        ]
    },
    proleran: {
        title: 'هوية بصرية Pro Leran',
        images: [
            'assets/img/portfolio/branding/pro leran/01.jpg',
            'assets/img/portfolio/branding/pro leran/02.jpg',
            'assets/img/portfolio/branding/pro leran/03.jpg',
            'assets/img/portfolio/branding/pro leran/04.jpg',
            'assets/img/portfolio/branding/pro leran/05.jpg',
            'assets/img/portfolio/branding/pro leran/06.jpg'
        ]
    },
    puresmile: {
        title: 'هوية بصرية Pure Smile',
        images: [
            'assets/img/portfolio/branding/Pure Smile/01.jpg',
            'assets/img/portfolio/branding/Pure Smile/02.jpg',
            'assets/img/portfolio/branding/Pure Smile/03.jpg',
            'assets/img/portfolio/branding/Pure Smile/04.jpg',
            'assets/img/portfolio/branding/Pure Smile/05.jpg',
            'assets/img/portfolio/branding/Pure Smile/06.jpg',
            'assets/img/portfolio/branding/Pure Smile/07.jpg',
            'assets/img/portfolio/branding/Pure Smile/08.jpg',
            'assets/img/portfolio/branding/Pure Smile/09.jpg'
        ]
    },
    whitbuffalo: {
        title: 'هوية بصرية White Buffalo',
        images: [
            'assets/img/portfolio/branding/whit buffalo/01.png',
            'assets/img/portfolio/branding/whit buffalo/02.png',
            'assets/img/portfolio/branding/whit buffalo/03.png',
            'assets/img/portfolio/branding/whit buffalo/04.png',
            'assets/img/portfolio/branding/whit buffalo/05.png',
            'assets/img/portfolio/branding/whit buffalo/06.png',
            'assets/img/portfolio/branding/whit buffalo/07.png',
            'assets/img/portfolio/branding/whit buffalo/08.png',
            'assets/img/portfolio/branding/whit buffalo/09.png'
        ]
    },
    tamkeen: {
        title: 'هوية بصرية تمكين',
        images: [
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2_1.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2_2.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2_3.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2_4.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2_5.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2_6.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2_7.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2_8.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 2 copy.jpg',
            'assets/img/portfolio/branding/تمكين/تمكينArtboard 3.jpg'
        ]
    },
    masaha: {
        title: 'هوية بصرية مساحة بلاس',
        images: [
            'assets/img/portfolio/branding/مساحة بلاس/10.jpg',
            'assets/img/portfolio/branding/مساحة بلاس/20.jpg',
            'assets/img/portfolio/branding/مساحة بلاس/30.jpg',
            'assets/img/portfolio/branding/مساحة بلاس/40.jpg',
            'assets/img/portfolio/branding/مساحة بلاس/50.jpg',
            'assets/img/portfolio/branding/مساحة بلاس/60.jpg'
        ]
    },
    yaman: {
        title: 'هوية بصرية يمان',
        images: [
            'assets/img/portfolio/branding/يمان/01.jpg',
            'assets/img/portfolio/branding/يمان/02.jpg',
            'assets/img/portfolio/branding/يمان/03.jpg',
            'assets/img/portfolio/branding/يمان/04.jpg',
            'assets/img/portfolio/branding/يمان/05.jpg',
            'assets/img/portfolio/branding/يمان/06.jpg',
            'assets/img/portfolio/branding/يمان/07.jpg',
            'assets/img/portfolio/branding/يمان/11.jpg',
            'assets/img/portfolio/branding/يمان/BAG-C_side-A.jpg',
            'assets/img/portfolio/branding/يمان/BAG-C_side-A.jpg-111.jpg'
        ]
    },
    bison: {
        title: 'حملة دعائية لشركة بايسون',
        images: [
            'assets/img/portfolio/social/حملة دعائية لشركة بايسون/بوست-بايسون.jpg',
            'assets/img/portfolio/social/حملة دعائية لشركة بايسون/بوست-بايسون-2.jpg',
            'assets/img/portfolio/social/حملة دعائية لشركة بايسون/بوست-بايسون-4.jpg'
        ]
    },
    socialmix: {
        title: 'تصاميم سوشل ميديا متنوعة',
        images: [
            'assets/img/portfolio/social/منوعة/01 (2).png',
            'assets/img/portfolio/social/منوعة/01 (3).png',
            'assets/img/portfolio/social/منوعة/01 (4).png',
            'assets/img/portfolio/social/منوعة/01 (5).png',
            'assets/img/portfolio/social/منوعة/01 (6).png',
            'assets/img/portfolio/social/منوعة/01 (9).png',
            'assets/img/portfolio/social/منوعة/01 (10).png',
            'assets/img/portfolio/social/منوعة/01 (13).png',
            'assets/img/portfolio/social/منوعة/01 (14).png',
            'assets/img/portfolio/social/منوعة/01.jpg',
            'assets/img/portfolio/social/منوعة/بوست-02.png',
            'assets/img/portfolio/social/منوعة/سوق.jpg'
        ]
    }
};

function openPortfolioModal(projectId) {
    const modal = document.getElementById('portfolio-modal');
    const title = document.getElementById('modal-title');
    const gallery = document.getElementById('modal-gallery');
    
    const project = portfolioData[projectId];
    if (!project) return;
    
    title.textContent = project.title;
    gallery.innerHTML = '';
    
    project.images.forEach((imagePath, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'group relative bg-slate-700/30 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300';
        imageContainer.innerHTML = `
            <div class="aspect-[4/3] overflow-hidden">
                <img src="${imagePath}" alt="${project.title} - ${index + 1}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
            </div>
        `;
        gallery.appendChild(imageContainer);
    });
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Recreate icons
    lucide.createIcons();
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePortfolioModal();
    }
});

// Portfolio items animation on scroll
function initPortfolioItemsAnimation() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
    });
    
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.1 });
    
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9)';
        portfolioObserver.observe(item);
    });
}