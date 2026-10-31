<template>
  <div class="booking-wizard-backdrop" @click.self="$emit('close')">
    <!-- ==============================================
         DEDICATED CELEBRATION MODAL (Step 6)
         A beautiful, high-end celebration modal appearing on order placement
         ============================================== -->
    <div v-if="currentStep === 6 && confirmedBooking" class="order-success-modal">
      <button class="modal-close-corner-btn" @click="$emit('close')" aria-label="Close">✕</button>

      <div class="success-top-badge-area">
        <div class="celebration-ring">
          <span class="celebration-emoji">✨</span>
        </div>
        <span class="status-pill-celebrate">Order Confirmed & Bay Reserved</span>
        <h2 class="success-main-heading">Wash Reservation Successful!</h2>
        <p class="success-subheading">
          Your bay has been secured at {{ store.business.branches[0].name }}. A digital pass & SMS confirmation have been generated.
        </p>

        <!-- Ref Code Bar with 1-click Copy -->
        <div class="booking-ref-bar">
          <span class="ref-title">Booking Ref:</span>
          <span class="ref-value">{{ confirmedBooking.id }}</span>
          <button class="copy-btn-action" @click="copyReferenceCode(confirmedBooking.id)" :title="refCopied ? 'Copied!' : 'Copy to clipboard'">
            <span v-if="refCopied">✓ Copied</span>
            <span v-else>📋 Copy Code</span>
          </button>
        </div>
      </div>

      <!-- Luxury Digital Boarding Pass Ticket (SRS Section 8) -->
      <div class="luxury-pass-ticket" id="printablePass">
        <div class="ticket-header">
          <div class="brand-row">
            <span class="ticket-brand-main">Hanzala</span>
            <span class="ticket-brand-sub">Car Wash & Detailing</span>
          </div>
          <span class="ticket-badge-pill">Verified Pass</span>
        </div>

        <div class="ticket-main-grid">
          <div class="ticket-qr-zone">
            <div class="qr-box-inner">
              <canvas ref="qrCanvas" class="qr-canvas-element"></canvas>
            </div>
            <span class="qr-scan-hint">Scan at Bay Entrance</span>
          </div>

          <div class="ticket-specs-zone">
            <div class="spec-row">
              <span class="s-label">Vehicle</span>
              <span class="s-val text-white font-weight-bold">
                {{ confirmedBooking.vehicleMake }} {{ confirmedBooking.vehicleModel }} ({{ confirmedBooking.vehicleReg }})
              </span>
            </div>
            <div class="spec-row">
              <span class="s-label">Service Package</span>
              <span class="s-val text-gold font-weight-bold">{{ confirmedBooking.serviceName }}</span>
            </div>
            <div class="spec-row" v-if="confirmedBooking.addOns && confirmedBooking.addOns.length">
              <span class="s-label">Add-ons</span>
              <span class="s-val text-secondary">{{ formatAddons(confirmedBooking.addOns) }}</span>
            </div>
            <div class="spec-row">
              <span class="s-label">Date & Time</span>
              <span class="s-val text-white">{{ confirmedBooking.bookingDate }} at {{ confirmedBooking.bookingTime }}</span>
            </div>
            <div class="spec-row">
              <span class="s-label">Allocated Bay</span>
              <span class="s-val text-white">Main Hub - Gulberg III (Bay 2)</span>
            </div>
            <div class="spec-row highlight-amount">
              <span class="s-label">Total Amount</span>
              <span class="s-val text-gold font-weight-bold">
                Rs. {{ confirmedBooking.totalAmount }} ({{ confirmedBooking.paymentStatus }})
              </span>
            </div>
          </div>
        </div>

        <div class="ticket-footer">
          <span>📞 Support: {{ store.business.phone }}</span>
          <span>•</span>
          <span>⏱ Free Cancellation up to 2 hours before</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="success-actions-row">
        <button class="btn btn-outline" @click="printPass">
          🖨️ Print / Save PDF Receipt
        </button>
        <button class="btn btn-gold-outline" @click="downloadCalendarInvite">
          📅 Add to Calendar (.ics)
        </button>
        <button class="btn btn-primary" @click="finishAndGoToAccount">
          Go to My Bookings →
        </button>
      </div>
    </div>

    <!-- ==============================================
         STANDARD BOOKING WIZARD (Steps 1-5)
         ============================================== -->
    <div v-else class="wizard-modal">
      <!-- Wizard Header -->
      <div class="wizard-header">
        <div class="d-flex justify-between align-center">
          <div>
            <h2 class="wizard-main-title">Book Your Car Wash</h2>
            <p class="wizard-subtitle">Instant reservation with priority bay guarantee</p>
          </div>
          <button class="modal-close-btn" @click="$emit('close')" aria-label="Close modal">✕</button>
        </div>

        <!-- Inline Validation Warning Banner -->
        <div v-if="validationWarning" class="wizard-warning-banner">
          <span class="warn-icon">⚠️</span>
          <span class="warn-text">{{ validationWarning }}</span>
          <button type="button" class="close-warning-btn" @click="validationWarning = ''">✕</button>
        </div>

        <!-- 5-Step Progress Bar matching mockup -->
        <div class="stepper-bar" v-if="currentStep <= 5">
          <div 
            v-for="step in steps" 
            :key="step.number"
            class="step-node"
            :class="{
              active: currentStep === step.number,
              completed: currentStep > step.number
            }"
            @click="goToStep(step.number)"
          >
            <div class="step-circle">
              <span v-if="currentStep > step.number">✓</span>
              <span v-else>{{ step.number }}</span>
            </div>
            <span class="step-label">{{ step.label }}</span>
          </div>
        </div>
      </div>

      <!-- Wizard Body Content -->
      <div class="wizard-body">
        <!-- ==============================================
             STEP 1: SELECT SERVICE & ADD-ONS
             ============================================== -->
        <div v-if="currentStep === 1" class="step-content">
          <h3 class="step-section-title">Select a Service</h3>
          <p class="step-section-desc">Choose from our signature automotive care packages:</p>

          <div class="services-select-list">
            <div 
              v-for="srv in store.services" 
              :key="srv.id"
              class="service-select-item"
              :class="{ selected: form.serviceId === srv.id }"
              @click="form.serviceId = srv.id"
            >
              <img :src="srv.image" :alt="srv.name" class="srv-thumb" />
              <div class="srv-info">
                <div class="d-flex align-center gap-2">
                  <h4 class="srv-name">{{ srv.name }}</h4>
                  <span v-if="srv.popular" class="mini-badge-gold">Popular</span>
                </div>
                <p class="srv-desc">{{ srv.shortDesc }}</p>
                <div class="srv-meta">
                  <span>⏱ {{ srv.durationMins }} mins</span>
                </div>
              </div>
              <div class="srv-pricing-box">
                <span class="srv-price">Rs. {{ srv.basePrice.toLocaleString() }}</span>
                <div class="check-circle" :class="{ checked: form.serviceId === srv.id }">
                  <span v-if="form.serviceId === srv.id">✓</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Add-ons Selection -->
          <div class="addons-container mt-4">
            <h4 class="addons-heading">Enhance With Optional Add-ons:</h4>
            <div class="addons-grid">
              <label 
                v-for="addon in store.addOns" 
                :key="addon.id"
                class="addon-checkbox-card"
                :class="{ active: form.addOns.includes(addon.id) }"
              >
                <input 
                  type="checkbox" 
                  :value="addon.id" 
                  v-model="form.addOns"
                  class="addon-native-checkbox"
                />
                <div class="addon-content">
                  <div class="addon-name-row">
                    <strong>{{ addon.name }}</strong>
                    <span class="addon-price">+Rs. {{ addon.price }}</span>
                  </div>
                  <p class="addon-desc">{{ addon.desc }} (+{{ addon.durationMins }} mins)</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- ==============================================
             STEP 2: SELECT VEHICLE CATEGORY & INFO
             ============================================== -->
        <div v-if="currentStep === 2" class="step-content">
          <h3 class="step-section-title">Select Vehicle Category</h3>
          <p class="step-section-desc">Our pricing adapts to ensure thorough care for all sizes:</p>

          <div class="vehicle-picker-grid">
            <div 
              v-for="cat in store.vehicleCategories" 
              :key="cat.id"
              class="vehicle-pick-card"
              :class="{ selected: form.categoryId === cat.id }"
              @click="form.categoryId = cat.id"
            >
              <div class="v-icon">🚗</div>
              <h4 class="v-title">{{ cat.name }}</h4>
              <p class="v-examples">{{ cat.examples }}</p>
              <div class="v-rate">Starts Rs. {{ cat.startingPrice.toLocaleString() }}</div>
            </div>
          </div>

          <!-- Saved Vehicles Picker if logged in (SRS Section 7) -->
          <div v-if="savedVehiclesList.length > 0" class="saved-vehicles-box mt-4">
            <span class="text-gold font-weight-bold">⚡ Quick Fill From Saved Vehicles:</span>
            <div class="saved-chips">
              <button 
                type="button" 
                v-for="sv in savedVehiclesList" 
                :key="sv.id"
                class="btn-chip"
                @click="applySavedVehicle(sv)"
              >
                {{ sv.make }} {{ sv.model }} ({{ sv.regNumber }})
              </button>
            </div>
          </div>

          <!-- Vehicle Registration & Details -->
          <div class="vehicle-details-form mt-4">
            <h4 class="text-white mb-2">Vehicle Specification</h4>
            <div class="form-row">
              <div class="form-group col-4">
                <label class="form-label">Make *</label>
                <input type="text" v-model="form.vehicleMake" required placeholder="e.g. Honda, Toyota, Kia" />
              </div>
              <div class="form-group col-4">
                <label class="form-label">Model *</label>
                <input type="text" v-model="form.vehicleModel" required placeholder="e.g. Civic RS, Sportage" />
              </div>
              <div class="form-group col-4">
                <label class="form-label">Registration / Number Plate *</label>
                <input type="text" v-model="form.vehicleReg" required placeholder="e.g. LEA-23-9912" />
              </div>
            </div>
          </div>
        </div>

        <!-- ==============================================
             STEP 3: DATE & TIME SCHEDULING (Matching Mockup)
             ============================================== -->
        <div v-if="currentStep === 3" class="step-content">
          <h3 class="step-section-title">Select Date & Time</h3>
          <p class="step-section-desc">Pick an available time slot for your vehicle's appointment:</p>

          <div class="schedule-grid">
            <!-- Calendar Side -->
            <div class="calendar-card glass-panel">
              <div class="cal-nav d-flex justify-between align-center mb-3">
                <button class="cal-arrow-btn" @click="prevMonth">&lt;</button>
                <h4 class="cal-month-title">{{ activeMonthLabel }}</h4>
                <button class="cal-arrow-btn" @click="nextMonth">&gt;</button>
              </div>

              <!-- Days of week -->
              <div class="cal-days-header">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>

              <!-- Calendar Dates Grid -->
              <div class="cal-dates-grid">
                <button 
                  v-for="day in monthDays" 
                  :key="day.dateStr"
                  class="cal-day-cell"
                  :class="{
                    active: form.bookingDate === day.dateStr,
                    disabled: day.disabled,
                    today: day.isToday
                  }"
                  :disabled="day.disabled"
                  @click="form.bookingDate = day.dateStr"
                >
                  {{ day.dayNum }}
                </button>
              </div>

              <div class="cal-note mt-3">
                <span>🟢 Selected Date: <strong>{{ form.bookingDate }}</strong></span>
              </div>
            </div>

            <!-- Available Time Slots Side (Matching Mockup) -->
            <div class="slots-card glass-panel">
              <div class="d-flex justify-between align-center mb-3">
                <h4 class="slots-title">Available Time Slots</h4>
                <span class="slot-badge">Live Availability</span>
              </div>

              <div class="slots-grid">
                <button 
                  v-for="slot in availableSlots" 
                  :key="slot.time"
                  class="slot-btn"
                  :class="{
                    selected: form.bookingTime === slot.time,
                    occupied: slot.occupied
                  }"
                  :disabled="slot.occupied"
                  @click="form.bookingTime = slot.time"
                >
                  <span class="slot-time">{{ slot.time }}</span>
                  <span class="slot-status-text" v-if="slot.occupied">Booked</span>
                  <span class="slot-status-text available" v-else>Open</span>
                </button>
              </div>

              <!-- Branch Picker -->
              <div class="branch-select-box mt-4">
                <label class="form-label">Studio Branch</label>
                <select v-model="form.branchId">
                  <option v-for="b in store.business.branches" :key="b.id" :value="b.id">
                    {{ b.name }} ({{ b.address }})
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- ==============================================
             STEP 4: CUSTOMER CONTACT DETAILS
             ============================================== -->
        <div v-if="currentStep === 4" class="step-content">
          <h3 class="step-section-title">Customer & Contact Details</h3>
          <p class="step-section-desc">We will send your QR check-in pass and live updates here:</p>

          <div class="details-form-box glass-panel">
            <div class="form-row mb-3">
              <div class="form-group col-6">
                <label class="form-label">Full Name *</label>
                <input type="text" v-model="form.customerName" required placeholder="e.g. Muhammad Ali" />
              </div>
              <div class="form-group col-6">
                <label class="form-label">Mobile Number (WhatsApp Enabled) *</label>
                <input type="tel" v-model="form.customerPhone" required placeholder="e.g. 0301-5558899" />
              </div>
            </div>

            <div class="form-group mb-3">
              <label class="form-label">Email Address (Optional for PDF Receipt)</label>
              <input type="email" v-model="form.customerEmail" placeholder="e.g. ali@example.com" />
            </div>

            <div class="form-group mb-3">
              <label class="form-label">Special Vehicle Instructions / Delicate Areas</label>
              <textarea 
                v-model="form.serviceNotes" 
                rows="2" 
                placeholder="e.g. Matte finish wrap on hood, do not spray engine ECU directly, child seat installed in back."
              ></textarea>
            </div>

            <!-- Notification Preferences (SRS Section 13) -->
            <div class="notif-prefs-box">
              <span class="font-weight-bold text-white small">Notification Channels:</span>
              <div class="d-flex gap-3 mt-1">
                <label class="check-label"><input type="checkbox" checked disabled /> WhatsApp Updates</label>
                <label class="check-label"><input type="checkbox" checked disabled /> SMS Alert</label>
                <label class="check-label"><input type="checkbox" checked /> Email Invoice</label>
              </div>
            </div>
          </div>
        </div>

        <!-- ==============================================
             STEP 5: REVIEW, COUPON, LOYALTY & PAYMENT
             ============================================== -->
        <div v-if="currentStep === 5" class="step-content">
          <h3 class="step-section-title">Review & Complete Booking</h3>
          <p class="step-section-desc">Review your itemized booking summary and choose your payment method:</p>

          <div class="checkout-grid">
            <!-- Left: Order Summary & Itemized Breakdown -->
            <div class="order-summary-card glass-panel">
              <h4 class="summary-title">Booking Summary</h4>

              <div class="summary-service-row">
                <div>
                  <strong>{{ pricingBreakdown?.service?.name }}</strong>
                  <div class="text-muted small">Category: {{ pricingBreakdown?.category?.name }}</div>
                </div>
                <span class="font-weight-bold text-white">Rs. {{ pricingBreakdown?.basePrice }}</span>
              </div>

              <!-- Addons if any -->
              <div v-if="selectedAddonsList.length > 0" class="addons-breakdown mt-2">
                <div v-for="ad in selectedAddonsList" :key="ad.id" class="addon-item-row">
                  <span class="text-secondary small">+ {{ ad.name }}</span>
                  <span class="text-secondary small">+Rs. {{ ad.price }}</span>
                </div>
              </div>

              <div class="divider-line my-3"></div>

              <!-- Coupon Code Input -->
              <div class="coupon-box mb-3">
                <div class="d-flex gap-2">
                  <input 
                    type="text" 
                    v-model="couponInput" 
                    placeholder="Enter Coupon (e.g. WELCOME10)" 
                    class="coupon-input"
                    :disabled="couponAppliedSuccess"
                  />
                  <button 
                    type="button" 
                    class="btn btn-gold-outline btn-sm"
                    @click="applyCouponCode"
                    :disabled="couponAppliedSuccess"
                  >
                    {{ couponAppliedSuccess ? 'Applied ✓' : 'Apply' }}
                  </button>
                </div>
                <p v-if="couponMessage" :class="couponAppliedSuccess ? 'text-success' : 'text-danger'" class="small mt-1 mb-0">
                  {{ couponMessage }}
                </p>
              </div>

              <!-- Loyalty Points Redemption (SRS Section 11) -->
              <div v-if="store.auth.user && store.auth.user.loyaltyPoints > 0" class="loyalty-redeem-box mb-3">
                <div class="d-flex justify-between align-center">
                  <span class="small text-secondary">
                    🪙 Available Loyalty: <strong>{{ store.auth.user.loyaltyPoints }} pts</strong> (Rs. {{ store.auth.user.loyaltyPoints * 2 }})
                  </span>
                  <label class="switch-redeem small">
                    <input type="checkbox" v-model="useLoyaltyPoints" />
                    <span>Redeem</span>
                  </label>
                </div>
              </div>

              <!-- Itemized Totals -->
              <div class="totals-table">
                <div class="tot-row">
                  <span>Subtotal</span>
                  <span>Rs. {{ pricingBreakdown?.subtotal }}</span>
                </div>
                <div class="tot-row text-success" v-if="pricingBreakdown?.discount > 0">
                  <span>Total Discount</span>
                  <span>- Rs. {{ pricingBreakdown?.discount }}</span>
                </div>
                <div class="tot-row text-muted" v-if="pricingBreakdown?.tax > 0">
                  <span>Tax ({{ store.business.taxRatePercent }}%)</span>
                  <span>+ Rs. {{ pricingBreakdown?.tax }}</span>
                </div>
                <div class="tot-row final-total-row">
                  <span>Grand Total</span>
                  <span class="grand-price">Rs. {{ pricingBreakdown?.finalTotal }}</span>
                </div>
                <div class="duration-estimate text-muted small mt-1">
                  ⏱ Estimated Duration: {{ pricingBreakdown?.totalDuration }} minutes
                </div>
              </div>
            </div>

            <!-- Right: Payment Method Selector (SRS Section 9) -->
            <div class="payment-methods-card glass-panel">
              <h4 class="payment-title">Select Payment Method</h4>

              <div class="payment-options-list">
                <label 
                  v-for="pm in paymentMethods" 
                  :key="pm.id"
                  class="payment-option-card"
                  :class="{ selected: form.paymentMethod === pm.name }"
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    :value="pm.name" 
                    v-model="form.paymentMethod"
                    class="pm-native-radio"
                  />
                  <div class="pm-icon">{{ pm.icon }}</div>
                  <div class="pm-text">
                    <strong class="pm-name">{{ pm.name }}</strong>
                    <p class="pm-desc">{{ pm.desc }}</p>
                  </div>
                  <span v-if="pm.badge" class="pm-badge">{{ pm.badge }}</span>
                </label>
              </div>

              <!-- Terms & Cancellation Acceptance Checkbox (SRS Section 10) -->
              <div class="policy-acceptance-box mt-3">
                <label class="check-label policy-label">
                  <input type="checkbox" v-model="acceptedPolicy" required />
                  <span>
                    I agree to the <a href="#policy" class="text-gold" @click.prevent="showPolicyDetails = true">Cancellation & Refund Policy</a> (Free rescheduling up to 2 hours prior; 5% processing fee on eligible refunds).
                  </span>
                </label>
              </div>

              <button 
                class="btn btn-primary btn-block btn-lg mt-4"
                :disabled="!acceptedPolicy || isProcessing"
                @click="submitBookingOrder"
              >
                <span v-if="isProcessing">Processing Secure Payment... ⏳</span>
                <span v-else>Confirm & Pay Rs. {{ pricingBreakdown?.finalTotal }} →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Wizard Navigation Footer (Back / Next) -->
      <div class="wizard-footer" v-if="currentStep <= 5">
        <button 
          class="btn btn-outline" 
          :disabled="currentStep === 1"
          @click="currentStep--"
        >
          ← Back
        </button>

        <button 
          v-if="currentStep < 5"
          class="btn btn-primary" 
          @click="validateAndNext"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue';
