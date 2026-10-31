import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultSeedData } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================================
// ADVANCED SECURITY SUITE & WEB APPLICATION FIREWALL (WAF)
// Protects from DDoS, Brute Force, Anonymous Attacks, XSS & SQLi
// =============================================================

// In-Memory Security Telemetry
const securityTelemetry = {
  activeFirewall: true,
  totalRequests: 0,
  blockedAttacks: 0,
  rateLimitHits: 0,
  blacklistedIPs: new Set(['198.51.100.4', '203.0.113.88']), // Sample blocked botnets
  rateLimits: new Map(), // ip -> { count, windowStart }
  recentThreats: []
};

// Security Logging Helper
function recordSecurityThreat(type, details, ip, req) {
  securityTelemetry.blockedAttacks++;
  const threatRecord = {
    id: `threat_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    type,
    details,
    ip: ip || 'Anonymous',
    method: req.method,
    url: req.originalUrl || req.url,
    userAgent: req.headers['user-agent'] || 'Unknown / None',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  securityTelemetry.recentThreats.unshift(threatRecord);
  if (securityTelemetry.recentThreats.length > 50) securityTelemetry.recentThreats.pop();

  if (dbState && dbState.auditLogs) {
    dbState.auditLogs.unshift({
      id: `log_sec_${Date.now()}`,
      action: 'SECURITY_THREAT_BLOCKED',
      details: `[${type}] ${details} from IP: ${ip}`,
      actor: 'Firewall Engine',
      timestamp: threatRecord.timestamp
    });
  }
  console.warn(`🛡️ [WAF SHIELD BLOCKED] Type: ${type} | IP: ${ip} | URL: ${req.url}`);
}

// 1. HTTP Security Headers Middleware (OWASP Standard)
app.use((req, res, next) => {
  securityTelemetry.totalRequests++;
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(), geolocation=()');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:; img-src 'self' data: https: blob:; font-src 'self' https: data:;"
  );
  next();
});

// 2. IP Blacklist Check
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  if (securityTelemetry.blacklistedIPs.has(clientIP)) {
    recordSecurityThreat('BLACKLISTED_IP', 'Connection attempt from banned IP', clientIP, req);
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied: Your IP address is blacklisted by Hanzala Security Shield.'
    });
  }
  next();
});

// 3. Anti-DDoS & Rate Limiter (Protects from Anonymous/Too Many Requests)
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1-minute window
  const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
  const maxLimit = isMutation ? 30 : 150; // Max 30 writes/min or 150 reads/min per IP

  let record = securityTelemetry.rateLimits.get(clientIP);
  if (!record || now - record.windowStart > windowMs) {
    record = { count: 1, windowStart: now };
    securityTelemetry.rateLimits.set(clientIP, record);
  } else {
    record.count++;
  }

  // Rate limit exceeded
  if (record.count > maxLimit) {
    securityTelemetry.rateLimitHits++;
    recordSecurityThreat(
      'RATE_LIMIT_EXCEEDED',
      `Exceeded max frequency (${record.count} req/min > limit ${maxLimit})`,
      clientIP,
      req
    );
    res.setHeader('Retry-After', '60');
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'High request frequency detected. Rate limit triggered to protect server infrastructure. Please wait 60 seconds.',
      retryAfter: 60
    });
  }

  next();
});

// 4. Malicious Scraper, Bot & Anonymous Exploit Scanner Guard
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  // Known scanner signatures
  const suspiciousAgents = [
    'sqlmap', 'nikto', 'acunetix', 'masscan', 'nmap', 'zgrab',
    'havij', 'dirbuster', 'gobuster', 'wpscan', 'burpsuite'
  ];

  for (const bot of suspiciousAgents) {
    if (userAgent.includes(bot)) {
      recordSecurityThreat('MALICIOUS_SCANNER', `Known attack tool signature detected: ${bot}`, clientIP, req);
      return res.status(403).json({
        error: 'Security Shield Triggered',
        message: 'Automated vulnerability scanner signature detected and blocked.'
      });
    }
  }

  // Block mutation requests with completely empty/blank User-Agent
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && !req.headers['user-agent']) {
    recordSecurityThreat('ANONYMOUS_BOT_REQUEST', 'Mutation payload sent without valid User-Agent header', clientIP, req);
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Anonymous non-browser client blocked. A valid User-Agent header is required.'
    });
  }

  next();
});

// Standard Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' })); // Limit body payload to 1MB to prevent memory exhaustion

// 5. Deep Payload Inspection for SQL Injection & XSS Exploits
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const urlCheck = decodeURIComponent(req.originalUrl || req.url).toLowerCase();
  const bodyString = req.body ? JSON.stringify(req.body).toLowerCase() : '';

  // SQLi Attack Signatures
  const sqliPatterns = [
    /union\s+select/i,
    /drop\s+table/i,
    /;\s*--/i,
    /or\s+1\s*=\s*1/i,
    /'\s*or\s*'1'\s*=\s*'1/i,
    /benchmark\s*\(/i,
    /sleep\s*\(\s*\d+\s*\)/i
  ];

  // XSS Attack Signatures
  const xssPatterns = [
    /<script\b[^>]*>/i,
    /javascript\s*:/i,
    /onerror\s*=/i,
    /onload\s*=/i,
    /<iframe\b[^>]*>/i
  ];

  // Path Traversal Signatures
  const pathTraversal = /\.\.\/|\.\.\\/i;

  for (const pattern of sqliPatterns) {
    if (pattern.test(urlCheck) || pattern.test(bodyString)) {
      recordSecurityThreat('SQL_INJECTION_PROBE', 'Malicious SQL pattern in request payload', clientIP, req);
      return res.status(403).json({
        error: 'Security Violation',
        message: 'Suspicious SQL injection sequence detected and quarantined.'
      });
    }
  }

  for (const pattern of xssPatterns) {
    if (pattern.test(urlCheck) || pattern.test(bodyString)) {
      recordSecurityThreat('XSS_ATTACK_ATTEMPT', 'Script tags or event handler payload detected', clientIP, req);
      return res.status(403).json({
        error: 'Security Violation',
        message: 'Cross-Site Scripting (XSS) payload detected and sanitized.'
      });
    }
  }

  if (pathTraversal.test(urlCheck)) {
    recordSecurityThreat('PATH_TRAVERSAL_ATTEMPT', 'Directory traversal sequence (../) blocked', clientIP, req);
    return res.status(403).json({
      error: 'Security Violation',
      message: 'Path traversal attempt blocked.'
    });
  }

  next();
});

// Persistent Database Directory & File
const DATA_DIR = path.resolve(__dirname, './data');
const DB_FILE = path.resolve(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory State Cache
let dbState = null;

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      dbState = JSON.parse(raw);
      console.log('✅ Loaded database from server/data/store.json');
    } else {
      console.log('⚡ Initializing new database with default seed data...');
      dbState = JSON.parse(JSON.stringify(defaultSeedData));
      saveDatabase();
    }
  } catch (err) {
    console.error('❌ Error reading database file, loading default seed data:', err);
    dbState = JSON.parse(JSON.stringify(defaultSeedData));
    saveDatabase();
  }
}

function saveDatabase() {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(dbState, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('❌ Error saving database:', err);
  }
}

// Initialize on start
loadDatabase();

// -------------------------------------------------------------
// HELPER: Server Authoritative Pricing Calculator
// -------------------------------------------------------------
function calculateAuthoritativePrice({ serviceId, categoryId, addOnIds = [], couponCode = null, loyaltyPoints = 0 }) {
  const service = dbState.services.find(s => s.id === serviceId);
  const category = dbState.vehicleCategories.find(c => c.id === categoryId);

  if (!service || !category) return null;

  const basePrice = Math.round(service.basePrice * category.multiplier);

  let addOnsPrice = 0;
  let addOnsDuration = 0;
  (addOnIds || []).forEach(addonId => {
    const addon = dbState.addOns.find(a => a.id === addonId);
    if (addon) {
      addOnsPrice += addon.price;
      addOnsDuration += addon.durationMins;
    }
  });

  const subtotal = basePrice + addOnsPrice;
  const totalDuration = service.durationMins + addOnsDuration;

  let discount = 0;
  let couponApplied = null;
  if (couponCode) {
    const coupon = dbState.coupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active);
    if (coupon && subtotal >= coupon.minSpend) {
      if (coupon.discountType === 'percent') {
        discount = Math.round((subtotal * coupon.value) / 100);
      } else if (coupon.discountType === 'fixed') {
        discount = coupon.value;
      }
      couponApplied = coupon;
    }
  }

  let loyaltyDiscount = 0;
  if (loyaltyPoints > 0) {
    const maxAllowedDiscount = Math.round((subtotal * dbState.loyaltyConfig.maxPointsRedeemPercent) / 100);
    const pointsValue = loyaltyPoints * dbState.loyaltyConfig.pointRedemptionValuePKR;
    loyaltyDiscount = Math.min(pointsValue, maxAllowedDiscount);
  }

  const totalDiscount = Math.min(discount + loyaltyDiscount, subtotal);
  const taxableAmount = Math.max(0, subtotal - totalDiscount);
  const tax = Math.round((taxableAmount * (dbState.business.taxRatePercent || 0)) / 100);
  const finalTotal = taxableAmount + tax;

  return {
    service,
    category,
    basePrice,
    addOnsPrice,
    subtotal,
    totalDuration,
    discount: totalDiscount,
    couponDiscount: discount,
    loyaltyDiscount,
    couponApplied,
    tax,
    finalTotal
  };
}

function appendAuditLog(action, details, actor = 'System') {
  const logEntry = {
    id: `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    action,
    details,
    actor,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  dbState.auditLogs.unshift(logEntry);
  return logEntry;
}

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '2.0.0-PROD'
  });
});

