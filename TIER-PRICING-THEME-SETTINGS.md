# 🎯 HƯỚNG DẪN THÊM TIER PRICING VÀO THEME SETTINGS

## 📋 Tổng Quan

Thêm cài đặt Tier Pricing vào Shopify Theme Customizer để có thể chỉnh sửa trực tiếp trong Admin.

---

## 🚀 Cách Thêm Settings

### Bước 1: Mở File Settings Schema

Mở file `config/settings_schema.json`

### Bước 2: Tìm Vị Trí Thêm

Tìm section "Currency format" (khoảng dòng 1238)

### Bước 3: Thêm Code Sau Section "Currency format"

Thêm đoạn JSON sau (sau dấu `}` của Currency format và trước dấu `,`):

```json
,
{
  "name": "Tier Pricing",
  "settings": [
    {
      "type": "header",
      "content": "🎯 Tier Pricing System"
    },
    {
      "type": "paragraph",
      "content": "Cấu hình hệ thống giảm giá theo hạng thành viên. Thay đổi ở đây sẽ áp dụng cho toàn bộ theme."
    },
    {
      "type": "checkbox",
      "id": "tier_pricing_enabled",
      "label": "Bật Tier Pricing",
      "default": true
    },
    {
      "type": "header",
      "content": "Tier 1: BLACK DIAMOND"
    },
    {
      "type": "text",
      "id": "tier_1_name",
      "label": "Tên Tier",
      "default": "BLACK DIAMOND"
    },
    {
      "type": "text",
      "id": "tier_1_tag",
      "label": "Customer Tag",
      "default": "BLACK DIAMOND",
      "info": "Tag trong Shopify Admin → Customers"
    },
    {
      "type": "range",
      "id": "tier_1_discount",
      "min": 0,
      "max": 50,
      "step": 1,
      "unit": "%",
      "label": "% Giảm giá",
      "default": 20
    },
    {
      "type": "text",
      "id": "tier_1_threshold",
      "label": "Ngưỡng chi tiêu (VND)",
      "default": "100000000",
      "info": "100 triệu = 100000000"
    },
    {
      "type": "color",
      "id": "tier_1_color_start",
      "label": "Màu badge (bắt đầu)",
      "default": "#1a1a1a"
    },
    {
      "type": "color",
      "id": "tier_1_color_end",
      "label": "Màu badge (kết thúc)",
      "default": "#4a4a4a"
    },
    {
      "type": "color",
      "id": "tier_1_text_color",
      "label": "Màu chữ badge",
      "default": "#ffffff"
    },
    {
      "type": "header",
      "content": "Tier 2: DIAMOND"
    },
    {
      "type": "text",
      "id": "tier_2_name",
      "label": "Tên Tier",
      "default": "DIAMOND"
    },
    {
      "type": "text",
      "id": "tier_2_tag",
      "label": "Customer Tag",
      "default": "DIAMOND"
    },
    {
      "type": "range",
      "id": "tier_2_discount",
      "min": 0,
      "max": 50,
      "step": 1,
      "unit": "%",
      "label": "% Giảm giá",
      "default": 15
    },
    {
      "type": "text",
      "id": "tier_2_threshold",
      "label": "Ngưỡng chi tiêu (VND)",
      "default": "20000000"
    },
    {
      "type": "color",
      "id": "tier_2_color_start",
      "label": "Màu badge (bắt đầu)",
      "default": "#b9f2ff"
    },
    {
      "type": "color",
      "id": "tier_2_color_end",
      "label": "Màu badge (kết thúc)",
      "default": "#00d4ff"
    },
    {
      "type": "color",
      "id": "tier_2_text_color",
      "label": "Màu chữ badge",
      "default": "#000000"
    },
    {
      "type": "header",
      "content": "Tier 3: PLATINUM"
    },
    {
      "type": "text",
      "id": "tier_3_name",
      "label": "Tên Tier",
      "default": "PLATINUM"
    },
    {
      "type": "text",
      "id": "tier_3_tag",
      "label": "Customer Tag",
      "default": "PLATINUM"
    },
    {
      "type": "range",
      "id": "tier_3_discount",
      "min": 0,
      "max": 50,
      "step": 1,
      "unit": "%",
      "label": "% Giảm giá",
      "default": 12
    },
    {
      "type": "text",
      "id": "tier_3_threshold",
      "label": "Ngưỡng chi tiêu (VND)",
      "default": "10000000"
    },
    {
      "type": "color",
      "id": "tier_3_color_start",
      "label": "Màu badge (bắt đầu)",
      "default": "#e5e4e2"
    },
    {
      "type": "color",
      "id": "tier_3_color_end",
      "label": "Màu badge (kết thúc)",
      "default": "#c0c0c0"
    },
    {
      "type": "color",
      "id": "tier_3_text_color",
      "label": "Màu chữ badge",
      "default": "#000000"
    },
    {
      "type": "header",
      "content": "Tier 4: GOLD"
    },
    {
      "type": "text",
      "id": "tier_4_name",
      "label": "Tên Tier",
      "default": "GOLD"
    },
    {
      "type": "text",
      "id": "tier_4_tag",
      "label": "Customer Tag",
      "default": "GOLD"
    },
    {
      "type": "range",
      "id": "tier_4_discount",
      "min": 0,
      "max": 50,
      "step": 1,
      "unit": "%",
      "label": "% Giảm giá",
      "default": 10
    },
    {
      "type": "text",
      "id": "tier_4_threshold",
      "label": "Ngưỡng chi tiêu (VND)",
      "default": "6000000"
    },
    {
      "type": "color",
      "id": "tier_4_color_start",
      "label": "Màu badge (bắt đầu)",
      "default": "#ffd700"
    },
    {
      "type": "color",
      "id": "tier_4_color_end",
      "label": "Màu badge (kết thúc)",
      "default": "#ffed4e"
    },
    {
      "type": "color",
      "id": "tier_4_text_color",
      "label": "Màu chữ badge",
      "default": "#000000"
    },
    {
      "type": "header",
      "content": "Tier 5: SILVER"
    },
    {
      "type": "text",
      "id": "tier_5_name",
      "label": "Tên Tier",
      "default": "SILVER"
    },
    {
      "type": "text",
      "id": "tier_5_tag",
      "label": "Customer Tag",
      "default": "SILVER"
    },
    {
      "type": "range",
      "id": "tier_5_discount",
      "min": 0,
      "max": 50,
      "step": 1,
      "unit": "%",
      "label": "% Giảm giá",
      "default": 7
    },
    {
      "type": "text",
      "id": "tier_5_threshold",
      "label": "Ngưỡng chi tiêu (VND)",
      "default": "3000000"
    },
    {
      "type": "color",
      "id": "tier_5_color_start",
      "label": "Màu badge (bắt đầu)",
      "default": "#c0c0c0"
    },
    {
      "type": "color",
      "id": "tier_5_color_end",
      "label": "Màu badge (kết thúc)",
      "default": "#e8e8e8"
    },
    {
      "type": "color",
      "id": "tier_5_text_color",
      "label": "Màu chữ badge",
      "default": "#000000"
    },
    {
      "type": "header",
      "content": "Tier 6: MEMBER (Base)"
    },
    {
      "type": "text",
      "id": "tier_6_name",
      "label": "Tên Tier",
      "default": "MEMBER"
    },
    {
      "type": "range",
      "id": "tier_6_discount",
      "min": 0,
      "max": 50,
      "step": 1,
      "unit": "%",
      "label": "% Giảm giá",
      "default": 5
    },
    {
      "type": "color",
      "id": "tier_6_color_start",
      "label": "Màu badge (bắt đầu)",
      "default": "#667eea"
    },
    {
      "type": "color",
      "id": "tier_6_color_end",
      "label": "Màu badge (kết thúc)",
      "default": "#764ba2"
    },
    {
      "type": "color",
      "id": "tier_6_text_color",
      "label": "Màu chữ badge",
      "default": "#ffffff"
    },
    {
      "type": "header",
      "content": "⚙️ Display Settings"
    },
    {
      "type": "checkbox",
      "id": "tier_show_original_price",
      "label": "Hiển thị giá gốc (gạch ngang)",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "tier_show_badge",
      "label": "Hiển thị badge tier",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "tier_show_badge_product_page",
      "label": "Hiển thị badge trên product page",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "tier_show_badge_listing",
      "label": "Hiển thị badge trên collection",
      "default": true
    },
    {
      "type": "header",
      "content": "🎨 Badge Style"
    },
    {
      "type": "range",
      "id": "tier_badge_font_size",
      "min": 8,
      "max": 20,
      "step": 1,
      "unit": "px",
      "label": "Font size badge",
      "default": 11
    },
    {
      "type": "range",
      "id": "tier_badge_font_size_small",
      "min": 6,
      "max": 16,
      "step": 1,
      "unit": "px",
      "label": "Font size badge (nhỏ)",
      "default": 9
    },
    {
      "type": "range",
      "id": "tier_badge_border_radius",
      "min": 0,
      "max": 20,
      "step": 1,
      "unit": "px",
      "label": "Bo góc badge",
      "default": 6
    },
    {
      "type": "header",
      "content": "🔧 Advanced Settings"
    },
    {
      "type": "checkbox",
      "id": "tier_prioritize_tags",
      "label": "Ưu tiên customer tags",
      "default": true,
      "info": "Nếu bật: Customer có tag tier sẽ dùng tag. Nếu tắt: Luôn dùng total_spent"
    },
    {
      "type": "checkbox",
      "id": "tier_use_custom_metafield",
      "label": "Dùng custom metafield cho total_spent",
      "default": true
    },
    {
      "type": "text",
      "id": "tier_metafield_namespace",
      "label": "Metafield namespace",
      "default": "custom"
    },
    {
      "type": "text",
      "id": "tier_metafield_key",
      "label": "Metafield key",
      "default": "total_spent"
    }
  ]
}
```

