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
    
    console.log('Tier Auto Discount: Will apply code', discountCode, 'for tier', tierInfo.tier);
    
    // Store discount code for use across pages
    sessionStorage.setItem('tier_discount_code', discountCode);
    window.tierDiscountCode = discountCode;
    
    // 1. Intercept ALL form submissions (including Buy Now)
    document.addEventListener('submit', function(e) {
      const form = e.target;
      
      if (form.action && form.action.includes('/cart/add')) {
        console.log('Tier Auto Discount: Form submit intercepted, storing code');
        sessionStorage.setItem('tier_discount_code', discountCode);
        
        // Add hidden input with discount code
        const existingInput = form.querySelector('input[name="discount"]');
        if (!existingInput) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'return_to';
          input.value = '/checkout?discount=' + encodeURIComponent(discountCode);
          form.appendChild(input);
          console.log('Tier Auto Discount: Added return_to with discount to form');
        }
      }
    }, true);
    
    // 2. Modify product forms on page load
    const productForms = document.querySelectorAll('form[action*="/cart/add"]');
    productForms.forEach(form => {
      // Add hidden input for return_to
      const existingInput = form.querySelector('input[name="return_to"]');
      if (!existingInput) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'return_to';
        input.value = '/checkout?discount=' + encodeURIComponent(discountCode);
        form.appendChild(input);
        console.log('Tier Auto Discount: Added return_to to product form');
      }
    });
    
    // 3. Intercept checkout links
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href*="/checkout"]');
      if (link && !link.href.includes('discount=')) {
        e.preventDefault();
        const newUrl = addDiscountToUrl(link.href, discountCode);
        console.log('Tier Auto Discount: Redirecting to', newUrl);
        window.location.href = newUrl;
      }
    }, true);
    
    // 4. If on cart/checkout page, apply stored code
    if (window.location.pathname.includes('/checkout') || window.location.pathname.includes('/cart')) {
      const storedCode = sessionStorage.getItem('tier_discount_code');
      if (storedCode && !window.location.search.includes('discount=')) {
        console.log('Tier Auto Discount: Applying stored code', storedCode);
        const newUrl = addDiscountToUrl(window.location.href, storedCode);
        window.location.replace(newUrl);
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
