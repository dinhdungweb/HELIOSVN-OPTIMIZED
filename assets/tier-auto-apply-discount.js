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
  
  // Intercept checkout buttons
  function interceptCheckoutButtons() {
    const tierInfo = getTierInfo();
    if (!tierInfo || !tierInfo.hasCustomer || tierInfo.discount === 0) {
      return; // Không có tier hoặc không đăng nhập
    }
    
    const discountCode = getDiscountCode(tierInfo.tier);
    if (!discountCode) {
      console.log('Tier Auto Discount: No discount code for tier', tierInfo.tier);
      return;
    }
    
    console.log('Tier Auto Discount: Will apply code', discountCode, 'for tier', tierInfo.tier);
    
    // 1. Intercept "Checkout" buttons (cart page, drawer)
    document.addEventListener('click', function(e) {
      const checkoutBtn = e.target.closest('[name="checkout"], .checkout-button, [href*="/checkout"]');
      if (checkoutBtn) {
        e.preventDefault();
        const checkoutUrl = addDiscountToUrl('/checkout', discountCode);
        window.location.href = checkoutUrl;
      }
    }, true);
    
    // 2. Intercept dynamic checkout buttons (Buy Now)
    // Shopify's dynamic checkout buttons use iframes, so we need to modify the form action
    const productForm = document.querySelector('form[action*="/cart/add"]');
    if (productForm) {
      // Store discount code in session storage for use after redirect
      sessionStorage.setItem('tier_discount_code', discountCode);
      
      // Listen for form submit
      productForm.addEventListener('submit', function(e) {
        const submitButton = e.submitter;
        
        // Check if it's a "Buy Now" button (dynamic checkout)
        if (submitButton && submitButton.name === 'checkout') {
          // Let Shopify handle the add to cart + redirect
          // But store the discount code for the checkout page
          sessionStorage.setItem('tier_discount_code', discountCode);
        }
      });
    }
    
    // 3. If we're on checkout page and have stored discount code, apply it
    if (window.location.pathname.includes('/checkout')) {
      const storedCode = sessionStorage.getItem('tier_discount_code');
      if (storedCode && !window.location.search.includes('discount=')) {
        sessionStorage.removeItem('tier_discount_code');
        window.location.href = addDiscountToUrl(window.location.href, storedCode);
      }
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', interceptCheckoutButtons);
  } else {
    interceptCheckoutButtons();
  }
  
})();
