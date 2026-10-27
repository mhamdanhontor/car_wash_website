<template>
  <section class="vehicles-section">
    <div class="container">
      <div class="section-header text-center">
        <span class="sub-badge">Customized Sizing & Care</span>
        <h2 class="section-title">Select Your Vehicle Type</h2>
        <p class="section-desc">
          Pricing and wash durations vary by vehicle size to ensure meticulous attention to every contour.
        </p>
      </div>

      <!-- Vehicle Types Horizontal Grid (Matching Mockup) -->
      <div class="vehicle-types-grid">
        <div 
          v-for="cat in store.vehicleCategories" 
          :key="cat.id"
          class="vehicle-card"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectCat(cat.id)"
        >
          <!-- Vehicle SVG Silhouette Graphic -->
          <div class="vehicle-icon-frame">
            <!-- Compact / Hatchback -->
            <svg v-if="cat.id === 'small'" viewBox="0 0 100 50" class="vehicle-svg">
              <path d="M15,35 L12,28 Q18,20 35,16 L58,16 Q75,18 82,25 L88,32 Q90,36 85,38 L78,38 A8,8 0 0,1 62,38 L38,38 A8,8 0 0,1 22,38 L15,38 Z" fill="currentColor"/>
              <circle cx="30" cy="38" r="6" fill="#111" stroke="#f59e0b" stroke-width="2"/>
              <circle cx="70" cy="38" r="6" fill="#111" stroke="#f59e0b" stroke-width="2"/>
              <path d="M36,20 L56,20 L56,27 L28,27 Z" fill="#222"/>
              <path d="M59,20 L75,26 L59,26 Z" fill="#222"/>
            </svg>

            <!-- Sedan -->
            <svg v-else-if="cat.id === 'sedan'" viewBox="0 0 100 50" class="vehicle-svg">
              <path d="M8,35 L12,28 Q22,25 32,20 L62,20 Q72,25 85,28 L92,35 Q94,38 88,38 L80,38 A8,8 0 0,1 64,38 L36,38 A8,8 0 0,1 20,38 L8,38 Z" fill="currentColor"/>
              <circle cx="28" cy="38" r="6" fill="#111" stroke="#f59e0b" stroke-width="2"/>
              <circle cx="72" cy="38" r="6" fill="#111" stroke="#f59e0b" stroke-width="2"/>
              <path d="M35,22 L48,22 L48,27 L28,27 Z" fill="#222"/>
              <path d="M51,22 L64,22 L68,27 L51,27 Z" fill="#222"/>
            </svg>

            <!-- SUV / Crossover -->
            <svg v-else-if="cat.id === 'suv'" viewBox="0 0 100 50" class="vehicle-svg">
              <path d="M10,35 L12,25 Q18,18 35,15 L70,15 Q82,18 86,26 L92,34 Q94,38 88,38 L80,38 A9,9 0 0,1 62,38 L38,38 A9,9 0 0,1 20,38 L10,38 Z" fill="currentColor"/>
              <circle cx="29" cy="38" r="7" fill="#111" stroke="#f59e0b" stroke-width="2"/>
              <circle cx="71" cy="38" r="7" fill="#111" stroke="#f59e0b" stroke-width="2"/>
              <path d="M35,18 L52,18 L52,26 L26,26 Z" fill="#222"/>
              <path d="M55,18 L76,18 L80,26 L55,26 Z" fill="#222"/>
            </svg>

            <!-- Large SUV (Land Cruiser / Fortuner) -->
            <svg v-else-if="cat.id === 'large_suv'" viewBox="0 0 100 50" class="vehicle-svg">
              <path d="M8,36 L10,24 Q18,14 36,12 L75,12 Q85,14 90,24 L94,34 Q96,38 90,38 L82,38 A9,9 0 0,1 64,38 L36,38 A9,9 0 0,1 18,38 L8,38 Z" fill="currentColor"/>
              <circle cx="27" cy="38" r="7.5" fill="#111" stroke="#f59e0b" stroke-width="2.5"/>
              <circle cx="73" cy="38" r="7.5" fill="#111" stroke="#f59e0b" stroke-width="2.5"/>
              <path d="M36,15 L54,15 L54,24 L25,24 Z" fill="#222"/>
              <path d="M58,15 L80,15 L84,24 L58,24 Z" fill="#222"/>
            </svg>

            <!-- Pickup / Van (Revo / Hiace) -->
            <svg v-else viewBox="0 0 100 50" class="vehicle-svg">
              <path d="M6,36 L8,24 Q16,14 34,14 L56,14 L56,22 L88,22 L94,34 Q96,38 90,38 L82,38 A9,9 0 0,1 64,38 L36,38 A9,9 0 0,1 18,38 L6,38 Z" fill="currentColor"/>
              <circle cx="27" cy="38" r="7.5" fill="#111" stroke="#f59e0b" stroke-width="2.5"/>
              <circle cx="73" cy="38" r="7.5" fill="#111" stroke="#f59e0b" stroke-width="2.5"/>
              <path d="M34,16 L53,16 L53,24 L24,24 Z" fill="#222"/>
            </svg>
          </div>

          <div class="vehicle-info">
            <h4 class="vehicle-title">{{ cat.name }}</h4>
            <div class="vehicle-price">From Rs. {{ cat.startingPrice.toLocaleString() }}</div>
            <p class="vehicle-examples">{{ cat.examples }}</p>
          </div>

          <div class="selected-indicator" v-if="selectedCategory === cat.id">
            <span>Selected ✓</span>
          </div>
        </div>
      </div>

      <!-- Real-time Dynamic Pricing Calculator Bar for Selected Vehicle -->
      <div class="pricing-preview-bar glass-panel mt-4" v-if="currentCat">
        <div class="preview-header">
          <div class="d-flex align-center gap-2">
            <span class="text-gold font-weight-bold">Selected:</span>
            <span class="font-weight-bold text-white">{{ currentCat.name }}</span>
            <span class="badge-tag">Size Factor: {{ currentCat.multiplier }}x</span>
          </div>
          <button class="btn btn-primary btn-sm" @click="$emit('book-category', currentCat.id)">
            Book for this Vehicle Type →
          </button>
        </div>

        <div class="rates-breakdown-grid">
          <div 
            v-for="s in store.services" 
            :key="s.id" 
            class="rate-card"
          >
            <div class="rate-s-name">{{ s.name }}</div>
            <div class="rate-s-price">
              Rs. {{ Math.round(s.basePrice * currentCat.multiplier).toLocaleString() }}
            </div>
            <div class="rate-s-time">{{ s.durationMins }} mins</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/carWashStore';