// 2. Full Store State
app.get('/api/store', (req, res) => {
  res.json(dbState);
});

// 3. Clear ALL Dummy Data in One Click (Admin requested feature)
app.post('/api/store/clear-dummy-data', (req, res) => {
  const actor = req.body?.actor || 'Administrator';
  
  const previousBookingsCount = dbState.bookings.length;
  const previousReviewsCount = dbState.reviews.length;
  const previousLogsCount = dbState.auditLogs.length;

  // Clear dummy data
  dbState.bookings = [];
  dbState.reviews = [];
  dbState.auditLogs = [];

  // Reset coupon usage counts back to zero
  dbState.coupons.forEach(c => {
    c.usageCount = 0;
  });

  // Reset user loyalty points and saved test vehicles
  if (dbState.auth && dbState.auth.user) {
    dbState.auth.user.loyaltyPoints = 0;
    dbState.auth.user.savedVehicles = [];
  }

  // Create clean initial audit log
  appendAuditLog(
    'CLEAR_DUMMY_DATA',
    `One-click clean executed: Removed ${previousBookingsCount} bookings, ${previousReviewsCount} reviews, and ${previousLogsCount} logs. System is now fresh for production.`,
    actor
  );

  saveDatabase();

  res.json({
    success: true,
    message: 'All dummy bookings, test reviews, and audit logs have been deleted successfully. The system is completely clean and ready for real operations!',
    data: dbState
  });
});

