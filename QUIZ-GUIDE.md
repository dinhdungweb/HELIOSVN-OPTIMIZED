# 📋 HƯỚNG DẪN SỬ DỤNG QUIZ SECTION

## 🎯 Tổng Quan

Quiz Section cho phép tạo bài khảo sát/quiz tương tác để:
- Tư vấn sản phẩm phù hợp cho khách hàng
- Thu thập thông tin về sở thích
- Tăng engagement và conversion
- Đề xuất sản phẩm dựa trên kết quả

---

## 🚀 Cách Thêm Quiz Vào Trang

### Bước 1: Thêm Section
1. Vào **Theme Editor**
2. Chọn trang muốn thêm quiz (ví dụ: trang "Quiz" hoặc trang chủ)
3. Click **Add section** → Chọn **Quiz**

### Bước 2: Cấu Hình Cơ Bản

**Section Settings:**
- **Tiêu đề**: "Tìm phong cách phù hợp với bạn"
- **Phương pháp kết luận**: 
  - `Category có điểm cao nhất` (đơn giản, dễ dùng)
  - `Theo rules` (nâng cao, linh hoạt hơn)
- **Hiển thị tiến độ**: ✅ (khuyến nghị)
- **Lưu trạng thái**: ✅ (cho phép người dùng quay lại)
- **Cho phép làm lại**: ✅

**Tùy Chỉnh Giao Diện:**
- **Màu nhấn**: `#fab320` (màu nút, progress bar)
- **Màu nền**: `#0e0e0e` (nền section)
- **Màu chữ**: `#f2f2f2`
- **Màu khối nội dung**: `rgba(255,255,255,0.06)`
- **Bo góc**: `12px`
- **Độ đổ bóng**: `16`
- **Hiệu ứng mờ (glass)**: ✅

---

## 📝 Cách Tạo Câu Hỏi

### Thêm Block "Câu hỏi"

1. Click **Add block** → Chọn **Câu hỏi**
2. Điền thông tin:

**Nội dung câu hỏi:**
```
Phong cách trang sức nào bạn thích?
```

**Danh sách lựa chọn (JSON):**
```json
[
  {
    "label": "Mạnh mẽ, cá tính",
    "weights": {
      "bold": 3,
      "edgy": 2
    },
    "tags": ["prefer_bold"]
  },
  {
    "label": "Tối giản, thanh lịch",
    "weights": {
      "minimal": 3,
      "elegant": 2
    },
    "tags": ["prefer_minimal"]
  },
  {
    "label": "Cổ điển, sang trọng",
    "weights": {
      "classic": 3,
      "luxury": 2
    },
    "tags": ["prefer_classic"]
  }
]
```

**Ảnh câu hỏi (tuỳ chọn):**
- Upload ảnh minh họa cho câu hỏi
- Ảnh sẽ hiển thị bên trái (desktop) hoặc trên cùng (mobile)

**Alt ảnh:**
```
Phong cách trang sức
```

### 📊 Giải Thích JSON Options:

```json
{
  "label": "Văn bản hiển thị",           // BẮT BUỘC
  "weights": {                           // Điểm cho mỗi category
    "category_name": 3,                  // Số điểm (1-10)
    "another_category": 2
  },
  "tags": ["tag1", "tag2"]              // Tags để dùng trong rules
}
```

**Ví dụ thực tế:**

**Câu 1: Bạn thích phong cách nào?**
```json
[
  {
    "label": "Mạnh mẽ, nổi bật",
    "weights": {"bold": 3, "statement": 2}
  },
  {
    "label": "Nhẹ nhàng, tinh tế",
    "weights": {"minimal": 3, "delicate": 2}
  }
]
```

**Câu 2: Bạn thường đeo trang sức khi nào?**
```json
[
  {
    "label": "Hàng ngày",
    "weights": {"casual": 3, "everyday": 2},
    "tags": ["daily_wear"]
  },
  {
    "label": "Dịp đặc biệt",
    "weights": {"formal": 3, "luxury": 2},
    "tags": ["special_occasion"]
  }
]
```

---

## 🎯 Cách Tạo Kết Luận

### Phương Pháp 1: Category Có Điểm Cao Nhất (Đơn Giản)

