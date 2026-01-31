// MATRIS Website V2 - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Shop Navigation - Show on Scroll
  const shopNav = document.querySelector('.shop-navigation');
  if (shopNav) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 200) {
        shopNav.classList.add('shop-navigation--visible');
      } else {
        shopNav.classList.remove('shop-navigation--visible');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  // Video Autoplay Fix for Safari/iOS
  const heroVideo = document.querySelector('.hero-video-landing__player');
  if (heroVideo) {
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Video autoplay prevented:', error);
      });
    }
    
    heroVideo.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    });
  }
  
  // Smooth Scroll for All Links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
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
        }
      }
    });
  });
  
  // Product Image Gallery
  const productThumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImage = document.querySelector('.product-main-image img');
  
  if (productThumbnails.length && mainImage) {
    productThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        // Remove active class from all thumbnails
        productThumbnails.forEach(t => t.classList.remove('product-thumbnail--active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('product-thumbnail--active');
        
        // Update main image
        const newImageSrc = this.querySelector('img').src;
        mainImage.src = newImageSrc;
      });
    });
  }
  
  // Size Selector
  const sizeOptions = document.querySelectorAll('.size-option');
  
  if (sizeOptions.length) {
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        if (!this.classList.contains('size-option--disabled')) {
          // Remove selected class from all options
          sizeOptions.forEach(opt => opt.classList.remove('size-option--selected'));
          
          // Add selected class to clicked option
          this.classList.add('size-option--selected');
        }
      });
    });
  }
  
  // Quantity Controls
  const quantityDecrease = document.querySelector('.quantity-btn--decrease');
  const quantityIncrease = document.querySelector('.quantity-btn--increase');
  const quantityInput = document.querySelector('.quantity-input');
  
  if (quantityDecrease && quantityIncrease && quantityInput) {
    quantityDecrease.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    quantityIncrease.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
  }
  
  // Product Details Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length) {
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const item = this.parentElement;
        const isOpen = item.classList.contains('accordion-item--open');
        
        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(accItem => {
          accItem.classList.remove('accordion-item--open');
        });
        
        // Toggle clicked item
        if (!isOpen) {
          item.classList.add('accordion-item--open');
        }
      });
    });
  }
  
  // Add to Cart Button
  const addToCartBtn = document.querySelector('.product-cta');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      // Check if size is selected
      const selectedSize = document.querySelector('.size-option--selected');
      
      if (!selectedSize) {
        alert('Please select a size');
        return;
      }
      
      // Add to cart logic here
      const originalText = this.textContent;
      this.textContent = 'ADDED TO CART';
      this.style.background = 'var(--color-teal)';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = 'var(--color-vermillion)';
      }, 2000);
    });
  }
  
  // Lazy Load Images
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
});

// Smooth Scroll Snap for Full-Page Collections
if (window.location.pathname.includes('/shop')) {
  document.body.style.scrollSnapType = 'y mandatory';
  const collections = document.querySelectorAll('.collection-fullpage');
  collections.forEach(collection => {
    collection.style.scrollSnapAlign = 'start';
  });
}