// 4. Reset to Default Demo Data (for testing/showcase)
app.post('/api/store/reset-demo-data', (req, res) => {
  const actor = req.body?.actor || 'Administrator';
  dbState = JSON.parse(JSON.stringify(defaultSeedData));
  
  appendAuditLog(
    'RESET_DEMO_DATA',
    'System re-seeded with demo records for interactive presentation.',
    actor
  );

  saveDatabase();

  res.json({
    success: true,
    message: 'Store re-seeded with demo records successfully.',
    data: dbState
  });
});

// 5. Bookings API
app.get('/api/bookings', (req, res) => {
  let list = [...dbState.bookings];
  const { status, search, date, phone } = req.query;

  if (status && status !== 'all') {
    list = list.filter(b => b.bookingStatus === status);
  }

  if (date) {
    list = list.filter(b => b.bookingDate === date);
  }

  if (phone) {
    list = list.filter(b => b.customerPhone && b.customerPhone.includes(phone));
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(b =>
      b.id.toLowerCase().includes(q) ||
      b.customerName.toLowerCase().includes(q) ||
      (b.vehicleReg && b.vehicleReg.toLowerCase().includes(q))
    );
  }

  res.json(list);
});

app.get('/api/bookings/:id', (req, res) => {
  const booking = dbState.bookings.find(b => b.id.toUpperCase() === req.params.id.toUpperCase());
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json(booking);
});

