# 🧪 TESTING GUIDE - Admin Login System

## Quick Start Testing

### Prerequisites
- Application running: `npm run dev`
- Browser with dev tools (F12)
- curl or Postman (for API testing)
- ADMIN_SECRET environment variable set

---

## 📋 TEST SUITE 1: AUTHENTICATION

### Test 1.1: Successful Login
**Steps:**
1. Navigate to `http://localhost:3000/admin`
2. You should see the login form
3. Enter the correct ADMIN_SECRET password
4. Click "Sign In"

**Expected Results:**
- ✅ Admin panel displays
- ✅ "Admin login successful" toast notification
- ✅ Cookie `admin_session_token` is set (httpOnly)
- ✅ Products and Purchases sections visible

**Verify Cookie:**
```javascript
// In browser console
document.cookie  // Should NOT show admin_session_token (httpOnly)
// But check in DevTools → Application → Cookies
```

---

### Test 1.2: Incorrect Password
**Steps:**
1. Navigate to `http://localhost:3000/admin`
2. Enter wrong password (e.g., "wrongpassword")
3. Click "Sign In"

**Expected Results:**
- ✅ Error message: "Invalid credentials."
- ✅ Form clears but stays on login page
- ✅ NO admin panel access
- ✅ Generic error (doesn't reveal if password is close)

---

### Test 1.3: Rate Limiting (5 attempts / 15 minutes)
**Steps:**
1. Navigate to `http://localhost:3000/admin`
2. Try 6 incorrect logins in rapid succession
3. After 5th attempt, try 6th login

**Expected Results:**
- ✅ Attempts 1-5: "Invalid credentials." error
- ✅ Attempt 6: "Too many login attempts. Please try again later." (HTTP 429)
- ✅ Rate limit persists for 15 minutes
- ✅ Rate limit is per IP address

**Reset Rate Limit:**
- Change source IP or wait 15 minutes
- Restart server (in-memory storage resets)

---

### Test 1.4: Empty Password
**Steps:**
1. Navigate to `http://localhost:3000/admin`
2. Leave password field empty
3. Click "Sign In"

**Expected Results:**
- ✅ Form validation (required field)
- ✅ Input field highlights as required
- ✅ Request not sent to server

---

## 📋 TEST SUITE 2: SESSION MANAGEMENT

### Test 2.1: Session Persistence
**Steps:**
1. Login successfully to admin panel
2. Navigate to `http://localhost:3000/admin` again
3. Refresh the page (F5)
4. Close and reopen browser tab

**Expected Results:**
- ✅ Still logged in after page refresh
- ✅ Still logged in after tab close/reopen
- ✅ Session persists until 24 hours or logout

---

### Test 2.2: Session Expiration (24 hours)
**Steps:**
1. Login to admin panel
2. Manually set cookie expiration to 1 second (dev tools):
```javascript
// In DevTools Console, set an expiring cookie
document.cookie = "admin_session_token=1; max-age=1; path=/; SameSite=Strict";
```
3. Wait 2 seconds
4. Refresh page

**Expected Results:**
- ✅ Redirected back to login page
- ✅ Session automatically cleared
- ✅ Cannot access admin features

**Note:** In production, this happens after 24 hours automatically

---

### Test 2.3: Logout Function
**Steps:**
1. Login to admin panel
2. Click "Logout" button (top right of Admin Panel)
3. Observe the notification
4. Try to navigate to `/admin`

**Expected Results:**
- ✅ "Logged out successfully" toast notification
- ✅ Redirect back to login page
- ✅ Cannot access `/admin` (shows login form again)
- ✅ Cookie `admin_session_token` deleted
- ✅ Logout button shows "Logging out..." during request

---

### Test 2.4: Cookie Security
**Steps:**
1. Login successfully
2. Open DevTools → Application → Cookies
3. Find `admin_session_token`
4. Examine cookie properties

**Expected Results:**
- ✅ Name: `admin_session_token`
- ✅ Value: `1`
- ✅ HttpOnly: ✅ (checked)
- ✅ Secure: ✅ (checked in production, unchecked in dev)
- ✅ SameSite: `Strict`
- ✅ Path: `/`
- ✅ Expires: 24 hours from login

---

## 📋 TEST SUITE 3: API PROTECTION

### Test 3.1: Protected GET /api/admin/products
**Without Auth:**
```bash
curl http://localhost:3000/api/admin/products
```

**Expected:** HTTP 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "code": "UNAUTHORIZED",
  "message": "Admin authentication required"
}
```

**With Auth (Header):**
```bash
curl -H "x-admin-secret: YOUR_ADMIN_SECRET" http://localhost:3000/api/admin/products
```

**Expected:** HTTP 200 OK with product list

**With Auth (Cookie):**
1. Login to `/admin` first
2. Browser automatically sends cookie
3. `fetch('/api/admin/products')` works

---

### Test 3.2: Protected GET /api/admin/purchases ✅ (NEWLY PROTECTED)
**Without Auth:**
```bash
curl http://localhost:3000/api/admin/purchases
```

**Expected:** HTTP 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "code": "UNAUTHORIZED",
  "message": "Admin authentication required"
}
```

