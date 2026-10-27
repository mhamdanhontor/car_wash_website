<template>
  <section id="contact" class="location-section">
    <div class="container">
      <div class="section-header text-center">
        <span class="sub-badge">Visit Our Studios</span>
        <h2 class="section-title">Location, Hours & FAQs</h2>
        <p class="section-desc">
          Conveniently located in Lahore's prime commercial hubs with comfortable air-conditioned waiting lounges and free Wi-Fi.
        </p>
      </div>

      <div class="location-grid">
        <!-- Left: Branches & Timings -->
        <div class="branches-wrapper">
          <div class="branches-list">
            <div 
              v-for="branch in store.business.branches" 
              :key="branch.id"
              class="branch-card glass-card"
              :class="{ active: selectedBranchId === branch.id }"
              @click="selectedBranchId = branch.id"
            >
              <div class="branch-header">
                <div class="branch-icon-pin">📍</div>
                <div>
                  <h4 class="branch-name">{{ branch.name }}</h4>
                  <p class="branch-address">{{ branch.address }}</p>
                </div>
              </div>

              <div class="branch-meta">
                <span class="meta-tag">⚡ {{ branch.bays }} Dedicated Washing Bays</span>
                <span class="meta-tag">📞 {{ branch.phone }}</span>
              </div>
            </div>
          </div>

          <!-- Studio Operating Schedule -->
          <div class="hours-card glass-panel">
            <h4 class="hours-title">🕒 Operating Schedule</h4>
            <div class="hours-row">
              <span>Monday – Thursday</span>
              <span class="font-weight-bold text-white">8:00 AM – 10:00 PM</span>
            </div>
            <div class="hours-row">
              <span>Friday</span>
              <span class="font-weight-bold text-white">8:00 AM – 1:00 PM & 2:30 PM – 11:00 PM</span>
            </div>
            <div class="hours-row">
              <span>Saturday & Sunday</span>
              <span class="font-weight-bold text-white">8:00 AM – 11:00 PM (High Demand)</span>
            </div>
            <div class="lounge-perk">
              ☕ Complimentary espresso, Wi-Fi, and live bay CCTV monitor in our executive customer lounge while you wait.
            </div>
          </div>
        </div>

        <!-- Right: FAQ Accordion (SRS Section 4.3) -->
        <div class="faq-wrapper glass-panel">
          <h3 class="faq-main-title">Frequently Asked Questions</h3>

          <div class="faq-list">
            <div 
              v-for="(faq, idx) in faqs" 
              :key="idx" 
              class="faq-item"
              :class="{ open: openFaqIndex === idx }"
            >
              <button class="faq-question" @click="toggleFaq(idx)">
                <span>{{ faq.q }}</span>
                <span class="faq-chevron">{{ openFaqIndex === idx ? '−' : '+' }}</span>
              </button>
              <div class="faq-answer" v-if="openFaqIndex === idx">
                <p>{{ faq.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { store } from '../store/carWashStore';

const selectedBranchId = ref('b1');
const openFaqIndex = ref(0);

function toggleFaq(idx) {
  openFaqIndex.value = openFaqIndex.value === idx ? -1 : idx;
}

const faqs = [
  {
    q: "How does the online booking reservation work?",
    a: "Select your desired service package, vehicle type, and preferred time slot. You can pay online via Credit/Debit card, JazzCash, EasyPaisa, Raast, or choose 'Pay on Site'. You receive an instant digital QR Code pass for priority bay entry."
  },
  {
    q: "What is your Cancellation & Refund policy?",
    a: "In accordance with SRS Section 10, cancellations made at least 2 hours prior to the slot receive an immediate 95% refund (5% processing fee deduction). Rescheduling is free of charge up to 2 hours before your appointment via the My Account portal."
  },
  {
    q: "Do I need to wait in line if I booked online?",
    a: "No! Online bookings have guaranteed bay priority. Upon arrival at the front desk, staff scans your QR code pass, and your vehicle is moved directly into your designated washing bay within 5-10 minutes."
  },
  {
    q: "What products and soaps do you use?",
    a: "We exclusively use imported, pH-neutral active snow foam shampoos, ceramic silica spray coatings, and de-ironizing wheel cleaners from Koch-Chemie and CarPro that will never strip ceramic coatings or scratch paint."
  },
  {
    q: "How do Loyalty Points work?",
    a: "Every completed wash automatically credits 1 loyalty point per Rs. 100 spent to your account. 1 Point equals Rs. 2 discount, which can be applied directly on your next checkout."
  }
];
</script>

<style scoped>
.location-section {
  padding: 5rem 0;
  background: var(--bg-dark);
}

.location-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.branches-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.branch-card {
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  transition: var(--transition);
}

.branch-card:hover, .branch-card.active {
  border-color: var(--primary);
  background: var(--bg-card-hover);
}

.branch-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.branch-icon-pin {
  font-size: 1.5rem;
}

.branch-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.2rem;
}

.branch-address {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.branch-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.meta-tag {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  color: var(--text-secondary);
}

/* Hours Card */
.hours-card {
  padding: 1.5rem;
}

.hours-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 1rem;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.lounge-perk {
  margin-top: 1rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
  background: rgba(245, 158, 11, 0.08);
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px dashed rgba(245, 158, 11, 0.3);
}

/* FAQ */
.faq-wrapper {
  padding: 2rem;
}

.faq-main-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1.5rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-secondary);
  transition: var(--transition);
}

.faq-item.open {
  border-color: rgba(245, 158, 11, 0.4);
}

.faq-question {
  width: 100%;
  padding: 1rem 1.25rem;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
}

.faq-chevron {
  font-size: 1.25rem;
  color: var(--primary);
  font-weight: 700;
}

.faq-answer {
  padding: 0 1.25rem 1.25rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .location-grid {
    grid-template-columns: 1fr;
  }
}
</style>