import { store, actions } from '../store/carWashStore';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';

const props = defineProps({
  preselectedServiceId: {
    type: String,
    default: 'full'
  },
  preselectedCategoryId: {
    type: String,
    default: 'sedan'
  }
});

const emit = defineEmits(['close', 'booking-confirmed', 'open-account']);

const currentStep = ref(1);
const isProcessing = ref(false);
const acceptedPolicy = ref(true);
const couponInput = ref('');
const couponApplied = ref(null);
const couponAppliedSuccess = ref(false);
const couponMessage = ref('');
const useLoyaltyPoints = ref(false);
const confirmedBooking = ref(null);
const qrCanvas = ref(null);
const refCopied = ref(false);
const validationWarning = ref('');

function showWarning(msg) {
  validationWarning.value = msg;
  setTimeout(() => {
    if (validationWarning.value === msg) {
      validationWarning.value = '';
    }
  }, 4500);
}

function copyReferenceCode(refCode) {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(refCode);
  }
  refCopied.value = true;
  setTimeout(() => {
    refCopied.value = false;
  }, 3000);
}

function formatAddons(addonIds) {
  if (!addonIds || !addonIds.length) return '';
  return addonIds.map(id => {
    const a = store.addOns.find(item => item.id === id);
    return a ? a.name : id;
  }).join(', ');
}

