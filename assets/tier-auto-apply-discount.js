/**
 * Tier Pricing - Auto Apply Discount Code
 * Tự động áp dụng mã giảm giá khi checkout
 */

(function() {
  'use strict';
  
  // Lấy tier info từ data attributes
  function getTierInfo() {
    const wrapper = document.querySelector('.tier-pricing-wrapper');
    if (!wrapper) return null;
    
    return {
      tier: wrapper.dataset.tier || '',
      discount: parseFloat(wrapper.dataset.tierDiscount || 0),
      hasCustomer: wrapper.dataset.hasCustomer === 'true'
    };
  }
  
  // Lấy discount code từ settings (sẽ được inject từ Liquid)
  function getDiscountCode(tierName) {
    // Mapping tier name to discount code from theme settings
    const discountCodes = window.tierDiscountCodes || {};
    return discountCodes[tierName] || '';
  }
  
  // Thêm discount code vào checkout URL
  function addDiscountToUrl(url, discountCode) {
    if (!discountCode) return url;
    
    try {
      const urlObj = new URL(url, window.location.origin);
      urlObj.searchParams.set('discount', discountCode);
      return urlObj.toString();
    } catch (e) {
      // Fallback: thêm query string thủ công
      const separator = url.includes('?') ? '&' : '?';
      return url + separator + 'discount=' + encodeURIComponent(discountCode);
    }
  }
  
  // Apply discount to checkout
  function applyDiscountToCheckout() {
    const tierInfo = getTierInfo();
    if (!tierInfo || !tierInfo.hasCustomer || tierInfo.discount === 0) {
      console.log('Tier Auto Discount: No tier info or not logged in');
      return;
    }
    
    const discountCode = getDiscountCode(tierInfo.tier);
    if (!discountCode) {
      console.log('Tier Auto Discount: No discount code for tier', tierInfo.tier);
      console.log('Available codes:', window.tierDiscountCodes);
      return;
    }
    
    console.log('Tier Auto Discount: Applying code', discountCode, 'for tier', tierInfo.tier);
    
    // Store discount code globally
    window.tierDiscountCode = discountCode;
    
    // 1. Modify all checkout links
    function modifyCheckoutLinks() {
      document.querySelectorAll('a[href*="/checkout"], [href*="/cart"]').forEach(link => {
        const url = link.href;
        if (url && !url.includes('discount=')) {
          link.href = addDiscountToUrl(url, discountCode);
        }
      });
    }
    
    // 2. Intercept form submissions
    document.addEventListener('submit', function(e) {
      const form = e.target;
      
      // Product form with Buy Now button
      if (form.action && form.action.includes('/cart/add')) {
        // Store for later use
        sessionStorage.setItem('tier_discount_code', discountCode);
        console.log('Tier Auto Discount: Stored code for Buy Now redirect');
      }
    }, true);
    
    // 3. Intercept checkout button clicks
    document.addEventListener('click', function(e) {
      const target = e.target.closest('button, a, input[type="submit"]');
      if (!target) return;
      
      // Check if it's a checkout button
      const isCheckoutBtn = target.name === 'checkout' || 
                           target.classList.contains('checkout-button') ||
                           (target.href && target.href.includes('/checkout'));
      
      if (isCheckoutBtn) {
        console.log('Tier Auto Discount: Checkout button clicked');
        sessionStorage.setItem('tier_discount_code', discountCode);
        
        // If it's a link, modify href
        if (target.href && !target.href.includes('discount=')) {
          e.preventDefault();
          window.location.href = addDiscountToUrl(target.href, discountCode);
        }
      }
    }, true);
    
    // 4. Modify checkout links periodically (for dynamic content)
    modifyCheckoutLinks();
    setInterval(modifyCheckoutLinks, 1000);
    
    // 5. If we're on checkout page, apply stored code
    if (window.location.pathname.includes('/checkout') || 
        window.location.pathname.includes('/cart')) {
      const storedCode = sessionStorage.getItem('tier_discount_code');
      if (storedCode && !window.location.search.includes('discount=')) {
        console.log('Tier Auto Discount: Applying stored code on checkout page');
        sessionStorage.removeItem('tier_discount_code');
        window.location.href = addDiscountToUrl(window.location.href, storedCode);
      }
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDiscountToCheckout);
  } else {
    applyDiscountToCheckout();
  }
  
})();
