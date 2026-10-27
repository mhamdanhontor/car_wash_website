<template>
  <section id="gallery" class="gallery-section">
    <div class="container">
      <div class="section-header text-center">
        <span class="sub-badge">Real Results</span>
        <h2 class="section-title">Before & After Detailing Transformations</h2>
        <p class="section-desc">
          Witness the difference professional paint correction, deep steam cleaning, and ceramic protection make.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="gallery-tabs">
        <button 
          v-for="item in galleryItems" 
          :key="item.id"
          class="tab-btn"
          :class="{ active: activeTab === item.id }"
          @click="activeTab = item.id"
        >
          {{ item.title }}
        </button>
      </div>

      <!-- Active Showcase Transformation Card -->
      <div class="transformation-container glass-panel" v-if="currentItem">
        <div class="comparison-grid">
          <!-- Before Card -->
          <div class="image-box before-box">
            <span class="state-label before-tag">BEFORE</span>
            <img :src="currentItem.beforeImg" :alt="currentItem.title + ' Before'" class="comp-img" />
            <div class="comp-caption">
              <strong>Condition:</strong> {{ currentItem.beforeNotes }}
            </div>
          </div>

          <!-- Divider / Transformation Indicator -->
          <div class="transform-divider">
            <div class="divider-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </div>
          </div>

          <!-- After Card -->
          <div class="image-box after-box">
            <span class="state-label after-tag">AFTER HANZALA DETAILING</span>
            <img :src="currentItem.afterImg" :alt="currentItem.title + ' After'" class="comp-img" />
            <div class="comp-caption">
              <strong>Restoration:</strong> {{ currentItem.afterNotes }}
            </div>
          </div>
        </div>

        <div class="transformation-footer">
          <div>
            <h4 class="text-white">{{ currentItem.vehicle }}</h4>
            <p class="text-gold small mb-0">{{ currentItem.servicePerformed }}</p>
          </div>
          <button class="btn btn-primary btn-sm" @click="$emit('book-service', currentItem.serviceId)">
            Book This Treatment →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

defineEmits(['book-service']);

const activeTab = ref('paint');

const galleryItems = [
  {
    id: 'paint',
    title: 'Paint Correction & Ceramic Coating',
    vehicle: 'Porsche 911 GT3 (Agate Grey Metallic)',
    servicePerformed: 'Multi-stage machine buffing + 6-Month Ceramic Protection',
    serviceId: 'detailing',
    beforeImg: '/images/hero.jpg',
    afterImg: '/images/service-detailing.jpg',
    beforeNotes: 'Severe swirl marks, water etching, and road film oxidation.',
    afterNotes: 'Deep mirror reflection, 95% swirl elimination, and hydrophobic water-beading.'
  },
  {
    id: 'interior',
    title: 'Luxury Leather & Steam Sanitization',
    vehicle: 'Mercedes-Maybach S-Class (Black Nappa)',
    servicePerformed: 'High-suction vacuum, AC vent steam sanitization & leather nourishment',
    serviceId: 'interior',
    beforeImg: '/images/service-exterior.jpg',
    afterImg: '/images/service-interior.jpg',
    beforeNotes: 'Stiff, dusty leather with dust accumulation in perforations and AC vents.',
    afterNotes: 'Supple matte satin finish, UV-protected, and bacterially sterilized.'
  },
  {
    id: 'fullwash',
    title: 'Active Snow Foam & Undercarriage Wash',
    vehicle: 'Mercedes S-Class (Designo Diamond White)',
    servicePerformed: 'Touchless snow foam pre-wash & underbody blast',
    serviceId: 'full',
    beforeImg: '/images/service-full.jpg',
    afterImg: '/images/service-exterior.jpg',
    beforeNotes: 'Heavy road grime, mud splatter in wheel arches, and brake dust.',
    afterNotes: 'Pristine gloss, crystal clear glass, and streak-free finish.'
  }
];

const currentItem = computed(() => {
  return galleryItems.find(g => g.id === activeTab.value) || galleryItems[0];
});
</script>

<style scoped>
.gallery-section {
  padding: 5rem 0;
  background: var(--bg-dark);
}

.gallery-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.tab-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.9rem;
  transition: var(--transition);
}

.tab-btn:hover {
  border-color: var(--primary);
  color: #fff;
}

.tab-btn.active {
  background: var(--primary);
  color: #000;
  border-color: var(--primary);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
}

.transformation-container {
  padding: 2rem;
  border-radius: var(--radius-xl);
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
}

.image-box {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
  background: var(--bg-secondary);
}

.before-box {
  border-color: rgba(239, 68, 68, 0.3);
}

.after-box {
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 0 25px rgba(245, 158, 11, 0.15);
}

.comp-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.state-label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-full);
  z-index: 5;
  letter-spacing: 0.05em;
}

.before-tag {
  background: rgba(239, 68, 68, 0.9);
  color: #fff;
}

.after-tag {
  background: var(--primary-gradient);
  color: #000;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);
}

.comp-caption {
  padding: 1rem 1.25rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
  background: var(--bg-card);
  border-top: 1px solid var(--border-light);
}

.transform-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider-circle {
  width: 48px;
  height: 48px;
  background: var(--bg-card);
  border: 2px solid var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
}

.transformation-footer {
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.small { font-size: 0.85rem; }
.mb-0 { margin-bottom: 0; }

@media (max-width: 900px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  .transform-divider {
    transform: rotate(90deg);
    padding: 1rem 0;
  }
  .comp-img {
    height: 240px;
  }
}
</style>