const steps = [
  { number: 1, label: 'Service' },
  { number: 2, label: 'Vehicle' },
  { number: 3, label: 'Date & Time' },
  { number: 4, label: 'Details' },
  { number: 5, label: 'Payment' }
];

// Form state
const form = reactive({
  serviceId: props.preselectedServiceId || 'full',
  categoryId: props.preselectedCategoryId || 'sedan',
  addOns: [],
  vehicleMake: 'Honda',
  vehicleModel: 'Civic RS',
  vehicleReg: 'LEA-23-9912',
  branchId: 'b1',
  bookingDate: '2026-10-28',
  bookingTime: '12:00 PM',
  customerName: store.auth.user ? store.auth.user.name : '',
  customerPhone: store.auth.user ? store.auth.user.phone : '',
  customerEmail: store.auth.user ? store.auth.user.email : '',
  serviceNotes: '',
  paymentMethod: 'Card (Visa / Mastercard)'
});

// Saved vehicles
const savedVehiclesList = computed(() => {
  return store.auth.user ? store.auth.user.savedVehicles : [];
});

function applySavedVehicle(v) {
  form.vehicleMake = v.make;
  form.vehicleModel = v.model;
  form.vehicleReg = v.regNumber;
  if (v.categoryId) form.categoryId = v.categoryId;
}

