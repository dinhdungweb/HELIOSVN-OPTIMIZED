# Hướng Dẫn Phạm Vi Áp Dụng Tier Pricing

## Tổng Quan
Tính năng này cho phép bạn kiểm soát tier pricing áp dụng cho:
- **Tất cả sản phẩm** (mặc định)
- **Chỉ các collection cụ thể**
- **Chỉ các sản phẩm có tag**

## Cấu Hình

### Bước 1: Vào Theme Settings
1. Vào **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize** trên theme đang dùng
3. Mở **Theme settings** (biểu tượng bánh răng)
4. Tìm section **Tier Pricing**

### Bước 2: Chọn Phạm Vi Áp Dụng

#### Option 1: Tất Cả Sản Phẩm (Mặc định)
```
Áp dụng Tier Pricing cho: Tất cả sản phẩm
```
- Tier pricing sẽ hiển thị trên mọi sản phẩm
- Không cần cấu hình thêm

#### Option 2: Chỉ Các Collection Được Chọn
```
Áp dụng Tier Pricing cho: Chỉ các collection được chọn
Chọn Collections: [Click để chọn collections]
```

**Cách chọn collections:**
1. Click vào field **"Chọn Collections"**
2. Popup hiện ra với danh sách tất cả collections
3. Tích chọn các collections muốn áp dụng tier pricing
4. Click **Done** hoặc **Select**
5. Có thể chọn tối đa 50 collections

**Ví dụ:**
- Chọn: "Trang Sức Bạc", "Nhẫn Cưới", "Dây Chuyền Vàng"
- Chỉ sản phẩm trong 3 collections này mới có tier pricing

#### Option 3: Chỉ Các Sản Phẩm Được Chọn
```
Áp dụng Tier Pricing cho: Chỉ các sản phẩm được chọn
Chọn Sản phẩm: [Click để chọn sản phẩm]
```

**Cách chọn sản phẩm:**
1. Click vào field **"Chọn Sản phẩm"**
2. Popup hiện ra với danh sách tất cả sản phẩm
3. Tích chọn các sản phẩm muốn áp dụng tier pricing
4. Click **Done** hoặc **Select**
5. Có thể chọn tối đa 20 sản phẩm (giới hạn của Shopify)
6. Có thể search sản phẩm theo tên

**Lưu ý:** Nếu cần áp dụng cho nhiều hơn 20 sản phẩm, hãy dùng option "Chỉ các collection được chọn" thay vì chọn từng sản phẩm.

**Ví dụ:**
- Chọn: "Nhẫn Kim Cương 1ct", "Dây Chuyền Vàng 18K", "Bông Tai Ngọc Trai"
- Chỉ 3 sản phẩm này mới có tier pricing

## Use Cases

### Use Case 1: Chỉ Áp Dụng Cho Trang Sức Cao Cấp
```
Phạm vi: Chỉ các collection cụ thể
Collections: trang-suc-cao-cap,kim-cuong,vang-24k
```
→ Tier pricing chỉ hiển thị trên sản phẩm trong 3 collection này

### Use Case 2: Chỉ Áp Dụng Cho Sản Phẩm VIP
```
Phạm vi: Chỉ các sản phẩm được chọn
Sản phẩm: [Chọn tối đa 20 sản phẩm VIP/cao cấp]
```
→ Tier pricing chỉ hiển thị trên các sản phẩm được chọn
→ Các sản phẩm khác giữ nguyên giá
→ Phù hợp cho sản phẩm đặc biệt, limited edition

### Use Case 3: Áp Dụng Cho Tất Cả Trừ Phụ Kiện
```
Phạm vi: Chỉ các collection được chọn
Collections: [Chọn tất cả collections trừ "Phụ Kiện"]
```
→ Chọn: Nhẫn, Dây Chuyền, Bông Tai, Vòng Tay, Lắc
→ Không chọn: Phụ Kiện

## Kiểm Tra Hoạt Động

### 1. Kiểm Tra Trên Product Page
- Vào trang sản phẩm
- Nếu thuộc phạm vi: Hiển thị tier pricing
- Nếu không thuộc phạm vi: Hiển thị giá thường

### 2. Kiểm Tra Trong Cart
- Thêm sản phẩm vào giỏ
- Mở cart drawer
- Sản phẩm thuộc phạm vi: Giá tier
- Sản phẩm không thuộc phạm vi: Giá thường

### 3. Kiểm Tra Collection Page
- Vào trang collection
- Hover vào sản phẩm
- Sản phẩm thuộc phạm vi: Badge tier hiển thị
- Sản phẩm không thuộc phạm vi: Không có badge

## Lưu Ý Quan Trọng

### Collection/Product Picker
- Sử dụng picker có sẵn của Shopify (dễ dùng, không sai)
- Có thể search theo tên
- Có thể chọn/bỏ chọn bất kỳ lúc nào
- Collections: Tối đa 50
- Products: Tối đa 20 (giới hạn của Shopify)

### Giới Hạn Số Lượng
- Nếu cần chọn nhiều hơn 20 sản phẩm → Dùng option "Collections"
- Nếu cần chọn nhiều hơn 50 collections → Dùng option "Tất cả sản phẩm"
- Option "Products" phù hợp cho việc chọn một vài sản phẩm đặc biệt/VIP

### Performance
- **Tất cả sản phẩm**: Nhanh nhất (không cần check)
- **Collection**: Hơi chậm (phải loop qua collections)
- **Tag**: Nhanh (chỉ check 1 tag)

## Troubleshooting

### Tier Pricing Không Hiển Thị
1. Kiểm tra **Tier Pricing** đã bật chưa
2. Kiểm tra phạm vi áp dụng đã chọn đúng chưa
3. Nếu dùng collections: Kiểm tra handle có đúng không
4. Nếu dùng tags: Kiểm tra sản phẩm có tag chưa
5. Kiểm tra customer đã đăng nhập và có tier chưa

### Tier Pricing Hiển Thị Sai Chỗ
1. Nếu muốn loại trừ sản phẩm: Dùng option "Chỉ các sản phẩm có tag"
2. Chỉ thêm tag cho sản phẩm muốn áp dụng
3. Không thêm tag cho sản phẩm muốn loại trừ

### Không Thấy Collection/Product Trong Picker
1. Đảm bảo collection/product đã được publish
2. Refresh lại trang customize
3. Thử search theo tên trong picker

## Ví Dụ Cấu Hình Thực Tế

### Cửa Hàng Trang Sức
```
Phạm vi: Chỉ các collection được chọn
Collections: [Chọn] Nhẫn Kim Cương, Dây Chuyền Vàng, Bông Tai Ngọc Trai
```

### Cửa Hàng Thời Trang
```
Phạm vi: Chỉ các sản phẩm được chọn
Sản phẩm: [Chọn] Áo Khoác Da, Giày Sneaker Limited, Túi Xách Cao Cấp
```
→ Chỉ áp dụng cho sản phẩm cao cấp

### Cửa Hàng Điện Tử
```
Phạm vi: Tất cả sản phẩm
```
→ Áp dụng tier cho mọi sản phẩm

## Kết Hợp Với Discount Codes

Tier pricing vẫn hoạt động bình thường với discount codes:
1. Giá tier được tính trước
2. Discount code áp dụng lên giá tier
3. Khách hàng được hưởng cả 2 ưu đãi

**Ví dụ:**
- Giá gốc: 1,000,000 VND
- Tier PLATINUM (-12%): 880,000 VND
- Discount code SALE10 (-10%): 792,000 VND
- Khách hàng trả: 792,000 VND
