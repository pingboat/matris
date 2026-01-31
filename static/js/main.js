// MATRIS Website - Main JavaScript

// Navigation Toggle for Mobile
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.navigation__toggle');
  const navMenu = document.querySelector('.navigation__menu');
  const navigation = document.querySelector('.navigation');
  
  // Mobile Menu Toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('navigation__menu--active');
      
      // Animate hamburger icon
      const spans = navToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (navMenu.classList.contains('navigation__menu--active')) {
          if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
          span.style.transform = '';
          span.style.opacity = '';
        }
      });
    });
  }
  
  // Transparent Navigation on Scroll
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 100) {
      navigation.classList.add('navigation--transparent');
    } else {
      navigation.classList.remove('navigation--transparent');
    }
    
    lastScroll = currentScroll;
  });
  
  // Smooth Scroll for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile menu if open
          if (navMenu.classList.contains('navigation__menu--active')) {
            navMenu.classList.remove('navigation__menu--active');
          }
        }
      }
    });
  });
  
  // Hide scroll indicator after scrolling
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    });
  }
  
  // Newsletter Form Handling
  const newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Here you would typically send this to your backend
      // For now, just show a success message
      alert('Thank you for subscribing! Welcome to the MATRIS Circle.');
      emailInput.value = '';
    });
  }
  
  // Lazy Load Images (simple implementation)
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Video Autoplay Fix for Safari/iOS
  const heroVideo = document.querySelector('.hero-video__player');
  if (heroVideo) {
    // Attempt to play video (necessary for some browsers)
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Auto-play was prevented
        console.log('Video autoplay prevented:', error);
        // You could show a play button here if needed
      });
    }
    
    // Ensure video loops seamlessly
    heroVideo.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    });
  }
});

// Active Navigation Link Highlighting
window.addEventListener('load', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navigation__link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath.startsWith(linkPath) && linkPath !== '/')) {
      link.classList.add('navigation__link--active');
    }
  });
});
