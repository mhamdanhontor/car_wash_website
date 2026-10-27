<template>
  <section id="about" class="why-us-section">
    <div class="container">
      <div class="section-header text-center">
        <span class="sub-badge">Excellence in Detailing</span>
        <h2 class="section-title">Why Choose Hanzala Car Wash?</h2>
        <p class="section-desc">
          We treat every vehicle like a masterpiece with museum-grade techniques, water conservation, and guaranteed satisfaction.
        </p>
      </div>

      <!-- 5 Pillars Row (Matching Mockup Icons & Labels) -->
      <div class="pillars-grid">
        <!-- Pillar 1 -->
        <div class="pillar-card">
          <div class="pillar-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h4 class="pillar-title">Professional Staff</h4>
          <p class="pillar-desc">
            Certified detailing technicians trained in paint correction and safe multi-stage wash methods.
          </p>
        </div>

        <!-- Pillar 2 -->
        <div class="pillar-card">
          <div class="pillar-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h4 class="pillar-title">Safe & Premium Products</h4>
          <p class="pillar-desc">
            Imported pH-neutral snow shampoos, de-ironizers, and non-greasy leather conditioners.
          </p>
        </div>

        <!-- Pillar 3 -->
        <div class="pillar-card">
          <div class="pillar-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h4 class="pillar-title">Time Saving</h4>
          <p class="pillar-desc">
            Guaranteed bay reservation. Skip the long lines with live slot booking and fast turnarounds.
          </p>
        </div>

        <!-- Pillar 4 -->
        <div class="pillar-card">
          <div class="pillar-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h4 class="pillar-title">Customer Satisfaction</h4>
          <p class="pillar-desc">
            100% inspection guarantee. If you spot a missed speck, our team will touch it up on the spot.
          </p>
        </div>

        <!-- Pillar 5 -->
        <div class="pillar-card">
          <div class="pillar-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
          </div>
          <h4 class="pillar-title">Eco-Friendly</h4>
          <p class="pillar-desc">
            High-efficiency water reclaim filtration saving 60% fresh water with biodegradable solutions.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-us-section {
  padding: 4.5rem 0;
  background: var(--bg-primary);
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
}

.pillar-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 2rem 1.25rem;
  text-align: center;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pillar-card:hover {
  border-color: var(--border-gold);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

.pillar-icon-circle {
  width: 60px;
  height: 60px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-bottom: 1.25rem;
  transition: var(--transition);
}

.pillar-card:hover .pillar-icon-circle {
  background: var(--primary);
  color: #000;
  transform: scale(1.1);
}

.pillar-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.65rem;
}

.pillar-desc {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.5;
}

@media (max-width: 992px) {
  .pillars-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }
}
</style>
