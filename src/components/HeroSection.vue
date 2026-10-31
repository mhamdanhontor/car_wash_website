<template>
  <section id="home" class="hero-section">
    <div class="hero-backdrop"></div>
    <div class="container hero-container">
      <!-- Left Content Column -->
      <div class="hero-content">
        <!-- Trust Tag -->
        <div class="hero-tag">
          <span class="pulse-dot"></span>
          <span>{{ store.business?.heroTrustBadge || "Lahore's #1 Rated Luxury Detailing Center" }}</span>
        </div>

        <h1 class="hero-title">
          {{ store.business?.heroTitlePrefix || "Premium" }} <br />
          <span class="gradient-text">{{ store.business?.heroTitleHighlight || "Car Wash &" }}</span> <br />
          {{ store.business?.heroTitleSuffix || "Detailing Services" }}
        </h1>

        <p class="hero-subtitle">
          {{ store.business?.slogan || "Professional cleaning, detailing and care for your vehicle. We combine steam sanitization, active snow foam, and ceramic protection to restore that showroom shine." }}
        </p>

        <!-- Feature Badges from Mockup -->
        <div class="hero-badges">
          <div class="badge-item">
            <span class="badge-icon">👑</span>
            <span class="badge-label">Expert Team</span>
          </div>
          <div class="badge-item">
            <span class="badge-icon">✨</span>
            <span class="badge-label">Premium Products</span>
          </div>
          <div class="badge-item">
            <span class="badge-icon">⚡</span>
            <span class="badge-label">Quick Booking</span>
          </div>
        </div>

        <!-- Call to Actions -->
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg pulse-btn" @click="$emit('open-booking')">
            Book Your Wash Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          
          <a href="#services" class="btn btn-outline btn-lg" @click.prevent="$emit('navigate', 'services')">
            Our Services
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </a>
        </div>

        <!-- Social Proof Stats -->
        <div class="hero-proof">
          <div class="proof-avatars">
            <span class="avatar av-1">AK</span>
            <span class="avatar av-2">MR</span>
            <span class="avatar av-3">SZ</span>
            <span class="avatar av-4">BT</span>
          </div>
          <div class="proof-text">
            <div class="stars">★★★★★</div>
            <div class="proof-caption">Rated <strong>4.9 / 5.0</strong> by 1,400+ vehicle owners</div>
          </div>
        </div>
      </div>

      <!-- Right Visual Column (Matching Mockup with Hero Studio Photo) -->
      <div class="hero-visual">
        <div class="image-wrapper">
          <img src="/images/hero.jpg" alt="Hanzala Car Wash Detailing Studio" class="hero-image" />
          <div class="image-overlay"></div>

          <!-- Floating Floating Badge 1: Live Bay Status -->
          <div class="floating-stat-card stat-top">
            <div class="stat-indicator online"></div>
            <div>
              <div class="stat-label">Live Capacity</div>
              <div class="stat-value">{{ store.business?.capacityLabel || "3 Bays Operating" }}</div>
            </div>
          </div>

          <!-- Floating Floating Badge 2: Quick Turnaround -->
          <div class="floating-stat-card stat-bottom">
            <div class="stat-icon-gold">⚡</div>
            <div>
              <div class="stat-label">Fast Service</div>
              <div class="stat-value">{{ store.business?.serviceSpeedLabel || "25 - 55 Mins Average" }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { store } from '../store/carWashStore';
defineEmits(['open-booking', 'navigate']);
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 86vh;
  display: flex;
  align-items: center;
  padding: 3.5rem 0 4.5rem;
  overflow: hidden;
  background: radial-gradient(circle at 75% 30%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 10% 70%, rgba(15, 23, 42, 0.8) 0%, transparent 50%),
              var(--bg-dark);
}

.hero-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  align-items: center;
  gap: 3.5rem;
  position: relative;
  z-index: 2;
}

/* Hero Content */
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 2rem;
  max-width: 540px;
}

/* Feature Badges from Mockup */
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2.25rem;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.badge-icon {
  font-size: 1.1rem;
}

/* CTA buttons */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.pulse-btn {
  box-shadow: 0 0 25px rgba(245, 158, 11, 0.4);
}

/* Social Proof */
.hero-proof {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.proof-avatars {
  display: flex;
  align-items: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid var(--bg-dark);
  margin-left: -10px;
}

.avatar:first-child {
  margin-left: 0;
}

.av-1 { background: #3b82f6; color: #fff; }
.av-2 { background: #10b981; color: #fff; }
.av-3 { background: #f59e0b; color: #000; }
.av-4 { background: #8b5cf6; color: #fff; }

.stars {
  color: #f59e0b;
  font-size: 0.95rem;
  letter-spacing: 2px;
}

.proof-caption {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.proof-caption strong {
  color: var(--text-primary);
}

/* Right Visual */
.hero-visual {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 2px solid rgba(245, 158, 11, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.15);
}

.hero-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16/10;
  object-fit: cover;
  display: block;
  transform: scale(1.02);
  transition: transform 0.5s ease;
}

.image-wrapper:hover .hero-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(10, 12, 16, 0.85) 100%);
  pointer-events: none;
}

/* Floating Badges */
.floating-stat-card {
  position: absolute;
  background: rgba(22, 26, 34, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  padding: 0.75rem 1.15rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  z-index: 3;
}

.stat-top {
  top: 1.5rem;
  right: 1.5rem;
  border-left: 3px solid #10b981;
}

.stat-bottom {
  bottom: 1.5rem;
  left: 1.5rem;
  border-left: 3px solid var(--primary);
}

.stat-indicator.online {
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
}

.stat-icon-gold {
  font-size: 1.3rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
}

@media (max-width: 992px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }

  .hero-tag {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-badges {
    justify-content: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-proof {
    justify-content: center;
  }
}
</style>