// Payment Methods
const paymentMethods = [
  { id: 'card', name: 'Card (Visa / Mastercard)', icon: '💳', desc: 'Instant 3D-secure checkout', badge: 'Fastest' },
  { id: 'jazzcash', name: 'JazzCash Wallet / Debit', icon: '📱', desc: 'Direct mobile wallet payment', badge: 'Local PKR' },
  { id: 'easypaisa', name: 'EasyPaisa Wallet', icon: '🟢', desc: 'Instant OTP mobile confirmation', badge: 'Popular' },
  { id: 'raast', name: 'Raast Instant Bank Transfer', icon: '🏦', desc: 'Zero gateway fee instant bank transfer', badge: 'State Bank' },
  { id: 'onsite', name: 'Pay on Site (Cash / POS Machine)', icon: '💵', desc: 'Pay when you arrive at front desk', badge: 'Flexible' }
];

// Calendar Date generation
const activeMonthLabel = ref('October 2026');

const monthDays = computed(() => {
  const days = [];
  // Days 22 to 31 October 2026
  for (let i = 22; i <= 31; i++) {
    const dStr = `2026-10-${i < 10 ? '0' + i : i}`;
    days.push({
      dayNum: i,
      dateStr: dStr,
      disabled: i < 28, // Past days disabled
      isToday: i === 28
    });
  }
  return days;
});

