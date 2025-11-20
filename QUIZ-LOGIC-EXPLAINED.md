# 🧠 LOGIC KẾT LUẬN QUIZ - GIẢI THÍCH CHI TIẾT

## 📊 TỔNG QUAN

Quiz có **2 phương pháp** tính kết luận:
1. **Category có điểm cao nhất** (Highest Category) - Đơn giản, phổ biến
2. **Theo Rules** (Rules-based) - Nâng cao, linh hoạt

---

## 🎯 PHƯƠNG PHÁP 1: CATEGORY CÓ ĐIỂM CAO NHẤT

### Cách Hoạt Động:

**Bước 1: Thu thập điểm**
```javascript
// Mỗi lựa chọn có weights
{
  "label": "Mạnh mẽ, cá tính",
  "weights": {
    "bold": 4,      // Cộng 4 điểm cho category "bold"
    "edgy": 3,      // Cộng 3 điểm cho category "edgy"
    "statement": 2  // Cộng 2 điểm cho category "statement"
  }
}
```

**Bước 2: Tính tổng điểm**
```javascript
// Sau 5 câu hỏi, state.scores có thể là:
{
  "bold": 15,
  "minimal": 8,
  "classic": 12,
  "trendy": 10
}
```

**Bước 3: Tìm category cao nhất**
```javascript
// Tìm category có điểm cao nhất
var bestKey = "bold";  // 15 điểm (cao nhất)
var bestVal = 15;
```

**Bước 4: Match với kết luận**
```javascript
// Tìm result có category_key = "bold"
for(var j=0; j<results.length; j++){
  if(results[j].category_key === bestKey) return results[j];
}
```

### Ví Dụ Thực Tế:

**Quiz: 5 câu hỏi**

**Câu 1: Phong cách?**
- Chọn: "Mạnh mẽ" → bold +4, edgy +3

**Câu 2: Dịp đeo?**
- Chọn: "Dự tiệc" → bold +3, luxury +4

**Câu 3: Kích thước?**
- Chọn: "To bản" → bold +5, statement +4

**Câu 4: Họa tiết?**
- Chọn: "Độc đáo" → bold +5, edgy +4

**Câu 5: Ngân sách?**
- Chọn: "Cao cấp" → bold +2, luxury +3

**Tổng điểm:**
```javascript
{
  "bold": 4+3+5+5+2 = 19,      // ← CAO NHẤT
  "edgy": 3+4 = 7,
  "statement": 4,
  "luxury": 4+3 = 7
}
```

**Kết luận:** "Phong Cách Mạnh Mẽ" (category_key = "bold")

---

## 🎯 PHƯƠNG PHÁP 2: THEO RULES

### Cách Hoạt Động:

**Kiểm tra rules theo thứ tự, kết luận đầu tiên match sẽ được chọn.**

### Rule Structure:

```json
{
  "any": [condition1, condition2],  // OR logic
  "all": [condition1, condition2]   // AND logic
}
```

### Conditions:

**1. Category Condition:**
```json
{
  "category": "bold",
  "gte": 15  // Greater than or equal (≥)
}
```

**2. Tag Condition:**
```json
{
  "tags": ["prefer_bold", "confident"]
}
```

### Operators:

- `gte`: Greater than or equal (≥)
- `lte`: Less than or equal (≤)
- `eq`: Equal (=)

### Ví Dụ Rules:

**Rule 1: Bold & Confident**
```json
{
  "all": [
    {"category": "bold", "gte": 15},
    {"tags": ["confident"]}
  ]
}
```
→ Cần: bold ≥ 15 **VÀ** có tag "confident"

**Rule 2: Minimal hoặc Elegant**
```json
{
  "any": [
    {"category": "minimal", "gte": 12},
    {"category": "elegant", "gte": 10}
  ]
}
```
→ Cần: minimal ≥ 12 **HOẶC** elegant ≥ 10

**Rule 3: Phức tạp**
```json
{
  "all": [
    {"category": "luxury", "gte": 10},
    {
      "any": [
        {"tags": ["special_occasion"]},
        {"category": "formal", "gte": 5}
      ]
    }
  ]
}
```
→ Cần: luxury ≥ 10 **VÀ** (có tag "special_occasion" **HOẶC** formal ≥ 5)

---

## 🔍 FLOW CHART LOGIC

