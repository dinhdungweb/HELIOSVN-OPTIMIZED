/**
 * Tier Pricing - Product Page Override
 * Override theme's updatePrice function to preserve tier pricing
 */

(function() {
  'use strict';
  
  // Wait for theme to load
  document.addEventListener('DOMContentLoaded', function() {
    // Check if theme.Product exists
    if (typeof theme === 'undefined' || typeof theme.Product === 'undefined') {
      console.warn('Tier Pricing: theme.Product not found');
      return;
    }
    
    // Get customer tier info
    const tierWrapper = document.querySelector('.tier-pricing-wrapper');
    if (!tierWrapper) {
      console.log('Tier Pricing: No tier wrapper found');
      return;
    }
    
    const customerTier = tierWrapper.dataset.customerTier || '';
    const customerTotalSpent = parseFloat(tierWrapper.dataset.customerTotalSpent || 0);
    const tierDiscount = parseFloat(tierWrapper.dataset.tierDiscount || 0) / 100;
    
    console.log('Tier Pricing Override:', {
      tier: customerTier,
      totalSpent: customerTotalSpent,
      discount: tierDiscount
    });
    
    // Store original updatePrice function
    const originalUpdatePrice = theme.Product.prototype.updatePrice;
    
    // Override updatePrice function
    theme.Product.prototype.updatePrice = function(variant, $container) {
      const $priceArea = $container.find('.price-area');
      $priceArea.removeClass('on-sale');
      
      if (!variant) {
        $priceArea.html(`<span class="current-price">Không có sẵn</span>`);
        return;
      }
      
      // Calculate tier price
      const tierPrice = Math.round(variant.price * (1 - tierDiscount));
      const originalPrice = variant.price;
      const compareAtPrice = variant.compare_at_price;
      
      // Build new price HTML with tier pricing
      let priceHTML = '<div class="tier-pricing-wrapper" data-tier="' + customerTier + '">';
      
      // Tier badge
      if (tierDiscount > 0 && customerTier) {
        priceHTML += `
          <span class="tier-badge tier-badge--${customerTier.toLowerCase().replace(' ', '-')}">
            <svg class="tier-badge-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            -${Math.round(tierDiscount * 100)}% ${customerTier}
          </span>
        `;
      }
      
      priceHTML += '<div class="tier-pricing-prices">';
      
      // Compare at price (if on sale)
      if (compareAtPrice && compareAtPrice > originalPrice) {
        priceHTML += `<span class="tier-price-compare"><span class="theme-money">${theme.Shopify.formatMoney(compareAtPrice, theme.money_format_with_code_preference)}</span></span>`;
        $priceArea.addClass('on-sale');
      }
      
      // Original price (if tier discount)
      if (tierDiscount > 0) {
        priceHTML += `<span class="tier-price-original"><span class="theme-money">${theme.Shopify.formatMoney(originalPrice, theme.money_format_with_code_preference)}</span></span>`;
      }
      
      // Tier price
      const priceClass = tierDiscount > 0 ? 'tier-price-final tier-price-discounted' : 'tier-price-final';
      priceHTML += `<span class="${priceClass}"><span class="theme-money">${theme.Shopify.formatMoney(tierPrice, theme.money_format_with_code_preference)}</span></span>`;
      
      priceHTML += '</div>'; // close tier-pricing-prices
      
      // Unit price
      if (variant.unit_price_measurement) {
        priceHTML += `
          <div class="unit-price">
            <span class="unit-price__price theme-money">${theme.Shopify.formatMoney(variant.unit_price, theme.money_format)}</span>
            <span class="unit-price__separator">/</span>
            <span class="unit-price__unit">${variant.unit_price_measurement.reference_value}${variant.unit_price_measurement.reference_unit}</span>
          </div>
        `;
      }
      
      priceHTML += '</div>'; // close tier-pricing-wrapper
      
      // Update DOM
      $priceArea.html(priceHTML);
      
      console.log('Tier Pricing: Updated price for variant', variant.id, {
        original: originalPrice,
        tier: tierPrice,
        discount: tierDiscount
      });
    };
    
    console.log('Tier Pricing: Override installed successfully');
  });
  
})();
