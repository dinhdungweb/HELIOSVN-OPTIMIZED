# 🎯 HƯỚNG DẪN SETUP TIER PRICING - HELIOS

## 📋 TỔNG QUAN

Hệ thống giảm giá theo hạng thành viên tự động áp dụng discount dựa trên customer tags.

**Cách hoạt động:**
1. Khách hàng được gán tags (BLACK DIAMOND, DIAMOND, PLATINUM, GOLD, SILVER, MEMBER)
2. Shopify tự động áp dụng discount tương ứng khi checkout
3. Theme hiển thị giá đã giảm ngay từ product listing

---

## PHẦN 1: SETUP SHOPIFY ADMIN (30 phút)

### BƯỚC 1: Tạo Customer Segments

#### 1.1. BLACK DIAMOND Segment
```
Shopify Admin → Customers → Segments → Create segment

Segment name: BLACK DIAMOND Members
Filters:
  - Customer tags → contains → BLACK DIAMOND

Save segment
```

#### 1.2. DIAMOND Segment
```
Segment name: DIAMOND Members
Filters:
  - Customer tags → contains → DIAMOND
  - Customer tags → does not contain → BLACK DIAMOND

Save segment
```

**⚠️ QUAN TRỌNG:** Phải thêm filter "does not contain" để tránh conflict!

#### 1.3. PLATINUM Segment
```
Segment name: PLATINUM Members
Filters:
  - Customer tags → contains → PLATINUM
  - Customer tags → does not contain → DIAMOND
  - Customer tags → does not contain → BLACK DIAMOND

Save segment
```

#### 1.4. GOLD Segment
```
Segment name: GOLD Members
Filters:
  - Customer tags → contains → GOLD
  - Customer tags → does not contain → PLATINUM
  - Customer tags → does not contain → DIAMOND
  - Customer tags → does not contain → BLACK DIAMOND

Save segment
```

#### 1.5. SILVER Segment
```
Segment name: SILVER Members
Filters:
  - Customer tags → contains → SILVER
  - Customer tags → does not contain → GOLD
  - Customer tags → does not contain → PLATINUM
  - Customer tags → does not contain → DIAMOND
  - Customer tags → does not contain → BLACK DIAMOND

Save segment
```

#### 1.6. MEMBER Segment
```
Segment name: MEMBER (Base)
Filters:
  - Customer → is logged in
  - Customer tags → does not contain → SILVER
  - Customer tags → does not contain → GOLD
  - Customer tags → does not contain → PLATINUM
  - Customer tags → does not contain → DIAMOND
  - Customer tags → does not contain → BLACK DIAMOND

Save segment
```

---

### BƯỚC 2: Tạo Automatic Discounts

#### 2.1. BLACK DIAMOND Discount (20%)
```
Shopify Admin → Discounts → Create discount → Automatic discount

Title: BLACK DIAMOND Member Discount - 20%
Method: Automatic discount
Type: Percentage
Value: 20%

Applies to: All products
(Hoặc chọn Specific collections nếu muốn)

Minimum requirements: None

Customer eligibility: Specific customer segments
  → Chọn: BLACK DIAMOND Members

Maximum discount uses: Để trống (unlimited)

Combinations: BỎ TICK tất cả options

Active dates:
  - Start date: Hôm nay
  - End date: Để trống

Save discount
```

#### 2.2. DIAMOND Discount (15%)
```
Title: DIAMOND Member Discount - 15%
Type: Percentage
Value: 15%
Applies to: All products
Customer eligibility: DIAMOND Members segment
Combinations: Bỏ tick tất cả
Active dates: Không giới hạn

Save discount
```

#### 2.3. PLATINUM Discount (12%)
```
Title: PLATINUM Member Discount - 12%
Value: 12%
Customer eligibility: PLATINUM Members segment
Combinations: Bỏ tick tất cả

Save discount
```

#### 2.4. GOLD Discount (10%)
```
Title: GOLD Member Discount - 10%
Value: 10%
Customer eligibility: GOLD Members segment
Combinations: Bỏ tick tất cả

Save discount
```

#### 2.5. SILVER Discount (7%)
```
Title: SILVER Member Discount - 7%
Value: 7%
Customer eligibility: SILVER Members segment
Combinations: Bỏ tick tất cả

Save discount
```

#### 2.6. MEMBER Discount (5%)
```
Title: MEMBER Base Discount - 5%
Value: 5%
Customer eligibility: MEMBER (Base) segment
Combinations: Bỏ tick tất cả

Save discount
```

---

### BƯỚC 3: Kiểm Tra Priority

1. Vào **Discounts** → Xem danh sách
2. Đảm bảo thứ tự (từ cao xuống thấp):
   ```
   1. BLACK DIAMOND - 20%
   2. DIAMOND - 15%
   3. PLATINUM - 12%
   4. GOLD - 10%
   5. SILVER - 7%
   6. MEMBER - 5%
   ```

