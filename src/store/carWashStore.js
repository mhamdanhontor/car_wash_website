import { reactive, computed, watch } from 'vue';

const STORAGE_KEY = 'hanzala_carwash_store_v2';

const defaultData = {
  // Business Info & CMS Settings
  business: {
    name: "Hanzala Car Wash",
    tagline: "Premium Car Wash & Detailing Services",
    slogan: "Professional cleaning, detailing and care for your vehicle.",
    phone: "+92 300 8492000",
    whatsapp: "+923008492000",
    email: "info@hanzalacarwash.com",
    taxRatePercent: 0, // 0 for tax inclusive / exempt in local demo
    currency: "PKR",
    currencySymbol: "Rs.",
    operatingHours: "Monday - Sunday: 8:00 AM - 10:00 PM",
    announcement: "✨ Grand Weekend Offer: Get 20% OFF on Premium Detailing! Use code PREMIUM20",
    branches: [
      { id: "b1", name: "Main Hub - Gulberg III", address: "Plot 42-A, Main Boulevard, Gulberg III, Lahore", bays: 3, phone: "+92 300 8492001" },
      { id: "b2", name: "DHA Phase 5 Studio", address: "Sector C, Commercial Avenue, DHA Phase 5, Lahore", bays: 2, phone: "+92 300 8492002" }
    ]
  },

  // Policy Settings (SRS Section 10)
  policy: {
    cancellationCutoffHours: 2,
    cancellationDeductionPercent: 5, // 5% deduction fee as per SRS example
    noShowGracePeriodMins: 20,
    maxRefundAllowedPercent: 100,
    policyVersion: "2.0-PKR-2026"
  },

  // Vehicle Categories (SRS Section 5)
  vehicleCategories: [
    {
      id: "small",
      name: "Small Car (Hatchback)",
      examples: "Alto, Cultus, Swift, Aqua, Picanto",
      multiplier: 1.0,
      startingPrice: 1200,
      icon: "car-compact"
    },
    {
      id: "sedan",
      name: "Sedan",
      examples: "Civic, Corolla, City, Elantra, Yaris",
      multiplier: 1.25,
      startingPrice: 1500,
      icon: "car-sedan"
    },
    {
      id: "suv",
      name: "SUV / Crossover",
      examples: "Sportage, Tucson, Vezel, Oshan X7, Haval",
      multiplier: 1.65,
      startingPrice: 2500,
      icon: "car-suv"
    },
    {
      id: "large_suv",
      name: "Large SUV",
      examples: "Fortuner, Prado, Land Cruiser, Patrol",
      multiplier: 2.2,
      startingPrice: 3500,
      icon: "car-suv-large"
    },
    {
      id: "van_pickup",
      name: "Pickup / Van",
      examples: "Hilux Revo, D-Max, Hiace, Grand Cabin",
      multiplier: 2.3,
      startingPrice: 3500,
      icon: "car-truck"
    }
  ],

  // Service Packages (SRS Section 4 & 5)
  services: [
    {
      id: "exterior",
      name: "Exterior Wash",
      shortDesc: "Complete exterior cleaning and shine.",
      durationMins: 25,
      basePrice: 1200,
      image: "/images/service-exterior.jpg",
      popular: false,
      included: [
        "High-pressure snow foam pre-wash",
        "Two-bucket grit guard hand wash",
        "Undercarriage & wheel arch blast",
        "Alloy wheel & tire face degreasing",
        "Microfiber scratch-free towel dry",
        "Long-lasting silicone tire shine"
      ],
      excluded: [
        "Interior vacuuming or dusting",
        "Seat stain extraction",
        "Machine paint polish"
      ]
    },
    {
      id: "interior",
      name: "Interior Cleaning",
      shortDesc: "Deep cleaning of seats, carpets and interior surfaces.",
      durationMins: 40,
      basePrice: 1800,
      image: "/images/service-interior.jpg",
      popular: false,
      included: [
        "Deep high-suction vacuuming (seats, trunk & mats)",
        "AC vent antibacterial steam sanitization",
        "Dashboard, console & door panel conditioning",
        "Streak-free crystal window cleaning (interior)",
        "Floor mat pressure wash & deodorizer",
        "Premium automotive air freshener scent"
      ],
      excluded: [
        "Exterior foam wash",
        "Engine bay cleaning",
        "Paint sealant"
      ]
    },
    {
      id: "full",
      name: "Full Car Wash",
      shortDesc: "Complete interior and exterior cleaning.",
      durationMins: 55,
      basePrice: 2500,
      image: "/images/service-full.jpg",
      popular: true,
      badge: "Most Popular",
      included: [
        "Everything in Exterior Wash package",
        "Everything in Interior Cleaning package",
        "Trunk and spare tire well detailing",
        "Engine bay surface dust wipe-down",
        "Door jambs & fuel cap steam clean",
        "UV dashboard & leather protective coat"
      ],
      excluded: [
        "Paint scratch correction / buffing",
        "Multi-year ceramic coating"
      ]
    },
    {
      id: "detailing",
      name: "Premium Detailing",
      shortDesc: "Advanced cleaning, polishing and long-lasting protection.",
      durationMins: 110,
      basePrice: 5000,
      image: "/images/service-detailing.jpg",
      popular: false,
      badge: "Showroom Finish",
      included: [
        "Deep 3-stage foam wash & iron fallout removal",
        "Clay bar paint decontamination",
        "Dual-action machine polish & gloss enhancement",
        "6-Month hydrophobic ceramic spray sealant",
        "Full interior hot water upholstery shampoo",
        "Leather conditioning & nourishment treatment",
        "Full engine bay steam detailing & dressing",
        "Headlight & taillight clarity restoration"
      ],
      excluded: [
        "Full vehicle body repainting"
      ]
    }
  ],

  // Optional Add-ons (SRS Section 5)
  addOns: [
    { id: "addon_engine", name: "Engine Bay Steam Detailing", price: 800, durationMins: 20, desc: "Safe degreasing & moisture-proof dressing" },
    { id: "addon_ceramic", name: "Hydrophobic Ceramic Spray Wax", price: 1200, durationMins: 25, desc: "High water beading & 90-day mirror gloss" },
    { id: "addon_headlight", name: "Headlight UV Polish & Restoration", price: 900, durationMins: 15, desc: "Restores cloudy, oxidized yellowish lenses" },
    { id: "addon_leather", name: "Luxury Leather Balm Treatment", price: 1000, durationMins: 20, desc: "Deep hydration to prevent cracks & aging" },
    { id: "addon_ozone", name: "Anti-Bacterial Ozone Odor Neutralizer", price: 700, durationMins: 15, desc: "Eliminates smoke, pet & mildew odors" }
  ],

  // Washing Bays (SRS Section 6.2)
  bays: [
    { id: "bay_1", name: "Bay 1 (Express Wash)", branchId: "b1", type: "Wash", active: true },
    { id: "bay_2", name: "Bay 2 (Full Service & Interior)", branchId: "b1", type: "Full", active: true },
    { id: "bay_3", name: "Bay 3 (Detailing & Ceramic Studio)", branchId: "b1", type: "Detailing", active: true }
  ],

  // Staff & Roles (SRS Section 3)
  staff: [
    { id: "st_1", name: "Hanzala Tariq", role: "admin", roleName: "Owner / Administrator", email: "admin@hanzalacarwash.com", phone: "0300-8492000" },
    { id: "st_2", name: "Bilawal Sheikh", role: "manager", roleName: "Operations Manager", email: "manager@hanzalacarwash.com", phone: "0300-8492001" },
    { id: "st_3", name: "Tariq Mehmood", role: "receptionist", roleName: "Front Desk & Check-in", email: "reception@hanzalacarwash.com", phone: "0300-8492002" },
    { id: "st_4", name: "Ali Raza", role: "operator", roleName: "Senior Detailer / Staff", email: "ali@hanzalacarwash.com", phone: "0300-8492003" },
    { id: "st_5", name: "Hamza Khan", role: "operator", roleName: "Wash Operator", email: "hamza@hanzalacarwash.com", phone: "0300-8492004" },
    { id: "st_6", name: "Sara Ahmed", role: "finance", roleName: "Finance & Accounts", email: "finance@hanzalacarwash.com", phone: "0300-8492005" }
  ],

  // Coupons (SRS Section 11)
  coupons: [
    { code: "WELCOME10", discountType: "percent", value: 10, minSpend: 1000, description: "10% OFF for new customers", usageCount: 42, maxUsage: 500, active: true },
    { code: "PREMIUM20", discountType: "percent", value: 20, minSpend: 4000, description: "20% OFF on Detailing packages", usageCount: 18, maxUsage: 100, active: true },
    { code: "HANZALA500", discountType: "fixed", value: 500, minSpend: 2500, description: "Flat Rs. 500 OFF on Full Wash", usageCount: 65, maxUsage: 200, active: true }
  ],

  // Loyalty Program (SRS Section 11)
  loyaltyConfig: {
    pointsPer100Spent: 1, // 1 point per 100 PKR spent
    pointRedemptionValuePKR: 2, // 1 point = 2 PKR discount
    maxPointsRedeemPercent: 20 // Max 20% discount on order
  },

  // Active User session (Customer or Staff)
  auth: {
    isLoggedIn: true,
    userRole: "customer", // 'customer' | 'admin' | 'manager' | 'receptionist' | 'operator' | 'finance'
    user: {
      id: "cust_101",
      name: "Muhammad Ali",
      phone: "+92 301 5558899",
      email: "m.ali@gmail.com",
      loyaltyPoints: 340,
      savedVehicles: [
        { id: "v1", make: "Honda", model: "Civic RS", year: "2023", categoryId: "sedan", regNumber: "LEA-23-9912", color: "Taffeta White" },
        { id: "v2", make: "Toyota", model: "Fortuner Legender", year: "2022", categoryId: "large_suv", regNumber: "ISB-22-4411", color: "Attitude Black" }
      ]
    }
  },

  // Pre-seeded Bookings for comprehensive demonstration (SRS Section 6.3 & 14)
  bookings: [
    {
      id: "HCW-2026-9182",
      customerName: "Ali Raza Khan",
      customerPhone: "0300-1234567",
      customerEmail: "ali.raza@gmail.com",
      vehicleMake: "Honda",
      vehicleModel: "Civic Oriel",
      vehicleReg: "LEA-22-1144",
      categoryId: "sedan",
      serviceId: "full",
      serviceName: "Full Car Wash",
      addOns: ["addon_ceramic"],
      branchId: "b1",
      bayId: "bay_2",
      assignedStaffId: "st_4",
      bookingDate: "2026-10-28",
      bookingTime: "10:00 AM",
      durationMins: 80,
      basePrice: 1875,
      addOnPrice: 1200,
      discountAmount: 200,
      taxAmount: 0,
      totalAmount: 2875,
      paymentMethod: "Card (Mastercard)",
      paymentStatus: "Paid", // 'Paid' | 'Pending' | 'Refunded' | 'Partially Refunded'
      bookingStatus: "In Progress", // 'Confirmed' | 'Checked In' | 'In Progress' | 'Completed' | 'Cancelled' | 'No-Show'
      checkInTime: "2026-10-28 09:55 AM",
      completionTime: null,
      serviceNotes: "Customer requested special care around ceramic front bumper.",
      inspectionChecklist: { scratchesNoted: true, personalBelongingsRemoved: true },
      qrToken: "HCW-QR-9182-SECURE",
      createdAt: "2026-10-27 18:30",
      statusHistory: [
        { status: "Confirmed", timestamp: "2026-10-27 18:30", actor: "Customer Checkout" },
        { status: "Checked In", timestamp: "2026-10-28 09:55 AM", actor: "Tariq Mehmood (Front Desk)" },
        { status: "In Progress", timestamp: "2026-10-28 10:05 AM", actor: "Ali Raza (Detailer)" }
      ]
    },
    {
      id: "HCW-2026-8841",
      customerName: "Sara Khan",
      customerPhone: "0321-9876543",
      customerEmail: "sara.k@gmail.com",
      vehicleMake: "Kia",
      vehicleModel: "Sportage AWD",
      vehicleReg: "LHE-21-5588",
      categoryId: "suv",
      serviceId: "exterior",
      serviceName: "Exterior Wash",
      addOns: [],
      branchId: "b1",
      bayId: "bay_1",
      assignedStaffId: "st_5",
      bookingDate: "2026-10-28",
      bookingTime: "11:00 AM",
      durationMins: 25,
      basePrice: 1980,
      addOnPrice: 0,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: 1980,
      paymentMethod: "JazzCash",
      paymentStatus: "Paid",
      bookingStatus: "Completed",
      checkInTime: "2026-10-28 10:50 AM",
      completionTime: "2026-10-28 11:20 AM",
      serviceNotes: "Exterior dried and buffed with microfiber.",
      qrToken: "HCW-QR-8841-SECURE",
      createdAt: "2026-10-27 14:15",
      statusHistory: [
        { status: "Confirmed", timestamp: "2026-10-27 14:15", actor: "Customer Checkout" },
        { status: "Checked In", timestamp: "2026-10-28 10:50 AM", actor: "Tariq Mehmood" },
        { status: "In Progress", timestamp: "2026-10-28 10:55 AM", actor: "Hamza Khan" },
        { status: "Completed", timestamp: "2026-10-28 11:20 AM", actor: "Hamza Khan" }
      ]
    },
    {
      id: "HCW-2026-7729",
      customerName: "Bilal Ahmed",
      customerPhone: "0333-4455667",
      customerEmail: "bilal.ahmed@outlook.com",
      vehicleMake: "Hyundai",
      vehicleModel: "Tucson",
      vehicleReg: "ICT-20-7711",
      categoryId: "suv",
      serviceId: "interior",
      serviceName: "Interior Cleaning",
      addOns: ["addon_ozone"],
      branchId: "b1",
      bayId: "bay_2",
      assignedStaffId: "st_4",
      bookingDate: "2026-10-28",
      bookingTime: "12:00 PM",
      durationMins: 55,
      basePrice: 2970,
      addOnPrice: 700,
      discountAmount: 300,
      taxAmount: 0,
      totalAmount: 3370,
      paymentMethod: "EasyPaisa",
      paymentStatus: "Paid",
      bookingStatus: "Completed",
      checkInTime: "2026-10-28 11:58 AM",
      completionTime: "2026-10-28 12:50 PM",
      serviceNotes: "Pet hair removed from backseat.",
      qrToken: "HCW-QR-7729-SECURE",
      createdAt: "2026-10-26 11:10",
      statusHistory: [
        { status: "Confirmed", timestamp: "2026-10-26 11:10", actor: "Customer Checkout" },
        { status: "Checked In", timestamp: "2026-10-28 11:58 AM", actor: "Tariq Mehmood" },
        { status: "Completed", timestamp: "2026-10-28 12:50 PM", actor: "Ali Raza" }
      ]
    },
    {
      id: "HCW-2026-6540",
      customerName: "Usman Malik",
      customerPhone: "0302-8889911",
      customerEmail: "usman.m@yahoo.com",
      vehicleMake: "Toyota",
      vehicleModel: "Land Cruiser V8",
      vehicleReg: "LXZ-19-0001",
      categoryId: "large_suv",
      serviceId: "detailing",
      serviceName: "Premium Detailing",
      addOns: ["addon_ceramic", "addon_engine", "addon_leather"],
      branchId: "b1",
      bayId: "bay_3",
      assignedStaffId: "st_4",
      bookingDate: "2026-10-28",
      bookingTime: "01:00 PM",
      durationMins: 175,
      basePrice: 11000,
      addOnPrice: 3000,
      discountAmount: 1000,
      taxAmount: 0,
      totalAmount: 13000,
      paymentMethod: "Pay on Site (Cash / POS)",
      paymentStatus: "Pending",
      bookingStatus: "Confirmed",
      checkInTime: null,
      completionTime: null,
      serviceNotes: "Customer requested leather protection on beige interior.",
      qrToken: "HCW-QR-6540-SECURE",
      createdAt: "2026-10-27 21:00",
      statusHistory: [
        { status: "Confirmed", timestamp: "2026-10-27 21:00", actor: "Customer Online" }
      ]
    },
    {
      id: "HCW-2026-5121",
      customerName: "Muhammad Ali", // Current logged in user's upcoming wash
      customerPhone: "+92 301 5558899",
      customerEmail: "m.ali@gmail.com",
      vehicleMake: "Honda",
      vehicleModel: "Civic RS",
      vehicleReg: "LEA-23-9912",
      categoryId: "sedan",
      serviceId: "full",
      serviceName: "Full Car Wash",
      addOns: ["addon_ceramic"],
      branchId: "b1",
      bayId: "bay_2",
      assignedStaffId: null,
      bookingDate: "2026-10-28",
      bookingTime: "03:30 PM",
      durationMins: 80,
      basePrice: 3125,
      addOnPrice: 1200,
      discountAmount: 432,
      taxAmount: 0,
      totalAmount: 3893,
      paymentMethod: "Raast Instant Transfer",
      paymentStatus: "Paid",
      bookingStatus: "Confirmed",
      checkInTime: null,
      completionTime: null,
      serviceNotes: "Please pay extra attention to door sills.",
      qrToken: "HCW-QR-5121-SECURE",
      createdAt: "2026-10-28 00:45",
      statusHistory: [
        { status: "Confirmed", timestamp: "2026-10-28 00:45", actor: "Customer Checkout" }
      ]
    },
    {
      id: "HCW-2026-4402",
      customerName: "Zainab Bibi",
      customerPhone: "0345-9988771",
      customerEmail: "zainab@gmail.com",
      vehicleMake: "Suzuki",
      vehicleModel: "Swift GLX",
      vehicleReg: "LEB-24-3321",
      categoryId: "small",
      serviceId: "exterior",
      serviceName: "Exterior Wash",
      addOns: [],
      branchId: "b1",
      bayId: "bay_1",
      assignedStaffId: null,
      bookingDate: "2026-10-27",
      bookingTime: "04:00 PM",
      durationMins: 25,
      basePrice: 1200,
      addOnPrice: 0,
      discountAmount: 120,
      taxAmount: 0,
      totalAmount: 1080,
      paymentMethod: "JazzCash",
      paymentStatus: "Refunded",
      bookingStatus: "Cancelled",
      cancellationReason: "Customer had an urgent flight reschedule",
      refundDetails: {
        originalAmount: 1080,
        deductionPercent: 5,
        deductionAmount: 54,
        refundedAmount: 1026,
        refundedAt: "2026-10-27 15:10",
        approvedBy: "Sara Ahmed (Finance)"
      },
      qrToken: "HCW-QR-4402-SECURE",
      createdAt: "2026-10-26 19:20",
      statusHistory: [
        { status: "Confirmed", timestamp: "2026-10-26 19:20", actor: "Customer" },
        { status: "Cancellation Requested", timestamp: "2026-10-27 15:05", actor: "Customer" },
        { status: "Cancelled", timestamp: "2026-10-27 15:10", actor: "System Refund Engine" }
      ]
    }
  ],

  // Verified Reviews (SRS Section 12)
  reviews: [
    {
      id: "rev_1",
      bookingId: "HCW-2026-8841",
      customerName: "Sara Khan",
      rating: 5,
      serviceName: "Exterior Wash",
      vehicle: "Kia Sportage",
      comment: "Absolutely outstanding quality! The snow foam wash and undercarriage cleaning made my SUV look brand new. The staff was professional and finished right on time.",
      date: "2026-10-28",
      verifiedBooking: true,
      adminResponse: "Thank you Sara! Glad to serve your Sportage. Looking forward to your next visit!"
    },
    {
      id: "rev_2",
      bookingId: "HCW-2026-7729",
      customerName: "Bilal Ahmed",
      rating: 5,
      serviceName: "Interior Cleaning & Ozone",
      vehicle: "Hyundai Tucson",
      comment: "Best interior detailing in Lahore. The ozone treatment completely eliminated pet odors, and the leather seats feel soft and hydrated without any greasy residue.",
      date: "2026-10-28",
      verifiedBooking: true,
      adminResponse: "Appreciate your kind words Bilal! Our steam and ozone treatment is designed specifically for deep hygiene."
    },
    {
      id: "rev_3",
      bookingId: "HCW-2026-9012",
      customerName: "Kamran Shah",
      rating: 5,
      serviceName: "Premium Detailing & Ceramic",
      vehicle: "Audi A6",
      comment: "Incredible attention to detail. Ali Raza worked on my car for nearly 2 hours with the rotary polisher. The mirror reflection and ceramic hydrophobic water beading are top tier.",
      date: "2026-10-25",
      verifiedBooking: true,
      adminResponse: "Honored to detail your Audi A6, Kamran! Drive safe with that mirror shine."
    }
  ],

  // System Audit Logs (SRS Section 17 & 20)
  auditLogs: [
    { id: "log_1", action: "SYSTEM_INIT", details: "Hanzala Car Wash booking engine initialized with Version 2.0 specs", actor: "System", timestamp: "2026-10-26 08:00:00" },
    { id: "log_2", action: "REFUND_PROCESSED", details: "Refund of Rs. 1,026 approved for booking HCW-2026-4402 (5% deduction Rs. 54 applied)", actor: "Sara Ahmed (Finance)", timestamp: "2026-10-27 15:10:22" },
    { id: "log_3", action: "CHECKIN_RECORDED", details: "Vehicle LEA-22-1144 checked in at Bay 2", actor: "Tariq Mehmood", timestamp: "2026-10-28 09:55:00" }
  ]
};

