# 🎯 TIER PRICING SYSTEM - HELIOS

## 📖 Tổng Quan

Hệ thống giảm giá tự động theo hạng thành viên, kết hợp giữa **Shopify Automatic Discounts** và **Theme UI Enhancement**.

### ✨ Tính Năng Chính

- ✅ **6 hạng thành viên** với mức giảm giá khác nhau (5% - 20%)
- ✅ **Tự động áp dụng discount** khi checkout (không cần nhập code)
- ✅ **Hiển thị giá real-time** trên product listing & product page
- ✅ **Badge đẹp mắt** với màu sắc riêng cho từng tier
- ✅ **Login incentive** cho khách chưa đăng nhập
- ✅ **Mobile responsive** hoàn toàn
- ✅ **Không cần Shopify Plus** - Hoạt động với tất cả plans

---

## 🎨 Demo

### Giá Hiển Thị Theo Tier

| Tier | Giá Gốc | Giá Sau Giảm | Tiết Kiệm |
|------|---------|--------------|-----------|
| Guest | 1,000,000₫ | 1,000,000₫ | 0₫ |
| MEMBER | 1,000,000₫ | 950,000₫ | 50,000₫ |
| SILVER | 1,000,000₫ | 930,000₫ | 70,000₫ |
| GOLD | 1,000,000₫ | 900,000₫ | 100,000₫ |
| PLATINUM | 1,000,000₫ | 880,000₫ | 120,000₫ |
| DIAMOND | 1,000,000₫ | 850,000₫ | 150,000₫ |
| BLACK DIAMOND | 1,000,000₫ | 800,000₫ | 200,000₫ |

---

## 📚 Documentation

### 🚀 Quick Start
- **[Quick Reference](./TIER-PRICING-QUICK-REFERENCE.md)** - Tham khảo nhanh (5 phút)
- **[Checklist](./TIER-PRICING-CHECKLIST.md)** - Checklist triển khai từng bước

### 📖 Full Guides
- **[Setup Guide](./TIER-PRICING-SETUP-GUIDE.md)** - Hướng dẫn chi tiết đầy đủ
- **[Visual Guide](./TIER-PRICING-VISUAL-GUIDE.md)** - Hướng dẫn trực quan với mockups

---

## 🏗️ Kiến Trúc

### Shopify Admin Layer
```
Customer Segments (6 segments)
    ↓
Automatic Discounts (6 discounts)
    ↓
Auto-apply at Checkout
```

### Theme Layer
```
snippets/tier-price.liquid (Logic)
    ↓
assets/tier-pricing.css (Styling)
    ↓
snippets/product-block.liquid (Integration)
    ↓
Display on Frontend
```

---

## 📦 Files Structure

```
theme/
├── snippets/
│   └── tier-price.liquid          # Tier pricing logic & display
├── assets/
│   └── tier-pricing.css           # Styling for badges & prices
├── layout/
│   └── theme.liquid               # CSS link added
└── docs/
    ├── TIER-PRICING-README.md              # This file
    ├── TIER-PRICING-SETUP-GUIDE.md         # Full setup guide
    ├── TIER-PRICING-QUICK-REFERENCE.md     # Quick reference
    ├── TIER-PRICING-CHECKLIST.md           # Implementation checklist
    └── TIER-PRICING-VISUAL-GUIDE.md        # Visual guide
```

---

## 🎯 Tier Levels

| Tier | Tag | Discount | Spending Threshold |
|------|-----|----------|-------------------|
| 🖤 BLACK DIAMOND | `BLACK DIAMOND` | 20% | ≥ 100,000,000₫ |
| 💎 DIAMOND | `DIAMOND` | 15% | ≥ 20,000,000₫ |
| 🥈 PLATINUM | `PLATINUM` | 12% | ≥ 10,000,000₫ |
| 🥇 GOLD | `GOLD` | 10% | ≥ 6,000,000₫ |
| 🥈 SILVER | `SILVER` | 7% | ≥ 3,000,000₫ |
| 👤 MEMBER | (no tag) | 5% | Logged in |
| 👻 GUEST | (not logged in) | 0% | - |

---

## 🚀 Quick Setup (10 phút)

### 1. Shopify Admin (5 phút)
```bash
# Tạo 6 Customer Segments
Customers → Segments → Create segment
# Theo hướng dẫn trong TIER-PRICING-QUICK-REFERENCE.md

# Tạo 6 Automatic Discounts
Discounts → Create discount → Automatic
# Theo hướng dẫn trong TIER-PRICING-QUICK-REFERENCE.md
```

### 2. Theme Code (Đã hoàn thành ✅)
```bash
# Files đã được tạo và tích hợp:
✅ snippets/tier-price.liquid
✅ assets/tier-pricing.css
✅ layout/theme.liquid (updated)
✅ snippets/product-block.liquid (updated)
```

### 3. Testing (5 phút)
```bash
# Tạo test customers với các tags khác nhau
# Test trên incognito window
# Verify discounts auto-apply at checkout
```

---

## 🎨 Customization