**Cách hoạt động:**
- Mỗi lựa chọn cộng điểm vào các categories
- Cuối quiz, category nào có điểm cao nhất sẽ được chọn
- Hiển thị kết luận tương ứng với category đó

**Ví dụ:**

**Block Kết luận 1:**
- **Category**: `bold`
- **Tiêu đề**: `Phong cách mạnh mẽ, cá tính`
- **Mô tả**: 
```
Bạn là người yêu thích sự nổi bật và không ngại thể hiện cá tính. 
Những món trang sức to bản, có thiết kế độc đáo sẽ phù hợp với bạn.
```
- **Ảnh kết luận**: Upload ảnh minh họa
- **Nhãn nút**: `Khám phá ngay`
- **Link nút**: `/collections/bold-jewelry`
- **Collection đề xuất**: Chọn collection "Bold Jewelry"
- **Số sản phẩm đề xuất**: `6`
- **Tiêu đề đề xuất**: `Sản phẩm phù hợp với bạn`

**Block Kết luận 2:**
- **Category**: `minimal`
- **Tiêu đề**: `Phong cách tối giản, thanh lịch`
- **Mô tả**: 
```
Bạn yêu thích sự đơn giản nhưng tinh tế. 
Những món trang sức nhỏ nhắn, thanh lịch sẽ hoàn thiện phong cách của bạn.
```
- **Collection đề xuất**: Chọn collection "Minimal Jewelry"

### Phương Pháp 2: Theo Rules (Nâng Cao)

**Cách hoạt động:**
- Kiểm tra điều kiện (rules) theo thứ tự
- Kết luận đầu tiên match điều kiện sẽ được chọn
- Linh hoạt hơn, có thể kết hợp nhiều điều kiện

**Rule JSON Format:**

```json
{
  "any": [
    {"category": "bold", "gte": 6},
    {"tags": ["prefer_bold"]}
  ]
}
```

**Giải thích:**
- `any`: Match BẤT KỲ điều kiện nào (OR logic)
- `all`: Match TẤT CẢ điều kiện (AND logic)
- `category`: Tên category
- `gte`: Greater than or equal (≥)
- `lte`: Less than or equal (≤)
- `eq`: Equal (=)
- `tags`: Kiểm tra tags

**Ví dụ Rules:**

**Rule 1: Bold & Edgy**
```json
{
  "all": [
    {"category": "bold", "gte": 6},
    {"category": "edgy", "gte": 4}
  ]
}
```
→ Cần cả 2 điều kiện: bold ≥ 6 VÀ edgy ≥ 4

**Rule 2: Minimal hoặc có tag prefer_minimal**
```json
{
  "any": [
    {"category": "minimal", "gte": 8},
    {"tags": ["prefer_minimal"]}
  ]
}
```
→ Match nếu: minimal ≥ 8 HOẶC có tag "prefer_minimal"

**Rule 3: Luxury với điều kiện phức tạp**
```json
{
  "all": [
    {"category": "luxury", "gte": 5},
    {
      "any": [
        {"tags": ["special_occasion"]},
        {"category": "formal", "gte": 3}
      ]
    }
  ]
}
```
→ luxury ≥ 5 VÀ (có tag "special_occasion" HOẶC formal ≥ 3)

---

## 🎨 Ví Dụ Quiz Hoàn Chỉnh

### Quiz: "Tìm Phong Cách Trang Sức Của Bạn"

**Câu 1: Bạn thích phong cách nào?**
```json
[
  {"label": "Mạnh mẽ, cá tính", "weights": {"bold": 3, "edgy": 2}},
  {"label": "Tối giản, thanh lịch", "weights": {"minimal": 3, "elegant": 2}},
  {"label": "Cổ điển, sang trọng", "weights": {"classic": 3, "luxury": 2}}
]
```

**Câu 2: Bạn thường đeo trang sức khi nào?**
```json
[
  {"label": "Hàng ngày", "weights": {"casual": 3, "everyday": 2}, "tags": ["daily"]},
  {"label": "Đi làm", "weights": {"professional": 3, "elegant": 2}, "tags": ["work"]},
  {"label": "Dịp đặc biệt", "weights": {"formal": 3, "luxury": 2}, "tags": ["special"]}
]
```

