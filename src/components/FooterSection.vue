<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand Info -->
        <div class="footer-col brand-col">
          <div class="footer-brand">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" class="car-mini-svg">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/>
                <circle cx="7.5" cy="14.5" r="1.5"/>
                <circle cx="16.5" cy="14.5" r="1.5"/>
              </svg>
            </div>
            <div>
              <span class="footer-logo-title">Hanzala</span>
              <span class="footer-logo-sub">Car Wash</span>
            </div>
          </div>
          <p class="footer-desc">
            Lahore's premier automotive spa. Meticulous hand washing, interior steam sanitization, and certified ceramic coatings for vehicles that demand the finest.
          </p>
          <div class="social-links-row">
            <a href="#instagram" class="social-icon">📸</a>
            <a href="#facebook" class="social-icon">📘</a>
            <a href="#youtube" class="social-icon">▶️</a>
            <a href="#whatsapp" class="social-icon">💬</a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Services</h4>
          <ul class="footer-links">
            <li><a href="#services" @click.prevent="$emit('select-service', 'exterior')">Exterior Foam Wash</a></li>
            <li><a href="#services" @click.prevent="$emit('select-service', 'interior')">Interior Deep Cleaning</a></li>
            <li><a href="#services" @click.prevent="$emit('select-service', 'full')">Full Car Wash Package</a></li>
            <li><a href="#services" @click.prevent="$emit('select-service', 'detailing')">Premium Ceramic Detailing</a></li>
            <li><a href="#services" @click.prevent="$emit('select-service', 'full')">Engine Bay Steam Clean</a></li>
          </ul>
        </div>

        <!-- Navigation Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#home" @click.prevent="$emit('navigate', 'home')">Home</a></li>
            <li><a href="#book" @click.prevent="$emit('open-booking')">Book Online</a></li>
            <li><a href="#gallery" @click.prevent="$emit('navigate', 'gallery')">Transformation Gallery</a></li>
            <li><a href="#reviews" @click.prevent="$emit('navigate', 'reviews')">Verified Reviews</a></li>
            <li><a href="#account" @click.prevent="$emit('open-account')">Customer Portal</a></li>
            <li><a href="#admin" @click.prevent="$emit('open-admin')">Admin & Staff Portal</a></li>
          </ul>
        </div>

        <!-- Studios & Contact -->
        <div class="footer-col">
          <h4 class="footer-heading">Locations & Hours</h4>
          <div class="contact-details">
            <p><strong>Main Hub:</strong> Plot 42-A, Main Boulevard, Gulberg III, Lahore</p>
            <p><strong>DHA Studio:</strong> Commercial Avenue, Phase 5, Lahore</p>
            <p><strong>Hotline:</strong> {{ store.business.phone }}</p>
            <p><strong>Hours:</strong> {{ store.business.operatingHours }}</p>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Policy Bar -->
      <div class="footer-bottom">
        <div class="d-flex justify-between align-center flex-wrap gap-2">
          <span class="copyright">
            © 2026 Hanzala Car Wash & Detailing Services. All Rights Reserved.
          </span>
          <div class="policy-links">
            <a href="#policy" @click.prevent="$emit('open-policy', 'cancellation')">Cancellation & Refund Policy</a>
            <span>•</span>
            <a href="#policy" @click.prevent="$emit('open-policy', 'privacy')">Privacy Policy</a>
            <span>•</span>
            <a href="#policy" @click.prevent="$emit('open-policy', 'terms')">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { store } from '../store/carWashStore';

defineEmits(['navigate', 'open-booking', 'open-account', 'open-admin', 'open-policy', 'select-service']);
</script>

<style scoped>
.site-footer {
  background: #090b0e;
  border-top: 1px solid var(--border-light);
  padding: 4.5rem 0 2rem;
  color: var(--text-secondary);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.brand-icon {
  width: 38px;
  height: 38px;
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.car-mini-svg {
  width: 24px;
  height: 24px;
}

.footer-logo-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #fff;
  display: block;
  line-height: 1;
}

.footer-logo-sub {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.social-links-row {
  display: flex;
  gap: 0.75rem;
}

.social-icon {
  width: 36px;
  height: 36px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: var(--transition);
}

.social-icon:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.footer-heading {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.25rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-links a {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.footer-links a:hover {
  color: var(--primary);
  padding-left: 4px;
}

.contact-details p {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.contact-details strong {
  color: var(--text-secondary);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
  font-size: 0.82rem;
  color: var(--text-muted);
}

.policy-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.policy-links a {
  color: var(--text-muted);
}

.policy-links a:hover {
  color: var(--primary);
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
