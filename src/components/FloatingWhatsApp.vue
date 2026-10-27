<template>
  <div class="whatsapp-floating-wrapper">
    <a 
      :href="whatsappUrl" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="whatsapp-btn pulse-glow"
      aria-label="Chat with Hanzala Car Wash on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" class="wa-icon">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.67 4.24 3.75.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/>
      </svg>
      <span class="wa-tooltip d-none-mobile">Chat on WhatsApp</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store/carWashStore';

const whatsappUrl = computed(() => {
  const phone = store.business.whatsapp.replace(/[^0-9]/g, '');
  const text = encodeURIComponent("Hello Hanzala Car Wash! I would like to inquire about booking a wash/detailing service.");
  return `https://wa.me/${phone}?text=${text}`;
});
</script>

<style scoped>
.whatsapp-floating-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 950;
}

.whatsapp-btn {
  width: 56px;
  height: 56px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
  position: relative;
  transition: var(--transition);
}

.whatsapp-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.7);
}

.wa-icon {
  width: 32px;
  height: 32px;
}

.wa-tooltip {
  position: absolute;
  right: 68px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  opacity: 0;
  transform: translateX(10px);
  transition: var(--transition);
}

.whatsapp-btn:hover .wa-tooltip {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 640px) {
  .whatsapp-floating-wrapper {
    bottom: 20px;
    right: 20px;
  }
  .whatsapp-btn {
    width: 50px;
    height: 50px;
  }
}
</style>