const emit = defineEmits(['book-category']);

const selectedCategory = ref('sedan');

function selectCat(id) {
  selectedCategory.value = id;
}

const currentCat = computed(() => {
  return store.vehicleCategories.find(c => c.id === selectedCategory.value);
});
</script>

<style scoped>
.vehicles-section {
  padding: 4.5rem 0;
  background: var(--bg-dark);
}

.vehicle-types-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
}

.vehicle-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vehicle-card:hover {
  border-color: rgba(245, 158, 11, 0.4);
  transform: translateY(-4px);
  background: var(--bg-card-hover);
}

.vehicle-card.active {
  border-color: var(--primary);
  background: rgba(245, 158, 11, 0.05);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
}

.vehicle-icon-frame {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #e2e8f0;
}

.vehicle-card.active .vehicle-icon-frame {
  color: var(--primary);
}

.vehicle-svg {
  width: 90px;
  height: 48px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
}

.vehicle-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.35rem;
}

.vehicle-price {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.vehicle-examples {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.selected-indicator {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--primary);
  color: #000;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

/* Pricing Preview Bar */
.pricing-preview-bar {
  padding: 1.25rem 1.75rem;
  margin-top: 2rem;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-light);
}

.badge-tag {
  background: rgba(255, 255, 255, 0.08);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.rates-breakdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.rate-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  text-align: center;
}

.rate-s-name {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.rate-s-price {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary);
}

.rate-s-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}

@media (max-width: 992px) {
  .vehicle-types-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .rates-breakdown-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .vehicle-types-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .rates-breakdown-grid {
    grid-template-columns: 1fr;
  }
}
</style>
