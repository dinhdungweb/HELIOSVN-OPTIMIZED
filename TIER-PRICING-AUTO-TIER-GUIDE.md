# 🎯 TIER PRICING - AUTO TIER (Không Cần Tags)

## 📋 TỔNG QUAN

Hệ thống tier pricing **TỰ ĐỘNG** phân loại khách hàng dựa trên `total_spent`, không cần gán tags thủ công.

### ✨ Ưu Điểm

- ✅ **Tự động 100%** - Không cần gán tags
- ✅ **Real-time** - Tự động update khi customer chi tiêu thêm
- ✅ **Đồng bộ** - Sử dụng logic giống `main-account.liquid`
- ✅ **Linh hoạt** - Vẫn có thể override bằng tags nếu cần
- ✅ **Đơn giản** - Không cần quản lý segments phức tạp

---

## 🎯 LOGIC PHÂN LOẠI

### Tự Động Theo Total Spent

```liquid
if total_spent >= 100,000,000 VND
  → BLACK DIAMOND (20% discount)
  
elsif total_spent >= 20,000,000 VND
  → DIAMOND (15% discount)
  
elsif total_spent >= 10,000,000 VND
  → PLATINUM (12% discount)
  
elsif total_spent >= 6,000,000 VND
  → GOLD (10% discount)
  
elsif total_spent >= 3,000,000 VND
  → SILVER (7% discount)
  
else (logged in)
  → MEMBER (5% discount)
```

### Override Bằng Tags (Optional)

Nếu customer có tag tier, sẽ ưu tiên tag thay vì total_spent:

```
Customer có tag "BLACK DIAMOND" → 20% (bất kể total_spent)
Customer có tag "GOLD" → 10% (bất kể total_spent)
```

**Use case:** VIP đặc biệt, influencer, nhân viên, etc.

---

## 🚀 SETUP (2 OPTIONS)

### OPTION A: Chỉ Hiển Thị UI (MIỄN PHÍ) ⭐ RECOMMENDED

**Ưu điểm:**
- ✅ Hoàn toàn miễn phí
- ✅ Không cần setup Shopify Admin
- ✅ Không cần Segments/Discounts
- ✅ Hiển thị giá đã giảm trên UI

**Hạn chế:**
- ⚠️ Giá trong checkout vẫn là giá gốc
- ⚠️ Cần dùng discount codes để giảm giá thật

#### Setup (5 phút)

**Bước 1: Code đã sẵn sàng ✅**
```
snippets/tier-price.liquid → Đã có logic auto-tier
assets/tier-pricing.css → Đã có styling
```

**Bước 2: Tạo Discount Codes (Optional)**
```
Shopify Admin → Discounts → Create discount code

Codes:
- AUTO_BLACK_DIAMOND_20 → 20% off
- AUTO_DIAMOND_15 → 15% off
- AUTO_PLATINUM_12 → 12% off
- AUTO_GOLD_10 → 10% off
- AUTO_SILVER_7 → 7% off
- AUTO_MEMBER_5 → 5% off

Customer eligibility: All customers
Usage limits: Unlimited
```

**Bước 3: Auto-apply Code**

Thêm vào `layout/theme.liquid` trước `</body>`:

