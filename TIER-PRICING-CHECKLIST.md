# ✅ TIER PRICING IMPLEMENTATION CHECKLIST

## 📋 PHẦN 1: SHOPIFY ADMIN SETUP

### Customer Segments
- [ ] Tạo segment "BLACK DIAMOND Members"
  - [ ] Filter: Customer tags contains "BLACK DIAMOND"
  - [ ] Verify có customers trong segment
  
- [ ] Tạo segment "DIAMOND Members"
  - [ ] Filter: tags contains "DIAMOND"
  - [ ] Filter: tags does NOT contain "BLACK DIAMOND"
  - [ ] Verify có customers trong segment
  
- [ ] Tạo segment "PLATINUM Members"
  - [ ] Filter: tags contains "PLATINUM"
  - [ ] Filter: tags does NOT contain "DIAMOND"
  - [ ] Filter: tags does NOT contain "BLACK DIAMOND"
  - [ ] Verify có customers trong segment
  
- [ ] Tạo segment "GOLD Members"
  - [ ] Filter: tags contains "GOLD"
  - [ ] Filter: Exclude higher tiers
  - [ ] Verify có customers trong segment
  
- [ ] Tạo segment "SILVER Members"
  - [ ] Filter: tags contains "SILVER"
  - [ ] Filter: Exclude higher tiers
  - [ ] Verify có customers trong segment
  
- [ ] Tạo segment "MEMBER (Base)"
  - [ ] Filter: Customer is logged in
  - [ ] Filter: Exclude all tier tags
  - [ ] Verify có customers trong segment

### Automatic Discounts
- [ ] Tạo "BLACK DIAMOND Member Discount - 20%"
  - [ ] Type: Automatic discount
  - [ ] Value: 20%
  - [ ] Applies to: All products (hoặc specific collections)
  - [ ] Customer eligibility: BLACK DIAMOND Members segment
  - [ ] Combinations: BỎ TICK tất cả
  - [ ] Status: Active
  
- [ ] Tạo "DIAMOND Member Discount - 15%"
  - [ ] Value: 15%
  - [ ] Segment: DIAMOND Members
  - [ ] Combinations: BỎ TICK
  - [ ] Status: Active
  
- [ ] Tạo "PLATINUM Member Discount - 12%"
  - [ ] Value: 12%
  - [ ] Segment: PLATINUM Members
  - [ ] Combinations: BỎ TICK
  - [ ] Status: Active
  
- [ ] Tạo "GOLD Member Discount - 10%"
  - [ ] Value: 10%
  - [ ] Segment: GOLD Members
  - [ ] Combinations: BỎ TICK
  - [ ] Status: Active
  
- [ ] Tạo "SILVER Member Discount - 7%"
  - [ ] Value: 7%
  - [ ] Segment: SILVER Members
  - [ ] Combinations: BỎ TICK
  - [ ] Status: Active
  
- [ ] Tạo "MEMBER Base Discount - 5%"
  - [ ] Value: 5%
  - [ ] Segment: MEMBER (Base)
  - [ ] Combinations: BỎ TICK
  - [ ] Status: Active

### Discount Priority
- [ ] Verify thứ tự discounts (cao → thấp):
  1. BLACK DIAMOND (20%)
  2. DIAMOND (15%)
  3. PLATINUM (12%)
  4. GOLD (10%)
  5. SILVER (7%)
  6. MEMBER (5%)

---

## 📋 PHẦN 2: THEME CODE (ĐÃ HOÀN THÀNH)

### Files Created
- [x] `snippets/tier-price.liquid` - Tier pricing logic
- [x] `assets/tier-pricing.css` - Styling
- [x] `TIER-PRICING-SETUP-GUIDE.md` - Full documentation
- [x] `TIER-PRICING-QUICK-REFERENCE.md` - Quick reference
- [x] `TIER-PRICING-CHECKLIST.md` - This checklist

### Files Updated
- [x] `layout/theme.liquid` - Added CSS link
- [x] `snippets/product-block.liquid` - Integrated tier pricing

### Verification
- [ ] CSS file loads correctly (check Network tab)
- [ ] No console errors
- [ ] Tier badges display correctly
- [ ] Prices calculate correctly

---

## 📋 PHẦN 3: TESTING

### Test Environment Setup
- [ ] Tạo 7 test customers:
  - [ ] Guest (không đăng nhập)
  - [ ] Member (không có tag)
  - [ ] SILVER customer
  - [ ] GOLD customer
  - [ ] PLATINUM customer
  - [ ] DIAMOND customer
  - [ ] BLACK DIAMOND customer

### Test Cases

#### Test 1: Guest User
- [ ] Mở incognito window
- [ ] Truy cập product listing
- [ ] Verify: Thấy giá gốc
- [ ] Verify: Thấy "Đăng nhập để nhận giảm giá"
- [ ] Verify: Không có tier badge
- [ ] Add to cart → Checkout
- [ ] Verify: Không có discount

#### Test 2: MEMBER (5%)
- [ ] Đăng nhập với MEMBER account
- [ ] Verify: Badge "MEMBER -5%"
- [ ] Verify: Giá gốc gạch ngang
- [ ] Verify: Giá mới = giá gốc × 0.95
- [ ] Add to cart → Checkout
- [ ] Verify: Discount 5% tự động apply

#### Test 3: SILVER (7%)
- [ ] Đăng nhập với SILVER account
- [ ] Verify: Badge "SILVER -7%"
- [ ] Verify: Giá mới = giá gốc × 0.93
- [ ] Checkout → Verify discount 7%

