# 📸 TIER PRICING - VISUAL GUIDE

## 🎨 UI PREVIEW

### Product Listing Page

#### Guest User (Chưa Đăng Nhập)
```
┌─────────────────────────────────┐
│  [Product Image]                │
│                                 │
│  Product Name                   │
│  1,000,000 VND                  │
│                                 │
│  🔓 Đăng nhập để nhận           │
│     giảm giá đến 20%            │
└─────────────────────────────────┘
```

#### MEMBER User (5% Discount)
```
┌─────────────────────────────────┐
│  [Product Image]                │
│                                 │
│  ⭐ -5% MEMBER                  │
│                                 │
│  Product Name                   │
│  1,000,000 VND  950,000 VND     │
│  (gạch ngang)   (màu vàng)      │
└─────────────────────────────────┘
```

#### GOLD User (10% Discount)
```
┌─────────────────────────────────┐
│  [Product Image]                │
│                                 │
│  ⭐ -10% GOLD                   │
│  (gradient vàng)                │
│                                 │
│  Product Name                   │
│  1,000,000 VND  900,000 VND     │
│  (gạch ngang)   (màu vàng bold) │
└─────────────────────────────────┘
```

#### BLACK DIAMOND User (20% Discount)
```
┌─────────────────────────────────┐
│  [Product Image]                │
│                                 │
│  ⭐ -20% BLACK DIAMOND          │
│  (gradient đen, có animation)   │
│                                 │
│  Product Name                   │
│  1,000,000 VND  800,000 VND     │
│  (gạch ngang)   (màu vàng bold) │
└─────────────────────────────────┘
```

---

## 🛒 CHECKOUT FLOW

### Step 1: Add to Cart
```
Product Page
├─ Giá hiển thị: 800,000 VND (đã giảm 20%)
├─ Badge: BLACK DIAMOND -20%
└─ Click "Add to Cart"
```

### Step 2: Cart Page
```
Cart
├─ Product: 800,000 VND
├─ Subtotal: 800,000 VND
└─ Proceed to Checkout
```

### Step 3: Checkout
```
Checkout
├─ Subtotal: 1,000,000 VND
├─ Discount (BLACK DIAMOND -20%): -200,000 VND
├─ Shipping: 30,000 VND
└─ Total: 830,000 VND
```

---

## 🎨 BADGE DESIGNS

### BLACK DIAMOND
```
╔═══════════════════════════════╗
║ ⭐ -20% BLACK DIAMOND         ║
╚═══════════════════════════════╝
Background: Gradient đen (#1a1a1a → #4a4a4a)
Text: Trắng (#ffffff)
Border: #666
Animation: Pulse effect
```

### DIAMOND
```
╔═══════════════════════════════╗
║ ⭐ -15% DIAMOND               ║
╚═══════════════════════════════╝
Background: Gradient xanh (#b9f2ff → #00d4ff)
Text: Đen (#000000)
Border: #00a8cc
```

### PLATINUM
```
╔═══════════════════════════════╗
║ ⭐ -12% PLATINUM              ║
╚═══════════════════════════════╝
Background: Gradient bạc (#e5e4e2 → #c0c0c0)
Text: Đen (#000000)
Border: #a8a8a8
```

### GOLD
```
╔═══════════════════════════════╗
║ ⭐ -10% GOLD                  ║
╚═══════════════════════════════╝
Background: Gradient vàng (#ffd700 → #ffed4e)
Text: Đen (#000000)
Border: #d4af37
```

### SILVER
```
╔═══════════════════════════════╗
║ ⭐ -7% SILVER                 ║
╚═══════════════════════════════╝
Background: Gradient bạc nhạt (#c0c0c0 → #e8e8e8)
Text: Đen (#000000)
Border: #a0a0a0
```

### MEMBER
```
╔═══════════════════════════════╗
║ ⭐ -5% MEMBER                 ║
╚═══════════════════════════════╝
Background: Gradient cam (#fab320 → #ff8c00)
Text: Đen (#000000)
Border: #e09900
```

---

## 📱 RESPONSIVE DESIGN

### Desktop (1920px)
```
┌────────────────────────────────────────────────────────┐
│  [Product 1]  [Product 2]  [Product 3]  [Product 4]   │
│  ⭐ -20%      ⭐ -15%      ⭐ -10%      ⭐ -5%         │
│  800K VND     850K VND     900K VND     950K VND       │
└────────────────────────────────────────────────────────┘
```

