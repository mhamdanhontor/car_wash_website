<template>
  <section id="services" class="services-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header text-center">
        <span class="sub-badge">Exceptional Automotive Care</span>
        <h2 class="section-title">Our Car Wash Services</h2>
        <p class="section-desc">
          Choose from a range of professional car wash and detailing packages tailored to your vehicle's needs.
        </p>
      </div>

      <!-- Services Grid (Matching Mockup) -->
      <div class="services-grid">
        <div 
          v-for="service in store.services" 
          :key="service.id"
          class="service-card"
          :class="{ 'popular-card': service.popular }"
        >
          <!-- Popular / Feature Badge -->
          <div v-if="service.popular" class="popular-ribbon">
            <span>{{ service.badge || 'Most Popular' }}</span>
          </div>

          <!-- Service Image -->
          <div class="service-image-container">
            <img :src="service.image" :alt="service.name" class="service-img" />
            <div class="service-duration-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{{ service.durationMins - 5 }} - {{ service.durationMins + 5 }} mins</span>
            </div>
          </div>

          <!-- Service Content Body -->
          <div class="service-body">
            <h3 class="service-name">{{ service.name }}</h3>
            <p class="service-short-desc">{{ service.shortDesc }}</p>

            <!-- Price from Mockup -->
            <div class="service-pricing">
              <span class="price-prefix">From</span>
              <span class="price-amount">Rs. {{ service.basePrice.toLocaleString() }}</span>
            </div>

            <!-- Features Quick List -->
            <ul class="service-features-mini">
              <li v-for="(inc, idx) in service.included.slice(0, 3)" :key="idx">
                <span class="check-icon">✓</span>
                <span>{{ inc }}</span>
              </li>
            </ul>

            <!-- Actions -->
            <div class="service-actions">
              <button 
                class="btn btn-primary btn-block"
                :class="{ 'btn-gold-pulse': service.popular }"
                @click="$emit('select-service', service.id)"
              >
                Book Now
              </button>
              <button 
                class="btn btn-outline btn-block btn-sm"
                @click="openDetails(service)"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Details & Comparison Modal (SRS Section 4.2) -->
    <div class="modal-overlay" v-if="selectedModalService" @click.self="selectedModalService = null">
      <div class="modal-content">
        <div class="modal-header d-flex justify-between align-center">
          <div>
            <h3 class="modal-title">{{ selectedModalService.name }}</h3>
            <span class="text-gold font-weight-bold">Starting from Rs. {{ selectedModalService.basePrice.toLocaleString() }}</span>
          </div>
          <button class="close-btn" @click="selectedModalService = null">✕</button>
        </div>

        <div class="modal-body">
          <img :src="selectedModalService.image" :alt="selectedModalService.name" class="modal-service-img" />
          <p class="modal-service-desc">{{ selectedModalService.shortDesc }}</p>

          <div class="features-comparison-grid">
            <div class="comparison-column included-col">
              <h4 class="col-title text-success">✓ What's Included</h4>
              <ul class="features-list">
                <li v-for="(item, idx) in selectedModalService.included" :key="idx">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="comparison-column excluded-col">
              <h4 class="col-title text-muted">✕ What's Not Included</h4>
              <ul class="features-list">
                <li v-for="(item, idx) in selectedModalService.excluded" :key="idx">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Addons available -->
          <div class="addons-section mt-4">
            <h4 class="text-gold mb-2">Optional Recommended Add-ons</h4>
            <div class="addons-list">
              <div v-for="addon in store.addOns" :key="addon.id" class="addon-preview-item">
                <div>
                  <strong>{{ addon.name }}</strong> (+{{ addon.durationMins }} mins)
                  <p class="text-muted small mb-0">{{ addon.desc }}</p>
                </div>
                <span class="text-gold font-weight-bold">+Rs. {{ addon.price }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-primary btn-block" @click="proceedBookingFromModal">
            Select & Book This Package Now →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { store } from '../store/carWashStore';

const emit = defineEmits(['select-service']);

const selectedModalService = ref(null);

function openDetails(service) {
  selectedModalService.value = service;
}

function proceedBookingFromModal() {
  if (selectedModalService.value) {
    const sId = selectedModalService.value.id;
    selectedModalService.value = null;
    emit('select-service', sId);
  }
}
</script>

<style scoped>
.services-section {
  padding: 5rem 0;
  background: var(--bg-primary);
  position: relative;
}

.section-header {
  margin-bottom: 3.5rem;
}

.sub-badge {
  display: inline-block;
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.section-desc {
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.05rem;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.service-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: var(--transition);
}

.service-card:hover {
  border-color: var(--border-gold);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.popular-card {
  border-color: rgba(245, 158, 11, 0.5);
  box-shadow: 0 10px 30px rgba(245, 158, 11, 0.15);
}

.popular-ribbon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-gradient);
  color: #000;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-full);
  z-index: 5;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.service-image-container {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.service-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.service-card:hover .service-img {
  transform: scale(1.08);
}

.service-duration-pill {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  background: rgba(10, 12, 16, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-light);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.service-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.service-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
  color: #fff;
}

.service-short-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  min-height: 42px;
}

.service-pricing {
  margin-bottom: 1.25rem;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.price-prefix {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.price-amount {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--primary);
}

.service-features-mini {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.service-features-mini li {
  font-size: 0.82rem;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.check-icon {
  color: var(--primary);
  font-weight: bold;
}

.service-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-gold-pulse {
  animation: pulseGlow 3s infinite ease-in-out;
}

/* Modal details */
.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
}

.modal-title {
  font-size: 1.35rem;
}

.close-btn {
  background: transparent;
  color: var(--text-muted);
  font-size: 1.25rem;
}

.close-btn:hover {
  color: #fff;
}

.modal-body {
  padding: 1.5rem;
}

.modal-service-img {
  width: 100%;
  border-radius: var(--radius-md);
  height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.modal-service-desc {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.features-comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.comparison-column {
  background: var(--bg-secondary);
  padding: 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}

.col-title {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.text-success { color: #10b981; }

.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.features-list li {
  color: var(--text-secondary);
}

.addons-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.addon-preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}

.small { font-size: 0.8rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-0 { margin-bottom: 0; }

.modal-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-light);
}

@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  .features-comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
