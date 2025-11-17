# PageSpeed Performance Optimizations

## Tổng quan
Document này ghi lại tất cả các tối ưu đã được thực hiện để cải thiện PageSpeed score của trang chủ.

---

## 1. ✅ TRACKING SCRIPTS OPTIMIZATION

### Files Modified:
- `snippets/pixel.liquid`
- `layout/theme.liquid`

### Changes:
- **Defer Google Tag Manager**: Load sau 1 giây
- **Defer Facebook Pixel**: Load sau 1.5 giây
- **Defer Google Ads**: Load sau 2 giây
- **Defer TikTok Pixel**: Load sau 2.5 giây
- **Defer Google Analytics**: Load sau 3 giây
- **Defer Microsoft Clarity**: Load sau 3.5 giây

### Benefits:
- Giảm blocking time: ~500-800ms
- FCP cải thiện: 0.5-1s
- TBT giảm: 30-50%

---

## 2. ✅ VIDEO OPTIMIZATION

### Files Modified:
- `sections/background-video-responsive.liquid`
- `snippets/inline-video.liquid`
- `assets/lazy-video.js` (NEW)

### Changes:
- **Poster Image Priority**: `fetchpriority="high"` cho LCP
- **Lazy Load Video**: Chỉ load khi vào viewport
- **Device-Specific Loading**: Chỉ load video phù hợp (desktop/mobile)
- **Preload None**: Thay đổi từ `preload="metadata"` → `preload="none"`
- **Intersection Observer**: Load video với rootMargin 100px
- **Smooth Transition**: Fade out poster khi video ready

### Benefits:
- LCP cải thiện: 1-2s
- Bandwidth tiết kiệm: 50%
- Video không block rendering

---

## 3. ✅ POPUP OVERLAY OPTIMIZATION

### Files Modified:
- `sections/popup-overlay-custom.liquid`
- `assets/popup-overlay.js` (NEW)
- `assets/popup-overlay.css` (NEW)

### Changes:
- **Lazy Load CSS**: CSS được load riêng khi cần
- **Lazy Load Image**: Popup image chỉ load khi popup hiển thị
- **Interaction-Based Loading**: Load sau user interaction hoặc 3s
- **Separate Files**: Tách CSS và JS ra khỏi inline

### Benefits:
- Giảm initial HTML size: ~5KB
- Không block rendering
- FCP cải thiện: 0.3-0.5s

---

## 4. ✅ FONT OPTIMIZATION

### Files Modified:
- `layout/theme.liquid`

### Changes:
- **Reduced Font Variants**: Từ 10 → 5 variants
- **Removed Fonts**:
  - base_font_extralight (200)
  - base_font_medium (500)
  - base_font_semibold (600)
  - base_font_italic
  - base_font_bold_italic
- **Kept Fonts**:
  - base_font (regular)
  - base_font_bold
  - heading_font
  - nav_font
  - logo_font

### Benefits:
- Giảm font file size: ~40-50%
- FCP cải thiện: 0.2-0.4s
- Giảm render blocking

---

## 5. ✅ IMAGE OPTIMIZATION

### Files Modified:
- `sections/two-banner.liquid`

### Changes:
- **Width/Height Attributes**: Thêm để tránh CLS
- **Lazy Loading**: `loading="lazy"` cho images
- **Async Decoding**: `decoding="async"`
- **Responsive Images**: Sử dụng srcset cho multiple sizes

### Benefits:
- CLS cải thiện: < 0.1
- Lazy load images không ở above-the-fold

---

## 📊 EXPECTED RESULTS

### PageSpeed Scores:
- **Mobile**: +15-25 điểm
- **Desktop**: +10-15 điểm

### Core Web Vitals:
- **LCP**: Cải thiện 1-2s (target: < 2.5s)
- **FCP**: Cải thiện 0.5-1s (target: < 1.8s)
- **TBT**: Giảm 30-50% (target: < 200ms)
- **CLS**: < 0.1 (target: < 0.1)

### Load Time:
- **Initial Load**: Giảm 2-3s
- **Time to Interactive**: Giảm 1-2s

---

## 🔧 NEW FILES CREATED

1. `assets/lazy-video.js` - Video lazy loading handler
2. `assets/popup-overlay.js` - Popup lazy loading handler
3. `assets/popup-overlay.css` - Popup styles (lazy loaded)

---

## 📝 TESTING CHECKLIST

### Before Deploy:
- [ ] Test video autoplay on mobile/desktop
- [ ] Test popup shows after delay
- [ ] Test product images load correctly
- [ ] Test tracking scripts fire correctly
- [ ] Test on slow 3G connection
- [ ] Test with cache disabled
- [ ] Run PageSpeed Insights
- [ ] Check console for errors

### After Deploy:
- [ ] Monitor GTM events
- [ ] Check Facebook Pixel events
- [ ] Verify Google Analytics tracking
- [ ] Test on real devices
- [ ] Monitor Core Web Vitals in Search Console

---

## 🚀 NEXT STEPS (Optional)

### Additional Optimizations:
1. **Code Splitting**: Tách theme.js thành chunks nhỏ hơn
2. **Remove jQuery**: Thay thế bằng vanilla JS
3. **Critical CSS**: Inline critical CSS
4. **Service Worker**: Cache static assets
5. **WebP Images**: Convert images to WebP
6. **Minify HTML**: Remove whitespace
7. **HTTP/2 Push**: Push critical resources
8. **CDN**: Use CDN for static assets

### Monitoring:
- Setup Real User Monitoring (RUM)
- Track Core Web Vitals over time
- A/B test optimizations
- Monitor conversion rate impact

---

## 📞 SUPPORT

Nếu có vấn đề sau khi deploy:
1. Check browser console for errors
2. Test with different browsers
3. Clear Shopify cache
4. Verify all asset files uploaded correctly
5. Check GTM debug mode

---

**Last Updated**: November 17, 2025
**Version**: 1.0
**Status**: Ready for Testing