function prevMonth() {
  showWarning('Calendar is currently displaying current operating period (October 2026).');
}
function nextMonth() {
  showWarning('Appointments beyond 14 days open next week.');
}

// Available Time Slots
const availableSlots = [
  { time: '09:00 AM', occupied: false },
  { time: '10:00 AM', occupied: true },
  { time: '11:00 AM', occupied: true },
  { time: '12:00 PM', occupied: false },
  { time: '01:00 PM', occupied: true },
  { time: '02:00 PM', occupied: false },
  { time: '03:30 PM', occupied: true },
  { time: '04:30 PM', occupied: false },
  { time: '05:30 PM', occupied: false },
  { time: '06:30 PM', occupied: false },
  { time: '07:30 PM', occupied: false },
  { time: '08:30 PM', occupied: false }
];

// Calculation breakdown
const pricingBreakdown = computed(() => {
  return actions.calculatePrice({
    serviceId: form.serviceId,
    categoryId: form.categoryId,
    addOnIds: form.addOns,
    couponCode: couponApplied.value ? couponApplied.value.code : null,
    loyaltyPoints: useLoyaltyPoints.value ? (store.auth.user?.loyaltyPoints || 0) : 0
  });
});

const selectedAddonsList = computed(() => {
  return store.addOns.filter(a => form.addOns.includes(a.id));
});

