<template>
  <section class="loyalty-banner-section">
    <div class="container">
      <div class="loyalty-card">
        <!-- Background Image with Gradient Overlay -->
        <img src="/images/loyalty-banner.jpg" alt="Hanzala Loyalty Rewards" class="banner-bg" />
        <div class="banner-overlay"></div>

        <div class="banner-content">
          <div class="loyalty-left">
            <div class="gift-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 12 20 22 4 22 4 12"></polyline>
                <rect x="2" y="7" width="20" height="5"></rect>
                <line x1="12" y1="22" x2="12" y2="7"></line>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="loyalty-title">Loyalty Rewards</h3>
              <p class="loyalty-subtitle">
                Book, Earn Points & Get Discounts. Earn 1 point for every Rs. 100 spent and redeem directly at checkout!
              </p>
            </div>
          </div>

          <div class="loyalty-right">
            <button class="btn btn-primary btn-lg" @click="$emit('open-loyalty')">
              Join Now →
            </button>
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
.loyalty-banner-section {
  padding: 2.5rem 0;
  position: relative;
}

.loyalty-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid rgba(245, 158, 11, 0.4);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(245, 158, 11, 0.15);
  min-height: 140px;
  display: flex;
  align-items: center;
}

.banner-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
  z-index: 1;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, 
    rgba(10, 12, 16, 0.96) 0%, 
    rgba(15, 18, 24, 0.90) 45%, 
    rgba(15, 18, 24, 0.4) 100%);
  z-index: 2;
}

.banner-content {
  position: relative;
  z-index: 3;
  width: 100%;
  padding: 1.75rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.loyalty-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.gift-icon-box {
  width: 56px;
  height: 56px;
  background: rgba(245, 158, 11, 0.15);
  border: 2px solid var(--primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.loyalty-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.25rem;
}

.loyalty-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  max-width: 560px;
}

@media (max-width: 860px) {
  .banner-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
    gap: 1.25rem;
  }
}
</style>
