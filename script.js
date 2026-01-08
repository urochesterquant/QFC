// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  // Theme labels are handled by CSS display properties
  // No icon update needed
}

// Smooth scrolling for hash links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#hero') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without triggering scroll
      history.pushState(null, null, href);
    }
  });
});

// Scrollspy: Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const navHeight = document.getElementById('nav').offsetHeight;
  const scrollPosition = window.scrollY + navHeight + 100;
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });
  
  // Handle hero section (top of page)
  if (window.scrollY < 100) {
    currentSection = 'hero';
  }
  
  navLinks.forEach(link => {
    link.classList.remove('nav-link-active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}` || (currentSection === 'hero' && (href === '#hero' || href === '#'))) {
      link.classList.add('nav-link-active');
    }
  });
}

// Update active nav on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateActiveNavLink, 10);
});

// Update active nav on page load
updateActiveNavLink();

// Handle hash on page load
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      const navHeight = document.getElementById('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
  updateActiveNavLink();
});

// Keyboard Navigation for Navbar
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('themeToggle');
  
  // Make nav links keyboard accessible
  navLinks.forEach((link, index) => {
    // Ensure links are focusable
    if (!link.hasAttribute('tabindex')) {
      link.setAttribute('tabindex', '0');
    }
    
    // Handle Enter and Space key presses
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
      
      // Arrow key navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextLink = navLinks[index + 1] || navLinks[0];
        nextLink.focus();
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
        prevLink.focus();
      }
      
      // Home key goes to first link
      if (e.key === 'Home') {
        e.preventDefault();
        navLinks[0].focus();
      }
      
      // End key goes to last link
      if (e.key === 'End') {
        e.preventDefault();
        navLinks[navLinks.length - 1].focus();
      }
    });
  });
  
  // Theme toggle keyboard support
  if (themeToggle) {
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }
});

// Navbar Background on Scroll
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      // Add fade-in-up class for additional animation support
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Observe timeline items with staggered animation
document.querySelectorAll('.timeline-item').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// Observe event cards with staggered animation
document.querySelectorAll('.event-card').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// Observe sponsors grid
const sponsorsGrid = document.querySelector('.sponsors-grid');
if (sponsorsGrid) {
  sponsorsGrid.style.opacity = '0';
  sponsorsGrid.style.transform = 'translateY(20px)';
  sponsorsGrid.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(sponsorsGrid);
}

// Observe curriculum week cards with staggered animation
document.querySelectorAll('.week-card').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// Observe join page elements
document.querySelectorAll('.step-card, .tier-card, .committee-card, .form-section, .faq-item').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// Observe capstone page elements
document.querySelectorAll('.overview-item, .info-card, .track-card, .deliverable-item, .rubric-item, .example-card, .gallery-item, .starter-kit-card').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// Observe sponsors page elements
document.querySelectorAll('.pitch-card, .sponsor-tier-card, .benefit-item, .sponsor-form').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// Observe all new page elements
document.querySelectorAll('.approach-item, .value-card, .stat-card, .resource-category, .tool-category, .reading-category, .team-member, .quick-link-card').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// Hero background animation is handled entirely by CSS
// No JavaScript needed for the breathing effect

