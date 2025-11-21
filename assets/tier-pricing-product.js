/**
 * Tier Pricing - Product Page Handler
 * Updates tier pricing when variant changes
 */

(function() {
  'use strict';
  
  // Get customer tier info from page
  const customerTier = document.querySelector('[data-customer-tier]')?.dataset.customerTier || '';
  const customerTotalSpent = parseFloat(document.querySelector('[data-customer-total-spent]')?.dataset.customerTotalSpent || 0);
  
  // Tier discount mapping
  const tierDiscounts = {
    'BLACK DIAMOND': 0.20,
    'DIAMOND': 0.15,
    'PLATINUM': 0.12,
    'GOLD': 0.10,
    'SILVER': 0.07,
    'MEMBER': 0.05
  };
  
  // Calculate tier based on total_spent
  function calculateTier(totalSpent) {
    if (totalSpent >= 100000000) return { name: 'BLACK DIAMOND', discount: 0.20 };
    if (totalSpent >= 20000000) return { name: 'DIAMOND', discount: 0.15 };
    if (totalSpent >= 10000000) return { name: 'PLATINUM', discount: 0.12 };
    if (totalSpent >= 6000000) return { name: 'GOLD', discount: 0.10 };
    if (totalSpent >= 3000000) return { name: 'SILVER', discount: 0.07 };
    return { name: 'MEMBER', discount: 0.05 };
  }
  
  // Get current tier
  let currentTier = customerTier ? 
    { name: customerTier, discount: tierDiscounts[customerTier] || 0 } :
    calculateTier(customerTotalSpent);
  
  // Format price in VND
  function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(price)) + ' VND';
  }
  
  // Update tier pricing display
  function updateTierPricing(variantPrice, compareAtPrice) {
    const priceArea = document.querySelector('.price-area');
    if (!priceArea) return;
    
    const tierPricingWrapper = priceArea.querySelector('.tier-pricing-wrapper');
    if (!tierPricingWrapper) return;
    
    // Calculate tier price
    const tierPrice = variantPrice * (1 - currentTier.discount);
    
    // Update badge
    const badge = tierPricingWrapper.querySelector('.tier-badge');
    if (badge && currentTier.discount > 0) {
      badge.innerHTML = `
        <svg class="tier-badge-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
        -${Math.round(currentTier.discount * 100)}% ${currentTier.name}
      `;
    }
    
    // Update prices
    const pricesContainer = tierPricingWrapper.querySelector('.tier-pricing-prices');
    if (pricesContainer) {
      let pricesHTML = '';
      
      // Original price (if tier discount)
      if (currentTier.discount > 0) {
        pricesHTML += `
          <span class="tier-price-original">
            <span class="theme-money">${formatPrice(variantPrice)}</span>
          </span>
        `;
      }
      
      // Tier price
      pricesHTML += `
        <span class="tier-price-final ${currentTier.discount > 0 ? 'tier-price-discounted' : ''}">
          <span class="theme-money">${formatPrice(tierPrice)}</span>
        </span>
      `;
      
      // Compare at price (if on sale)
      if (compareAtPrice && compareAtPrice > variantPrice) {
        pricesHTML += `
          <span class="tier-price-compare">
            <span class="theme-money">${formatPrice(compareAtPrice)}</span>
          </span>
        `;
      }
      
      pricesContainer.innerHTML = pricesHTML;
    }
  }
  
  // Listen for variant change events
  document.addEventListener('DOMContentLoaded', function() {
    // Shopify variant selector
    const variantSelects = document.querySelectorAll('select[name="id"], input[name="id"]');
    
    variantSelects.forEach(select => {
      select.addEventListener('change', function() {
        const variantId = this.value;
        
        // Get variant data from Shopify
        if (window.ShopifyAnalytics && window.ShopifyAnalytics.meta && window.ShopifyAnalytics.meta.product) {
          const product = window.ShopifyAnalytics.meta.product;
          const variant = product.variants.find(v => v.id == variantId);
          
          if (variant) {
            updateTierPricing(variant.price / 100, variant.compare_at_price ? variant.compare_at_price / 100 : null);
          }
        }
      });
    });
    
    // Also listen for custom variant change events (if theme uses them)
    document.addEventListener('variant:change', function(e) {
      if (e.detail && e.detail.variant) {
        const variant = e.detail.variant;
        updateTierPricing(variant.price / 100, variant.compare_at_price ? variant.compare_at_price / 100 : null);
      }
    });
  });
  
  // Export for debugging
  window.TierPricing = {
    currentTier: currentTier,
    updateTierPricing: updateTierPricing,
    formatPrice: formatPrice
  };
  
})();