### Tablet (768px)
```
┌──────────────────────────────┐
│  [Product 1]  [Product 2]    │
│  ⭐ -20%      ⭐ -15%        │
│  800K VND     850K VND       │
│                              │
│  [Product 3]  [Product 4]    │
│  ⭐ -10%      ⭐ -5%         │
│  900K VND     950K VND       │
└──────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────┐
│ [Product 1]  │
│ ⭐ -20%      │
│ 800K VND     │
├──────────────┤
│ [Product 2]  │
│ ⭐ -15%      │
│ 850K VND     │
├──────────────┤
│ [Product 3]  │
│ ⭐ -10%      │
│ 900K VND     │
└──────────────┘
```

---

## 🎯 SHOPIFY ADMIN SCREENSHOTS

### 1. Customer Segments
```
Location: Shopify Admin → Customers → Segments

Screenshot should show:
├─ List of 6 segments
├─ Each segment with customer count
└─ Filter conditions visible
```

### 2. Automatic Discounts
```
Location: Shopify Admin → Discounts

Screenshot should show:
├─ List of 6 automatic discounts
├─ Status: Active (green)
├─ Type: Automatic
├─ Value: % off
└─ Priority order (1-6)
```

### 3. Discount Detail
```
Location: Shopify Admin → Discounts → [Discount Name]

Screenshot should show:
├─ Title: "BLACK DIAMOND Member Discount - 20%"
├─ Type: Automatic discount
├─ Value: 20%
├─ Applies to: All products
├─ Customer eligibility: BLACK DIAMOND Members
├─ Combinations: All unchecked ❌
└─ Status: Active ✅
```

### 4. Customer Profile
```
Location: Shopify Admin → Customers → [Customer Name]

Screenshot should show:
├─ Customer name & email
├─ Tags: BLACK DIAMOND (highlighted)
├─ Total spent: 150,000,000 VND
└─ Order history
```

---

## 🎨 COLOR PALETTE

### Tier Colors
```
BLACK DIAMOND:
  Primary: #1a1a1a
  Secondary: #4a4a4a
  Text: #ffffff
  Border: #666666

DIAMOND:
  Primary: #b9f2ff
  Secondary: #00d4ff
  Text: #000000
  Border: #00a8cc

PLATINUM:
  Primary: #e5e4e2
  Secondary: #c0c0c0
  Text: #000000
  Border: #a8a8a8

GOLD:
  Primary: #ffd700
  Secondary: #ffed4e
  Text: #000000
  Border: #d4af37

SILVER:
  Primary: #c0c0c0
  Secondary: #e8e8e8
  Text: #000000
  Border: #a0a0a0

MEMBER:
  Primary: #fab320
  Secondary: #ff8c00
  Text: #000000
  Border: #e09900
```

### UI Colors
```
Price Original: #999999 (opacity 0.6)
Price Discounted: #fab320
Login Prompt: #fab320
Login Prompt BG: rgba(250, 179, 32, 0.1)
```

---

## 📐 SPACING & SIZING

### Badge
```
Font Size: 11px (desktop), 10px (tablet), 9px (mobile)
Padding: 4px 10px (desktop), 3px 8px (tablet), 2px 6px (mobile)
Border Radius: 6px
Gap (icon to text): 4px
```

### Pricing
```
Original Price:
  Font Size: 0.9em
  Opacity: 0.6
  Text Decoration: line-through

Discounted Price:
  Font Size: 1.2em (desktop), 1.1em (mobile)
  Font Weight: 700
  Color: #fab320

Gap between prices: 8px
```

### Login Prompt
```
Font Size: 12px (desktop), 11px (mobile)
Padding: 4px 8px
Border Radius: 4px
Background: rgba(250, 179, 32, 0.1)
Icon: 🔓 (14px)
```

---

## 🎬 ANIMATIONS

### Badge Pulse (BLACK DIAMOND only)
```css
@keyframes tier-badge-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

Duration: 2s
Timing: ease-in-out
Iteration: infinite
```

### Hover Effects
```css
Badge Hover:
  Transform: translateY(-1px)
  Box Shadow: 0 4px 8px rgba(0,0,0,0.15)
  Transition: 0.2s ease

Login Link Hover:
  Background: rgba(250, 179, 32, 0.2)
  Color: #ff8c00
  Text Decoration: underline
  Transition: 0.2s ease
```

---

## 📊 COMPARISON TABLE

### Before vs After

