<template>
  <header class="site-header" ref="headerRef">
    <!-- Top Announcement Bar -->
    <div class="top-announcement" v-if="store.business.announcement">
      <div class="header-inner d-flex justify-between align-center">
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
      <div class="header-inner nav-container">
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

        <!-- Desktop Navigation Links with Dropdown for clean aesthetic -->
        <ul class="nav-links d-none-mobile">
          <li>
            <a 
              href="#home" 
              @click.prevent="handleLinkClick('home')" 
              :class="{ active: currentView === 'home' }"
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              @click.prevent="handleLinkClick('services')"
              :class="{ active: currentView === 'services' }"
            >
              Services
            </a>
          </li>
          <li>
            <a 
              href="#vehicles" 
              @click.prevent="handleLinkClick('vehicles')"
              :class="{ active: currentView === 'vehicles' }"
            >
              Vehicle Types
            </a>
          </li>

          <!-- Explore Dropdown (Neat & Clean even on max width) -->
          <li 
            class="nav-dropdown-wrapper"
            @mouseenter="dropdownOpen = true"
            @mouseleave="dropdownOpen = false"
          >
            <button 
              type="button"
              class="dropdown-trigger-btn"
              :class="{ active: dropdownOpen }"
              @click="dropdownOpen = !dropdownOpen"
              aria-haspopup="true"
              :aria-expanded="dropdownOpen"
            >
              <span>Explore</span>
              <svg 
                class="dropdown-chevron" 
                :class="{ 'rotate-180': dropdownOpen }"
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2.5"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <transition name="dropdown-fade">
              <div class="nav-dropdown-menu" v-if="dropdownOpen">
                <div class="dropdown-pointer"></div>
                <div class="dropdown-content">
                  <a 
                    href="#gallery" 
                    class="dropdown-item" 
                    @click.prevent="handleDropdownSelect('gallery')"
                  >
                    <span class="dropdown-item-icon">✨</span>
                    <div class="dropdown-item-text">
                      <span class="item-title">Before & After Gallery</span>
                      <span class="item-desc">High-definition detailing transformations</span>
                    </div>
                  </a>

                  <a 
                    href="#reviews" 
                    class="dropdown-item" 
                    @click.prevent="handleDropdownSelect('reviews')"
                  >
                    <span class="dropdown-item-icon">⭐</span>
                    <div class="dropdown-item-text">
                      <span class="item-title">Customer Reviews</span>
                      <span class="item-desc">4.9/5 Rating from verified drivers</span>
                    </div>
                  </a>

                  <a 
                    href="#why-us" 
                    class="dropdown-item" 
                    @click.prevent="handleDropdownSelect('why-us')"
                  >
                    <span class="dropdown-item-icon">🛡️</span>
                    <div class="dropdown-item-text">
                      <span class="item-title">Why Choose Us</span>
                      <span class="item-desc">5 Pillars of luxury automotive care</span>
                    </div>
                  </a>

                  <a 
                    href="#loyalty" 
                    class="dropdown-item" 
                    @click.prevent="handleLoyaltyClick"
                  >
                    <span class="dropdown-item-icon">🎁</span>
                    <div class="dropdown-item-text">
                      <span class="item-title">Loyalty & Rewards</span>
                      <span class="item-desc">Earn wash points & exclusive VIP passes</span>
                    </div>
                  </a>

                  <a 
                    href="#contact" 
                    class="dropdown-item" 
                    @click.prevent="handleDropdownSelect('contact')"
                  >
                    <span class="dropdown-item-icon">📍</span>
                    <div class="dropdown-item-text">
                      <span class="item-title">Location & Hours</span>
                      <span class="item-desc">Main Boulevard Gulberg III & DHA Phase 5</span>
                    </div>
                  </a>

                  <div class="dropdown-divider"></div>

                  <a 
                    href="#policies" 
                    class="dropdown-item" 
                    @click.prevent="handlePolicyClick"
                  >
                    <span class="dropdown-item-icon">📜</span>
                    <div class="dropdown-item-text">
                      <span class="item-title">Customer Guarantee & Policies</span>
                      <span class="item-desc">Transparent cancellation & refund terms</span>
                    </div>
                  </a>
                </div>
              </div>
            </transition>
          </li>
        </ul>

        <!-- Right Side Actions -->
        <div class="nav-actions">
          <!-- My Account / Customer Portal -->
          <button class="btn btn-gold-outline btn-sm" @click="$emit('open-account')" title="View Pass, Bookings & Loyalty">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="d-none-xs">My Account</span>
          </button>

          <!-- Admin & Staff Portal Button with Badge -->
          <button class="btn btn-outline btn-sm staff-badge-btn" @click="$emit('open-admin')" title="Access Staff Operations & Management">
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
          <button class="btn btn-primary btn-sm d-none-mobile cta-book-btn" @click="$emit('open-booking')">
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
        <li><a href="#vehicles" @click="handleMobileNav('vehicles')">Vehicle Types</a></li>
        <li><a href="#gallery" @click="handleMobileNav('gallery')">Before & After Gallery</a></li>
        <li><a href="#reviews" @click="handleMobileNav('reviews')">Customer Reviews</a></li>
        <li><a href="#why-us" @click="handleMobileNav('why-us')">Why Choose Us</a></li>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { store } from '../store/carWashStore';

