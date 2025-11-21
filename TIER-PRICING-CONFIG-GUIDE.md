# 🎯 HƯỚNG DẪN CẤU HÌNH TIER PRICING

## 📋 Tổng Quan

File cấu hình tập trung giúp bạn dễ dàng thay đổi tier pricing mà không cần sửa nhiều file.

**File cấu hình chính:** `snippets/tier-config.liquid`

---

## 🚀 Cách Sử Dụng

### 1. Thay Đổi % Giảm Giá

Mở `snippets/tier-config.liquid` và tìm tier muốn sửa:

```liquid
comment GOLD TIER
endcomment
assign tier_4_name = "GOLD"
assign tier_4_tag = "GOLD"
assign tier_4_discount = 10        ← Đổi từ 10 → 12
assign tier_4_threshold = 6000000
```

**Lưu file** → Giá sẽ tự động cập nhật!

---

### 2. Thay Đổi Ngưỡng Chi Tiêu

```liquid
assign tier_4_threshold = 6000000  ← Đổi từ 6M → 8M
```

**Đơn vị:** VND (không chia 100)

**Ví dụ:**
- 3 triệu = `3000000`
- 10 triệu = `10000000`
- 100 triệu = `100000000`

---

### 3. Thay Đổi Màu Sắc Badge

```liquid
assign tier_4_color_start = "#ffd700"  ← Màu bắt đầu gradient
assign tier_4_color_end = "#ffed4e"    ← Màu kết thúc gradient
assign tier_4_text_color = "#000000"   ← Màu chữ
```

**Tool chọn màu:** https://htmlcolorcodes.com/

---

### 4. Thay Đổi Tên Tier

```liquid
assign tier_4_name = "GOLD"  ← Đổi thành "VIP GOLD"
```

**Lưu ý:** Nếu đổi tên, cần đổi cả `tier_4_tag` để match với customer tags trong Shopify Admin.

---

### 5. Thêm/Bỏ Tier

#### Bỏ 1 Tier (Ví dụ: PLATINUM)

```liquid
comment PLATINUM TIER - DISABLED
endcomment
assign tier_3_discount = 0  ← Set = 0 để disable
```

#### Thêm Tier Mới

Hiện tại hỗ trợ tối đa 6 tiers. Để thêm tier thứ 7, cần:
1. Thêm config trong `tier-config.liquid`
2. Thêm logic trong `tier-price.liquid`
3. Thêm CSS trong `tier-config-css.liquid`

**→ Liên hệ developer để hỗ trợ**

---

## ⚙️ Cài Đặt Nâng Cao

### Display Settings

```liquid
comment Hiển thị giá gốc (gạch ngang)
endcomment
assign show_original_price = true  ← false để ẩn

comment Hiển thị badge tier
endcomment
assign show_tier_badge = true  ← false để ẩn badge

comment Hiển thị badge trên product page
endcomment
assign show_badge_on_product_page = true

comment Hiển thị badge trên collection/listing
endcomment
assign show_badge_on_listing = true
```

---

### Metafield Settings

```liquid
comment Sử dụng custom metafield cho total_spent
endcomment
assign use_custom_metafield = true  ← false để dùng customer.total_spent

assign metafield_namespace = "custom"
assign metafield_key = "total_spent"
```

**Khi nào dùng custom metafield?**
- Khi muốn tính total_spent theo cách riêng
- Khi muốn exclude một số orders
- Khi muốn manual override

---

### Badge Style Settings

```liquid
comment Font size cho badge (px)
endcomment
assign badge_font_size = 11        ← Product page
assign badge_font_size_small = 9   ← Collection listing

comment Padding cho badge (px)
endcomment
assign badge_padding_v = 4   ← Vertical padding
assign badge_padding_h = 10  ← Horizontal padding

comment Border radius (px)
endcomment
assign badge_border_radius = 6  ← Bo góc badge
```

---

### Feature Flags

```liquid
comment Bật/tắt tier pricing
endcomment
assign tier_pricing_enabled = true  ← false để tắt hoàn toàn

comment Ưu tiên tags thay vì total_spent
endcomment
assign prioritize_tags = true  ← false để luôn dùng total_spent

comment Hiển thị login prompt cho guest
endcomment
assign show_login_prompt = false  ← true để hiện "Đăng nhập..."
```

---

## 📊 Ví Dụ Thực Tế

### Ví Dụ 1: Tăng Giảm Giá Cho GOLD