```
START
  ↓
User chọn option
  ↓
Cộng điểm vào state.scores
  ↓
Thu thập tags vào state.tags
  ↓
Câu tiếp theo?
  ├─ YES → Render câu tiếp
  └─ NO → Tính kết luận
           ↓
       Method = "rules"?
         ├─ YES → Kiểm tra rules theo thứ tự
         │         ├─ Match? → Return result
         │         └─ No match → Fallback to highest_category
         └─ NO → Tìm category cao nhất
                  ↓
              Match result với category_key
                  ↓
              Return result
                  ↓
              Show result
```

---

## 📝 CODE IMPLEMENTATION

### 1. Tính Điểm (selectOption)

```javascript
function selectOption(idx, opt){
  // Lưu answer
  state.answers[state.index] = idx;
  
  // Cộng điểm
  if(opt && opt.weights){
    Object.keys(opt.weights).forEach(function(k){
      var val = Number(opt.weights[k]) || 0;
      state.scores[k] = (state.scores[k] || 0) + val;
    });
  }
  
  // Thu thập tags
  if(opt && Array.isArray(opt.tags)){
    state.tags = state.tags.concat(opt.tags);
  }
  
  // Next question or show result
  state.index++;
  if(state.index >= questions.length){
    showResult();
  } else {
    renderQuestion();
  }
}
```

### 2. Chọn Kết Luận (pickResult)

```javascript
function pickResult(){
  // Method 1: Rules-based
  if(method === 'rules'){
    for(var i=0; i<results.length; i++){
      var r = results[i];
      if(evaluateRules(r.rule)) return r;
    }
  }
  
  // Method 2: Highest category (fallback)
  var bestKey = null, bestVal = -Infinity;
  Object.keys(state.scores).forEach(function(k){
    var val = state.scores[k] || 0;
    if(val > bestVal){ 
      bestVal = val; 
      bestKey = k; 
    }
  });
  
  // Find result with matching category_key
  for(var j=0; j<results.length; j++){
    if(results[j].category_key === bestKey) return results[j];
  }
  
  // Fallback: return first result
  return results[0] || null;
}
```

### 3. Evaluate Rules

```javascript
function evaluateRules(rule){
  if(!rule || typeof rule !== 'object') return false;
  
  function checkCond(cond){
    // Check category condition
    if(cond.category){
      var sc = state.scores[cond.category] || 0;
      if(cond.gte != null && !(sc >= Number(cond.gte))) return false;
      if(cond.lte != null && !(sc <= Number(cond.lte))) return false;
      if(cond.eq  != null && !(sc === Number(cond.eq))) return false;
      return true;
    }
    
    // Check tags condition
    if(cond.tags){
      var need = Array.isArray(cond.tags) ? cond.tags : [cond.tags];
      return need.some(function(t){ 
        return state.tags.indexOf(t) !== -1; 
      });
    }
    
    return false;
  }
  
  // Check ALL conditions (AND logic)
  if(Array.isArray(rule.all)){
    return rule.all.every(checkCond);
  }
  
  // Check ANY condition (OR logic)
  if(Array.isArray(rule.any)){
    return rule.any.some(checkCond);
  }
  
  return false;
}
```

---

## 🎓 BEST PRACTICES

### 1. Phân Bố Điểm Cân Đối

**Tốt:**
```json
// Mỗi câu có tổng điểm tương đương
Câu 1: bold=4, minimal=4, classic=4, trendy=4
Câu 2: bold=3, minimal=3, classic=3, trendy=4
Câu 3: bold=5, minimal=5, classic=4, trendy=4
```

**Không tốt:**
```json
// Điểm không cân đối
Câu 1: bold=10, minimal=1, classic=1, trendy=1
Câu 2: bold=2, minimal=2, classic=2, trendy=2
```

### 2. Số Lượng Categories

- **Tối ưu**: 3-5 categories
- **Tối thiểu**: 2 categories
- **Tối đa**: 8 categories

### 3. Thang Điểm

- **Chính**: 3-5 điểm
- **Phụ**: 1-2 điểm
- **Tránh**: Điểm quá lớn (>10) hoặc quá nhỏ (<1)

### 4. Tags

- Dùng cho logic phức tạp
- Tên ngắn gọn: `prefer_bold`, `daily_wear`
- Không dùng dấu cách

---

## 🐛 DEBUGGING

### Console Logs

Khi hoàn thành quiz, check console:

```javascript
console.log('Quiz scores:', state.scores);
// Output: {bold: 19, minimal: 8, classic: 12, trendy: 10}

console.log('Quiz result:', r);
// Output: {id: "...", category_key: "bold", title: "..."}
```