3. Kéo thả để sắp xếp nếu cần

---

## PHẦN 2: THEME IMPLEMENTATION (ĐÃ HOÀN THÀNH)

### Files đã tạo:
- ✅ `snippets/tier-price.liquid` - Logic hiển thị giá theo tier
- ✅ `assets/tier-pricing.css` - Styling cho tier pricing
- ✅ `layout/theme.liquid` - Đã thêm CSS link

### Files đã cập nhật:
- ✅ `snippets/product-block.liquid` - Tích hợp tier pricing vào product cards

---

## PHẦN 3: TESTING (15 phút)

### Test Case 1: Khách Chưa Đăng Nhập
1. Mở incognito window
2. Truy cập product listing
3. **Kỳ vọng:**
   - Thấy giá gốc
   - Thấy message "Đăng nhập để nhận giảm giá đến 20%"
   - Không có tier badge

### Test Case 2: MEMBER (5%)
1. Tạo test customer
2. KHÔNG gán tag gì
3. Đăng nhập
4. **Kỳ vọng:**
   - Thấy badge "MEMBER -5%"
   - Giá gốc gạch ngang
   - Giá mới = giá gốc × 0.95
   - Khi checkout: Tự động giảm 5%

### Test Case 3: SILVER (7%)
1. Tạo customer với tag "SILVER"
2. Đăng nhập
3. **Kỳ vọng:**
   - Badge "SILVER -7%"
   - Giá mới = giá gốc × 0.93
   - Checkout tự động giảm 7%

### Test Case 4: GOLD (10%)
1. Customer tag "GOLD"
2. **Kỳ vọng:**
   - Badge "GOLD -10%"
   - Giá mới = giá gốc × 0.90
   - Checkout giảm 10%

### Test Case 5: PLATINUM (12%)
1. Customer tag "PLATINUM"
2. **Kỳ vọng:**
   - Badge "PLATINUM -12%"
   - Giá mới = giá gốc × 0.88
   - Checkout giảm 12%

### Test Case 6: DIAMOND (15%)
1. Customer tag "DIAMOND"
2. **Kỳ vọng:**
   - Badge "DIAMOND -15%"
   - Giá mới = giá gốc × 0.85
   - Checkout giảm 15%

### Test Case 7: BLACK DIAMOND (20%)
1. Customer tag "BLACK DIAMOND"
2. **Kỳ vọng:**
   - Badge "BLACK DIAMOND -20%" (có animation pulse)
   - Giá mới = giá gốc × 0.80
   - Checkout giảm 20%

### Test Case 8: Multiple Tags
1. Customer có cả "GOLD" và "SILVER" tags
2. **Kỳ vọng:**
   - Chỉ áp dụng GOLD (10%) - tier cao hơn
   - Segments đã filter đúng

---

## PHẦN 4: QUẢN LÝ KHÁCH HÀNG

### Cách Gán Tags Cho Khách Hàng

#### Thủ Công (Manual)
```
Shopify Admin → Customers → Chọn customer → Tags
Thêm tag: BLACK DIAMOND / DIAMOND / PLATINUM / GOLD / SILVER
Save
```

#### Tự Động (Automatic) - Dựa Trên Total Spent
Sử dụng Shopify Flow (nếu có):

```
Trigger: Customer total spent changes
Condition: 
  - If total_spent >= 100,000,000 VND → Add tag "BLACK DIAMOND"
  - If total_spent >= 20,000,000 VND → Add tag "DIAMOND"
  - If total_spent >= 10,000,000 VND → Add tag "PLATINUM"
  - If total_spent >= 6,000,000 VND → Add tag "GOLD"
  - If total_spent >= 3,000,000 VND → Add tag "SILVER"
```

#### Bulk Update (Hàng Loạt)
```
Shopify Admin → Customers
Chọn nhiều customers → More actions → Add tags
Nhập tag → Apply
```

---

## PHẦN 5: CUSTOMIZATION

### Thay Đổi % Giảm Giá

#### Option 1: Trong Shopify Admin
```
Discounts → Chọn discount → Edit
Thay đổi Value → Save
```

#### Option 2: Trong Theme Code
File: `snippets/tier-price.liquid`

```liquid
{% liquid
  if customer.tags contains "BLACK DIAMOND"
    assign tier_discount = 25  # Thay đổi từ 20 → 25
  elsif customer.tags contains "DIAMOND"
    assign tier_discount = 18  # Thay đổi từ 15 → 18
  # ...
%}
```

**⚠️ LƯU Ý:** Phải đồng bộ với Shopify Discounts!

---

### Thay Đổi Màu Sắc Badge

File: `assets/tier-pricing.css`

```css
/* Ví dụ: Đổi màu GOLD badge */
.tier-badge--gold {
  background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
  color: #YOUR_TEXT_COLOR;
  border: 1px solid #YOUR_BORDER_COLOR;
}
```

---

### Ẩn/Hiện Login Prompt

File: `snippets/tier-price.liquid`

