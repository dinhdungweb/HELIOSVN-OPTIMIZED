/**
 * Tier Pricing - Product Page Override
 * Prevent theme.js from overriding tier pricing
 */

(function() {
  'use strict';
  
  // Get tier info from initial render
  let tierInfo = {
    tier: '',
    discount: 0,
    totalSpent: 0,
    extracted: false
  };
  
  // Function to extract tier info
  function extractTierInfo() {
    const tierWrapper = document.querySelector('.tier-pricing-wrapper');
    if (tierWrapper) {
      tierInfo.tier = tierWrapper.dataset.customerTier || '';
      tierInfo.discount = parseFloat(tierWrapper.dataset.tierDiscount || 0) / 100;
      tierInfo.totalSpent = parseFloat(tierWrapper.dataset.customerTotalSpent || 0);
      tierInfo.extracted = true;
      console.log('Tier Pricing: Extracted tier info', tierInfo);
      return true;
    } else {
      console.log('Tier Pricing: tier-pricing-wrapper not found yet');
      return false;
    }
  }
  
  // Try to extract tier info multiple times
  function tryExtractTierInfo(attempts = 0) {
    if (extractTierInfo()) {
      return true;
    }
    
    if (attempts < 10) {
      setTimeout(() => tryExtractTierInfo(attempts + 1), 100);
    } else {
      console.warn('Tier Pricing: Failed to extract tier info after 10 attempts');
    }
    return false;
  }
  
  // Start extraction
  tryExtractTierInfo();
  
  // Function to rebuild tier pricing HTML
  function buildTierPricingHTML(variant) {
    if (!variant) return '<span class="current-price">Không có sẵn</span>';
    
    // Make sure tier info is extracted
    if (!tierInfo.extracted) {
      extractTierInfo();
    }
    
    const tierPrice = Math.round(variant.price * (1 - tierInfo.discount));
    const originalPrice = variant.price;
    const compareAtPrice = variant.compare_at_price;
    
    let html = '<div class="tier-pricing-wrapper" data-tier="' + tierInfo.tier + '">';
    
    // Tier badge
    if (tierInfo.discount > 0 && tierInfo.tier) {
      const tierSlug = tierInfo.tier.toLowerCase().replace(/\s+/g, '-');
      html += `
        <span class="tier-badge tier-badge--${tierSlug}">
          <svg class="tier-badge-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          -${Math.round(tierInfo.discount * 100)}% ${tierInfo.tier}
        </span>
      `;
    }
    
    html += '<div class="tier-pricing-prices">';
    
    // Compare at price
    if (compareAtPrice && compareAtPrice > originalPrice) {
      html += `<span class="tier-price-compare"><span class="theme-money">${theme.Shopify.formatMoney(compareAtPrice, theme.money_format_with_code_preference)}</span></span>`;
    }
    
    // Original price (if tier discount)
    if (tierInfo.discount > 0) {
      html += `<span class="tier-price-original"><span class="theme-money">${theme.Shopify.formatMoney(originalPrice, theme.money_format_with_code_preference)}</span></span>`;
    }
    
    // Tier price
    const priceClass = tierInfo.discount > 0 ? 'tier-price-final tier-price-discounted' : 'tier-price-final';
    html += `<span class="${priceClass}"><span class="theme-money">${theme.Shopify.formatMoney(tierPrice, theme.money_format_with_code_preference)}</span></span>`;
    
    html += '</div></div>';
    
    return html;
  }
  
  // Method 1: Override theme.OptionManager.updatePrice
  function installOverride() {
    if (typeof theme !== 'undefined' && theme.OptionManager) {
      // Make sure tier info is extracted first
      if (!tierInfo.extracted) {
        console.log('Tier Pricing: Waiting for tier info before installing override');
        setTimeout(installOverride, 100);
        return false;
      }
      
      // Check if already overridden
      if (theme.OptionManager.updatePrice._tierPricingOverridden) {
        console.log('Tier Pricing: Already overridden');
        return true;
      }
      
      const originalUpdatePrice = theme.OptionManager.updatePrice;
      
      theme.OptionManager.updatePrice = function(variant, $container) {
        const $priceArea = $container.find('.price-area');
        $priceArea.removeClass('on-sale');
        
        if (variant && variant.compare_at_price > variant.price) {
          $priceArea.addClass('on-sale');
        }
        
        const newHTML = buildTierPricingHTML(variant);
        $priceArea.html(newHTML);
        
        console.log('Tier Pricing: Updated via override', variant ? variant.id : 'none', tierInfo);
      };
      
      // Mark as overridden
      theme.OptionManager.updatePrice._tierPricingOverridden = true;
      
      console.log('Tier Pricing: Override installed successfully with tier:', tierInfo.tier);
      
      // Trigger update immediately to apply tier pricing
      setTimeout(function() {
        const $variantInput = $('.product-area').find('[name="id"]').first();
        if ($variantInput.length) {
          console.log('Tier Pricing: Triggering variant update to apply tier pricing');
          $variantInput.trigger('change.themeProductOptions');
        }
      }, 100);
      
      return true;
    }
    console.log('Tier Pricing: theme.OptionManager not available yet');
    return false;
  }
  
  // Method 2: MutationObserver to watch for price changes
  function installObserver() {
    const priceArea = document.querySelector('.price-area');
    if (!priceArea) {
      console.log('Tier Pricing: No price-area found for observer');
      return;
    }
    
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Check if tier-pricing-wrapper was removed
        const hasTierWrapper = priceArea.querySelector('.tier-pricing-wrapper');
        if (!hasTierWrapper && mutation.type === 'childList') {
          console.log('Tier Pricing: Detected price override, restoring...');
          
          // Get current variant from product JSON
          const productJson = document.querySelector('#cc-product-json-' + window.location.pathname.split('/').pop());
          if (productJson) {
            try {
              const product = JSON.parse(productJson.textContent);
              const variantId = new URLSearchParams(window.location.search).get('variant');
              const variant = variantId ? 
                product.variants.find(v => v.id == variantId) : 
                product.variants[0];
              
              if (variant) {
                setTimeout(() => {
                  const newHTML = buildTierPricingHTML(variant);
                  priceArea.innerHTML = newHTML;
                  console.log('Tier Pricing: Restored via observer');
                }, 50);
              }
            } catch (e) {
              console.error('Tier Pricing: Error parsing product JSON', e);
            }
          }
        }
      });
    });
    
    observer.observe(priceArea, {
      childList: true,
      subtree: true
    });
    
    console.log('Tier Pricing: Observer installed');
  }
  
  // Install both methods
  function init() {
    console.log('Tier Pricing: Init called, extracted:', tierInfo.extracted);
    
    // Wait for tier info to be extracted
    if (!tierInfo.extracted) {
      console.log('Tier Pricing: Waiting for tier info extraction...');
      setTimeout(init, 100);
      return;
    }
    
    // Try override first
    const overrideInstalled = installOverride();
    
    // Always install observer as backup
    setTimeout(installObserver, 200);
    
    console.log('Tier Pricing: Initialized', {
      override: overrideInstalled,
      tier: tierInfo.tier,
      discount: tierInfo.discount,
      extracted: tierInfo.extracted
    });
  }
  
  // Run init after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }
  
  // Also try after delays to catch late-loading theme.js
  setTimeout(function() {
    if (tierInfo.extracted && typeof theme !== 'undefined' && theme.OptionManager) {
      console.log('Tier Pricing: Retry override installation at 500ms');
      installOverride();
    }
  }, 500);
  
  setTimeout(function() {
    if (tierInfo.extracted && typeof theme !== 'undefined' && theme.OptionManager) {
      console.log('Tier Pricing: Retry override installation at 1000ms');
      installOverride();
    }
  }, 1000);
  
})();
