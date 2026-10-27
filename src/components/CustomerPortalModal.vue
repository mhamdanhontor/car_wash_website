<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="account-modal-content">
      <!-- Modal Header -->
      <div class="modal-header d-flex justify-between align-center">
        <div class="d-flex align-center gap-3">
          <div class="user-avatar-circle">
            {{ store.auth.user ? store.auth.user.name.split(' ').map(n=>n[0]).join('') : 'MA' }}
          </div>
          <div>
            <h3 class="modal-title">{{ store.auth.user ? store.auth.user.name : 'Customer Portal' }}</h3>
            <p class="modal-subtitle text-muted small mb-0">
              {{ store.auth.user ? store.auth.user.phone : '+92 301 5558899' }} • 
              <span class="text-gold font-weight-bold">🪙 {{ store.auth.user?.loyaltyPoints || 0 }} Loyalty Points</span>
            </p>
          </div>
        </div>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <!-- Tab Navigation -->
      <div class="account-tabs">
        <button 
          class="acc-tab-btn" 
          :class="{ active: activeTab === 'bookings' }"
          @click="activeTab = 'bookings'"
        >
          📅 My Bookings ({{ myBookings.length }})
        </button>
        <button 
          class="acc-tab-btn" 
          :class="{ active: activeTab === 'vehicles' }"
          @click="activeTab = 'vehicles'"
        >
          🚗 Saved Vehicles ({{ store.auth.user?.savedVehicles?.length || 0 }})
        </button>
        <button 
          class="acc-tab-btn" 
          :class="{ active: activeTab === 'loyalty' }"
          @click="activeTab = 'loyalty'"
        >
          🎁 Loyalty Wallet
        </button>
        <button 
          class="acc-tab-btn" 
          :class="{ active: activeTab === 'profile' }"
          @click="activeTab = 'profile'"
        >
          ⚙️ Notification Settings
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="modal-body account-body">
        <!-- ==========================================
             TAB 1: MY BOOKINGS LIST
             ========================================== -->
        <div v-if="activeTab === 'bookings'">
          <div v-if="myBookings.length === 0" class="empty-state text-center py-5">
            <p class="text-muted">No appointments found.</p>
            <button class="btn btn-primary btn-sm" @click="$emit('open-booking')">Book Your First Wash Now</button>
          </div>

          <div v-else class="bookings-list">
            <div 
              v-for="b in myBookings" 
              :key="b.id"
              class="booking-card glass-panel"
            >
              <div class="b-header d-flex justify-between align-center">
                <div>
                  <span class="b-ref font-weight-bold text-gold">{{ b.id }}</span>
                  <span class="text-muted small ml-2">• Booked on {{ b.createdAt }}</span>
                </div>
                <div class="d-flex align-center gap-2">
                  <span class="status-pill" :class="getStatusClass(b.bookingStatus)">
                    {{ b.bookingStatus }}
                  </span>
                  <span class="status-pill" :class="b.paymentStatus === 'Paid' ? 'confirmed' : 'pending'">
                    {{ b.paymentStatus }}
                  </span>
                </div>
              </div>

              <div class="b-details-grid my-3">
                <div>
                  <div class="b-label">Vehicle</div>
                  <div class="b-val">{{ b.vehicleMake }} {{ b.vehicleModel }} ({{ b.vehicleReg }})</div>
                </div>
                <div>
                  <div class="b-label">Service</div>
                  <div class="b-val text-white">{{ b.serviceName }}</div>
                </div>
                <div>
                  <div class="b-label">Scheduled Date & Time</div>
                  <div class="b-val text-gold">{{ b.bookingDate }} at {{ b.bookingTime }}</div>
                </div>
                <div>
                  <div class="b-label">Amount Paid</div>
                  <div class="b-val font-weight-bold">Rs. {{ b.totalAmount }}</div>
                </div>
              </div>

              <!-- Cancellation & Refund Details if cancelled -->
              <div v-if="b.refundDetails" class="refund-notice-box mb-3">
                <span class="text-purple font-weight-bold">Refund Reversal Details:</span>
                <div class="small text-secondary mt-1">
                  Original: Rs. {{ b.refundDetails.originalAmount }} • Deduction Fee ({{ b.refundDetails.deductionPercent }}%): Rs. {{ b.refundDetails.deductionAmount }} • 
                  <strong>Net Refunded: Rs. {{ b.refundDetails.refundedAmount }}</strong> to original payment method.
                </div>
              </div>

              <!-- Booking Actions -->
              <div class="b-actions d-flex justify-between align-center flex-wrap gap-2">
                <div class="d-flex gap-2">
                  <!-- View QR Pass -->
                  <button class="btn btn-outline btn-sm" @click="viewPass(b)">
                    🎫 View QR Pass
                  </button>
                  <!-- Print Receipt -->
                  <button class="btn btn-outline btn-sm" @click="printReceipt(b)">
                    🧾 Receipt
                  </button>
                </div>

                <!-- Reschedule or Cancel (if not completed or cancelled) -->
                <div class="d-flex gap-2" v-if="b.bookingStatus === 'Confirmed'">
                  <button class="btn btn-gold-outline btn-sm" @click="openReschedule(b)">
                    Reschedule
                  </button>
                  <button class="btn btn-outline btn-sm text-danger" @click="openCancel(b)">
                    Cancel & Refund
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==========================================
             TAB 2: SAVED VEHICLES (SRS Section 7)
             ========================================== -->
        <div v-if="activeTab === 'vehicles'">
          <div class="d-flex justify-between align-center mb-3">
            <h4 class="text-white">Your Registered Vehicles</h4>
            <button class="btn btn-primary btn-sm" @click="showAddVehicleForm = !showAddVehicleForm">
              {{ showAddVehicleForm ? 'Cancel' : '+ Add New Vehicle' }}
            </button>
          </div>

          <!-- Add Vehicle Inline Form -->
          <form v-if="showAddVehicleForm" @submit.prevent="addNewVehicle" class="add-vehicle-form glass-panel mb-4 p-3">
            <h5 class="text-gold mb-2">Register Vehicle for 1-Click Booking</h5>
            <div class="form-row mb-2">
              <div class="col-4">
                <label class="form-label">Make *</label>
                <input type="text" v-model="newV.make" required placeholder="e.g. Toyota" />
              </div>
              <div class="col-4">
                <label class="form-label">Model *</label>
                <input type="text" v-model="newV.model" required placeholder="e.g. Fortuner" />
              </div>
              <div class="col-4">
                <label class="form-label">Category *</label>
                <select v-model="newV.categoryId">
                  <option v-for="c in store.vehicleCategories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
            </div>
            <div class="form-row mb-3">
              <div class="col-6">
                <label class="form-label">Registration / Plate No. *</label>
                <input type="text" v-model="newV.regNumber" required placeholder="e.g. LEA-24-1010" />
              </div>
              <div class="col-6">
                <label class="form-label">Color</label>
                <input type="text" v-model="newV.color" placeholder="e.g. Pearl White" />
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Save Vehicle</button>
          </form>

          <div class="vehicles-grid">
            <div 
              v-for="v in store.auth.user?.savedVehicles" 
              :key="v.id"
              class="saved-v-card glass-panel"
            >
              <div class="d-flex justify-between align-center">
                <h5 class="v-name text-white font-weight-bold">{{ v.make }} {{ v.model }}</h5>
                <span class="v-badge">{{ v.categoryId }}</span>
              </div>
              <div class="text-gold font-weight-bold my-1">Plate: {{ v.regNumber }}</div>
              <div class="text-muted small">Color: {{ v.color || 'Standard' }}</div>
            </div>
          </div>
        </div>

        <!-- ==========================================
             TAB 3: LOYALTY WALLET (SRS Section 11)
             ========================================== -->
        <div v-if="activeTab === 'loyalty'">
          <div class="loyalty-wallet-card glass-panel text-center p-4 mb-4">
            <span class="text-muted small">CURRENT BALANCE</span>
            <div class="wallet-points font-weight-bold text-gold my-2">
              {{ store.auth.user?.loyaltyPoints || 0 }} <span class="points-unit">PTS</span>
            </div>
            <div class="wallet-value text-white">
              Equivalent Discount: <strong>Rs. {{ (store.auth.user?.loyaltyPoints || 0) * 2 }}</strong>
            </div>
            <p class="small text-muted mt-2 max-w-400 mx-auto">
              Points can be applied at Step 5 of online checkout to reduce your final bill.
            </p>
          </div>

          <h5 class="text-white mb-2">How to Earn More Points:</h5>
          <div class="loyalty-rules-grid">
            <div class="rule-box glass-panel p-3">
              <strong>1 Point per Rs. 100 Spent</strong>
              <p class="small text-muted mb-0">Automatically credited upon service completion.</p>
            </div>
            <div class="rule-box glass-panel p-3">
              <strong>1 Point = Rs. 2 Cash Off</strong>
              <p class="small text-muted mb-0">Redeem up to 20% of your booking total.</p>
            </div>
            <div class="rule-box glass-panel p-3">
              <strong>Never Expire</strong>
              <p class="small text-muted mb-0">Your earned points stay safely in your wallet.</p>
            </div>
          </div>
        </div>

        <!-- ==========================================
             TAB 4: NOTIFICATION SETTINGS (SRS Section 13)
             ========================================== -->
        <div v-if="activeTab === 'profile'">
          <div class="notif-settings-box glass-panel p-4">
            <h4 class="text-white mb-3">Communication & Privacy Preferences</h4>
            
            <div class="setting-toggle-row py-2 border-bottom">
              <div>
                <strong class="text-white">WhatsApp Booking Alerts & Progress</strong>
                <p class="small text-muted mb-0">Receive instant confirmation, 2-hour reminder, and wash completion alert.</p>
              </div>
              <input type="checkbox" checked class="form-check-input" />
            </div>

            <div class="setting-toggle-row py-2 border-bottom">
              <div>
                <strong class="text-white">SMS Gateways</strong>
                <p class="small text-muted mb-0">Fallback transactional SMS if mobile data or WhatsApp is offline.</p>
              </div>
              <input type="checkbox" checked class="form-check-input" />
            </div>

            <div class="setting-toggle-row py-2 border-bottom">
              <div>
                <strong class="text-white">Email Receipts & Tax Invoices</strong>
                <p class="small text-muted mb-0">Itemized PDF receipt delivered to your inbox.</p>
              </div>
              <input type="checkbox" checked class="form-check-input" />
            </div>

            <div class="setting-toggle-row py-2">
              <div>
                <strong class="text-white">Promotional & Weekend Detailing Offers</strong>
                <p class="small text-muted mb-0">Special coupon codes and seasonal discount announcements.</p>
              </div>
              <input type="checkbox" class="form-check-input" />
            </div>

            <button class="btn btn-primary btn-sm mt-4" @click="savePreferences">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancellation Confirmation Dialog (SRS Section 10) -->
    <div class="modal-overlay" v-if="cancelBookingModal" @click.self="cancelBookingModal = null">
      <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-danger">Confirm Cancellation & Refund</h4>
          <button class="close-btn" @click="cancelBookingModal = null">✕</button>
        </div>

        <div class="modal-body">
          <p class="text-secondary small">
            In accordance with <strong>SRS Section 10 (Cancellation & Refund Policy)</strong>:
          </p>

          <div class="refund-calc-table glass-panel p-3 my-3">
            <div class="d-flex justify-between py-1 small">
              <span>Original Payment:</span>
              <span class="font-weight-bold">Rs. {{ cancelBookingModal.totalAmount }}</span>
            </div>
            <div class="d-flex justify-between py-1 small text-danger">
              <span>5% Processing Deduction:</span>
              <span>- Rs. {{ Math.round(cancelBookingModal.totalAmount * 0.05) }}</span>
            </div>
            <div class="divider-line my-2"></div>
            <div class="d-flex justify-between py-1 text-success font-weight-bold">
              <span>Immediate Refund Amount:</span>
              <span>Rs. {{ cancelBookingModal.totalAmount - Math.round(cancelBookingModal.totalAmount * 0.05) }}</span>
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="form-label">Reason for Cancellation</label>
            <select v-model="cancelReason">
              <option value="Schedule Conflict">Schedule Conflict</option>
              <option value="Emergency Travel">Emergency Travel</option>
              <option value="Bad Weather / Rain">Weather / Rain Forecast</option>
              <option value="Vehicle in Maintenance">Vehicle in Maintenance</option>
              <option value="Other">Other Reason</option>
            </select>
          </div>

          <div class="d-flex gap-2 justify-end">
            <button class="btn btn-outline" @click="cancelBookingModal = null">Keep Booking</button>
            <button class="btn btn-primary bg-danger border-danger" @click="confirmCancellation">
              Confirm Cancellation & Refund
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reschedule Modal -->
    <div class="modal-overlay" v-if="rescheduleModal" @click.self="rescheduleModal = null">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-gold">Reschedule Appointment</h4>
          <button class="close-btn" @click="rescheduleModal = null">✕</button>
        </div>
        <div class="modal-body">
          <p class="small text-secondary mb-3">
            Rescheduling is free of charge up to 2 hours prior to your scheduled time.
          </p>
          <div class="form-group mb-3">
            <label class="form-label">New Date</label>
            <input type="date" v-model="newDate" min="2026-10-28" />
          </div>
          <div class="form-group mb-4">
            <label class="form-label">New Time Slot</label>
            <select v-model="newTime">
              <option value="11:00 AM">11:00 AM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="07:00 PM">07:00 PM</option>
            </select>
          </div>
          <button class="btn btn-primary btn-block" @click="confirmReschedule">
            Confirm New Appointment Time
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store, actions } from '../store/carWashStore';