Tìm và comment/xóa đoạn:
```liquid
{% comment %}
{% unless customer %}
  <div class="tier-login-prompt">
    <a href="{{ routes.account_login_url }}" class="tier-login-link">
      Đăng nhập để nhận giảm giá đến 20%
    </a>
  </div>
{% endunless %}
{% endcomment %}
```

---

### Áp Dụng Cho Specific Collections

Trong Shopify Admin → Discounts → Edit discount:

```
Applies to: Specific collections
Chọn collections muốn áp dụng
Save
```

---

## PHẦN 6: TROUBLESHOOTING

### Vấn Đề 1: Discount Không Tự Động Áp Dụng

**Nguyên nhân:**
- Customer không thuộc segment
- Segment filters sai
- Discount bị disable

**Giải pháp:**
1. Check customer có đúng tag không
2. Vào Segments → Xem customer có trong segment không
3. Vào Discounts → Check status = Active

---

### Vấn Đề 2: Hiển thị Sai Tier

**Nguyên nhân:**
- Customer có nhiều tags conflict
- Segment filters không đúng

**Giải pháp:**
1. Xóa các tags thừa của customer
2. Chỉ giữ 1 tier tag duy nhất
3. Re-check segment filters

---

### Vấn Đề 3: Giá Hiển thị Khác Giá Checkout

**Nguyên nhân:**
- Theme code tính sai %
- Discount chưa active

**Giải pháp:**
1. Check % trong `tier-price.liquid` khớp với Shopify Discounts
2. Verify discount status = Active
3. Test với incognito window

---

### Vấn Đề 4: Badge Không Hiển Thị

**Nguyên nhân:**
- CSS chưa load
- Browser cache

**Giải pháp:**
1. Hard refresh (Ctrl + F5)
2. Check `tier-pricing.css` đã được include trong `theme.liquid`
3. Check console có lỗi CSS không

---

### Vấn Đề 5: Multiple Discounts Conflict

**Nguyên nhân:**
- Có discount codes khác đang active
- Combinations settings sai

**Giải pháp:**
1. Vào Discounts → Check "Combinations" settings
2. Đảm bảo tier discounts có priority cao nhất
3. Disable các automatic discounts khác (nếu có)

---

## PHẦN 7: BEST PRACTICES

### 1. Quản Lý Tags
- ✅ Chỉ gán 1 tier tag cho mỗi customer
- ✅ Sử dụng naming convention nhất quán
- ✅ Định kỳ audit customer tags

### 2. Testing
- ✅ Test với nhiều browsers
- ✅ Test mobile responsive
- ✅ Test với products có sale price
- ✅ Test với products có variants

### 3. Performance
- ✅ CSS đã được optimize
- ✅ Không ảnh hưởng page load speed
- ✅ Lazy load images vẫn hoạt động

### 4. UX
- ✅ Badge rõ ràng, dễ nhìn
- ✅ Login prompt không quá aggressive
- ✅ Giá hiển thị consistent across pages

### 5. Maintenance
- ✅ Document mọi thay đổi
- ✅ Backup theme trước khi update
- ✅ Monitor discount usage trong Analytics

---

## PHẦN 8: ANALYTICS & REPORTING

### Theo Dõi Hiệu Quả

#### Shopify Analytics
```
Shopify Admin → Analytics → Reports

Xem:
- Discount usage by code
- Sales by customer segment
- Average order value by tier
```

#### Custom Reports
```
Customers → Export
Filter by tags → Analyze:
- Conversion rate by tier
- Repeat purchase rate
- Lifetime value by tier
```

---

## PHẦN 9: ROADMAP & FUTURE ENHANCEMENTS

### Tính Năng Sắp Tới
- [ ] Tier upgrade notifications
- [ ] Points system integration
- [ ] Exclusive products by tier
- [ ] Early access to sales
- [ ] Free shipping by tier
- [ ] Birthday discounts
- [ ] Referral bonuses

### Technical Improvements
- [ ] A/B testing different discount %
- [ ] Dynamic pricing based on inventory
- [ ] Personalized recommendations by tier
- [ ] Email automation for tier upgrades

---

## 📞 HỖ TRỢ

### Liên Hệ
- **Email:** support@helios.vn
- **Phone:** 1900-xxxx

### Resources
- [Shopify Segments Documentation](https://help.shopify.com/en/manual/customers/customer-segmentation)
- [Shopify Discounts Guide](https://help.shopify.com/en/manual/discounts)
- [Liquid Documentation](https://shopify.dev/docs/api/liquid)

---

## 📝 CHANGELOG

### Version 1.0.0 (2024-11-21)
- ✅ Initial implementation
- ✅ 6 tier levels support
- ✅ Automatic discount application
- ✅ UI integration
- ✅ Mobile responsive
- ✅ Documentation complete

---

**🎉 HOÀN THÀNH! Hệ thống tier pricing đã sẵn sàng sử dụng.**