// Coupon Application
function applyCouponCode() {
  if (!couponInput.value) return;
  const c = store.coupons.find(cp => cp.code.toUpperCase() === couponInput.value.trim().toUpperCase() && cp.active);
  if (c) {
    couponApplied.value = c;
    couponAppliedSuccess.value = true;
    couponMessage.value = `✓ Promo code ${c.code} applied! ${c.description}`;
  } else {
    couponApplied.value = null;
    couponAppliedSuccess.value = false;
    couponMessage.value = '✕ Invalid or expired coupon code. Try WELCOME10 or PREMIUM20';
  }
}

// Validation & Navigation
function goToStep(stepNum) {
  if (stepNum < currentStep.value) {
    currentStep.value = stepNum;
  }
}

function validateAndNext() {
  validationWarning.value = '';
  if (currentStep.value === 1) {
    if (!form.serviceId) return showWarning('Please select a wash service package to continue.');
    currentStep.value = 2;
  } else if (currentStep.value === 2) {
    if (!form.vehicleMake || !form.vehicleModel || !form.vehicleReg) {
      return showWarning('Please enter your vehicle make, model, and registration plate.');
    }
    currentStep.value = 3;
  } else if (currentStep.value === 3) {
    if (!form.bookingDate || !form.bookingTime) {
      return showWarning('Please select an appointment date and preferred time slot.');
    }
    currentStep.value = 4;
  } else if (currentStep.value === 4) {
    if (!form.customerName || !form.customerPhone) {
      return showWarning('Please enter your full name and mobile phone number.');
    }
    currentStep.value = 5;
  }
}

// Submit Booking Order
async function submitBookingOrder() {
  isProcessing.value = true;

  // Simulate payment gateway authentication and server verification
  setTimeout(() => {
    isProcessing.value = false;

    const bookingRecord = actions.createBooking({
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      customerEmail: form.customerEmail,
      vehicleMake: form.vehicleMake,
      vehicleModel: form.vehicleModel,
      vehicleReg: form.vehicleReg,
      categoryId: form.categoryId,
      serviceId: form.serviceId,
      serviceName: pricingBreakdown.value.service.name,
      addOns: form.addOns,
      branchId: form.branchId,
      bayId: 'bay_1',
      bookingDate: form.bookingDate,
      bookingTime: form.bookingTime,
      durationMins: pricingBreakdown.value.totalDuration,
      basePrice: pricingBreakdown.value.basePrice,
      addOnPrice: pricingBreakdown.value.addOnsPrice,
      discountAmount: pricingBreakdown.value.discount,
      taxAmount: pricingBreakdown.value.tax,
      totalAmount: pricingBreakdown.value.finalTotal,
      paymentMethod: form.paymentMethod,
      serviceNotes: form.serviceNotes,
      couponCode: couponApplied.value ? couponApplied.value.code : null
    });

    confirmedBooking.value = bookingRecord;
    currentStep.value = 6;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Render QR Code
    nextTick(() => {
      if (qrCanvas.value) {
        QRCode.toCanvas(qrCanvas.value, bookingRecord.id, {
          width: 140,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
      }
    });

    emit('booking-confirmed', bookingRecord);
  }, 1200);
}

function printPass() {
  window.print();
}

function downloadCalendarInvite() {
  if (!confirmedBooking.value) return;
  const b = confirmedBooking.value;
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Hanzala Car Wash//Booking Confirmation//EN
BEGIN:VEVENT
SUMMARY:Car Wash: ${b.serviceName} at Hanzala Car Wash
DESCRIPTION:Booking Ref: ${b.id}\\nVehicle: ${b.vehicleMake} ${b.vehicleModel} (${b.vehicleReg})\\nTotal: Rs. ${b.totalAmount}
LOCATION:Plot 42-A, Main Boulevard, Gulberg III, Lahore
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${b.id}-appointment.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function finishAndGoToAccount() {
  emit('close');
  emit('open-account');
}
</script>

<style scoped>
.booking-wizard-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.wizard-modal {
  background: var(--bg-card);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-xl);
  max-width: 860px;
  width: 100%;
  max-height: 94vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
  animation: modalEnter 0.25s ease-out;
}

.wizard-header {
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-secondary);
}

.wizard-main-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
}

.wizard-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.modal-close-btn {
  background: transparent;
  color: var(--text-muted);
  font-size: 1.5rem;
  padding: 0.25rem 0.5rem;
}

