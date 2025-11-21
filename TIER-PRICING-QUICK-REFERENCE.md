# ⚡ TIER PRICING - QUICK REFERENCE

## 🎯 BẢNG GIẢM GIÁ

| Hạng | Tag | % Giảm | Điều Kiện |
|------|-----|--------|-----------|
| BLACK DIAMOND | `BLACK DIAMOND` | 20% | ≥ 100,000,000 VND |
| DIAMOND | `DIAMOND` | 15% | ≥ 20,000,000 VND |
| PLATINUM | `PLATINUM` | 12% | ≥ 10,000,000 VND |
| GOLD | `GOLD` | 10% | ≥ 6,000,000 VND |
| SILVER | `SILVER` | 7% | ≥ 3,000,000 VND |
| MEMBER | (no tag) | 5% | Đã đăng nhập |
| GUEST | (not logged in) | 0% | Chưa đăng nhập |

---

## 🚀 SETUP NHANH (5 PHÚT)

### 1. Tạo Segments (2 phút)
```
Customers → Segments → Create segment

BLACK DIAMOND: tags contains "BLACK DIAMOND"
DIAMOND: tags contains "DIAMOND" AND NOT "BLACK DIAMOND"
PLATINUM: tags contains "PLATINUM" AND NOT "DIAMOND/BLACK DIAMOND"
GOLD: tags contains "GOLD" AND NOT "PLATINUM/DIAMOND/BLACK DIAMOND"
SILVER: tags contains "SILVER" AND NOT "GOLD/PLATINUM/DIAMOND/BLACK DIAMOND"
MEMBER: is logged in AND NOT any tier tags
```

### 2. Tạo Discounts (3 phút)
```
Discounts → Create discount → Automatic

BLACK DIAMOND: 20% → Segment: BLACK DIAMOND Members
DIAMOND: 15% → Segment: DIAMOND Members
PLATINUM: 12% → Segment: PLATINUM Members
GOLD: 10% → Segment: GOLD Members
SILVER: 7% → Segment: SILVER Members
MEMBER: 5% → Segment: MEMBER (Base)

⚠️ BỎ TICK "Combinations" cho tất cả!
```

---

## 👤 QUẢN LÝ KHÁCH HÀNG

### Gán Tag Thủ Công
```
Customers → Chọn customer → Tags → Thêm tag → Save
```

### Gán Tag Hàng Loạt
```
Customers → Chọn nhiều → More actions → Add tags
```

### Xóa Tag
```
Customers → Chọn customer → Tags → Click X → Save
```

---

## 🔍 KIỂM TRA NHANH

### Check Customer Tier
```
Customers → Chọn customer → Xem Tags
```

### Check Segment Membership
```
Customers → Segments → Chọn segment → Xem danh sách
```

### Check Discount Status
```
Discounts → Xem Status column (phải là "Active")
```

### Test Discount
```
1. Tạo test customer
2. Gán tag tier
3. Đăng nhập
4. Thêm sản phẩm vào cart
5. Vào checkout → Xem discount tự động apply
```

---

## 🎨 CUSTOMIZATION

### Thay Đổi % Giảm
```
Discounts → Chọn discount → Edit → Value → Save
```

### Thay Đổi Màu Badge
```
File: assets/tier-pricing.css
Tìm: .tier-badge--[tier-name]
Đổi: background, color, border
```

### Ẩn Login Prompt
```
File: snippets/tier-price.liquid
Comment dòng 60-66
```

---

## ⚠️ TROUBLESHOOTING

| Vấn Đề | Giải Pháp |
|--------|-----------|
| Discount không apply | Check customer có trong segment không |
| Sai tier hiển thị | Xóa tags thừa, chỉ giữ 1 tag |
| Badge không hiển thị | Hard refresh (Ctrl+F5) |
| Giá sai | Check % trong code = % trong discount |
| Multiple discounts | Check Combinations settings |

---

## 📊 CÔNG THỨC TÍNH GIÁ

```
Giá sau giảm = Giá gốc × (1 - Tier Discount %)

Ví dụ:
- Giá gốc: 1,000,000 VND
- Tier: GOLD (10%)
- Giá sau giảm: 1,000,000 × 0.9 = 900,000 VND
```

---

## 🔗 LINKS NHANH

- [Full Documentation](./TIER-PRICING-SETUP-GUIDE.md)
- [Shopify Segments](https://admin.shopify.com/customers/segments)
- [Shopify Discounts](https://admin.shopify.com/discounts)
- [Customer List](https://admin.shopify.com/customers)

---

## 📞 HỖ TRỢ KHẨN CẤP

**Email:** support@helios.vn  
**Phone:** 1900-xxxx  
**Response Time:** < 2 hours

---

**Last Updated:** 2024-11-21  
**Version:** 1.0.0
