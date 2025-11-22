/**
 * Tier Pricing - Apply Discount via Cart Attributes
 * Lưu discount code vào cart attributes, sau đó apply khi checkout
 */

(function() {
  'use strict';
  
  // Lấy tier discount code
  function getTierDiscountCode() {
    const wrapper = document.querySelector('.tier-pricing-wrapper');
    if (!wrapper) return null;
    
    const tierName = wrapper.dataset.tier || '';
    const hasCustomer = wrapper.dataset.hasCustomer === 'true';
    const discount = parseFloat(wrapper.dataset.tierDiscount || 0);
    
    if (!hasCustomer || discount === 0 || !tierName) {
      return null;
    }
    
    // Get discount code from settings
    const discountCodes = window.tierDiscountCodes || {};
    return discountCodes[tierName] || null;
  }
  
  // Update cart with discount code attribute
  function updateCartWithDiscount(discountCode) {
    if (!discountCode) return;
    
    console.log('Tier Discount: Updating cart with code', discountCode);
    
    fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attributes: {
          'tier_discount_code': discountCode
        }
      })
    })
    .then(response => response.json())
    .then(cart => {
      console.log('Tier Discount: Cart updated', cart);
      sessionStorage.setItem('tier_discount_code', discountCode);
    })
    .catch(error => {
      console.error('Tier Discount: Error updating cart', error);
    });
  }
  
  // Redirect to checkout with discount
  function redirectToCheckoutWithDiscount(discountCode) {
    const checkoutUrl = '/checkout?discount=' + encodeURIComponent(discountCode);
    console.log('Tier Discount: Redirecting to', checkoutUrl);
    window.location.href = checkoutUrl;
  }
  
  // Initialize
  function init() {
    const discountCode = getTierDiscountCode();
    if (!discountCode) {
      console.log('Tier Discount: No discount code available');
      return;
    }
    
    console.log('Tier Discount: Code available', discountCode);
    
    // Update cart on page load
    updateCartWithDiscount(discountCode);
    
    // Intercept checkout process
    document.addEventListener('click', function(e) {
      // Check for checkout buttons
      const target = e.target.closest('button[name="checkout"], a[href*="/checkout"], .checkout-button, input[type="submit"][name="checkout"]');
      
      if (target) {
        console.log('Tier Discount: Checkout button clicked');
        e.preventDefault();
        e.stopPropagation();
        
        // Redirect with discount
        redirectToCheckoutWithDiscount(discountCode);
        return false;
      }
    }, true);
    
    // Also intercept via form submit
    document.addEventListener('submit', function(e) {
      const form = e.target;
      
      // Check if form is going to checkout
      if (form.action && (form.action.includes('/checkout') || form.querySelector('[name="checkout"]'))) {
        console.log('Tier Discount: Form submit to checkout intercepted');
        e.preventDefault();
        e.stopPropagation();
        
        // If it's add to cart form, let it submit first then redirect
        if (form.action.includes('/cart/add')) {
          const formData = new FormData(form);
          
          fetch(form.action, {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            console.log('Tier Discount: Item added to cart', data);
            // Update cart with discount
            updateCartWithDiscount(discountCode);
            // Redirect to checkout
            setTimeout(() => {
              redirectToCheckoutWithDiscount(discountCode);
            }, 500);
          })
          .catch(error => {
            console.error('Tier Discount: Error adding to cart', error);
            // Fallback: redirect anyway
            redirectToCheckoutWithDiscount(discountCode);
          });
        } else {
          redirectToCheckoutWithDiscount(discountCode);
        }
        
        return false;
      }
    }, true);
    
    // If on checkout page, apply discount from session
    if (window.location.pathname.includes('/checkout')) {
      const storedCode = sessionStorage.getItem('tier_discount_code');
      if (storedCode && !window.location.search.includes('discount=')) {
        console.log('Tier Discount: Applying stored code on checkout');
        redirectToCheckoutWithDiscount(storedCode);
      }
    }
  }
  
  // Wait for DOM and tier info
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Delay to ensure tier-pricing-wrapper is rendered
    setTimeout(init, 500);
  }
  
})();
