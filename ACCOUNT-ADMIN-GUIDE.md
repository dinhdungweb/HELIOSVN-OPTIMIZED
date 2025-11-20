# Hướng Dẫn Quản Lý Trang Account Nâng Cấp - Helios

## 📋 Tổng Quan

Trang account đã được nâng cấp toàn diện với nhiều tính năng mới để cải thiện trải nghiệm khách hàng và dễ dàng quản lý cho admin.

## Tính Năng Mới

### 1. Dashboard Tổng Quan
- **Thống kê realtime**: Tổng chi tiêu, số đơn hàng, điểm tích lũy, hạng thành viên
- **Biểu đồ tương tác**: Chi tiêu 6 tháng, phân bố danh mục sản phẩm
- **Hoạt động gần đây**: Theo dõi hành vi khách hàng
- **Xuất dữ liệu**: Cho phép khách hàng tải báo cáo

### 2. Quản Lý Đơn Hàng Nâng Cao
- **Bộ lọc thông minh**: Theo trạng thái, ngày tháng
- **Giao diện card**: Hiển thị trực quan thông tin đơn hàng
- **Tính năng tương tác**: Mua lại, theo dõi, hủy đơn, đánh giá
- **Xuất Excel**: Báo cáo đơn hàng chi tiết

### 3. Hệ Thống Thông Báo
- **Thông báo realtime**: Popup thông báo tức thì
- **Đếm thông báo**: Badge hiển thị số thông báo chưa đọc
- **Phân loại**: Success, Error, Warning, Info
- **Tự động ẩn**: Thông báo tự động biến mất sau 5 giây

### 4. Quản Lý Thông Tin Cá Nhân
- **Chỉnh sửa inline**: Bật/tắt chế độ chỉnh sửa
- **Quản lý địa chỉ**: Thêm, sửa, xóa địa chỉ giao hàng
- **Bảo mật nâng cao**: Đổi mật khẩu, xác thực 2 bước
- **Trạng thái xác thực**: Hiển thị tình trạng xác minh

### 5. Danh Sách Yêu Thích
- **Lưu trữ local**: Sử dụng localStorage
- **Giao diện grid**: Hiển thị sản phẩm dạng lưới
- **Tương tác nhanh**: Thêm giỏ hàng, xóa khỏi wishlist
- **Chia sẻ**: Tính năng chia sẻ wishlist

### 6. Cài Đặt Tài Khoản
- **Toggle switches**: Giao diện hiện đại
- **Phân nhóm cài đặt**: Thông báo, quyền riêng tư, tài khoản
- **Xuất dữ liệu**: GDPR compliance
- **Xóa tài khoản**: Tính năng xóa an toàn

## Cấu Hình Admin

### Truy Cập Cài Đặt
1. Vào **Admin Panel** → **Online Store** → **Themes**
2. Chọn **Customize** → **Templates** → **customers/account**
3. Click vào section **Main Account**

### Các Tùy Chọn Cấu Hình

#### Giao Diện & Trải Nghiệm
- **Bật Dashboard**: Hiển thị trang tổng quan
- **Bật Biểu Đồ**: Hiển thị charts thống kê
- **Bật Thông Báo**: Hệ thống notification
- **Bật Wishlist**: Danh sách yêu thích
- **Màu Chủ Đạo**: Tùy chỉnh màu sắc giao diện
- **Màu Nền**: Màu nền chính

#### Dashboard
- **Lời Chào**: Tùy chỉnh tiêu đề dashboard
- **Biểu Đồ Chi Tiêu**: Bật/tắt chart chi tiêu
- **Biểu Đồ Danh Mục**: Bật/tắt chart phân bố
- **Hoạt Động Gần Đây**: Số lượng hoạt động hiển thị (3-10)

#### Đơn Hàng
- **Số Đơn/Trang**: 5-50 đơn hàng mỗi trang
- **Theo Dõi Đơn Hàng**: Bật tính năng tracking
- **Mua Lại**: Cho phép reorder
- **Hủy Đơn**: Khách hàng có thể hủy đơn

#### Tài Khoản
- **Upload Avatar**: Tính năng đang phát triển
- **Chỉnh Sửa Thông Tin**: Cho phép edit profile
- **Quản Lý Địa Chỉ**: Thêm/sửa/xóa địa chỉ
- **Xác Thực 2 Bước**: Tính năng bảo mật