const emit = defineEmits(['close', 'open-booking']);

const activeTab = ref('bookings');
const showAddVehicleForm = ref(false);

const cancelBookingModal = ref(null);
const cancelReason = ref('Schedule Conflict');

const rescheduleModal = ref(null);
const newDate = ref('2026-10-29');
const newTime = ref('03:00 PM');

const newV = ref({
  make: '',
  model: '',
  categoryId: 'sedan',
  regNumber: '',
  color: ''
});

const myBookings = computed(() => {
  if (!store.auth.user) return store.bookings.slice(0, 4);
  const userPhone = store.auth.user.phone.slice(-6);
  return store.bookings.filter(b => b.customerPhone.includes(userPhone) || b.customerName === store.auth.user.name);
});

function getStatusClass(st) {
  const map = {
    'Confirmed': 'confirmed',
    'Checked In': 'checked-in',
    'In Progress': 'in-progress',
    'Completed': 'completed',
    'Cancelled': 'cancelled',
    'Refunded': 'refunded'
  };
  return map[st] || 'pending';
}

function viewPass(b) {
  alert(`Digital Pass for Booking ${b.id}\nVehicle: ${b.vehicleMake} ${b.vehicleModel} (${b.vehicleReg})\nStatus: ${b.bookingStatus}\nPlease present this reference at Bay 2 upon arrival.`);
}