```liquid
{% if customer %}
  {% comment %} Tính total_spent {% endcomment %}
  {% if customer.metafields.custom.total_spent != blank and customer.metafields.custom.total_spent != 0 %}
    {% assign total_spent = customer.metafields.custom.total_spent | plus: 0 %}
  {% else %}
    {% assign total_spent = customer.total_spent | divided_by: 100 %}
  {% endif %}
  
  <script>
    (function() {
      let discountCode = '';
      let totalSpent = {{ total_spent }};
      
      // Ưu tiên tags nếu có
      {% if customer.tags contains "BLACK DIAMOND" %}
        discountCode = 'AUTO_BLACK_DIAMOND_20';
      {% elsif customer.tags contains "DIAMOND" %}
        discountCode = 'AUTO_DIAMOND_15';
      {% elsif customer.tags contains "PLATINUM" %}
        discountCode = 'AUTO_PLATINUM_12';
      {% elsif customer.tags contains "GOLD" %}
        discountCode = 'AUTO_GOLD_10';
      {% elsif customer.tags contains "SILVER" %}
        discountCode = 'AUTO_SILVER_7';
      {% else %}
        // Tự động phân loại theo total_spent
        if (totalSpent >= 100000000) {
          discountCode = 'AUTO_BLACK_DIAMOND_20';
        } else if (totalSpent >= 20000000) {
          discountCode = 'AUTO_DIAMOND_15';
        } else if (totalSpent >= 10000000) {
          discountCode = 'AUTO_PLATINUM_12';
        } else if (totalSpent >= 6000000) {
          discountCode = 'AUTO_GOLD_10';
        } else if (totalSpent >= 3000000) {
          discountCode = 'AUTO_SILVER_7';
        } else {
          discountCode = 'AUTO_MEMBER_5';
        }
      {% endif %}
      
      // Auto-apply discount code
      if (discountCode) {
        // Thêm vào checkout URL
        const checkoutBtns = document.querySelectorAll('[name="checkout"], .checkout-button, [href*="/checkout"]');
        checkoutBtns.forEach(btn => {
          if (btn.tagName === 'A') {
            const url = new URL(btn.href);
            url.searchParams.set('discount', discountCode);
            btn.href = url.toString();
          } else {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              window.location.href = '/checkout?discount=' + discountCode;
            });
          }
        });
      }
    })();
  </script>
{% endif %}
```

**Kết quả:**
- UI hiển thị giá đã giảm
- Khi checkout, discount code tự động apply
- Khách được giảm giá thật

---

### OPTION B: Shopify Scripts (Shopify Plus Only) 💰

**Ưu điểm:**
- ✅ Giảm giá thật tự động
- ✅ Không cần discount codes
- ✅ Seamless UX

**Hạn chế:**
- ❌ Chỉ dành cho Shopify Plus ($2000+/tháng)

#### Setup Script

```ruby
# File: line_item_discount_by_total_spent.rb

customer = Input.cart.customer

if customer
  # Lấy total_spent
  total_spent = customer.total_spent.cents / 100.0
  
  # Xác định tier discount
  discount_percent = if customer.tags.include?("BLACK DIAMOND")
    0.20
  elsif customer.tags.include?("DIAMOND")
    0.15
  elsif customer.tags.include?("PLATINUM")
    0.12
  elsif customer.tags.include?("GOLD")
    0.10
  elsif customer.tags.include?("SILVER")
    0.07
  elsif total_spent >= 100_000_000
    0.20
  elsif total_spent >= 20_000_000
    0.15
  elsif total_spent >= 10_000_000
    0.12
  elsif total_spent >= 6_000_000
    0.10
  elsif total_spent >= 3_000_000
    0.07
  else
    0.05
  end
  
  # Áp dụng discount
  Input.cart.line_items.each do |line_item|
    line_item.change_line_price(
      line_item.line_price * (1 - discount_percent),
      message: "Tier Member Discount"
    )
  end
end

Output.cart = Input.cart
```

---

## 📊 SO SÁNH OPTIONS

| Feature | Option A (Free) | Option B (Plus) |
|---------|----------------|-----------------|
| **Cost** | Miễn phí | $2000+/tháng |
| **Setup** | 5 phút | 30 phút |
| **Auto-tier** | ✅ | ✅ |
| **UI Display** | ✅ | ✅ |
| **Real Discount** | ⚠️ Via codes | ✅ Automatic |
| **UX** | Good | Excellent |
| **Maintenance** | Low | Low |

---

## 🎯 BẢNG TIER