**With Auth:**
```bash
curl -H "x-admin-secret: YOUR_ADMIN_SECRET" http://localhost:3000/api/admin/purchases
```

**Expected:** HTTP 200 OK with purchase data

---

### Test 3.3: Protected POST /api/admin/resend-email ✅ (NEWLY PROTECTED)
**Without Auth:**
```bash
curl -X POST http://localhost:3000/api/admin/resend-email \
  -H "Content-Type: application/json" \
  -d '{"id":"123"}'
```

**Expected:** HTTP 401 Unauthorized

**With Auth:**
```bash
curl -X POST http://localhost:3000/api/admin/resend-email \
  -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"id":"valid-order-id"}'
```

**Expected:** 
- HTTP 200 if order exists: `{"success": true}`
- HTTP 404 if order not found: `{"error": "Purchase not found"}`

---

### Test 3.4: Protected POST /api/admin/products
**Without Auth:**
```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","price":10,"currency":"USD","coverUrl":"http://example.com/img.jpg","driveLink":"http://drive.google.com/file/123"}'
```

**Expected:** HTTP 401 Unauthorized

**With Auth:**
```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","price":10,"currency":"USD","coverUrl":"http://example.com/img.jpg","driveLink":"http://drive.google.com/file/123"}'
```

**Expected:** HTTP 201 Created with product data

---

### Test 3.5: New Logout Endpoint
```bash
curl -X POST http://localhost:3000/api/admin/logout
```

**Expected:** HTTP 200 OK
```json
{"success": true}
```

**Verify:** Cookie is deleted in response

---

## 📋 TEST SUITE 4: ADMIN PANEL FUNCTIONALITY

### Test 4.1: Create Product
**Steps:**
1. Login to admin panel
2. Fill in product form (left side):
   - Title: "Test Product"
   - Description: "This is a test"
   - Price: "99.99"
   - Currency: "USD"
   - Cover URL: "https://via.placeholder.com/300"
   - Drive Link: "https://drive.google.com/file/d/1234/view"
3. Click "Create" button

**Expected Results:**
- ✅ Toast: "Product created"
- ✅ Product appears in products list (right side)
- ✅ Form clears
- ✅ Products list refreshes

---

### Test 4.2: Edit Product
**Steps:**
1. In products list (right side), click "Edit" on a product
2. Modify the title (add " - EDITED")
3. Click "Update" button

**Expected Results:**
- ✅ Toast: "Product updated"
- ✅ Product in list reflects changes
- ✅ Form clears
- ✅ "Cancel" button disappears

---

### Test 4.3: Delete Product
**Steps:**
1. In products list, click "Delete" on a product
2. Confirm deletion dialog
3. Click OK

**Expected Results:**
- ✅ Toast: "Product deleted"
- ✅ Product removed from list
- ✅ Associated orders also deleted
- ✅ List refreshes

---

### Test 4.4: View Purchases
**Steps:**
1. Login to admin panel
2. Scroll to right column
3. Look at "Purchases" section (if any purchases exist)

**Expected Results:**
- ✅ List shows all purchases with product info
- ✅ Each purchase shows: email, amount, currency, status, date
- ✅ "Resend" button available for each purchase

---

### Test 4.5: Resend Purchase Email
**Steps:**
1. In Purchases section, click "Resend" button
2. Check email (or SMTP logs)

**Expected Results:**
- ✅ Toast: "Email resent"
- ✅ Email received at customer email
- ✅ `sentAt` timestamp updated for purchase

---

## 📋 TEST SUITE 5: ERROR HANDLING

### Test 5.1: Missing ADMIN_SECRET
**Steps:**
1. Remove `ADMIN_SECRET` from `.env`
2. Restart dev server
3. Try to access `/admin`

**Expected Results:**
- ✅ HTTP 500: "Admin authentication not configured"

---

### Test 5.2: Missing DATABASE_URL
**Steps:**
1. Remove `DATABASE_URL` from `.env`
2. Restart dev server
3. Login to admin, click "Refresh" in products section

**Expected Results:**
- ✅ Toast: "Unable to load admin data"
- ✅ Console shows: "DATABASE_URL environment variable is not set"

---

### Test 5.3: Invalid Product Form
**Steps:**
1. Login to admin panel
2. Try to create product with empty fields
3. Leave "Title" field empty
4. Click "Create"

**Expected Results:**
- ✅ Toast: "Please fill in all required fields"
- ✅ Request not sent to server
- ✅ Form data preserved

---

### Test 5.4: Invalid Price
**Steps:**
1. Enter negative price: "-10"
2. Or enter non-numeric: "abc"
3. Click "Create"

