/**
 * Lazy Load Products Handler
 * Optimizes product grid loading for better performance
 */
(function() {
  'use strict';

  if (!('IntersectionObserver' in window)) {
    return;
  }

  // Lazy load product images
  var imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var img = entry.target;
        
        // Load image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }

        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.01
  });

  // Lazy load product reviews
  var reviewObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var reviewContainer = entry.target;
        
        // Trigger review loading (if using Judge.me or similar)
        if (window.SPR || window.jdgm) {
          setTimeout(function() {
            if (window.SPR && window.SPR.initDomEls) {
              window.SPR.initDomEls();
            }
            if (window.jdgm && window.jdgm.customizeBadges) {
              window.jdgm.customizeBadges();
            }
          }, 100);
        }

        reviewObserver.unobserve(reviewContainer);
      }
    });
  }, {
    rootMargin: '100px',
    threshold: 0.01
  });

  // Lazy load add to cart functionality
  var addToCartObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var button = entry.target;
        button.classList.add('interactive');
        addToCartObserver.unobserve(button);
      }
    });
  }, {
    rootMargin: '150px',
    threshold: 0.01
  });

  function initLazyProducts() {
    // Lazy load images
    var lazyImages = document.querySelectorAll('.product-block img[data-src], .product-block img[loading="lazy"]');
    lazyImages.forEach(function(img) {
      // Skip first 4 products (above the fold)
      var productBlock = img.closest('.product-block');
      if (productBlock) {
        var allProducts = document.querySelectorAll('.product-block');
        var index = Array.prototype.indexOf.call(allProducts, productBlock);
        
        if (index < 4) {
          // Load immediately for first 4 products
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          img.classList.add('loaded');
        } else {
          // Lazy load for others
          imageObserver.observe(img);
        }
      }
    });

    // Lazy load reviews
    var reviewContainers = document.querySelectorAll('.product-block .rating, .product-block [class*="review"]');
    reviewContainers.forEach(function(container) {
      reviewObserver.observe(container);
    });

    // Lazy load add to cart buttons
    var addToCartButtons = document.querySelectorAll('.product-block .add-to-cart-btn, .product-block [data-add-to-cart]');
    addToCartButtons.forEach(function(button) {
      var productBlock = button.closest('.product-block');
      if (productBlock) {
        var allProducts = document.querySelectorAll('.product-block');
        var index = Array.prototype.indexOf.call(allProducts, productBlock);
        
        if (index >= 4) {
          addToCartObserver.observe(button);
        } else {
          button.classList.add('interactive');
        }
      }
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyProducts);
  } else {
    initLazyProducts();
  }

  // Re-initialize for dynamically loaded content
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      setTimeout(initLazyProducts, 100);
    });
  }

  // Handle infinite scroll or load more
  document.addEventListener('products:loaded', initLazyProducts);
})();