#### Before (No Tier Pricing)
```
Product Listing:
├─ Price: 1,000,000 VND (same for all)
├─ No badges
└─ No login incentive

Checkout:
├─ Subtotal: 1,000,000 VND
├─ No discount
└─ Total: 1,000,000 VND
```

#### After (With Tier Pricing)
```
Product Listing:
├─ Guest: 1,000,000 VND + login prompt
├─ MEMBER: 950,000 VND + badge
├─ GOLD: 900,000 VND + badge
├─ BLACK DIAMOND: 800,000 VND + badge

Checkout:
├─ Subtotal: 1,000,000 VND
├─ Discount: -200,000 VND (BLACK DIAMOND)
└─ Total: 800,000 VND
```

---

## 🎯 USER JOURNEY

### Journey 1: Guest → Member
```
1. Guest visits site
   └─ Sees: "Đăng nhập để nhận giảm giá đến 20%"

2. Guest clicks login
   └─ Redirects to login page

3. Guest logs in
   └─ Becomes MEMBER (5% discount)

4. Returns to product
   └─ Sees: Badge "MEMBER -5%" + discounted price

5. Makes purchase
   └─ Gets 5% off automatically

6. Spends 3M VND total
   └─ Upgraded to SILVER (7% discount)
```

### Journey 2: Tier Upgrade
```
1. SILVER member (7% discount)
   └─ Total spent: 5,500,000 VND

2. Makes new purchase: 600,000 VND
   └─ Total spent: 6,100,000 VND

3. System auto-upgrades to GOLD
   └─ Tag changed: SILVER → GOLD

4. Next visit
   └─ Sees: Badge "GOLD -10%" + better discount

5. Receives email notification
   └─ "Congratulations! You're now GOLD member"
```

---

## 📱 MOBILE OPTIMIZATION

### Touch Targets
```
Minimum size: 44x44px
Badge: Tappable (shows tooltip)
Login link: Tappable (44px height)
Price: Not tappable (display only)
```

### Font Scaling
```
Base: 16px
Badge: 9-11px (scales with viewport)
Price: 14-18px (scales with viewport)
Login prompt: 11-12px (scales with viewport)
```

### Layout
```
Stack vertically on mobile:
├─ Badge (full width)
├─ Original price (left aligned)
├─ Discounted price (left aligned, larger)
└─ Login prompt (full width)
```

---

## 🎨 DARK MODE SUPPORT

### Automatic Adjustments
```
Original Price: #aaa (lighter in dark mode)
Compare Price: #888 (lighter in dark mode)
Login Prompt BG: rgba(250, 179, 32, 0.15) (more opaque)
Login Prompt Hover: rgba(250, 179, 32, 0.25)
```

### Badge Colors
```
Remain same in dark mode (already optimized)
BLACK DIAMOND: White text on dark bg (perfect for dark mode)
Other tiers: Dark text on light bg (good contrast)
```

---

## 🖼️ SCREENSHOT LOCATIONS

### For Documentation
```
1. /screenshots/guest-view.png
   └─ Product listing as guest user

2. /screenshots/member-view.png
   └─ Product listing as MEMBER

3. /screenshots/gold-view.png
   └─ Product listing as GOLD

4. /screenshots/black-diamond-view.png
   └─ Product listing as BLACK DIAMOND

5. /screenshots/checkout-discount.png
   └─ Checkout page showing automatic discount

6. /screenshots/admin-segments.png
   └─ Shopify Admin segments page

7. /screenshots/admin-discounts.png
   └─ Shopify Admin discounts page

8. /screenshots/mobile-view.png
   └─ Mobile responsive view
```

---

## 🎬 VIDEO DEMO SCRIPT

### Demo Video (2 minutes)
```
0:00 - Introduction
  "Giới thiệu hệ thống tier pricing Helios"

0:15 - Guest View
  "Khách chưa đăng nhập thấy giá gốc + login prompt"

0:30 - Login & Member View
  "Sau khi đăng nhập, thấy badge MEMBER -5%"

0:45 - Different Tiers
  "Demo các tier: SILVER, GOLD, PLATINUM, DIAMOND"

1:00 - BLACK DIAMOND
  "Tier cao nhất với 20% discount + animation"

1:15 - Checkout Flow
  "Discount tự động apply khi checkout"

1:30 - Mobile View
  "Responsive trên mobile"

1:45 - Admin Setup
  "Quick tour Shopify Admin setup"

2:00 - Conclusion
  "Kết luận & call to action"
```

---

**📸 Tip:** Chụp screenshots thực tế sau khi deploy để thay thế các placeholders này!