| Tier | Total Spent | Discount | Ví Dụ Giá |
|------|-------------|----------|-----------|
| BLACK DIAMOND | ≥ 100M | 20% | 1M → 800K |
| DIAMOND | ≥ 20M | 15% | 1M → 850K |
| PLATINUM | ≥ 10M | 12% | 1M → 880K |
| GOLD | ≥ 6M | 10% | 1M → 900K |
| SILVER | ≥ 3M | 7% | 1M → 930K |
| MEMBER | Logged in | 5% | 1M → 950K |
| GUEST | Not logged in | 0% | 1M → 1M |

---

## 🔧 CUSTOMIZATION

### Thay Đổi Thresholds

File: `snippets/tier-price.liquid`

```liquid
if total_spent >= 150000000  # Thay đổi từ 100M → 150M
  assign tier_discount = 20
  assign tier_name = "BLACK DIAMOND"
```

### Thay Đổi % Discount

```liquid
if total_spent >= 100000000
  assign tier_discount = 25  # Thay đổi từ 20% → 25%
  assign tier_name = "BLACK DIAMOND"
```

### Thêm Tier Mới

```liquid
elsif total_spent >= 200000000
  assign tier_discount = 25
  assign tier_name = "ULTRA DIAMOND"
  assign has_tier = true
```

---

## 🧪 TESTING

### Test Case 1: Customer Mới (< 3M)
```
Total spent: 0 VND
Expected: MEMBER badge, 5% discount
```

### Test Case 2: SILVER (3M - 6M)
```
Total spent: 4,500,000 VND
Expected: SILVER badge, 7% discount
```

### Test Case 3: GOLD (6M - 10M)
```
Total spent: 8,000,000 VND
Expected: GOLD badge, 10% discount
```

### Test Case 4: BLACK DIAMOND (≥ 100M)
```
Total spent: 150,000,000 VND
Expected: BLACK DIAMOND badge, 20% discount
```

### Test Case 5: Tag Override
```
Total spent: 1,000,000 VND
Tag: "BLACK DIAMOND"
Expected: BLACK DIAMOND badge, 20% discount (ignore total_spent)
```

---

## 📈 MONITORING

### Theo Dõi Tier Distribution

```javascript
// Analytics script
const tierDistribution = {
  'BLACK DIAMOND': 0,
  'DIAMOND': 0,
  'PLATINUM': 0,
  'GOLD': 0,
  'SILVER': 0,
  'MEMBER': 0
};

// Track tier on page view
if (window.customerTier) {
  tierDistribution[window.customerTier]++;
  
  // Send to analytics
  gtag('event', 'tier_view', {
    'tier': window.customerTier,
    'total_spent': window.customerTotalSpent
  });
}
```

---

## ⚠️ LƯU Ý

### 1. Total Spent Source
```
Ưu tiên: customer.metafields.custom.total_spent
Fallback: customer.total_spent (chia 100 vì Shopify lưu cents)
```

### 2. Tag Override
```
Nếu có tag tier → Dùng tag
Nếu không có tag → Dùng total_spent
```

### 3. Real-time Update
```
Total_spent update sau khi order fulfilled
UI tự động update lần truy cập tiếp theo
```

### 4. Metafield Setup
```
Nếu dùng custom metafield:
- Namespace: custom
- Key: total_spent
- Type: number_integer
- Value: Total spent in VND (không chia 100)
```

---

## 🎉 KẾT LUẬN

### Khuyến Nghị

**Nếu bạn KHÔNG có Shopify Plus:**
→ Dùng **Option A** (Free với discount codes)

**Nếu bạn CÓ Shopify Plus:**
→ Dùng **Option B** (Scripts cho UX tốt nhất)

### Lợi Ích Auto-Tier

✅ Không cần quản lý tags thủ công
✅ Tự động update khi customer chi tiêu
✅ Đồng bộ với logic account page
✅ Dễ maintain và scale
✅ Transparent cho customers

---

## 📞 HỖ TRỢ

**Email:** support@helios.vn  
**Phone:** 1900-xxxx

---

**Version:** 2.0.0 (Auto-Tier)  
**Last Updated:** 2024-11-21  
**Status:** Production Ready ✅