#### Test 4: GOLD (10%)
- [ ] Đăng nhập với GOLD account
- [ ] Verify: Badge "GOLD -10%"
- [ ] Verify: Giá mới = giá gốc × 0.90
- [ ] Checkout → Verify discount 10%

#### Test 5: PLATINUM (12%)
- [ ] Đăng nhập với PLATINUM account
- [ ] Verify: Badge "PLATINUM -12%"
- [ ] Verify: Giá mới = giá gốc × 0.88
- [ ] Checkout → Verify discount 12%

#### Test 6: DIAMOND (15%)
- [ ] Đăng nhập với DIAMOND account
- [ ] Verify: Badge "DIAMOND -15%"
- [ ] Verify: Giá mới = giá gốc × 0.85
- [ ] Checkout → Verify discount 15%

#### Test 7: BLACK DIAMOND (20%)
- [ ] Đăng nhập với BLACK DIAMOND account
- [ ] Verify: Badge "BLACK DIAMOND -20%"
- [ ] Verify: Badge có animation pulse
- [ ] Verify: Giá mới = giá gốc × 0.80
- [ ] Checkout → Verify discount 20%

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Page Testing
- [ ] Collection page
- [ ] Product page
- [ ] Search results
- [ ] Cart page
- [ ] Checkout page

### Edge Cases
- [ ] Product có sale price (compare_at_price)
- [ ] Product có variants
- [ ] Product có tag "angia"
- [ ] Product bị lock price
- [ ] Multiple products trong cart
- [ ] Customer có multiple tags (verify chỉ apply 1 discount)

---

## 📋 PHẦN 4: CUSTOMER MANAGEMENT

### Initial Tag Assignment
- [ ] Export customer list
- [ ] Phân loại theo total_spent:
  - [ ] ≥ 100M → BLACK DIAMOND
  - [ ] ≥ 20M → DIAMOND
  - [ ] ≥ 10M → PLATINUM
  - [ ] ≥ 6M → GOLD
  - [ ] ≥ 3M → SILVER
- [ ] Bulk add tags
- [ ] Verify tags đã được gán

### Ongoing Management
- [ ] Setup process gán tag cho customers mới
- [ ] Setup process upgrade tier khi đạt milestone
- [ ] Document quy trình cho team

---

## 📋 PHẦN 5: DOCUMENTATION

### Internal Documentation
- [ ] Share TIER-PRICING-SETUP-GUIDE.md với team
- [ ] Share TIER-PRICING-QUICK-REFERENCE.md với CS team
- [ ] Train CS team về tier system
- [ ] Train marketing team về tier benefits

### Customer Communication
- [ ] Tạo email template thông báo tier system
- [ ] Tạo landing page giải thích tiers
- [ ] Update FAQ
- [ ] Update Terms & Conditions

---

## 📋 PHẦN 6: MONITORING

### Week 1
- [ ] Monitor discount usage daily
- [ ] Check for errors/bugs
- [ ] Collect customer feedback
- [ ] Monitor conversion rate

### Week 2-4
- [ ] Analyze discount impact on revenue
- [ ] Compare tier performance
- [ ] Identify optimization opportunities
- [ ] A/B test different discount %

### Monthly
- [ ] Review tier distribution
- [ ] Analyze customer upgrade rate
- [ ] Calculate ROI
- [ ] Report to management

---

## 📋 PHẦN 7: OPTIMIZATION

### Performance
- [ ] Check page load speed impact
- [ ] Optimize CSS if needed
- [ ] Optimize Liquid code if needed
- [ ] Monitor server response time

### UX
- [ ] Collect user feedback
- [ ] Analyze heatmaps
- [ ] Test different badge designs
- [ ] Test different messaging

### Business
- [ ] Analyze profit margins by tier
- [ ] Adjust discount % if needed
- [ ] Test tier upgrade incentives
- [ ] Test exclusive benefits

---

## 📋 PHẦN 8: LAUNCH

### Pre-Launch (1 week before)
- [ ] Final testing complete
- [ ] Documentation complete
- [ ] Team training complete
- [ ] Customer communication ready
- [ ] Backup theme created

### Launch Day
- [ ] Deploy to production
- [ ] Send announcement email
- [ ] Post on social media
- [ ] Monitor closely for issues
- [ ] Be ready for customer support

### Post-Launch (1 week after)
- [ ] Collect feedback
- [ ] Fix any bugs
- [ ] Analyze initial metrics
- [ ] Adjust if needed
- [ ] Celebrate success! 🎉

---

## 📋 PHẦN 9: MAINTENANCE

### Weekly
- [ ] Check discount status
- [ ] Review new customer tags
- [ ] Monitor for issues

### Monthly
- [ ] Review tier distribution
- [ ] Analyze performance
- [ ] Update documentation if needed

### Quarterly
- [ ] Review discount %
- [ ] Analyze ROI
- [ ] Plan improvements

---

## ✅ SIGN-OFF

### Implementation Team
- [ ] Developer: _________________ Date: _______
- [ ] QA: _________________ Date: _______
- [ ] Marketing: _________________ Date: _______
- [ ] Management: _________________ Date: _______

### Launch Approval
- [ ] All tests passed
- [ ] Documentation complete
- [ ] Team trained
- [ ] Ready for production

**Approved by:** _________________ **Date:** _______

---

**🎉 CONGRATULATIONS! Tier Pricing System is ready to launch!**
