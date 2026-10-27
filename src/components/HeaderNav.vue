<template>
  <header class="site-header">
    <!-- Top Announcement Bar -->
    <div class="top-announcement" v-if="store.business.announcement">
      <div class="container d-flex justify-between align-center">
        <span class="announcement-text">{{ store.business.announcement }}</span>
        <div class="top-contact d-none-mobile">
          <span>📞 {{ store.business.phone }}</span>
          <span class="divider">|</span>
          <span>🕒 {{ store.business.operatingHours.split(':')[1] || '8 AM - 10 PM' }}</span>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <nav class="main-navbar">
      <div class="container nav-container">
        <!-- Logo -->
        <a href="#home" class="brand-logo" @click.prevent="$emit('navigate', 'home')">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" class="car-svg">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/>
              <circle cx="7.5" cy="14.5" r="1.5"/>
              <circle cx="16.5" cy="14.5" r="1.5"/>
            </svg>
          </div>
          <div class="logo-text">
            <span class="logo-title">Hanzala</span>
            <span class="logo-sub">Car Wash</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <ul class="nav-links d-none-mobile">
          <li><a href="#home" @click.prevent="$emit('navigate', 'home')" :class="{ active: currentView === 'home' }">Home</a></li>
          <li><a href="#services" @click.prevent="$emit('navigate', 'services')">Services</a></li>
          <li><a href="#book" @click.prevent="$emit('open-booking')">Book Appointment</a></li>
          <li><a href="#gallery" @click.prevent="$emit('navigate', 'gallery')">Gallery</a></li>
          <li><a href="#reviews" @click.prevent="$emit('navigate', 'reviews')">Reviews</a></li>
          <li><a href="#about" @click.prevent="$emit('navigate', 'about')">About</a></li>
          <li><a href="#contact" @click.prevent="$emit('navigate', 'contact')">Contact</a></li>
        </ul>

        <!-- Right Side Actions -->
        <div class="nav-actions">
          <!-- My Account / Customer Portal -->
          <button class="btn btn-gold-outline btn-sm" @click="$emit('open-account')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="d-none-xs">My Account</span>
          </button>

          <!-- Admin & Staff Portal Button with Badge -->
          <button class="btn btn-outline btn-sm staff-badge-btn" @click="$emit('open-admin')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span class="d-none-sm">Admin & Ops</span>
            <span class="role-chip">{{ currentRoleLabel }}</span>
          </button>

          <!-- Book Now CTA -->
          <button class="btn btn-primary btn-sm d-none-mobile" @click="$emit('open-booking')">
            Book Now
          </button>

          <!-- Mobile Hamburger Menu Button -->
          <button class="mobile-toggle d-block-mobile" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle Navigation">
            <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-drawer" v-if="mobileMenuOpen">
      <ul class="mobile-links">
        <li><a href="#home" @click="handleMobileNav('home')">Home</a></li>
        <li><a href="#services" @click="handleMobileNav('services')">Services & Pricing</a></li>
        <li><a href="#book" @click="handleMobileAction('booking')">Book Appointment</a></li>
        <li><a href="#gallery" @click="handleMobileNav('gallery')">Before & After Gallery</a></li>
        <li><a href="#reviews" @click="handleMobileNav('reviews')">Customer Reviews</a></li>
        <li><a href="#about" @click="handleMobileNav('about')">About Us</a></li>
        <li><a href="#contact" @click="handleMobileNav('contact')">Location & Contact</a></li>
      </ul>
      <div class="mobile-drawer-actions">
        <button class="btn btn-primary btn-block mb-2" @click="handleMobileAction('booking')">
          ⚡ Book Your Wash Now
        </button>
        <button class="btn btn-outline btn-block mb-2" @click="handleMobileAction('account')">
          👤 My Account & Bookings
        </button>
        <button class="btn btn-gold-outline btn-block" @click="handleMobileAction('admin')">
          ⚙️ Admin & Staff Operations Portal
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/carWashStore';

const props = defineProps({
  currentView: {
    type: String,
    default: 'home'
  }
});

const emit = defineEmits(['navigate', 'open-booking', 'open-account', 'open-admin']);

const mobileMenuOpen = ref(false);

const currentRoleLabel = computed(() => {
  const map = {
    customer: 'Customer',
    admin: 'Owner',
    manager: 'Manager',
    receptionist: 'Reception',
    operator: 'Detailer',
    finance: 'Finance'
  };
  return map[store.auth.userRole] || 'Admin';
});

function handleMobileNav(section) {
  mobileMenuOpen.value = false;
  emit('navigate', section);
}

function handleMobileAction(action) {
  mobileMenuOpen.value = false;
  if (action === 'booking') emit('open-booking');
  if (action === 'account') emit('open-account');
  if (action === 'admin') emit('open-admin');
}
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 990;
  background: rgba(15, 18, 24, 0.95);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-light);
}

.top-announcement {
  background: linear-gradient(90deg, #1c212c 0%, #262118 50%, #1c212c 100%);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  padding: 0.35rem 0;
  font-size: 0.8rem;
  color: var(--primary-light);
}

.announcement-text {
  font-weight: 500;
  letter-spacing: 0.02em;
}

.top-contact {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
}

.divider {
  color: var(--border-medium);
}

.main-navbar {
  padding: 0.85rem 0;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand Logo */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.2);
}

.car-svg {
  width: 28px;
  height: 28px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.logo-sub {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
}

.nav-links a {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  padding: 0.25rem 0;
}

.nav-links a:hover, .nav-links a.active {
  color: var(--primary);
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
}

/* Right Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.role-chip {
  background: rgba(245, 158, 11, 0.2);
  color: var(--primary);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.mobile-toggle {
  background: transparent;
  color: var(--text-primary);
  padding: 0.5rem;
  display: none;
}

/* Mobile Drawer */
.mobile-drawer {
  background: var(--bg-card);
  border-top: 1px solid var(--border-light);
  padding: 1.5rem;
}

.mobile-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.mobile-links a {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  display: block;
  padding: 0.5rem 0;
}

.mobile-links a:hover {
  color: var(--primary);
}

.mb-2 {
  margin-bottom: 0.75rem;
}

@media (max-width: 992px) {
  .d-none-mobile {
    display: none !important;
  }
  .d-block-mobile {
    display: flex !important;
  }
}

@media (max-width: 640px) {
  .d-none-sm {
    display: none !important;
  }
  .d-none-xs {
    display: none !important;
  }
}
</style>
