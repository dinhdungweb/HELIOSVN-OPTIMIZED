/**
 * Tier Pricing - Simple Force Update
 * Continuously check and restore tier pricing if removed
 */

(function() {
  'use strict';
  
  let tierInfo = {
    tier: '',
    discount: 0,
    extracted: false
  };
  
  let lastVariantId = null;
  let updateCount = 0;
  const MAX_UPDATES = 50; // Stop after 50 updates (5 seconds)
  
  // Extract tier info
  function extractTierInfo() {
    const wrapper = document.querySelector('.tier-pricing-wrapper');
    if (wrapper && !tierInfo.extracted) {
      tierInfo.tier = wrapper.dataset.customerTier || '';
      tierInfo.discount = parseFloat(wrapper.dataset.tierDiscount || 0) / 100;
      tierInfo.extracted = true;
      console.log('Tier Pricing Simple: Extracted', tierInfo);
    }
    return tierInfo.extracted;
  }
  
  // Build tier pricing HTML
  function buildTierHTML(variant) {
    if (!variant || !tierInfo.extracted) return null;
    
    const tierPrice = Math.round(variant.price * (1 - tierInfo.discount));
    const tierSlug = tierInfo.tier.toLowerCase().replace(/\s+/g, '-');
    
    let html = '<div class="tier-pricing-wrapper tier-pricing-forced" data-tier="' + tierInfo.tier + '">';
    
    if (tierInfo.discount > 0) {
      html += '<span class="tier-badge tier-badge--' + tierSlug + '">';
      html += '<svg class="tier-badge-icon" width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/></svg>';
      html += ' -' + Math.round(tierInfo.discount * 100) + '% ' + tierInfo.tier;
      html += '</span>';
    }
    
    html += '<div class="tier-pricing-prices">';
    
    if (variant.compare_at_price && variant.compare_at_price > variant.price) {
      html += '<span class="tier-price-compare"><span class="theme-money">' + formatMoney(variant.compare_at_price) + '</span></span>';
    }
    
    if (tierInfo.discount > 0) {
      html += '<span class="tier-price-original"><span class="theme-money">' + formatMoney(variant.price) + '</span></span>';
    }
    
    const priceClass = tierInfo.discount > 0 ? 'tier-price-final tier-price-discounted' : 'tier-price-final';
    html += '<span class="' + priceClass + '"><span class="theme-money">' + formatMoney(tierPrice) + '</span></span>';
    
    html += '</div></div>';
    
    return html;
  }
  
  // Format money
  function formatMoney(cents) {
    if (typeof theme !== 'undefined' && theme.Shopify && theme.Shopify.formatMoney) {
      return theme.Shopify.formatMoney(cents, theme.money_format_with_code_preference || theme.money_format);
    }
    // Fallback
    const amount = cents / 100;
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
  }
  
  // Check and update price area
  function checkAndUpdate() {
    if (!tierInfo.extracted) {
      extractTierInfo();
      return;
    }
    
    if (updateCount >= MAX_UPDATES) {
      console.log('Tier Pricing Simple: Max updates reached, stopping');
      return;
    }
    
    const priceArea = document.querySelector('.price-area');
    if (!priceArea) return;
    
    // Check if tier pricing exists
    const hasTierPricing = priceArea.querySelector('.tier-pricing-forced');
    if (hasTierPricing) return; // Already has tier pricing
    
    // Get current variant
    const variantInput = document.querySelector('.product-area [name="id"]');
    const productJson = document.querySelector('[id^="cc-product-json-"]');
    
    if (!variantInput || !productJson) return;
    
    try {
      const product = JSON.parse(productJson.textContent);
      const variantId = variantInput.value;
      
      // Only update if variant changed
      if (variantId === lastVariantId && updateCount > 0) return;
      
      const variant = product.variants.find(v => v.id == variantId);
      if (!variant) return;
      
      const tierHTML = buildTierHTML(variant);
      if (!tierHTML) return;
      
      // Insert tier pricing at the beginning
      priceArea.insertAdjacentHTML('afterbegin', tierHTML);
      
      lastVariantId = variantId;
      updateCount++;
      
      console.log('Tier Pricing Simple: Updated for variant', variantId, 'count:', updateCount);
    } catch (e) {
      console.error('Tier Pricing Simple: Error', e);
    }
  }
  
  // Start checking
  function start() {
    // Initial extraction
    extractTierInfo();
    
    // Check every 100ms
    const interval = setInterval(function() {
      checkAndUpdate();
      
      if (updateCount >= MAX_UPDATES) {
        clearInterval(interval);
      }
    }, 100);
    
    console.log('Tier Pricing Simple: Started');
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
  
})();