### Bước 4: Lưu File

Lưu file `settings_schema.json`

### Bước 5: Kiểm Tra

1. Vào Shopify Admin
2. Online Store → Themes → Customize
3. Click vào icon ⚙️ (Theme settings) ở sidebar trái
4. Cuộn xuống dưới → Sẽ thấy section "Tier Pricing"

---

## 📸 Screenshot

Sau khi thêm, bạn sẽ thấy:

```
Theme Settings
├── ...
├── Currency format
├── Tier Pricing  ← MỚI
│   ├── 🎯 Tier Pricing System
│   ├── Tier 1: BLACK DIAMOND
│   │   ├── Tên Tier
│   │   ├── Customer Tag
│   │   ├── % Giảm giá (slider 0-50%)
│   │   ├── Ngưỡng chi tiêu
│   │   ├── Màu badge (bắt đầu)
│   │   ├── Màu badge (kết thúc)
│   │   └── Màu chữ badge
│   ├── Tier 2: DIAMOND
│   ├── ...
│   ├── ⚙️ Display Settings
│   ├── 🎨 Badge Style
│   └── 🔧 Advanced Settings
└── Analytics & Tracking
```

---

## 🎯 Cách Sử Dụng Sau Khi Thêm

### 1. Thay Đổi % Giảm Giá

