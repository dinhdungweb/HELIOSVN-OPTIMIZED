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

#### Option 2: Chỉ Các Collection Cụ Thể
```
Áp dụng Tier Pricing cho: Chỉ các collection cụ thể
Collection handles: trang-suc,nhan-bac,day-chuyen
```

**Cách lấy collection handle:**
1. Vào **Products** → **Collections**
2. Click vào collection muốn áp dụng
3. Xem URL: `https://admin.shopify.com/store/xxx/collections/HANDLE-O-DAY`
4. Copy phần `HANDLE-O-DAY`

**Ví dụ:**
- Collection "Trang Sức Bạc" có handle: `trang-suc-bac`
- Collection "Nhẫn Cưới" có handle: `nhan-cuoi`
- Nhập vào settings: `trang-suc-bac,nhan-cuoi`

#### Option 3: Chỉ Các Sản Phẩm Có Tag
```
Áp dụng Tier Pricing cho: Chỉ các sản phẩm có tag
Product tag: tier-pricing
```

**Cách thêm tag cho sản phẩm:**
1. Vào **Products** → **All products**
2. Click vào sản phẩm muốn áp dụng tier pricing
3. Scroll xuống phần **Tags**
4. Thêm tag: `tier-pricing` (hoặc tag bạn đã cấu hình)
5. Click **Save**

## Use Cases

### Use Case 1: Chỉ Áp Dụng Cho Trang Sức Cao Cấp
```
Phạm vi: Chỉ các collection cụ thể
Collections: trang-suc-cao-cap,kim-cuong,vang-24k
```
→ Tier pricing chỉ hiển thị trên sản phẩm trong 3 collection này

### Use Case 2: Loại Trừ Sản Phẩm Sale
```
Phạm vi: Chỉ các sản phẩm có tag
Tag: tier-pricing
```
→ Chỉ thêm tag `tier-pricing` cho sản phẩm KHÔNG đang sale
→ Sản phẩm sale không có tag → không hiển thị tier pricing

### Use Case 3: Áp Dụng Cho Tất Cả Trừ Phụ Kiện
```
Phạm vi: Chỉ các collection cụ thể
Collections: nhan,day-chuyen,bong-tai,vong-tay,lac
```
→ Liệt kê tất cả collection trừ "phu-kien"

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

### Collection Handles
- Phải nhập chính xác handle (không phải tên hiển thị)
- Phân cách bằng dấu phẩy `,`
- Không có khoảng trắng thừa
- Ví dụ đúng: `nhan-bac,day-chuyen,bong-tai`
- Ví dụ sai: `nhan bac, day chuyen , bong tai`

### Product Tags
- Tag phải khớp chính xác (case-sensitive)
- Nếu settings là `tier-pricing`, sản phẩm phải có tag `tier-pricing`
- Tag `Tier-Pricing` hoặc `TIER-PRICING` sẽ KHÔNG hoạt động

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

### Collection Handle Không Hoạt Động
1. Vào collection trong admin
2. Copy handle từ URL
3. Paste vào settings
4. Đảm bảo không có khoảng trắng thừa

## Ví Dụ Cấu Hình Thực Tế

### Cửa Hàng Trang Sức
```
Phạm vi: Chỉ các collection cụ thể
Collections: nhan-kim-cuong,day-chuyen-vang,bong-tai-ngoc-trai
```

### Cửa Hàng Thời Trang
```
Phạm vi: Chỉ các sản phẩm có tag
Tag: vip-pricing
```
→ Thêm tag `vip-pricing` cho sản phẩm cao cấp

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