.modal-close-btn:hover {
  color: #fff;
}

/* Stepper Bar */
.stepper-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  position: relative;
}

.stepper-bar::before {
  content: '';
  position: absolute;
  top: 14px;
  left: 24px;
  right: 24px;
  height: 2px;
  background: var(--border-light);
  z-index: 1;
}

.step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
}

.step-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg-dark);
  border: 2px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  transition: var(--transition);
}

.step-node.active .step-circle {
  background: var(--primary);
  border-color: var(--primary);
  color: #000;
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
}

.step-node.completed .step-circle {
  background: #10b981;
  border-color: #10b981;
  color: #fff;
}

.step-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-top: 0.35rem;
  text-transform: uppercase;
}

.step-node.active .step-label {
  color: var(--primary);
}

/* Wizard Body */
.wizard-body {
  padding: 1.75rem 2rem;
  overflow-y: auto;
  flex: 1;
}

.step-section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
}

.step-section-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

/* Step 1: Services List */
.services-select-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.service-select-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: var(--transition);
}

.service-select-item:hover, .service-select-item.selected {
  border-color: var(--primary);
  background: var(--bg-elevated);
}

.srv-thumb {
  width: 72px;
  height: 52px;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.srv-info {
  flex: 1;
}

.srv-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
}

.srv-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.srv-meta {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
}

.srv-pricing-box {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.srv-price {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary);
}

.check-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.check-circle.checked {
  background: var(--primary);
  border-color: var(--primary);
  color: #000;
  font-weight: bold;
}

.mini-badge-gold {
  background: var(--primary);
  color: #000;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

/* Addons */
.addons-heading {
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 0.75rem;
}

.addons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.addon-checkbox-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.addon-checkbox-card.active {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.05);
}

.addon-native-checkbox {
  margin-top: 0.25rem;
  width: auto;
}

.addon-content {
  flex: 1;
}

.addon-name-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: #fff;
}

.addon-price {
  color: var(--primary);
  font-weight: 700;
}

.addon-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Step 2: Vehicle */
.vehicle-picker-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
}

.vehicle-pick-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1rem 0.65rem;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
}

.vehicle-pick-card.selected {
  border-color: var(--primary);
  background: rgba(245, 158, 11, 0.1);
}

.v-icon {
  font-size: 1.5rem;
  margin-bottom: 0.35rem;
}

.v-title {
  font-size: 0.85rem;
  color: #fff;
}

.v-examples {
  font-size: 0.68rem;
  color: var(--text-muted);
  line-height: 1.2;
}

.v-rate {
  font-size: 0.75rem;
  color: var(--primary);
  font-weight: 700;
  margin-top: 0.35rem;
}

.saved-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn-chip {
  background: var(--bg-secondary);
  border: 1px solid var(--border-gold);
  color: var(--text-primary);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
}

.btn-chip:hover {
  background: var(--primary-glow);
}

/* Step 3: Calendar & Slots */
.schedule-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.calendar-card, .slots-card {
  padding: 1.25rem;
  border-radius: var(--radius-lg);
}

.cal-month-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
}

.cal-arrow-btn {
  background: var(--bg-secondary);
  color: var(--text-primary);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
}

.cal-days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.cal-dates-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.35rem;
}

.cal-day-cell {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.cal-day-cell:hover:not(:disabled) {
  border-color: var(--primary);
}

.cal-day-cell.active {
  background: var(--primary);
  color: #000;
  font-weight: 800;
  border-color: var(--primary);
}

.cal-day-cell.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.cal-day-cell.today {
  border-color: #3b82f6;
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
  max-height: 240px;
  overflow-y: auto;
}

.slot-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.6rem 0.35rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.slot-btn.selected {
  background: var(--primary);
  border-color: var(--primary);
}

.slot-btn.selected .slot-time, .slot-btn.selected .slot-status-text {
  color: #000 !important;
  font-weight: 800;
}

.slot-time {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
}

.slot-status-text {
  font-size: 0.68rem;
  color: var(--text-muted);
}

.slot-status-text.available {
  color: #10b981;
}

.slot-btn.occupied {
  opacity: 0.4;
  cursor: not-allowed;
  background: rgba(239, 68, 68, 0.08);
}

/* Step 5: Checkout */
.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.order-summary-card, .payment-methods-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
}

.summary-title, .payment-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

.summary-service-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.95rem;
}

.addon-item-row {
  display: flex;
  justify-content: space-between;
}

.divider-line {
  height: 1px;
  background: var(--border-light);
}

.coupon-input {
  text-transform: uppercase;
}