1. Vào Theme Settings → Tier Pricing
2. Tìm tier muốn sửa (ví dụ: Tier 4: GOLD)
3. Kéo slider "% Giảm giá" từ 10% → 12%
4. Click "Save" ở góc trên phải

**Kết quả:** Tất cả GOLD members sẽ được giảm 12% thay vì 10%

---

### 2. Thay Đổi Màu Badge

1. Vào Theme Settings → Tier Pricing
2. Tìm tier muốn sửa
3. Click vào ô màu "Màu badge (bắt đầu)"
4. Chọn màu mới
5. Làm tương tự cho "Màu badge (kết thúc)"
6. Click "Save"

---

### 3. Thay Đổi Ngưỡng Chi Tiêu

1. Vào Theme Settings → Tier Pricing
2. Tìm tier muốn sửa
3. Sửa "Ngưỡng chi tiêu (VND)"
4. Ví dụ: Đổi từ `6000000` → `8000000`
5. Click "Save"

---

### 4. Bật/Tắt Tier Pricing

1. Vào Theme Settings → Tier Pricing
2. Tìm checkbox "Bật Tier Pricing" ở đầu
3. Bỏ tick để tắt
4. Click "Save"

**Kết quả:** Tất cả customers sẽ thấy giá gốc, không có discount