**Câu 3: Chất liệu nào bạn ưa thích?**
```json
[
  {"label": "Bạc 925", "weights": {"silver": 3, "affordable": 2}},
  {"label": "Vàng", "weights": {"gold": 3, "luxury": 2}},
  {"label": "Không quan trọng", "weights": {"versatile": 2}}
]
```

**Kết luận 1: Bold & Edgy**
- Category: `bold`
- Tiêu đề: `Phong Cách Mạnh Mẽ`
- Collection: `bold-jewelry`

**Kết luận 2: Minimal & Elegant**
- Category: `minimal`
- Tiêu đề: `Phong Cách Tối Giản`
- Collection: `minimal-jewelry`

**Kết luận 3: Classic & Luxury**
- Category: `classic`
- Tiêu đề: `Phong Cách Cổ Điển`
- Collection: `classic-jewelry`

---

## 🔧 Tips & Best Practices

### 1. Số Lượng Câu Hỏi
- **Tối ưu**: 5-7 câu
- **Tối thiểu**: 3 câu
- **Tối đa**: 10 câu (quá nhiều người dùng sẽ bỏ cuộc)

### 2. Số Lựa Chọn Mỗi Câu
- **Tối ưu**: 3-4 lựa chọn
- **Tối đa**: 6 lựa chọn

### 3. Điểm Weights
- Dùng thang điểm 1-10
- Lựa chọn chính: 3-5 điểm
- Lựa chọn phụ: 1-2 điểm
- Tổng điểm mỗi câu nên tương đương nhau

### 4. Categories
- Dùng tên ngắn gọn: `bold`, `minimal`, `classic`
- Không dùng dấu cách: `bold_style` ✅, `bold style` ❌
- Nhất quán trong toàn bộ quiz

### 5. Kết Luận
- Tạo ít nhất 3 kết luận khác nhau
- Mỗi kết luận nên có collection đề xuất
- Viết mô tả hấp dẫn, cá nhân hóa

### 6. Ảnh
- Kích thước khuyến nghị: 1200x800px
- Format: WebP hoặc JPG
- Nén ảnh để tối ưu tốc độ

---

## 🐛 Troubleshooting

### Lỗi: "Chưa cấu hình câu hỏi"
→ Chưa thêm block "Câu hỏi" hoặc JSON options sai format

### Lỗi: "Không tìm thấy kết luận"
→ Không có kết luận nào match hoặc chưa thêm block "Kết luận"

### Options không hiển thị
→ Kiểm tra JSON format, đảm bảo có `label` cho mỗi option

### Điểm không tính đúng
→ Kiểm tra `weights` có đúng format object không: `{"category": 3}`

### Rules không hoạt động
→ Đảm bảo chọn phương pháp "Theo rules" trong settings

---

## 📱 Responsive Design

Quiz tự động responsive:
- **Desktop**: Layout 2 cột (ảnh trái, nội dung phải)
- **Tablet**: Layout 2 cột thu nhỏ
- **Mobile**: Layout 1 cột (ảnh trên, nội dung dưới)

---

## 🎯 Use Cases

### 1. Tư Vấn Phong Cách
```
Câu hỏi về: sở thích, dịp sử dụng, ngân sách
→ Đề xuất: Collection phù hợp
```

### 2. Tìm Quà Tặng
```
Câu hỏi về: người nhận, dịp tặng, mối quan hệ
→ Đề xuất: Sản phẩm quà tặng
```

### 3. Khảo Sát Khách Hàng
```
Câu hỏi về: thói quen mua sắm, sở thích
→ Thu thập: Insights về khách hàng
```

---

## 📊 Analytics

Quiz tự động lưu:
- Tiến độ vào localStorage (nếu bật persist)
- Có thể tích hợp Google Analytics để track:
  - Số người hoàn thành quiz
  - Kết luận phổ biến nhất
  - Tỷ lệ bỏ cuộc ở câu nào

---

## 🚀 Next Steps

1. Tạo quiz đầu tiên với 3-5 câu hỏi đơn giản
2. Test trên mobile và desktop
3. Thu thập feedback từ khách hàng
4. Tối ưu dựa trên kết quả

---

**Cần hỗ trợ?** 
- Check console log để debug
- Xem file `assets/quiz.js` để hiểu logic
- Test với JSON validator: https://jsonlint.com/

**Version**: 1.0  
**Last Updated**: November 2025