### Common Issues

**1. Không tìm thấy kết luận**
- Check: Có result nào có `category_key` match không?
- Fix: Thêm result hoặc sửa category_key

**2. Kết luận sai**
- Check: Điểm có đúng không? (xem console)
- Fix: Điều chỉnh weights trong options

**3. Rules không hoạt động**
- Check: Phương pháp có chọn "Theo rules" không?
- Check: Rule JSON có đúng format không?
- Fix: Validate JSON, check conditions

---

## 📊 EXAMPLE: QUIZ MẪU

### Setup:
- 5 câu hỏi
- 4 categories: bold, minimal, classic, trendy
- 4 kết luận tương ứng

### Scenario 1: User thích Bold

```
Câu 1: Chọn "Mạnh mẽ" → bold +4
Câu 2: Chọn "Dự tiệc" → bold +3
Câu 3: Chọn "To bản" → bold +5
Câu 4: Chọn "Độc đáo" → bold +5
Câu 5: Chọn "Cao cấp" → bold +2

Tổng: bold = 19 (cao nhất)
Kết luận: "Phong Cách Mạnh Mẽ"
```

### Scenario 2: User thích Minimal

```
Câu 1: Chọn "Tối giản" → minimal +4
Câu 2: Chọn "Hàng ngày" → minimal +3
Câu 3: Chọn "Nhỏ nhắn" → minimal +5
Câu 4: Chọn "Đơn giản" → minimal +5
Câu 5: Chọn "Phải chăng" → minimal +2

Tổng: minimal = 19 (cao nhất)
Kết luận: "Phong Cách Tối Giản"
```

---

## 🎯 KẾT LUẬN

Logic quiz hoạt động dựa trên:
1. ✅ Thu thập điểm từ mỗi lựa chọn
2. ✅ Tính tổng điểm cho từng category
3. ✅ Tìm category cao nhất (hoặc check rules)
4. ✅ Match với kết luận tương ứng
5. ✅ Hiển thị kết quả + recommendations

**Simple, effective, và dễ customize!**

---

**Version:** 1.0  
**Last Updated:** November 2025  
**Status:** Production Ready


---

## ⚖️ TRƯỜNG HỢP ĐIỂM BẰNG NHAU (TIE)

### Khi Nào Xảy Ra?

Điểm bằng nhau xảy ra khi 2 hoặc nhiều categories có cùng tổng điểm cao nhất.

### Ví Dụ:

```javascript
// Sau 5 câu hỏi:
{
  "bold": 15,      // ← Bằng nhau
  "minimal": 15,   // ← Bằng nhau
  "classic": 12,
  "trendy": 10
}
```

### Logic Xử Lý:

**Bước 1: Phát hiện tie**
```javascript
var tiedKeys = []; // Track categories with same score

Object.keys(state.scores).forEach(function(k){
  var val = state.scores[k] || 0;
  if(val > bestVal){ 
    bestVal = val; 
    tiedKeys = [k]; // Reset
  } else if(val === bestVal && val > 0){
    tiedKeys.push(k); // Add to tie
  }
});

// tiedKeys = ["bold", "minimal"]
```

**Bước 2: Chọn kết luận**
```javascript
// Nếu có tie, chọn result đầu tiên có category_key match
if(tiedKeys.length > 1){
  console.log('Quiz: Multiple categories tied:', tiedKeys);
  
  // Loop qua tied categories theo thứ tự
  for(var i=0; i<tiedKeys.length; i++){
    // Tìm result có category_key match
    for(var j=0; j<results.length; j++){
      if(results[j].category_key === tiedKeys[i]) {
        return results[j]; // Return ngay khi tìm thấy
      }
    }
  }
}
```

### Thứ Tự Ưu Tiên:

Khi có tie, kết luận được chọn dựa trên:
1. **Thứ tự trong `tiedKeys` array** (phụ thuộc vào `Object.keys()`)
2. **Thứ tự trong `results` array** (thứ tự blocks trong Theme Editor)

### Ví Dụ Thực Tế:

**Scenario: Bold vs Minimal (15-15)**

```javascript
// Scores
{
  "bold": 15,
  "minimal": 15,
  "classic": 10
}

// Results order in Theme Editor:
1. result_bold (category_key: "bold")
2. result_minimal (category_key: "minimal")
3. result_classic (category_key: "classic")

// tiedKeys = ["bold", "minimal"] (hoặc ["minimal", "bold"])

// Loop qua tiedKeys:
// - Check "bold" → Tìm thấy result_bold → Return
// Hoặc
// - Check "minimal" → Tìm thấy result_minimal → Return
```