**Hiện tại:** GOLD = 10%  
**Muốn:** GOLD = 15%

```liquid
assign tier_4_discount = 15  ← Đổi từ 10 → 15
```

**Kết quả:**
- Giá 1.000.000₫ → 850.000₫ (thay vì 900.000₫)
- Badge hiển thị "-15% GOLD"

---

### Ví Dụ 2: Thay Đổi Ngưỡng SILVER

**Hiện tại:** SILVER = 3 triệu  
**Muốn:** SILVER = 5 triệu

```liquid
assign tier_5_threshold = 5000000  ← Đổi từ 3M → 5M
```

**Kết quả:**
- Customer chi 4 triệu → MEMBER (5%)
- Customer chi 6 triệu → SILVER (7%)

---

### Ví Dụ 3: Đổi Màu DIAMOND Thành Màu Tím

```liquid
assign tier_2_color_start = "#9b59b6"  ← Tím đậm
assign tier_2_color_end = "#e74c3c"    ← Đỏ cam
assign tier_2_text_color = "#ffffff"   ← Chữ trắng
```

---

### Ví Dụ 4: Tắt Tier Pricing Tạm Thời

```liquid
assign tier_pricing_enabled = false
```

**Kết quả:**
- Tất cả customers thấy giá gốc
- Không có badge
- Không có discount

**Để bật lại:** `assign tier_pricing_enabled = true`

---

## 🔧 Troubleshooting

### Vấn Đề 1: Thay Đổi Không Có Hiệu Lực

**Nguyên nhân:** Browser cache

**Giải pháp:**
1. Hard refresh (Ctrl + Shift + R)
2. Clear browser cache
3. Test trên incognito window

---

### Vấn Đề 2: Màu Badge Không Đổi

**Nguyên nhân:** CSS variables chưa load

**Giải pháp:**
1. Check `tier-config-css.liquid` đã được render trong `theme.liquid`
2. Inspect element → Check CSS variables trong `:root`
3. Clear cache

---

### Vấn Đề 3: Discount % Không Khớp

**Nguyên nhân:** Cần đồng bộ với Shopify Automatic Discounts

**Giải pháp:**
1. Vào Shopify Admin → Discounts
2. Sửa % trong discount cho match với config
3. Hoặc ngược lại: Sửa config cho match với discount

---

## 📁 Cấu Trúc Files

```
snippets/
├── tier-config.liquid          ← CẤU HÌNH CHÍNH (SỬA FILE NÀY)
├── tier-config-css.liquid      ← Auto-generate CSS (không sửa)
├── tier-price.liquid           ← Logic hiển thị (không sửa)
└── tier-auto-discount.liquid   ← Auto discount (không sửa)

assets/
├── tier-pricing.css            ← Base CSS (ít khi sửa)
└── tier-pricing-final.js       ← Product page JS (không sửa)

layout/
└── theme.liquid                ← Include config CSS (đã setup)
```

---

## ✅ Checklist Sau Khi Thay Đổi Config

- [ ] Lưu file `tier-config.liquid`
- [ ] Hard refresh browser (Ctrl + Shift + R)
- [ ] Test với customer có tier
- [ ] Test trên product page
- [ ] Test trên collection page
- [ ] Test trên mobile
- [ ] Verify discount apply đúng ở checkout
- [ ] Update Shopify Automatic Discounts (nếu cần)
- [ ] Document thay đổi

---

## 🎓 Best Practices

### ✅ DO

- Backup config trước khi sửa
- Test thoroughly sau mỗi thay đổi
- Document mọi thay đổi
- Đồng bộ với Shopify Discounts
- Sử dụng git để track changes

### ❌ DON'T

- Sửa nhiều settings cùng lúc
- Deploy trực tiếp production
- Quên clear cache sau khi sửa
- Thay đổi mà không test
- Sửa file auto-generated

---

## 📞 Hỗ Trợ

**Cần giúp đỡ?**
- Email: support@helios.vn
- Phone: 1900-xxxx

**Tài liệu khác:**
- [Setup Guide](./TIER-PRICING-SETUP-GUIDE.md)
- [Quick Reference](./TIER-PRICING-QUICK-REFERENCE.md)
- [Admin Guide](./TIER-PRICING-ADMIN-GUIDE.md)

---

**Version:** 2.0.0  
**Last Updated:** 2024-11-21  
**Status:** Production Ready ✅