const props = defineProps({
  currentView: {
    type: String,
    default: 'home'
  }
});

const emit = defineEmits(['navigate', 'open-booking', 'open-account', 'open-admin', 'open-policy']);

const headerRef = ref(null);
const dropdownOpen = ref(false);
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

function handleLinkClick(sec) {
  dropdownOpen.value = false;
  emit('navigate', sec);
}

function handleDropdownSelect(sec) {
  dropdownOpen.value = false;
  emit('navigate', sec);
}

function handleLoyaltyClick() {
  dropdownOpen.value = false;
  emit('open-account');
}

function handlePolicyClick() {
  dropdownOpen.value = false;
  emit('open-policy', 'guarantee');
}

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

// Close dropdown on click outside
function handleClickOutside(event) {
  if (headerRef.value && !headerRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
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
  width: 100%;
}

.top-announcement {
  background: linear-gradient(90deg, #1c212c 0%, #262118 50%, #1c212c 100%);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  padding: 0.35rem 0;
  font-size: 0.8rem;
  color: var(--primary-light);
  width: 100%;
}

/* Full Width Fluid Nav Container */
.header-inner {
  width: 100%;
  max-width: 1720px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(1.25rem, 3.5vw, 3.5rem);
  padding-right: clamp(1.25rem, 3.5vw, 3.5rem);
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
  width: 100%;
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
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  padding: 0.35rem 0;
  transition: color 0.2s ease;
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

/* Dropdown Wrapper & Trigger */
.nav-dropdown-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown-trigger-btn {
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  border: 1px solid transparent;
  transition: var(--transition);
}

.dropdown-trigger-btn:hover,
.dropdown-trigger-btn.active {
  color: var(--primary);
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.2);
}

.dropdown-chevron {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Dropdown Menu Popup */
.nav-dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  background: rgba(18, 22, 30, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: var(--radius-lg);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(245, 158, 11, 0.15);
  padding: 0.6rem;
  z-index: 1000;
}

.dropdown-pointer {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: #12161e;
  border-top: 1px solid rgba(245, 158, 11, 0.3);
  border-left: 1px solid rgba(245, 158, 11, 0.3);
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-md);
  transition: background 0.2s ease, transform 0.2s ease;
  text-decoration: none;
}

.dropdown-item:hover {
  background: rgba(245, 158, 11, 0.12);
  transform: translateX(3px);
}

.dropdown-item-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-light);
}

.dropdown-item-text {
  display: flex;
  flex-direction: column;
}

.item-title {
  color: var(--text-primary);
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.25;
}

.dropdown-item:hover .item-title {
  color: var(--primary);
}

.item-desc {
  color: var(--text-muted);
  font-size: 0.73rem;
  line-height: 1.2;
}

.dropdown-divider {
  height: 1px;
  background: var(--border-light);
  margin: 0.35rem 0;
}

/* Dropdown Animation */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
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

.cta-book-btn {
  font-weight: 700;
  padding: 0.55rem 1.15rem;
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