.totals-table {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tot-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.final-total-row {
  border-top: 1px solid var(--border-medium);
  padding-top: 0.75rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
}

.grand-price {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  color: var(--primary);
  font-weight: 800;
}

/* Payment Methods */
.payment-options-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment-option-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

.payment-option-card.selected {
  border-color: var(--primary);
  background: rgba(245, 158, 11, 0.08);
}

.pm-native-radio {
  width: auto;
}

.pm-icon {
  font-size: 1.4rem;
}

.pm-text {
  flex: 1;
}

.pm-name {
  font-size: 0.88rem;
  color: #fff;
}

.pm-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.pm-badge {
  background: rgba(245, 158, 11, 0.2);
  color: var(--primary);
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.policy-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Step 6 Digital Pass */
.confetti-indicator {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.digital-pass-card {
  max-width: 480px;
  background: #12151c;
  border: 2px solid var(--border-gold);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
  text-align: left;
}

.pass-header {
  background: var(--bg-elevated);
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--border-medium);
}

.ref-code {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--primary);
}

.ref-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: block;
}

.pass-body {
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.qr-code-frame {
  background: #fff;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  text-align: center;
  flex-shrink: 0;
}

.qr-canvas {
  width: 120px !important;
  height: 120px !important;
  display: block;
}

.qr-sub {
  font-size: 0.6rem;
  color: #000;
  display: block;
  font-weight: 600;
}

.pass-details-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  font-size: 0.82rem;
}

.d-label {
  color: var(--text-muted);
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
}

.d-val {
  color: #fff;
  font-weight: 600;
}

.pass-footer {
  background: var(--bg-secondary);
  padding: 0.85rem 1.5rem;
  border-top: 1px solid var(--border-light);
  text-align: center;
}

.confirmation-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Wizard Footer */
.wizard-footer {
  padding: 1.25rem 2rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Inline Warning Banner */
.wizard-warning-banner {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  padding: 0.65rem 1rem;
  border-radius: var(--radius-md);
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  animation: shake 0.3s ease;
}

.warn-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.warn-text {
  flex: 1;
}

.close-warning-btn {
  background: transparent;
  color: #fca5a5;
  font-size: 0.95rem;
  padding: 0 0.3rem;
  cursor: pointer;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* ========================================================
   DEDICATED CELEBRATION ORDER SUCCESS MODAL
   ======================================================== */
.order-success-modal {
  background: #131720;
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-xl);
  max-width: 680px;
  width: 100%;
  max-height: 94vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(245, 158, 11, 0.2);
  animation: modalEnter 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 2.25rem 2rem;
  position: relative;
}

.modal-close-corner-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
}

.modal-close-corner-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.success-top-badge-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1.75rem;
}

.celebration-ring {
  width: 76px;
  height: 76px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(16, 185, 129, 0.2) 100%);
  border: 2px solid var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 32px rgba(245, 158, 11, 0.45);
  margin-bottom: 0.85rem;
  animation: pulse 2s infinite;
}

.celebration-emoji {
  font-size: 2.3rem;
}

.status-pill-celebrate {
  display: inline-block;
  background: rgba(16, 185, 129, 0.18);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.35);
  padding: 0.2rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.success-main-heading {
  font-size: 1.65rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 0.35rem;
}

.success-subheading {
  font-size: 0.88rem;
  color: var(--text-secondary);
  max-width: 480px;
}

.booking-ref-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  margin-top: 1rem;
}

.ref-title {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}

.ref-value {
  font-family: monospace;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: 0.05em;
}

.copy-btn-action {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-medium);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
}

.copy-btn-action:hover {
  background: var(--primary);
  color: #000;
}

/* Luxury Boarding Pass Ticket */
.luxury-pass-ticket {
  background: #171c26;
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 1.75rem;
}

.ticket-header {
  background: linear-gradient(135deg, #222938 0%, #292215 100%);
  border-bottom: 1px solid var(--border-gold);
  padding: 0.9rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-brand-main {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: #fff;
  margin-right: 0.4rem;
}

.ticket-brand-sub {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
}

.ticket-badge-pill {
  background: rgba(245, 158, 11, 0.2);
  color: var(--primary);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

.ticket-main-grid {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1.5rem;
  align-items: center;
}

.ticket-qr-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-box-inner {
  background: #fff;
  padding: 0.45rem;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.qr-canvas-element {
  width: 120px !important;
  height: 120px !important;
  display: block;
}

.qr-scan-hint {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 0.4rem;
  letter-spacing: 0.05em;
}

.ticket-specs-zone {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
}

.spec-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.s-label {
  color: var(--text-muted);
  font-size: 0.78rem;
}

.s-val {
  text-align: right;
}

.highlight-amount {
  margin-top: 0.25rem;
  padding-top: 0.25rem;
  border-top: 1px solid var(--border-light);
}

.ticket-footer {
  background: rgba(0, 0, 0, 0.25);
  border-top: 1px solid var(--border-light);
  padding: 0.65rem 1.25rem;
  font-size: 0.73rem;
  color: var(--text-muted);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.success-actions-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.85rem;
}

@media (max-width: 640px) {
  .ticket-main-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .spec-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
  }
  .s-val {
    text-align: left;
  }
  .success-actions-row {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .wizard-body {
    padding: 1rem;
  }
  .schedule-grid, .checkout-grid {
    grid-template-columns: 1fr;
  }
  .vehicle-picker-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .addons-grid {
    grid-template-columns: 1fr;
  }
  .pass-body {
    flex-direction: column;
    text-align: center;
  }
}
</style>