**Expected Results:**
- ✅ Toast: "Please fill in all required fields" or API error
- ✅ Product not created

---

## 🔐 TEST SUITE 6: SECURITY SCENARIOS

### Test 6.1: XSS Prevention
**Steps:**
1. Try to create product with HTML/script in title:
   ```
   Title: <script>alert('XSS')</script>
   ```

**Expected Results:**
- ✅ Product created with literal string (not executed)
- ✅ No alert popup
- ✅ HTML displayed as plain text

---

### Test 6.2: CSRF Protection (SameSite=Strict)
**Steps:**
1. Login to admin panel in Tab 1
2. Open external site in Tab 2
3. Try to submit form to `/api/admin/products` from Tab 2

**Expected Results:**
- ✅ Request fails (cookie not sent due to SameSite=Strict)
- ✅ HTTP 401 Unauthorized

---

### Test 6.3: Cookie Hijacking Prevention
**Steps:**
1. Login to admin panel
2. Open DevTools Console
3. Try to access: `document.cookie`

**Expected Results:**
- ✅ Cannot see `admin_session_token` (httpOnly prevents access)
- ✅ Only accessible to server via HTTP headers

---

### Test 6.4: Header-Based Auth (For API Tools)
**Steps:**
```bash
# Set admin_session_token header instead of cookie
curl -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  http://localhost:3000/api/admin/products
```

**Expected Results:**
- ✅ HTTP 200 OK
- ✅ Authentication works via header (for API integrations)

---

## 📊 BROWSER TESTING CHECKLIST

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if macOS)
- [ ] Edge
- [ ] Mobile browser (iOS Safari, Chrome Mobile)

**For Each Browser:**
- [ ] Login works
- [ ] Product CRUD works
- [ ] Logout works
- [ ] Cookie security settings show httpOnly=true
- [ ] Rate limiting works

---

## 🔍 NETWORK TESTING (DevTools Network Tab)

### Check Login Request
1. Open DevTools → Network tab
2. Clear cookies
3. Login with correct password
4. Inspect POST to `/api/admin/login`

**Expected:**
- ✅ Status: 200 OK
- ✅ Response: `{"success": true}`
- ✅ Set-Cookie header includes `admin_session_token`

### Check Protected Endpoint
1. After login, call GET to `/api/admin/products`
2. Inspect request headers
3. Inspect response

**Expected:**
- ✅ Request includes Cookie header with `admin_session_token=1`
- ✅ Status: 200 OK
- ✅ Response includes products array

---

## 🎯 PERFORMANCE TESTING

### Load Testing (Optional)
```bash
# Simple load test with Apache Bench
ab -n 100 -c 10 -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  http://localhost:3000/api/admin/products
```

**Expected:**
- ✅ Handle concurrent requests
- ✅ No memory leaks
- ✅ Response times consistent

---

## 📝 TEST RESULTS TEMPLATE

```
=== ADMIN LOGIN SYSTEM TEST RESULTS ===
Date: ___________
Tester: __________

TEST SUITE 1: AUTHENTICATION
[ ] 1.1 Successful Login
[ ] 1.2 Incorrect Password
[ ] 1.3 Rate Limiting (5 attempts)
[ ] 1.4 Empty Password

TEST SUITE 2: SESSION MANAGEMENT
[ ] 2.1 Session Persistence
[ ] 2.2 Session Expiration
[ ] 2.3 Logout Function
[ ] 2.4 Cookie Security

TEST SUITE 3: API PROTECTION
[ ] 3.1 Protected GET /api/admin/products
[ ] 3.2 Protected GET /api/admin/purchases ✅ NEW
[ ] 3.3 Protected POST /api/admin/resend-email ✅ NEW
[ ] 3.4 Protected POST /api/admin/products
[ ] 3.5 New Logout Endpoint

TEST SUITE 4: ADMIN PANEL
[ ] 4.1 Create Product
[ ] 4.2 Edit Product
[ ] 4.3 Delete Product
[ ] 4.4 View Purchases
[ ] 4.5 Resend Email

TEST SUITE 5: ERROR HANDLING
[ ] 5.1 Missing ADMIN_SECRET
[ ] 5.2 Missing DATABASE_URL
[ ] 5.3 Invalid Form
[ ] 5.4 Invalid Price

TEST SUITE 6: SECURITY
[ ] 6.1 XSS Prevention
[ ] 6.2 CSRF Protection
[ ] 6.3 Cookie Hijacking Prevention
[ ] 6.4 Header-Based Auth

OVERALL STATUS: [ ] PASS  [ ] FAIL

Issues Found:
____________
____________

Notes:
____________
____________
```

---

## ✅ SIGN OFF

When all tests pass:
- ✅ Product Admin Login is secure
- ✅ All API endpoints protected
- ✅ Session management working correctly
- ✅ Logout functionality operational
- ✅ Rate limiting preventing brute force
- ✅ Ready for production deployment