### Console Log:

Khi có tie, console sẽ hiển thị:
```
Quiz: Multiple categories tied with score 15: ["bold", "minimal"]
```

---

## 🎯 CÁCH TRÁNH TIE (KHUYẾN NGHỊ)

### 1. Thiết Kế Weights Cẩn Thận

**Tốt - Ít khả năng tie:**
```json
// Câu 1
{"label": "Option A", "weights": {"bold": 4, "edgy": 2}}
{"label": "Option B", "weights": {"minimal": 5, "elegant": 1}}

// Câu 2
{"label": "Option C", "weights": {"bold": 3, "statement": 3}}
{"label": "Option D", "weights": {"minimal": 4, "refined": 2}}
```

**Không tốt - Dễ tie:**
```json
// Tất cả options đều +5 điểm
{"label": "Option A", "weights": {"bold": 5}}
{"label": "Option B", "weights": {"minimal": 5}}
{"label": "Option C", "weights": {"classic": 5}}
```

### 2. Thêm Câu Hỏi "Tie-Breaker"

Thêm 1 câu hỏi cuối với weights nhỏ để phá tie:

```json
{
  "question_text": "Điều gì quan trọng nhất với bạn?",
  "options": [
    {"label": "Sự nổi bật", "weights": {"bold": 1}},
    {"label": "Sự tinh tế", "weights": {"minimal": 1}},
    {"label": "Sự sang trọng", "weights": {"classic": 1}}
  ]
}
```

### 3. Dùng Tags Kết Hợp Rules

Thay vì chỉ dựa vào điểm, dùng tags + rules:

```json
// Options với tags
{
  "label": "Mạnh mẽ",
  "weights": {"bold": 4},
  "tags": ["prefer_bold"]
}

// Result với rule
{
  "category_key": "bold",
  "rule": {
    "all": [
      {"category": "bold", "gte": 15},
      {"tags": ["prefer_bold"]}
    ]
  }
}
```

### 4. Sắp Xếp Results Theo Ưu Tiên

Trong Theme Editor, sắp xếp results theo thứ tự ưu tiên:
1. Kết luận phổ biến nhất → Đầu tiên
2. Kết luận ít phổ biến → Cuối cùng

---

## 📊 THỐNG KÊ TIE

### Xác Suất Tie:

**Quiz 5 câu, 4 categories, weights 1-5:**
- Xác suất tie: ~15-20%
- Xác suất 3-way tie: ~2-5%

### Giảm Xác Suất Tie:

1. **Tăng số câu hỏi**: 7-10 câu → Tie giảm xuống ~5-10%
2. **Weights đa dạng**: Dùng 1,2,3,4,5 thay vì chỉ 3,4,5
3. **Thêm categories phụ**: Mỗi option có 2-3 categories

---

## 🔍 DEBUG TIE

### Kiểm Tra Console:

```javascript
// Khi hoàn thành quiz, check:
console.log('Quiz scores:', state.scores);
// Output: {bold: 15, minimal: 15, classic: 10, trendy: 8}

// Nếu có tie, sẽ thấy:
console.log('Quiz: Multiple categories tied with score 15: ["bold", "minimal"]');

console.log('Quiz result:', r);
// Output: {category_key: "bold", title: "Phong Cách Mạnh Mẽ", ...}
```

### Test Tie:

Để test tie, chọn options có weights cân bằng:

```
Câu 1: Chọn option → bold +4, minimal +4
Câu 2: Chọn option → bold +3, minimal +3
Câu 3: Chọn option → bold +5, minimal +5
Câu 4: Chọn option → bold +3, minimal +3
Câu 5: Chọn option → bold +0, minimal +0

Kết quả: bold = 15, minimal = 15 (TIE!)
```

---

## ✅ KẾT LUẬN VỀ TIE

**Hiện tại:**
- ✅ Quiz phát hiện và xử lý tie
- ✅ Console log thông báo khi có tie
- ✅ Chọn kết luận đầu tiên match trong tied categories

**Khuyến nghị:**
- 📝 Thiết kế weights cẩn thận để giảm tie
- 📝 Thêm câu hỏi tie-breaker nếu cần
- 📝 Dùng rules cho logic phức tạp hơn
- 📝 Sắp xếp results theo ưu tiên

**Tie không phải là bug, nhưng nên tối ưu để tránh!**