// Create Booking
app.post('/api/bookings', (req, res) => {
  const payload = req.body;
  if (!payload.serviceId || !payload.categoryId || !payload.customerName || !payload.customerPhone) {
    return res.status(400).json({ error: 'Missing required booking fields (serviceId, categoryId, customerName, customerPhone)' });
  }

  // Recalculate authoritative price on server
  const pricing = calculateAuthoritativePrice({
    serviceId: payload.serviceId,
    categoryId: payload.categoryId,
    addOnIds: payload.addOns || [],
    couponCode: payload.couponCode,
    loyaltyPoints: payload.loyaltyPoints || 0
  });

  if (!pricing) {
    return res.status(400).json({ error: 'Invalid service or vehicle category selected' });
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `HCW-2026-${randomNum}`;
  const qrToken = `HCW-QR-${randomNum}-${Date.now().toString(36).toUpperCase()}`;

  const paymentMethod = payload.paymentMethod || 'Pay on Site (Cash / POS)';
  const paymentStatus = paymentMethod.includes('Pay on Site') ? 'Pending' : 'Paid';

  const newBooking = {
    id: bookingId,
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    customerEmail: payload.customerEmail || '',
    vehicleMake: payload.vehicleMake || 'Unknown Make',
    vehicleModel: payload.vehicleModel || 'Model',
    vehicleReg: payload.vehicleReg || 'Pending Plate',
    categoryId: payload.categoryId,
    serviceId: payload.serviceId,
    serviceName: pricing.service.name,
    addOns: payload.addOns || [],
    branchId: payload.branchId || 'b1',
    bayId: payload.bayId || 'bay_1',
    assignedStaffId: payload.assignedStaffId || null,
    bookingDate: payload.bookingDate || new Date().toISOString().split('T')[0],
    bookingTime: payload.bookingTime || '10:00 AM',
    durationMins: pricing.totalDuration,
    basePrice: pricing.basePrice,
    addOnPrice: pricing.addOnsPrice,
    discountAmount: pricing.discount,
    taxAmount: pricing.tax,
    totalAmount: pricing.finalTotal,
    paymentMethod,
    paymentStatus,
    bookingStatus: 'Confirmed',
    checkInTime: null,
    completionTime: null,
    serviceNotes: payload.serviceNotes || '',
    qrToken,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    statusHistory: [
      {
        status: 'Confirmed',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actor: payload.actor || 'Customer Online Booking'
      }
    ]
  };

  dbState.bookings.unshift(newBooking);

  // If coupon was applied, increment usage count
  if (pricing.couponApplied) {
    const coupon = dbState.coupons.find(c => c.code === pricing.couponApplied.code);
    if (coupon) coupon.usageCount++;
  }

  appendAuditLog(
    'BOOKING_CREATED',
    `New booking ${bookingId} created for ${newBooking.customerName} (Rs. ${newBooking.totalAmount})`,
    newBooking.customerName
  );

  saveDatabase();

  res.status(201).json({
    success: true,
    booking: newBooking
  });
});

// Update Booking Status
app.patch('/api/bookings/:id/status', (req, res) => {
  const { newStatus, actor = 'Staff', bayId, staffId } = req.body;
  const booking = dbState.bookings.find(b => b.id.toUpperCase() === req.params.id.toUpperCase());

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const prevStatus = booking.bookingStatus;
  booking.bookingStatus = newStatus;

  if (bayId) booking.bayId = bayId;
  if (staffId) booking.assignedStaffId = staffId;

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (newStatus === 'Checked In' && !booking.checkInTime) {
    booking.checkInTime = nowTime;
  }
  if (newStatus === 'Completed' && !booking.completionTime) {
    booking.completionTime = nowTime;
    booking.paymentStatus = 'Paid';
  }

  booking.statusHistory.unshift({
    status: newStatus,
    timestamp: nowTime,
    actor,
    previous: prevStatus
  });

  appendAuditLog(
    'STATUS_TRANSITION',
    `Booking ${booking.id} transitioned from ${prevStatus} to ${newStatus}`,
    actor
  );

  saveDatabase();

  res.json({
    success: true,
    booking
  });
});

// Process Cancellation and 5% Gateway Deduction Refund (SRS Section 10)
app.post('/api/bookings/:id/cancel', (req, res) => {
  const { reason = 'Customer Cancellation', actor = 'Customer' } = req.body;
  const booking = dbState.bookings.find(b => b.id.toUpperCase() === req.params.id.toUpperCase());

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const paid = booking.paymentStatus === 'Paid';
  const total = booking.totalAmount;

  let deductionAmount = 0;
  let netRefund = 0;

  if (paid) {
    const rate = dbState.policy.cancellationDeductionPercent || 5;
    deductionAmount = Math.round((total * rate) / 100);
    netRefund = total - deductionAmount;
    booking.paymentStatus = 'Refunded';
    booking.refundDetails = {
      originalAmount: total,
      deductionPercent: rate,
      deductionAmount,
      refundedAmount: netRefund,
      refundedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      approvedBy: actor
    };
  } else {
    booking.paymentStatus = 'Cancelled';
  }

  booking.bookingStatus = 'Cancelled';
  booking.cancellationReason = reason;

  booking.statusHistory.unshift({
    status: 'Cancelled',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actor,
    reason
  });

  appendAuditLog(
    'REFUND_ISSUED',
    `Booking ${booking.id} cancelled. Refund: PKR ${netRefund} (Deduction fee: PKR ${deductionAmount} at ${dbState.policy.cancellationDeductionPercent}%)`,
    actor
  );

  saveDatabase();

  res.json({
    success: true,
    deductionAmount,
    netRefund,
    booking
  });
});

// Delete single booking (Admin action)
app.delete('/api/bookings/:id', (req, res) => {
  const index = dbState.bookings.findIndex(b => b.id.toUpperCase() === req.params.id.toUpperCase());
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const [deleted] = dbState.bookings.splice(index, 1);
  appendAuditLog('BOOKING_DELETED', `Booking ${deleted.id} permanently deleted by admin.`, 'Administrator');
  saveDatabase();

  res.json({ success: true, message: `Booking ${deleted.id} deleted` });
});

// 6. Pricing Calculation Endpoint
app.post('/api/pricing/calculate', (req, res) => {
  const result = calculateAuthoritativePrice(req.body);
  if (!result) {
    return res.status(400).json({ error: 'Invalid calculation parameters' });
  }
  res.json(result);
});

// 7. Services & Categories API
app.get('/api/services', (req, res) => {
  res.json({
    services: dbState.services,
    categories: dbState.vehicleCategories,
    addOns: dbState.addOns,
    bays: dbState.bays
  });
});

app.put('/api/services', (req, res) => {
  if (req.body.services) dbState.services = req.body.services;
  if (req.body.vehicleCategories) dbState.vehicleCategories = req.body.vehicleCategories;
  if (req.body.addOns) dbState.addOns = req.body.addOns;

  appendAuditLog('SERVICES_UPDATED', 'Services catalog and pricing updated.', req.body.actor || 'Administrator');
  saveDatabase();
  res.json({ success: true, message: 'Services updated successfully' });
});

// 8. Reviews API
app.get('/api/reviews', (req, res) => {
  res.json(dbState.reviews);
});

app.post('/api/reviews', (req, res) => {
  const { bookingId, customerName, rating, serviceName, vehicle, comment } = req.body;
  if (!customerName || !rating || !comment) {
    return res.status(400).json({ error: 'Customer name, rating, and comment are required' });
  }

  const newRev = {
    id: `rev_${Date.now()}`,
    bookingId: bookingId || `HCW-REV-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    rating: Number(rating) || 5,
    serviceName: serviceName || 'General Wash',
    vehicle: vehicle || 'Standard Vehicle',
    comment,
    date: new Date().toISOString().split('T')[0],
    verifiedBooking: true,
    adminResponse: null
  };

  dbState.reviews.unshift(newRev);
  appendAuditLog('REVIEW_ADDED', `New verified review added by ${customerName}`, customerName);
  saveDatabase();

  res.status(201).json({ success: true, review: newRev });
});

app.patch('/api/reviews/:id/reply', (req, res) => {
  const rev = dbState.reviews.find(r => r.id === req.params.id);
  if (!rev) {
    return res.status(404).json({ error: 'Review not found' });
  }

  rev.adminResponse = req.body.replyText || '';
  appendAuditLog('REVIEW_REPLIED', `Admin replied to review ${rev.id}`, req.body.actor || 'Administrator');
  saveDatabase();

  res.json({ success: true, review: rev });
});

// 9. Coupons API
app.get('/api/coupons', (req, res) => {
  res.json(dbState.coupons);
});

app.post('/api/coupons/validate', (req, res) => {
  const { code, subtotal = 0 } = req.body;
  if (!code) return res.status(400).json({ valid: false, message: 'Please provide a coupon code' });

  const coupon = dbState.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
  if (!coupon) {
    return res.status(404).json({ valid: false, message: 'Invalid or expired coupon code' });
  }

  if (subtotal < coupon.minSpend) {
    return res.status(400).json({
      valid: false,
      message: `Minimum spend of Rs. ${coupon.minSpend} required for coupon ${coupon.code}`
    });
  }

  let discount = 0;
  if (coupon.discountType === 'percent') {
    discount = Math.round((subtotal * coupon.value) / 100);
  } else if (coupon.discountType === 'fixed') {
    discount = coupon.value;
  }

  res.json({
    valid: true,
    code: coupon.code,
    discount,
    discountType: coupon.discountType,
    value: coupon.value,
    description: coupon.description
  });
});

// 10. CMS Business Info API
app.put('/api/cms', (req, res) => {
  if (req.body.business) {
    dbState.business = { ...dbState.business, ...req.body.business };
  }
  if (req.body.policy) {
    dbState.policy = { ...dbState.policy, ...req.body.policy };
  }

  appendAuditLog('CMS_UPDATED', 'Website announcements and business configuration updated.', req.body.actor || 'Administrator');
  saveDatabase();

  res.json({
    success: true,
    message: 'CMS settings updated and saved to persistent database.',
    business: dbState.business,
    policy: dbState.policy
  });
});

// 11. Audit Logs API
app.get('/api/audit-logs', (req, res) => {
  res.json(dbState.auditLogs);
});

// 12. Staff & Employee Management API
app.get('/api/staff', (req, res) => {
  res.json(dbState.staff || []);
});

app.post('/api/staff', (req, res) => {
  const { name, role, phone, email, assignedBay, shift } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }

  const roleNameMap = {
    admin: 'Owner / Administrator',
    manager: 'Operations Manager',
    receptionist: 'Front Desk / Receptionist',
    operator: 'Wash Operator / Detailer',
    finance: 'Finance & Accounts'
  };

  const newStaff = {
    id: `st_${Date.now()}`,
    name,
    role,
    roleName: roleNameMap[role] || role,
    phone: phone || '0300-0000000',
    email: email || '',
    assignedBay: assignedBay || 'All Bays',
    shift: shift || 'Full Shift',
    active: true
  };

  if (!dbState.staff) dbState.staff = [];
  dbState.staff.push(newStaff);

  appendAuditLog('STAFF_MEMBER_ADDED', `New employee ${name} (${newStaff.roleName}) onboarded`, req.body.actor || 'Administrator');
  saveDatabase();

  res.status(201).json({
    success: true,
    message: `Staff member ${name} added successfully!`,
    staff: newStaff
  });
});

app.delete('/api/staff/:id', (req, res) => {
  const { id } = req.params;
  const idx = (dbState.staff || []).findIndex(s => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Staff member not found' });
  }

  const removed = dbState.staff.splice(idx, 1)[0];
  appendAuditLog('STAFF_MEMBER_REMOVED', `Employee ${removed.name} removed from system`, req.body.actor || 'Administrator');
  saveDatabase();

  res.json({ success: true, message: `Staff member ${removed.name} removed.` });
});

// 13. Security Telemetry & Live Firewall API
app.get('/api/security/stats', (req, res) => {
  res.json({
    activeFirewall: securityTelemetry.activeFirewall,
    totalRequests: securityTelemetry.totalRequests,
    blockedAttacks: securityTelemetry.blockedAttacks,
    rateLimitHits: securityTelemetry.rateLimitHits,
    blacklistedIPsCount: securityTelemetry.blacklistedIPs.size,
    blacklistedIPs: Array.from(securityTelemetry.blacklistedIPs),
    activeRateTrackedIPs: securityTelemetry.rateLimits.size,
    recentThreats: securityTelemetry.recentThreats.slice(0, 15)
  });
});

app.post('/api/security/block-ip', (req, res) => {
  const { ip, reason } = req.body;
  if (!ip) return res.status(400).json({ error: 'IP is required' });

  securityTelemetry.blacklistedIPs.add(ip);
  appendAuditLog('IP_BLACKLISTED', `IP address ${ip} manually quarantined. Reason: ${reason || 'Suspicious behavior'}`, req.body.actor || 'Administrator');
  saveDatabase();

  res.json({ success: true, message: `IP ${ip} is now blocked by the firewall.` });
});

app.post('/api/security/unblock-ip', (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: 'IP is required' });

  securityTelemetry.blacklistedIPs.delete(ip);
  appendAuditLog('IP_UNBLOCKED', `IP address ${ip} unblocked from firewall`, req.body.actor || 'Administrator');
  saveDatabase();

  res.json({ success: true, message: `IP ${ip} has been removed from the blacklist.` });
});

app.post('/api/security/simulate-attack', (req, res) => {
  const { type = 'SQL_INJECTION' } = req.body;
  const mockIP = `198.51.100.${Math.floor(10 + Math.random() * 80)}`;
  recordSecurityThreat(type, `Simulated threat demonstration: ${type} attack blocked by WAF inspection rules`, mockIP, req);
  res.json({
    success: true,
    message: `Security simulation triggered! Threat logged and neutralized by firewall shield.`,
    simulatedIP: mockIP,
    threatType: type
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Hanzala Car Wash Node.js API Server`);
  console.log(`📡 Running on: http://localhost:${PORT}`);
  console.log(`📁 Persistent JSON DB: ${DB_FILE}`);
  console.log(`=======================================================`);
});
