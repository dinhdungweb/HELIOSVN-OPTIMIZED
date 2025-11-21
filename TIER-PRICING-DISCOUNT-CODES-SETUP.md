# 🎫 TIER PRICING - DISCOUNT CODES SETUP

## 📋 HƯỚNG DẪN TẠO DISCOUNT CODES

Để hệ thống auto-tier hoạt động với giảm giá THẬT, bạn cần tạo 6 discount codes.

---

## 🚀 SETUP NHANH (10 phút)

### Discount Code 1: BLACK DIAMOND (20%)

```
Shopify Admin → Discounts → Create discount → Discount code

Discount code: AUTO_BLACK_DIAMOND_20
Type: Percentage
Value: 20%

Applies to:
  ☑ All products
  (hoặc chọn Specific collections nếu muốn)

Minimum requirements:
  ○ None

Customer eligibility:
  ○ All customers

Maximum discount uses:
  ☐ Limit number of times this discount can be used in total
  (để trống = unlimited)

Combinations:
  ☐ Product discounts
  ☐ Order discounts
  ☐ Shipping discounts
  (BỎ TICK tất cả)

Active dates:
  Start date: Hôm nay
  End date: (để trống)

Status: Active ✅

Save discount
```

---

### Discount Code 2: DIAMOND (15%)

```
Discount code: AUTO_DIAMOND_15
Type: Percentage
Value: 15%
Applies to: All products
Customer eligibility: All customers
Combinations: BỎ TICK tất cả
Status: Active ✅

Save discount
```

---

### Discount Code 3: PLATINUM (12%)

```
Discount code: AUTO_PLATINUM_12
Type: Percentage
Value: 12%
Applies to: All products
Customer eligibility: All customers
Combinations: BỎ TICK tất cả
Status: Active ✅

Save discount
```

---

### Discount Code 4: GOLD (10%)

```
Discount code: AUTO_GOLD_10
Type: Percentage
Value: 10%
Applies to: All products
Customer eligibility: All customers
Combinations: BỎ TICK tất cả
Status: Active ✅

Save discount
```

---

### Discount Code 5: SILVER (7%)

```
Discount code: AUTO_SILVER_7
Type: Percentage
Value: 7%
Applies to: All products
Customer eligibility: All customers
Combinations: BỎ TICK tất cả
Status: Active ✅

Save discount
```

---

### Discount Code 6: MEMBER (5%)

```
Discount code: AUTO_MEMBER_5
Type: Percentage
Value: 5%
Applies to: All products
Customer eligibility: All customers
Combinations: BỎ TICK tất cả
Status: Active ✅

Save discount
```

---

## ✅ CHECKLIST

Sau khi tạo xong, verify:

- [ ] 6 discount codes đã được tạo
- [ ] Tất cả có Status = Active
- [ ] Tất cả có Type = Percentage
- [ ] Tất cả có Customer eligibility = All customers
- [ ] Tất cả có Combinations = BỎ TICK
- [ ] Code names chính xác (case-sensitive):
  - [ ] `AUTO_BLACK_DIAMOND_20`
  - [ ] `AUTO_DIAMOND_15`
  - [ ] `AUTO_PLATINUM_12`
  - [ ] `AUTO_GOLD_10`
  - [ ] `AUTO_SILVER_7`
  - [ ] `AUTO_MEMBER_5`

---

## 🧪 TESTING

### Test Discount Codes

#### Test 1: Manual Apply
```
1. Vào Shopify Admin → Discounts
2. Click vào discount code
3. Copy code
4. Mở incognito window
5. Add product to cart
6. Go to checkout
7. Paste code vào discount field
8. Verify: Discount applied correctly
```

#### Test 2: Auto Apply
```
1. Đăng nhập với test customer
2. Add product to cart
3. Click checkout
4. Verify: Discount code tự động apply
5. Check URL có ?discount=AUTO_XXX_XX
```

---

## 🎯 CÁCH HOẠT ĐỘNG

### Flow Diagram

