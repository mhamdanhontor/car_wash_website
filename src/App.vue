<template>
  <div class="app-root">
    <!-- VIEW 1: FULL ADMIN & STAFF OPERATIONS DASHBOARD -->
    <div v-if="viewMode === 'admin'" class="admin-view-wrapper">
      <AdminDashboard @exit-to-site="viewMode = 'public'" />
    </div>

    <!-- VIEW 2: PUBLIC WEBSITE & CUSTOMER EXPERIENCE -->
    <div v-else class="public-view-wrapper">
      <!-- Site Header Navigation -->
      <HeaderNav 
        :current-view="currentSection"
        @navigate="scrollToSection"
        @open-booking="openBookingWizard()"
        @open-account="showAccountModal = true"
        @open-admin="viewMode = 'admin'"
      />

      <main>
        <!-- Hero Section matching Mockup -->
        <HeroSection 
          @open-booking="openBookingWizard()" 
          @navigate="scrollToSection" 
        />

        <!-- Value Proposition 4-Pill Bar -->
        <ValueProps 
          @open-loyalty="showAccountModal = true"
        />

        <!-- Our Car Wash Services Section -->
        <ServicesSection 
          @select-service="handleSelectService"
        />

        <!-- Select Your Vehicle Type Section -->
        <VehicleSelector 
          @book-category="handleBookCategory"
        />

        <!-- Loyalty Rewards Banner -->
        <LoyaltyBanner 
          @open-loyalty="showAccountModal = true"
        />

        <!-- Why Choose Hanzala Car Wash (5 Pillars) -->
        <WhyChooseUs />

        <!-- Before & After Detailing Transformations Gallery -->
        <BeforeAfterGallery 
          @book-service="handleSelectService"
        />

        <!-- Customer Reviews & Trust Section -->
        <ReviewsSection />

        <!-- Location, Operating Hours & FAQ Accordion -->
        <LocationAndHours />
      </main>

      <!-- Footer Section -->
      <FooterSection 
        @navigate="scrollToSection"
        @open-booking="openBookingWizard()"
        @open-account="showAccountModal = true"
        @open-admin="viewMode = 'admin'"
        @open-policy="openPolicyModal"
        @select-service="handleSelectService"
      />

      <!-- Floating WhatsApp Quick Button -->
      <FloatingWhatsApp />

      <!-- Mobile Quick Floating Sticky Bar -->
      <div class="mobile-sticky-bottom-bar d-none-desktop">
        <button class="mobile-bar-btn" @click="openBookingWizard()">
          <span class="bar-icon">⚡</span>
          <span>Book Wash</span>
        </button>
        <button class="mobile-bar-btn" @click="showAccountModal = true">
          <span class="bar-icon">👤</span>
          <span>My Passes</span>
        </button>
        <button class="mobile-bar-btn" @click="viewMode = 'admin'">
          <span class="bar-icon">⚙️</span>
          <span>Staff Ops</span>
        </button>
      </div>
    </div>

    <!-- MODAL 1: MULTI-STEP ONLINE BOOKING WIZARD -->
    <BookingWizardModal 
      v-if="showBookingModal"
      :preselected-service-id="wizardServiceId"
      :preselected-category-id="wizardCategoryId"
      @close="showBookingModal = false"
      @open-account="showAccountModal = true"
      @booking-confirmed="onBookingConfirmed"
    />

    <!-- MODAL 2: CUSTOMER SELF-SERVICE PORTAL -->
    <CustomerPortalModal 
      v-if="showAccountModal"
      @close="showAccountModal = false"
      @open-booking="openBookingWizard()"
    />

    <!-- MODAL 3: POLICIES & TERMS MODAL -->
    <PolicyModal 
      v-if="showPolicyModal"
      :initial-tab="policyInitialTab"
      @close="showPolicyModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { store } from './store/carWashStore';

// Components
import HeaderNav from './components/HeaderNav.vue';
import HeroSection from './components/HeroSection.vue';
import ValueProps from './components/ValueProps.vue';
import ServicesSection from './components/ServicesSection.vue';
import VehicleSelector from './components/VehicleSelector.vue';
import LoyaltyBanner from './components/LoyaltyBanner.vue';
import WhyChooseUs from './components/WhyChooseUs.vue';
import BeforeAfterGallery from './components/BeforeAfterGallery.vue';
import ReviewsSection from './components/ReviewsSection.vue';
import LocationAndHours from './components/LocationAndHours.vue';
import FooterSection from './components/FooterSection.vue';
import FloatingWhatsApp from './components/FloatingWhatsApp.vue';

// Modals
import BookingWizardModal from './components/BookingWizardModal.vue';
import CustomerPortalModal from './components/CustomerPortalModal.vue';
import PolicyModal from './components/PolicyModal.vue';
import AdminDashboard from './components/AdminDashboard.vue';

// Navigation & View state
const viewMode = ref('public'); // 'public' | 'admin'
const currentSection = ref('home');

// Modals state
const showBookingModal = ref(false);
const showAccountModal = ref(false);
const showPolicyModal = ref(false);
const policyInitialTab = ref('cancellation');

// Wizard pre-selection arguments
const wizardServiceId = ref('full');
const wizardCategoryId = ref('sedan');

function scrollToSection(secId) {
  currentSection.value = secId;
  const el = document.getElementById(secId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function openBookingWizard(serviceId = 'full', categoryId = 'sedan') {
  wizardServiceId.value = serviceId;
  wizardCategoryId.value = categoryId;
  showBookingModal.value = true;
}

function handleSelectService(serviceId) {
  openBookingWizard(serviceId, wizardCategoryId.value);
}

function handleBookCategory(catId) {
  openBookingWizard(wizardServiceId.value, catId);
}

function openPolicyModal(tabName = 'cancellation') {
  policyInitialTab.value = tabName;
  showPolicyModal.value = true;
}

function onBookingConfirmed(bookingRecord) {
  console.log("Confirmed booking in app:", bookingRecord.id);
}
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.public-view-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Mobile sticky bottom quick bar */
.mobile-sticky-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 18, 24, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 1rem;
  z-index: 900;
}

.mobile-bar-btn {
  background: transparent;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  font-size: 0.72rem;
  font-weight: 600;
}

.mobile-bar-btn:hover, .mobile-bar-btn:active {
  color: var(--primary);
}

.bar-icon {
  font-size: 1.15rem;
}

@media (min-width: 993px) {
  .d-none-desktop {
    display: none !important;
  }
}
</style>