### Thay Đổi % Giảm Giá
```
Shopify Admin → Discounts → Edit discount → Value → Save
```

### Thay Đổi Màu Badge
```css
/* File: assets/tier-pricing.css */
.tier-badge--gold {
  background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
  color: #YOUR_TEXT_COLOR;
}
```

### Thay Đổi Spending Thresholds
```
Shopify Admin → Customers → Segments → Edit filters
```

---

## 🧪 Testing

### Test Checklist
- [ ] Guest user sees original price + login prompt
- [ ] MEMBER sees 5% discount + badge
- [ ] GOLD sees 10% discount + badge
- [ ] BLACK DIAMOND sees 20% discount + animated badge
- [ ] Discount auto-applies at checkout
- [ ] Mobile responsive works
- [ ] No console errors

### Test Customers
Tạo 7 test accounts:
1. Guest (không đăng nhập)
2. Member (không tag)
3. SILVER (tag: SILVER)
4. GOLD (tag: GOLD)
5. PLATINUM (tag: PLATINUM)
6. DIAMOND (tag: DIAMOND)
7. BLACK DIAMOND (tag: BLACK DIAMOND)

---

## 📊 Analytics

### Metrics to Track
- Conversion rate by tier
- Average order value by tier
- Tier upgrade rate
- Discount usage
- Revenue impact

### Shopify Reports
```
Analytics → Reports
- Sales by customer segment
- Discount usage
- Customer lifetime value
```

---

## 🔧 Troubleshooting

### Discount không apply
**Giải pháp:**
1. Check customer có trong segment không
2. Check discount status = Active
3. Check Combinations settings

### Badge không hiển thị
**Giải pháp:**
1. Hard refresh (Ctrl+F5)
2. Check CSS file loaded
3. Check console errors

### Giá hiển thị sai
**Giải pháp:**
1. Verify % trong code = % trong discount
2. Check customer tags
3. Clear browser cache

👉 **[Full Troubleshooting Guide](./TIER-PRICING-SETUP-GUIDE.md#phần-6-troubleshooting)**

---

## 🎓 Best Practices

### ✅ DO
- Chỉ gán 1 tier tag cho mỗi customer
- Test thoroughly trước khi launch
- Monitor discount usage regularly
- Backup theme trước khi update
- Document mọi thay đổi

### ❌ DON'T
- Gán nhiều tier tags cho 1 customer
- Thay đổi % mà không test
- Bật Combinations cho tier discounts
- Deploy trực tiếp production mà không test
- Quên update documentation

---

## 🚀 Roadmap

### Phase 1 (Current) ✅
- [x] 6 tier levels
- [x] Automatic discounts
- [x] UI integration
- [x] Mobile responsive
- [x] Documentation

### Phase 2 (Next)
- [ ] Email notifications for tier upgrades
- [ ] Exclusive products by tier
- [ ] Early access to sales
- [ ] Points system integration
- [ ] Referral bonuses

### Phase 3 (Future)
- [ ] AI-powered personalization
- [ ] Dynamic pricing
- [ ] Gamification
- [ ] Social sharing rewards
- [ ] VIP events

---

## 📞 Support

### Documentation
- 📖 [Setup Guide](./TIER-PRICING-SETUP-GUIDE.md)
- ⚡ [Quick Reference](./TIER-PRICING-QUICK-REFERENCE.md)
- ✅ [Checklist](./TIER-PRICING-CHECKLIST.md)
- 🎨 [Visual Guide](./TIER-PRICING-VISUAL-GUIDE.md)

### Contact
- **Email:** support@helios.vn
- **Phone:** 1900-xxxx
- **Response Time:** < 2 hours

### Resources
- [Shopify Segments Docs](https://help.shopify.com/en/manual/customers/customer-segmentation)
- [Shopify Discounts Docs](https://help.shopify.com/en/manual/discounts)
- [Liquid Docs](https://shopify.dev/docs/api/liquid)

---

## 📝 Changelog

### Version 1.0.0 (2024-11-21)
- ✅ Initial release
- ✅ 6 tier levels support
- ✅ Automatic discount integration
- ✅ Theme UI implementation
- ✅ Mobile responsive
- ✅ Full documentation
- ✅ Testing checklist
- ✅ Visual guide

---

## 📄 License

Proprietary - Helios Vietnam  
© 2024 All rights reserved

---

## 🙏 Credits

**Developed by:** Kiro AI Assistant  
**For:** Helios Vietnam  
**Date:** November 21, 2024  
**Version:** 1.0.0

---

## 🎉 Ready to Launch!

Hệ thống tier pricing đã sẵn sàng triển khai. Follow checklist để đảm bảo mọi thứ hoạt động hoàn hảo!

**Next Steps:**
1. ✅ Review [Setup Guide](./TIER-PRICING-SETUP-GUIDE.md)
2. ✅ Complete [Checklist](./TIER-PRICING-CHECKLIST.md)
3. ✅ Test thoroughly
4. ✅ Launch! 🚀

---

**Questions?** Check [Quick Reference](./TIER-PRICING-QUICK-REFERENCE.md) or contact support.
