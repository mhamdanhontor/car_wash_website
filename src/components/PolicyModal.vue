<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content policy-modal-dialog">
      <div class="modal-header d-flex justify-between align-center">
        <div>
          <h3 class="modal-title">Business Policies & Terms</h3>
          <span class="text-gold small">Version 2.0 Consolidated Edition</span>
        </div>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <!-- Policy Tabs -->
      <div class="policy-tabs">
        <button 
          class="p-tab" 
          :class="{ active: activePolicy === 'cancellation' }"
          @click="activePolicy = 'cancellation'"
        >
          Cancellation & Refunds (Sec. 10)
        </button>
        <button 
          class="p-tab" 
          :class="{ active: activePolicy === 'privacy' }"
          @click="activePolicy = 'privacy'"
        >
          Privacy & Data Protection (Sec. 17)
        </button>
        <button 
          class="p-tab" 
          :class="{ active: activePolicy === 'terms' }"
          @click="activePolicy = 'terms'"
        >
          Terms of Service & Care
        </button>
      </div>

      <div class="modal-body policy-content-scroll">
        <!-- 10. Cancellation, Rescheduling, No-Show and Refund Policy -->
        <div v-if="activePolicy === 'cancellation'">
          <h4 class="text-white mb-3">10. Cancellation, Rescheduling, No-Show and Refund Policy</h4>
          
          <div class="glass-panel p-3 mb-3 border-gold">
            <strong class="text-gold">Key Operational Rules:</strong>
            <ul class="policy-bullet-list mt-2">
              <li><strong>Cancellation Cutoff:</strong> Customers may cancel up to <strong>2 hours</strong> before their scheduled time slot without penalty other than standard gateway processing fee.</li>
              <li><strong>Free Rescheduling:</strong> Free date and time rescheduling is permitted up to 2 hours before the appointment via the Customer Self-Service Portal.</li>
              <li><strong>Deduction Policy:</strong> On eligible cancellations, a <strong>5% processing deduction</strong> is applied to cover payment gateway interchange costs (e.g. For PKR 2,500 booking, deduction is PKR 125, net refund is PKR 2,375).</li>
              <li><strong>No-Show Grace Period:</strong> A <strong>20-minute attendance grace period</strong> is strictly provided before any appointment is flagged. Staff cannot mark a no-show solely because the scheduled time has arrived.</li>
              <li><strong>Refund Method:</strong> All refunds are reversed to the original payment source (Credit/Debit Card, JazzCash, EasyPaisa, or Raast account).</li>
            </ul>
          </div>

          <p class="small text-secondary">
            In accordance with SRS Appendix B, all calculations use fixed-precision decimal arithmetic. The server remains the authoritative source of truth for all refund eligibility calculations.
          </p>
        </div>

        <!-- 17. Privacy & Data Governance -->
        <div v-if="activePolicy === 'privacy'">
          <h4 class="text-white mb-3">17. Privacy, Data Governance & Security</h4>
          
          <div class="glass-panel p-3 mb-3">
            <strong class="text-gold">Data Protection Commitments:</strong>
            <ul class="policy-bullet-list mt-2">
              <li><strong>Zero Raw Card Storage:</strong> Payment card numbers and CVVs are processed directly via PCI-DSS compliant hosted gateways. Raw financial credentials never touch our web servers.</li>
              <li><strong>Minimal Data Collection:</strong> We only collect customer contact details, vehicle registration number, and service records essential to perform the automotive wash.</li>
              <li><strong>Vehicle Inspection Photos:</strong> Before-and-after detailing photographs are captured solely for quality verification and condition reporting with client consent. Media is kept strictly confidential.</li>
              <li><strong>Marketing Consent:</strong> Promotional communications (SMS/WhatsApp) require explicit opt-in and feature instant one-click unsubscribe.</li>
            </ul>
          </div>
        </div>

        <!-- Terms of Service -->
        <div v-if="activePolicy === 'terms'">
          <h4 class="text-white mb-3">Service Terms & Quality Guarantee</h4>
          <p class="text-secondary small">
            1. Hanzala Car Wash guarantees 100% satisfaction on all completed packages. If any missed dirt spot or smear is observed during vehicle handover, our team will touch it up immediately.
          </p>
          <p class="text-secondary small">
            2. Clients are requested to remove personal jewelry, mobile phones, and cash from vehicles prior to handover to washing bay staff.
          </p>
          <p class="text-secondary small">
            3. Vehicles with delicate aftermarket modifications, repainted panels, or matte vinyl wraps should notify staff via the special instructions field during booking.
          </p>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary btn-block" @click="$emit('close')">
          Understood & Acknowledged ✓
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialTab: {
    type: String,
    default: 'cancellation'
  }
});

defineEmits(['close']);

const activePolicy = ref(props.initialTab || 'cancellation');
</script>

<style scoped>
.policy-modal-dialog {
  max-width: 700px;
}

.policy-tabs {
  display: flex;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  overflow-x: auto;
}

.p-tab {
  padding: 0.85rem 1.25rem;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.p-tab:hover {
  color: #fff;
}

.p-tab.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.policy-content-scroll {
  max-height: 480px;
  overflow-y: auto;
  padding: 1.5rem;
}

.policy-bullet-list {
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.policy-bullet-list strong {
  color: #fff;
}
</style>