// Initialize State from LocalStorage or Default
function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultData, ...parsed };
    }
  } catch (err) {
    console.warn("Failed to load saved state, using default:", err);
  }
  return defaultData;
}

export const store = reactive(loadInitialState());

// Auto-save mutations to LocalStorage
watch(
  () => store,
  (newVal) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
    } catch (err) {
      console.error("Failed to save store to localStorage:", err);
    }
  },
  { deep: true }
);

// Computed Metrics & Getters
export const totalRevenue = computed(() => {
  return store.bookings
    .filter(b => b.paymentStatus === 'Paid' || b.bookingStatus === 'Completed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
});

export const totalBookingsCount = computed(() => store.bookings.length);

export const completedBookingsCount = computed(() => {
  return store.bookings.filter(b => b.bookingStatus === 'Completed').length;
});

export const cancelledBookingsCount = computed(() => {
  return store.bookings.filter(b => b.bookingStatus === 'Cancelled' || b.bookingStatus === 'No-Show').length;
});

export const todayBookings = computed(() => {
  return store.bookings.filter(b => b.bookingDate === '2026-10-28');
});

// Helper Functions & Actions
export const actions = {
  // Reset store to fresh default seed data
  resetDefaults() {
    Object.assign(store, JSON.parse(JSON.stringify(defaultData)));
    localStorage.removeItem(STORAGE_KEY);
  },

  // Switch current role for test / preview
  switchRole(role) {
    store.auth.userRole = role;
  },

  // Calculate authoritative price on server/store (SRS Section 5 & Appendix B)
  calculatePrice({ serviceId, categoryId, addOnIds = [], couponCode = null, loyaltyPoints = 0 }) {
    const service = store.services.find(s => s.id === serviceId);
    const category = store.vehicleCategories.find(c => c.id === categoryId);
    
    if (!service || !category) return null;

    // Base price multiplied by vehicle category multiplier
    const basePrice = Math.round(service.basePrice * category.multiplier);
    
    // Add-ons total
    let addOnsPrice = 0;
    let addOnsDuration = 0;
    addOnIds.forEach(addonId => {
      const addon = store.addOns.find(a => a.id === addonId);
      if (addon) {
        addOnsPrice += addon.price;
        addOnsDuration += addon.durationMins;
      }
    });

    const subtotal = basePrice + addOnsPrice;
    const totalDuration = service.durationMins + addOnsDuration;

    // Coupon discount calculation
    let discount = 0;
    let couponApplied = null;
    if (couponCode) {
      const coupon = store.coupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active);
      if (coupon && subtotal >= coupon.minSpend) {
        if (coupon.discountType === 'percent') {
          discount = Math.round((subtotal * coupon.value) / 100);
        } else if (coupon.discountType === 'fixed') {
          discount = coupon.value;
        }
        couponApplied = coupon;
      }
    }

    // Loyalty points deduction (1 point = 2 PKR, max 20% order)
    let loyaltyDiscount = 0;
    if (loyaltyPoints > 0) {
      const maxAllowedDiscount = Math.round((subtotal * store.loyaltyConfig.maxPointsRedeemPercent) / 100);
      const pointsValue = loyaltyPoints * store.loyaltyConfig.pointRedemptionValuePKR;
      loyaltyDiscount = Math.min(pointsValue, maxAllowedDiscount);
    }

    const totalDiscount = Math.min(discount + loyaltyDiscount, subtotal);
    const taxableAmount = Math.max(0, subtotal - totalDiscount);
    const tax = Math.round((taxableAmount * store.business.taxRatePercent) / 100);
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
  },

  // Create Booking with unique reference (SRS Section 6.1)
  createBooking(bookingPayload) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `HCW-2026-${randomNum}`;
    const qrToken = `HCW-QR-${randomNum}-${Date.now().toString(36).toUpperCase()}`;

    const newBooking = {
      id: bookingId,
      customerName: bookingPayload.customerName,
      customerPhone: bookingPayload.customerPhone,
      customerEmail: bookingPayload.customerEmail || "",
      vehicleMake: bookingPayload.vehicleMake,
      vehicleModel: bookingPayload.vehicleModel,
      vehicleReg: bookingPayload.vehicleReg,
      categoryId: bookingPayload.categoryId,
      serviceId: bookingPayload.serviceId,
      serviceName: bookingPayload.serviceName,
      addOns: bookingPayload.addOns || [],
      branchId: bookingPayload.branchId || "b1",
      bayId: bookingPayload.bayId || "bay_1",
      assignedStaffId: null,
      bookingDate: bookingPayload.bookingDate,
      bookingTime: bookingPayload.bookingTime,
      durationMins: bookingPayload.durationMins,
      basePrice: bookingPayload.basePrice,
      addOnPrice: bookingPayload.addOnPrice,
      discountAmount: bookingPayload.discountAmount || 0,
      taxAmount: bookingPayload.taxAmount || 0,
      totalAmount: bookingPayload.totalAmount,
      paymentMethod: bookingPayload.paymentMethod,
      paymentStatus: bookingPayload.paymentMethod.includes("Pay on Site") ? "Pending" : "Paid",
      bookingStatus: "Confirmed",
      checkInTime: null,
      completionTime: null,
      serviceNotes: bookingPayload.serviceNotes || "",
      qrToken,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      statusHistory: [
        {
          status: "Confirmed",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actor: "Customer Self-Service Online"
        }
      ]
    };

    // Prepend to bookings list
    store.bookings.unshift(newBooking);

    // If coupon was used, increment usage count
    if (bookingPayload.couponCode) {
      const coupon = store.coupons.find(c => c.code === bookingPayload.couponCode);
      if (coupon) coupon.usageCount++;
    }

    // Add Audit Log
    store.auditLogs.unshift({
      id: `log_${Date.now()}`,
      action: "BOOKING_CREATED",
      details: `New booking ${bookingId} created for ${bookingPayload.customerName} (${bookingPayload.totalAmount} PKR)`,
      actor: bookingPayload.customerName,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });

    return newBooking;
  },

  // Update Booking Status with role audit (SRS Section 6.3)
  updateStatus(bookingId, newStatus, actorName = "Staff") {
    const booking = store.bookings.find(b => b.id === bookingId);
    if (!booking) return false;

    const prevStatus = booking.bookingStatus;
    booking.bookingStatus = newStatus;

    if (newStatus === 'Checked In' && !booking.checkInTime) {
      booking.checkInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (newStatus === 'Completed' && !booking.completionTime) {
      booking.completionTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      // Award loyalty points to customer if applicable
      const pointsEarned = Math.floor(booking.totalAmount / 100);
      if (store.auth.user && booking.customerPhone.includes(store.auth.user.phone.slice(-6))) {
        store.auth.user.loyaltyPoints += pointsEarned;
      }
    }

    booking.statusHistory.unshift({
      status: newStatus,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: actorName,
      previous: prevStatus
    });

    store.auditLogs.unshift({
      id: `log_${Date.now()}`,
      action: "STATUS_TRANSITION",
      details: `Booking ${bookingId} transitioned from ${prevStatus} to ${newStatus}`,
      actor: actorName,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });

    return true;
  },

  // Process Refund under SRS Section 10 rules
  processCancellationAndRefund(bookingId, reason, actor = "Customer") {
    const booking = store.bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: "Booking not found" };

    const paid = booking.paymentStatus === "Paid";
    const total = booking.totalAmount;
    
    let deductionAmount = 0;
    let netRefund = 0;

    if (paid) {
      deductionAmount = Math.round((total * store.policy.cancellationDeductionPercent) / 100);
      netRefund = total - deductionAmount;
      booking.paymentStatus = "Refunded";
      booking.refundDetails = {
        originalAmount: total,
        deductionPercent: store.policy.cancellationDeductionPercent,
        deductionAmount,
        refundedAmount: netRefund,
        refundedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        approvedBy: actor
      };
    } else {
      booking.paymentStatus = "Cancelled";
    }

    booking.bookingStatus = "Cancelled";
    booking.cancellationReason = reason;

    booking.statusHistory.unshift({
      status: "Cancelled",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor,
      reason
    });

    store.auditLogs.unshift({
      id: `log_${Date.now()}`,
      action: "REFUND_ISSUED",
      details: `Booking ${bookingId} cancelled. Refund: PKR ${netRefund} (Deduction fee: PKR ${deductionAmount} at ${store.policy.cancellationDeductionPercent}%)`,
      actor,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });

    return {
      success: true,
      deductionAmount,
      netRefund
    };
  },

  // Save Customer Vehicle
  saveVehicle(vehicleData) {
    if (!store.auth.user) return;
    const newVehicle = {
      id: `v_${Date.now()}`,
      make: vehicleData.make,
      model: vehicleData.model,
      year: vehicleData.year || "2024",
      categoryId: vehicleData.categoryId,
      regNumber: vehicleData.regNumber,
      color: vehicleData.color || "Black"
    };
    store.auth.user.savedVehicles.push(newVehicle);
  },

  // Add Verified Review
  addReview({ bookingId, customerName, rating, serviceName, vehicle, comment }) {
    const newRev = {
      id: `rev_${Date.now()}`,
      bookingId,
      customerName,
      rating,
      serviceName,
      vehicle,
      comment,
      date: new Date().toISOString().split('T')[0],
      verifiedBooking: true,
      adminResponse: null
    };
    store.reviews.unshift(newRev);
  },

  // Admin reply to review
  replyReview(reviewId, replyText) {
    const rev = store.reviews.find(r => r.id === reviewId);
    if (rev) {
      rev.adminResponse = replyText;
    }
  }
};