```
Customer đăng nhập
    ↓
System tính total_spent
    ↓
Xác định tier (BLACK DIAMOND, DIAMOND, etc.)
    ↓
Chọn discount code tương ứng
    ↓
JavaScript auto-apply code vào checkout URL
    ↓
Customer click checkout
    ↓
Shopify tự động apply discount
    ↓
Customer thấy giá đã giảm
```

---

## 📊 DISCOUNT CODES SUMMARY

| Code | Discount | For Tier | Total Spent |
|------|----------|----------|-------------|
| `AUTO_BLACK_DIAMOND_20` | 20% | BLACK DIAMOND | ≥ 100M |
| `AUTO_DIAMOND_15` | 15% | DIAMOND | ≥ 20M |
| `AUTO_PLATINUM_12` | 12% | PLATINUM | ≥ 10M |
| `AUTO_GOLD_10` | 10% | GOLD | ≥ 6M |
| `AUTO_SILVER_7` | 7% | SILVER | ≥ 3M |
| `AUTO_MEMBER_5` | 5% | MEMBER | Logged in |

---

## 🔧 CUSTOMIZATION

### Thay Đổi % Discount

```
Shopify Admin → Discounts → Chọn code → Edit
Value: Thay đổi % → Save
```

**⚠️ LƯU Ý:** Nếu đổi %, phải đổi cả code name để match!

Ví dụ: Đổi BLACK DIAMOND từ 20% → 25%
- Code name: `AUTO_BLACK_DIAMOND_20` → `AUTO_BLACK_DIAMOND_25`
- Value: 20% → 25%
- Update trong `snippets/tier-auto-discount.liquid`

---

### Giới Hạn Sử Dụng

Nếu muốn giới hạn số lần dùng:

```
Maximum discount uses:
  ☑ Limit number of times this discount can be used in total
  Number: 1000 (ví dụ)
```

---

### Áp Dụng Cho Specific Collections

```
Applies to:
  ○ Specific collections
  Chọn collections muốn áp dụng
```

---

### Minimum Purchase Amount

```
Minimum requirements:
  ○ Minimum purchase amount
  Amount: 500,000 VND (ví dụ)
```

---

## 📈 MONITORING

### Xem Discount Usage

```
Shopify Admin → Analytics → Reports → Discounts

Metrics:
- Total discount amount
- Number of orders with discount
- Average discount per order
- Discount by code
```

### Export Report

```
Analytics → Reports → Discounts → Export
Format: CSV
Date range: Last 30 days
```

---

## ⚠️ TROUBLESHOOTING

### Vấn Đề 1: Code Không Apply

**Nguyên nhân:**
- Code name sai (case-sensitive)
- Code bị disable
- Customer không đủ điều kiện

**Giải pháp:**
1. Check code name chính xác
2. Verify Status = Active
3. Check Customer eligibility = All customers

---

### Vấn Đề 2: Discount Conflict

**Nguyên nhân:**
- Có discount khác đang active
- Combinations settings sai

**Giải pháp:**
1. Disable các discount codes khác
2. Verify Combinations = BỎ TICK tất cả

---

### Vấn Đề 3: Code Không Tự Động Apply

**Nguyên nhân:**
- JavaScript bị lỗi
- Snippet chưa được include

**Giải pháp:**
1. Check console có errors không
2. Verify `tier-auto-discount.liquid` đã được render trong `theme.liquid`
3. Hard refresh (Ctrl+F5)

---

## 🎉 HOÀN THÀNH!

Sau khi setup xong 6 discount codes:

✅ Hệ thống tự động phân loại tier theo total_spent
✅ UI hiển thị giá đã giảm
✅ Discount code tự động apply khi checkout
✅ Customer được giảm giá THẬT

---

## 📞 HỖ TRỢ

**Email:** support@helios.vn  
**Phone:** 1900-xxxx

---

## 📝 NEXT STEPS

1. ✅ Tạo 6 discount codes (10 phút)
2. ✅ Test với các tiers khác nhau (10 phút)
3. ✅ Monitor discount usage (ongoing)
4. ✅ Adjust % nếu cần (optional)

---

**Version:** 2.0.0  
**Last Updated:** 2024-11-21  
**Status:** Production Ready ✅