#### Benefits Theo Hạng
- **HTML Editor**: Tùy chỉnh nội dung cho từng hạng thành viên
- **BLACK DIAMOND**: Nội dung cho hạng cao nhất
- **DIAMOND**: Nội dung hạng kim cương
- **PLATINUM**: Nội dung hạng bạch kim
- **GOLD**: Nội dung hạng vàng
- **SILVER**: Nội dung hạng bạc
- **MEMBER**: Nội dung hạng thành viên

#### Nâng Cao
- **CSS Tùy Chỉnh**: Thêm CSS riêng
- **JavaScript Tùy Chỉnh**: Thêm JS riêng
- **Analytics**: Theo dõi hành vi người dùng

## 🎯 Hướng Dẫn Sử Dụng

### Thiết Lập Ban Đầu
1. **Bật các tính năng cơ bản**:
   - ✅ Dashboard
   - ✅ Biểu đồ
   - ✅ Thông báo
   - ✅ Wishlist

2. **Cấu hình màu sắc**:
   - Màu chủ đạo: `#fab320` (vàng Helios)
   - Màu nền: `#000000` (đen)

3. **Thiết lập nội dung Benefits**:
   - Thêm HTML content cho từng hạng thành viên
   - Sử dụng HTML editor để format đẹp

### Tùy Chỉnh Nâng Cao

#### CSS Tùy Chỉnh
```css
/* Ví dụ: Thay đổi màu accent */
:root {
  --helios-primary: #your-color;
  --helios-secondary: #your-secondary-color;
}

.customer-account-container {
  --primary-color: var(--helios-primary);
}
```

#### JavaScript Tùy Chỉnh
```javascript
// Ví dụ: Thêm tracking event
document.addEventListener('DOMContentLoaded', function() {
  // Custom analytics tracking
  gtag('event', 'account_page_view', {
    'customer_tier': '{{ tier }}',
    'total_spent': {{ total_spent }}
  });
});
```

## Responsive Design

Giao diện được tối ưu cho tất cả thiết bị:
- **Desktop**: Layout 2 cột với sidebar
- **Tablet**: Layout responsive với tabs ngang
- **Mobile**: Stack layout với navigation tabs

## Bảo Mật & Hiệu Suất

### Bảo Mật
- ✅ XSS Protection
- ✅ CSRF Protection  
- ✅ Input Validation
- ✅ Secure localStorage

### Hiệu Suất
- ✅ Lazy Loading
- ✅ Code Splitting
- ✅ Image Optimization
- ✅ Caching Strategy

## Troubleshooting

### Lỗi Thường Gặp

#### 1. Biểu đồ không hiển thị
**Nguyên nhân**: Chart.js chưa load
**Giải pháp**: Kiểm tra CDN Chart.js trong template

#### 2. Thông báo không hoạt động
**Nguyên nhân**: JavaScript bị lỗi
**Giải pháp**: Mở Developer Tools kiểm tra console

#### 3. Wishlist không lưu
**Nguyên nhân**: localStorage bị disable
**Giải pháp**: Kiểm tra browser settings

#### 4. CSS không áp dụng
**Nguyên nhân**: Cache browser
**Giải pháp**: Hard refresh (Ctrl+F5)

### Debug Mode
Thêm vào URL: `?debug=1` để bật debug mode

## Hỗ Trợ

### Liên Hệ
- **Email**: support@helios.vn
- **Phone**: 1900-xxxx
- **Documentation**: [Link tài liệu]

### Cập Nhật
- **Version**: 2.0.0
- **Last Update**: {{ "now" | date: "%d/%m/%Y" }}
- **Next Update**: Tính năng AI chatbot, Social login

## Roadmap

### Tính Năng Sắp Tới
- [ ] AI Chatbot hỗ trợ 24/7
- [ ] Social Media Login (Google, Facebook)
- [ ] Voice Search
- [ ] AR Try-On
- [ ] Loyalty Program API
- [ ] Multi-language Support
- [ ] Dark/Light Theme Toggle
- [ ] Advanced Analytics Dashboard

### Cải Tiến UX
- [ ] Micro-interactions
- [ ] Progressive Web App (PWA)
- [ ] Offline Mode
- [ ] Push Notifications
- [ ] Gesture Controls
- [ ] Accessibility Improvements

---

**Tip**: Thường xuyên backup cấu hình trước khi thay đổi lớn!