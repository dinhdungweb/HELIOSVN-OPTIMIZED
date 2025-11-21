# Hướng Dẫn Quiz Tính Cách V2

## Tổng Quan
Quiz tính cách với 8 câu hỏi và 5 kết quả: Cá Chép, Đại Thụ, Hoa Nhỏ, Chuông Hộ Mệnh, Rồng.

## Cách Sử Dụng

### 1. Tạo Page Mới
- Vào **Online Store > Pages**
- Tạo page mới với template: `page.quiz-tinh-cach-v2`

### 2. Cấu Hình Quiz
- Vào **Theme Editor** và chọn page vừa tạo
- Section **Quiz V2 (Tính cách)** đã được thêm sẵn

### 3. Thêm Câu Hỏi
Mỗi câu hỏi có 4 lựa chọn (A, B, C, D):

**Ví dụ Câu 1:**
- **Nội dung:** "Việc đầu tiên anh em làm khi sửa soạn vào buổi sáng là gì?"
- **Câu trả lời A:** "Mặc quần." → Điểm cho: A
- **Câu trả lời B:** "Mặc áo." → Điểm cho: B
- **Câu trả lời C:** "Mặc kệ quần áo, đeo trang sức trước." → Điểm cho: C
- **Câu trả lời D:** "Vuốt tóc." → Điểm cho: D

### 4. Thêm Kết Luận
Cần tạo 5 kết luận với ID tương ứng:

#### Cá Chép
- **ID:** `ca_chep`
- **Tiêu đề:** "Cá Chép"
- **Mô tả:** "Kiểu người bền bỉ, điềm tĩnh, tin vào sức mạnh của sự tích lũy từng ngày..."

#### Đại Thụ
- **ID:** `dai_thu`
- **Tiêu đề:** "Đại Thụ"
- **Mô tả:** "Đây là kiểu người trưởng thành, vững chãi, không bị lay động..."

#### Hoa Nhỏ
- **ID:** `hoa_nho`
- **Tiêu đề:** "Hoa Nhỏ"
- **Mô tả:** "Kiểu người mềm mại mà mạnh mẽ, giàu sự tinh tế và cảm xúc..."

#### Chuông Hộ Mệnh
- **ID:** `chuong_ho_menh`
- **Tiêu đề:** "Chuông Hộ Mệnh"
- **Mô tả:** "Kiểu người sống bằng trực giác, tín hiệu và những điều tinh tế..."

#### Rồng
- **ID:** `rong`
- **Tiêu đề:** "Rồng"
- **Mô tả:** "Kiểu người dũng khí, thích thử thách mạnh, luôn muốn bứt phá..."

## Quy Tắc Tính Kết Quả

Logic tính toán theo thứ tự ưu tiên:

1. **Nhiều B** → Rồng
2. **Nhiều C** → Chuông Hộ Mệnh
3. **Nhiều A và D (cùng cao nhất)** → Đại Thụ
4. **Nhiều A và C (cùng cao nhất)** → Hoa Nhỏ
5. **Nhiều A** → Cá Chép

### Ví Dụ Tính Điểm

**Người dùng chọn:**
- Câu 1: A → +1 điểm A
- Câu 2: A → +1 điểm A
- Câu 3: D → +1 điểm D
- Câu 4: A → +1 điểm A
- Câu 5: D → +1 điểm D
- Câu 6: A → +1 điểm A
- Câu 7: D → +1 điểm D
- Câu 8: A → +1 điểm A

**Kết quả:** A=5, D=3 → **Cá Chép** (A nhiều nhất)

**Nếu:** A=4, D=4 → **Đại Thụ** (A và D cùng cao nhất)

## Tùy Chỉnh Giao Diện

### Màu Sắc
- **Màu nhấn:** Màu chính cho nút và tiến độ
- **Màu nền:** Nền của toàn bộ quiz
- **Màu chữ:** Màu văn bản
- **Màu khối nội dung:** Nền của card câu hỏi/kết quả

### Hiệu Ứng
- **Bo góc:** 0-24px
- **Độ đổ bóng:** 0-24
- **Hiệu ứng mờ (glass):** Bật/tắt backdrop blur

## Sản Phẩm Đề Xuất

Mỗi kết luận có thể gắn:
- **Product handle:** Hiển thị nút "Xem sản phẩm"
- **Collection đề xuất:** Hiển thị danh sách sản phẩm liên quan
- **Số sản phẩm:** 1-12 sản phẩm

## Files Liên Quan

- **Template:** `templates/page.quiz-tinh-cach-v2.json`
- **Section:** `sections/quiz-v2.liquid`
- **JavaScript:** `assets/quiz.js`
- **CSS:** `assets/quiz.css`

## Lưu Ý

- ID kết luận phải khớp với logic trong code: `ca_chep`, `dai_thu`, `hoa_nho`, `chuong_ho_menh`, `rong`
- Mỗi câu hỏi cần đủ 4 lựa chọn A, B, C, D
- Điểm cho mỗi lựa chọn phải chọn đúng (A/B/C/D)
- Quiz không lưu trạng thái (mỗi lần làm là làm mới)