function printReceipt(b) {
  window.print();
}

function openCancel(b) {
  cancelBookingModal.value = b;
}

function confirmCancellation() {
  if (!cancelBookingModal.value) return;
  const res = actions.processCancellationAndRefund(cancelBookingModal.value.id, cancelReason.value, 'Customer');
  alert(`Booking ${cancelBookingModal.value.id} cancelled.\nRefund of Rs. ${res.netRefund} has been initiated back to your payment method (5% deduction fee Rs. ${res.deductionAmount} applied).`);
  cancelBookingModal.value = null;
}

function openReschedule(b) {
  rescheduleModal.value = b;
}

function confirmReschedule() {
  if (!rescheduleModal.value) return;
  rescheduleModal.value.bookingDate = newDate.value;
  rescheduleModal.value.bookingTime = newTime.value;
  rescheduleModal.value.statusHistory.unshift({
    status: 'Rescheduled',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actor: 'Customer Self-Service'
  });
  alert(`Your booking has been rescheduled to ${newDate.value} at ${newTime.value}. Updated confirmation sent via SMS/WhatsApp.`);
  rescheduleModal.value = null;
}

function addNewVehicle() {
  if (!newV.value.make || !newV.value.model || !newV.value.regNumber) return;
  actions.saveVehicle(newV.value);
  newV.value = { make: '', model: '', categoryId: 'sedan', regNumber: '', color: '' };
  showAddVehicleForm.value = false;
  alert('Vehicle added to your garage!');
}

