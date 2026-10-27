<template>
  <section class="value-props-section">
    <div class="container">
      <div class="props-grid">
        <!-- Prop 1: Online Booking -->
        <div class="prop-card">
          <div class="prop-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div class="prop-text">
            <h4 class="prop-title">Online Booking</h4>
            <p class="prop-desc">Book in few clicks</p>
          </div>
        </div>

        <!-- Prop 2: Secure Payment -->
        <div class="prop-card">
          <div class="prop-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </div>
          <div class="prop-text">
            <h4 class="prop-title">Secure Payment</h4>
            <p class="prop-desc">Card, JazzCash & Raast</p>
          </div>
        </div>

        <!-- Prop 3: Loyalty Rewards -->
        <div class="prop-card" @click="$emit('open-loyalty')" style="cursor: pointer;">
          <div class="prop-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 12 20 22 4 22 4 12"></polyline>
              <rect x="2" y="7" width="20" height="5"></rect>
              <line x1="12" y1="22" x2="12" y2="7"></line>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
          </div>
          <div class="prop-text">
            <h4 class="prop-title">Loyalty Rewards</h4>
            <p class="prop-desc">Earn points & get discounts</p>
          </div>
        </div>

        <!-- Prop 4: Real-time Updates -->
        <div class="prop-card">
          <div class="prop-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div class="prop-text">
            <h4 class="prop-title">Real-time Updates</h4>
            <p class="prop-desc">SMS, Email & WhatsApp alerts</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['open-loyalty']);
</script>

<style scoped>
.value-props-section {
  padding: 1.5rem 0;
  margin-top: -2rem;
  position: relative;
  z-index: 10;
}

.props-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-xl);
  padding: 1.5rem 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.prop-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);
}

.prop-card:hover {
  transform: translateY(-2px);
}

.prop-icon-box {
  width: 48px;
  height: 48px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.prop-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.15rem;
}

.prop-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}

@media (max-width: 992px) {
  .props-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.25rem;
  }
}

@media (max-width: 576px) {
  .props-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