---

### 5. Ẩn/Hiện Badge

1. Vào Theme Settings → Tier Pricing
2. Cuộn xuống "⚙️ Display Settings"
3. Bỏ tick "Hiển thị badge tier"
4. Click "Save"

**Kết quả:** Giá vẫn giảm nhưng không hiển thị badge

---

## 🔄 Update Snippets Để Dùng Settings

Sau khi thêm settings, cần update các snippets để đọc từ `settings` thay vì hardcode.

### Update `snippets/tier-price.liquid`

Thay thế phần đầu file bằng:

```liquid
{% liquid
  comment Đọc config từ theme settings
  endcomment
  assign tier_enabled = settings.tier_pricing_enabled
  
  if tier_enabled == false
    comment Nếu tắt tier pricing, hiển thị giá gốc
    endcomment
    echo price | money
  else
    comment Logic tier pricing như cũ nhưng dùng settings
    endcomment
    
    if customer
      if customer.tags contains settings.tier_1_tag
        assign tier_discount = settings.tier_1_discount
        assign tier_name = settings.tier_1_name
      elsif customer.tags contains settings.tier_2_tag
        assign tier_discount = settings.tier_2_discount
        assign tier_name = settings.tier_2_name
      endif
      comment ... tiếp tục cho các tiers khác
    endif
  endif
%}
```

---

## ✅ Checklist

- [ ] Backup file `settings_schema.json` trước khi sửa
- [ ] Thêm JSON code vào đúng vị trí
- [ ] Kiểm tra syntax JSON (không có dấu phẩy thừa)
- [ ] Lưu file
- [ ] Refresh Shopify Admin
- [ ] Vào Theme Settings → Kiểm tra có section "Tier Pricing"
- [ ] Test thay đổi 1 setting
- [ ] Click Save và verify thay đổi có hiệu lực
- [ ] Update snippets để đọc từ settings
- [ ] Test toàn bộ trên frontend

---

## 🐛 Troubleshooting

### Lỗi: "Invalid JSON"

**Nguyên nhân:** Syntax JSON sai

**Giải pháp:**
1. Dùng JSON validator: https://jsonlint.com/
2. Kiểm tra dấu phẩy, ngoặc
3. Đảm bảo không có trailing comma

---

### Không Thấy Section "Tier Pricing"

**Nguyên nhân:** Code chưa được lưu hoặc vị trí sai

**Giải pháp:**
1. Hard refresh browser (Ctrl + Shift + R)
2. Kiểm tra code đã lưu đúng file
3. Kiểm tra vị trí thêm code

---

### Settings Không Có Hiệu Lực

**Nguyên nhân:** Snippets chưa được update để đọc settings

**Giải pháp:**
1. Update `tier-price.liquid` để dùng `settings.tier_X_discount`
2. Update `tier-config-css.liquid` để dùng `settings.tier_X_color_start`
3. Clear cache

---

## 📞 Hỗ Trợ

**Cần giúp đỡ?**
- Email: support@helios.vn
- Phone: 1900-xxxx

---

**Version:** 2.0.0  
**Last Updated:** 2024-11-21  
**Status:** Ready to Implement ✅