function savePreferences() {
  alert('Your notification and privacy preferences have been saved.');
}
</script>

<style scoped>
.account-modal-content {
  background: var(--bg-card);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-xl);
  max-width: 820px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
}

.user-avatar-circle {
  width: 44px;
  height: 44px;
  background: var(--primary);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.account-tabs {
  display: flex;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  overflow-x: auto;
}

.acc-tab-btn {
  padding: 0.9rem 1.4rem;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.acc-tab-btn:hover {
  color: #fff;
}

.acc-tab-btn.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  background: rgba(245, 158, 11, 0.05);
}

.account-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* Booking Card */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.booking-card {
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-lg);
}

.b-details-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.b-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.b-val {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.refund-notice-box {
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
}

.text-purple { color: #c084fc; }

/* Vehicles */
.vehicles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.saved-v-card {
  padding: 1.25rem;
  border-radius: var(--radius-md);
}

.v-badge {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* Wallet */
.wallet-points {
  font-family: var(--font-heading);
  font-size: 3rem;
  line-height: 1;
}

.points-unit {
  font-size: 1.25rem;
}

.loyalty-rules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.setting-toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.form-check-input {
  width: 22px;
  height: 22px;
  accent-color: var(--primary);
  cursor: pointer;
}

.border-bottom {
  border-bottom: 1px solid var(--border-light);
}

.bg-danger { background: #ef4444 !important; }
.border-danger { border-color: #ef4444 !important; }

@media (max-width: 768px) {
  .b-details-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .vehicles-grid {
    grid-template-columns: 1fr;
  }
  .loyalty-rules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
