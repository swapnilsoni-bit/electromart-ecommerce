// ============================================
// DOM Elements
// ============================================
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const loadingSpinner = document.getElementById('loadingSpinner');
const searchInput = document.getElementById('searchInput');

// ============================================
// Sidebar Functionality
// ============================================
function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// ============================================
// Loading Spinner
// ============================================
window.addEventListener('load', () => {
    loadingSpinner.classList.remove('active');
});

// Show loading on page navigation
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
            loadingSpinner.classList.add('active');
        }
    });
});

// ============================================
// Search Functionality
// ============================================
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const searchTerm = e.target.value.toLowerCase();
    
    searchTimeout = setTimeout(() => {
        if (searchTerm.length >= 2) {
            console.log('Searching for:', searchTerm);
            // Add your search logic here
        }
    }, 500);
});

// ============================================
// Add to Cart Functionality
// ============================================
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Increment cart count
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Button animation
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Added!';
        this.style.background = '#28a745';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
        }, 2000);
        
        // Create floating animation
        const productCard = this.closest('.product-card');
        const productImage = productCard.querySelector('.product-image img');
        const rect = productImage.getBoundingClientRect();
        const cartIcon = document.querySelector('.cart-item');
        const cartRect = cartIcon.getBoundingClientRect();
        
        const flyingImg = document.createElement('img');
        flyingImg.src = productImage.src;
        flyingImg.style.cssText = `
            position: fixed;
            left: ${rect.left}px;
            top: ${rect.top}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            z-index: 9999;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
        `;
        document.body.appendChild(flyingImg);
        
        setTimeout(() => {
            flyingImg.style.left = cartRect.left + 'px';
            flyingImg.style.top = cartRect.top + 'px';
            flyingImg.style.width = '0px';
            flyingImg.style.height = '0px';
            flyingImg.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            flyingImg.remove();
        }, 850);
    });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Sticky Header Effect
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Newsletter Form Handling
// ============================================
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = document.querySelector('.newsletter-input');
const newsletterBtn = document.querySelector('.newsletter-btn');

if (newsletterForm) {
    newsletterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = newsletterInput.value.trim();
        
        if (email && validateEmail(email)) {
            newsletterBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            newsletterBtn.style.background = '#28a745';
            newsletterInput.value = '';
            
            setTimeout(() => {
                newsletterBtn.innerHTML = 'Subscribe';
                newsletterBtn.style.background = '';
            }, 3000);
        } else {
            newsletterInput.style.borderColor = '#dc3545';
            setTimeout(() => {
                newsletterInput.style.borderColor = '';
            }, 2000);
        }
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// Quick View Modal (Placeholder)
// ============================================
document.querySelectorAll('.quick-view-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Quick view clicked');
        // Add modal logic here
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================
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

document.querySelectorAll('.product-card, .category-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Wishlist Functionality
// ============================================
document.querySelectorAll('.action-item').forEach(item => {
    if (item.querySelector('.fa-heart')) {
        item.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#dc3545';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    }
});

console.log('ElectroMart - Website loaded successfully! 🚀');
