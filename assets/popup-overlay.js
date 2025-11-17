/**
 * Popup Overlay Handler - Lazy Loaded
 * Optimized for performance - loads after page interaction or delay
 */
(function() {
  'use strict';

  var popupInitialized = false;
  var popupStylesLoaded = false;

  function loadPopupStyles() {
    if (popupStylesLoaded) return;
    popupStylesLoaded = true;

    // Inject styles directly to avoid MIME type issues
    var style = document.createElement('style');
    style.textContent = `
      .popup-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);z-index:9999;align-items:center;justify-content:center;opacity:0;transition:opacity .3s ease}
      .popup-overlay.active{display:flex;opacity:1}
      .popup-container{position:relative;max-width:600px;width:90%;background:#1a1a1a;border-radius:8px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.5);min-height:650px;display:flex;flex-direction:column;justify-content:space-between;transform:scale(.9);transition:transform .3s ease}
      .popup-overlay.active .popup-container{transform:scale(1)}
      .popup-image{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1}
      .popup-container::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to bottom,rgba(0,0,0,.3) 0%,rgba(0,0,0,.8) 100%);z-index:2}
      .popup-content{position:relative;z-index:3;padding:50px 40px;text-align:center;color:#fff;display:flex;flex-direction:column;justify-content:space-between;min-height:650px}
      .popup-text-wrapper{margin-bottom:auto}
      .popup-title{margin-bottom:20px;line-height:1.3;text-transform:uppercase;letter-spacing:1.5px;text-shadow:2px 2px 4px rgba(0,0,0,.5)}
      .popup-description{font-size:15px;line-height:1.8;margin-bottom:0;color:#fff;max-width:500px;margin-left:auto;margin-right:auto;text-shadow:1px 1px 3px rgba(0,0,0,.5)}
      .popup-cta-wrapper{margin-top:auto;padding-top:30px}
      .popup-cta{display:inline-block;background:#f5a623;color:#1a1a1a;padding:15px 40px;font-size:14px;font-weight:bold;text-transform:uppercase;text-decoration:none;border-radius:4px;transition:all .3s ease;letter-spacing:1px;cursor:pointer}
      .popup-cta:hover{background:#e09615;transform:translateY(-2px);box-shadow:0 5px 15px rgba(245,166,35,.4)}
      .popup-close{position:absolute;top:15px;right:15px;width:35px;height:35px;border:none;background:rgba(255,255,255,.1);border-radius:5px;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s ease;z-index:10}
      .popup-close:hover{background:rgba(255,255,255,.2);transform:rotate(90deg)}
      @media (max-width:768px){
        .popup-container{width:95%;max-width:450px;min-height:500px}
        .popup-content{padding:40px 25px;min-height:500px}
        .popup-description{font-size:13px;line-height:1.7}
        .popup-cta{padding:12px 30px;font-size:13px}
      }
    `;
    document.head.appendChild(style);
  }

  function initPopup() {
    if (popupInitialized) return;
    popupInitialized = true;

    // Load styles first
    loadPopupStyles();

    var popups = document.querySelectorAll('.popup-overlay');
    
    popups.forEach(function(popup) {
      var delay = parseInt(popup.getAttribute('data-popup-delay')) || 5000;
      var showOnce = popup.getAttribute('data-popup-show-once') === 'true';
      var popupId = popup.id;

      // Check if popup was already shown
      if (showOnce && localStorage.getItem('popupShown_' + popupId)) {
        return;
      }

      // Load popup image lazily
      var popupImage = popup.querySelector('.popup-image');
      if (popupImage) {
        var imageSrc = popupImage.getAttribute('data-popup-image');
        if (imageSrc) {
          popupImage.src = imageSrc;
          popupImage.removeAttribute('data-popup-image');
        }
      }

      // Show popup after delay
      setTimeout(function() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
      }, delay);

      // Close button handler
      var closeBtn = popup.querySelector('[data-popup-close]');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          closePopup(popup, popupId, showOnce);
        });
      }

      // Close when clicking outside
      popup.addEventListener('click', function(e) {
        if (e.target === popup) {
          closePopup(popup, popupId, showOnce);
        }
      });

      // Close with ESC key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
          closePopup(popup, popupId, showOnce);
        }
      });
    });
  }

  function closePopup(popup, popupId, showOnce) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
    
    // Save to localStorage if show once is enabled
    if (showOnce) {
      localStorage.setItem('popupShown_' + popupId, 'true');
    }
  }

  // Initialize popup after user interaction or after delay
  var interactionEvents = ['mousedown', 'touchstart', 'scroll', 'keydown'];
  var interactionTimeout;

  function handleInteraction() {
    clearTimeout(interactionTimeout);
    interactionTimeout = setTimeout(function() {
      initPopup();
      // Remove event listeners after initialization
      interactionEvents.forEach(function(event) {
        document.removeEventListener(event, handleInteraction);
      });
    }, 100);
  }

  // Wait for page load
  if (document.readyState === 'complete') {
    // Add interaction listeners
    interactionEvents.forEach(function(event) {
      document.addEventListener(event, handleInteraction, { passive: true, once: true });
    });

    // Fallback: init after 3 seconds if no interaction
    setTimeout(function() {
      if (!popupInitialized) {
        initPopup();
      }
    }, 3000);
  } else {
    window.addEventListener('load', function() {
      // Add interaction listeners
      interactionEvents.forEach(function(event) {
        document.addEventListener(event, handleInteraction, { passive: true, once: true });
      });

      // Fallback: init after 3 seconds if no interaction
      setTimeout(function() {
        if (!popupInitialized) {
          initPopup();
        }
      }, 3000);
    });
  }

  // Handle Shopify theme editor
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.detail.sectionId.indexOf('popup') > -1) {
        popupInitialized = false;
        setTimeout(initPopup, 100);
      }
    });
  }
})();
