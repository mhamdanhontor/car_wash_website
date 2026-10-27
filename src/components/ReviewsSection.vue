<template>
  <section id="reviews" class="reviews-section">
    <div class="container">
      <div class="reviews-header-row">
        <div>
          <span class="sub-badge">Verified Customer Feedback</span>
          <h2 class="section-title">What Our Clients Say</h2>
          <p class="section-desc">
            Over 1,400+ satisfied car enthusiasts trust Hanzala Car Wash with their prized automobiles.
          </p>
        </div>

        <div class="reviews-summary-badge glass-panel">
          <div class="big-rating">4.9</div>
          <div>
            <div class="stars-gold">★★★★★</div>
            <div class="review-sub">Based on verified completed washes</div>
          </div>
          <button class="btn btn-gold-outline btn-sm ml-auto" @click="showWriteModal = true">
            + Write a Review
          </button>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="reviews-grid">
        <div 
          v-for="rev in store.reviews" 
          :key="rev.id"
          class="review-card glass-card"
        >
          <div class="review-top">
            <div class="reviewer-info">
              <div class="reviewer-avatar">
                {{ rev.customerName.split(' ').map(n=>n[0]).join('') }}
              </div>
              <div>
                <h4 class="reviewer-name">{{ rev.customerName }}</h4>
                <div class="reviewer-vehicle">{{ rev.vehicle }} • <span class="text-gold">{{ rev.serviceName }}</span></div>
              </div>
            </div>

            <div class="review-meta text-right">
              <div class="stars-gold">
                <span v-for="i in rev.rating" :key="i">★</span>
              </div>
              <span class="verified-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Verified Wash
              </span>
            </div>
          </div>

          <p class="review-body">
            "{{ rev.comment }}"
          </p>

          <div class="review-date-row">
            <span class="text-muted small">{{ rev.date }}</span>
          </div>

          <!-- Owner / Admin Response (SRS Section 12) -->
          <div v-if="rev.adminResponse" class="admin-response-box">
            <div class="response-header">
              <span class="owner-badge">Hanzala Management Reply</span>
            </div>
            <p class="response-text">{{ rev.adminResponse }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Write Review Modal -->
    <div class="modal-overlay" v-if="showWriteModal" @click.self="showWriteModal = false">
      <div class="modal-content">
        <div class="modal-header d-flex justify-between align-center">
          <h3 class="modal-title">Share Your Wash Experience</h3>
          <button class="close-btn" @click="showWriteModal = false">✕</button>
        </div>

        <form @submit.prevent="submitUserReview" class="modal-body">
          <p class="text-secondary small mb-3">
            In accordance with SRS Section 12, only clients who experienced our car care may leave a verified review.
          </p>

          <div class="form-group mb-3">
            <label class="form-label">Your Name</label>
            <input type="text" v-model="newReview.name" required placeholder="e.g. Tariq Jamil" />
          </div>

          <div class="form-row mb-3">
            <div class="form-group col-6">
              <label class="form-label">Vehicle Make & Model</label>
              <input type="text" v-model="newReview.vehicle" required placeholder="e.g. Honda Civic RS" />
            </div>
            <div class="form-group col-6">
              <label class="form-label">Service Package</label>
              <select v-model="newReview.serviceName">
                <option v-for="s in store.services" :key="s.id" :value="s.name">{{ s.name }}</option>
              </select>
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="form-label">Your Rating</label>
            <div class="rating-picker">
              <span 
                v-for="star in 5" 
                :key="star"
                class="star-pick"
                :class="{ active: newReview.rating >= star }"
                @click="newReview.rating = star"
              >
                ★
              </span>
            </div>
          </div>

          <div class="form-group mb-4">
            <label class="form-label">Review Comments</label>
            <textarea 
              v-model="newReview.comment" 
              rows="3" 
              required
              placeholder="Tell others about the foam quality, staff courtesy, interior steam clean..."
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            Submit Verified Review
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { store, actions } from '../store/carWashStore';

const showWriteModal = ref(false);

const newReview = ref({
  name: '',
  vehicle: '',
  serviceName: 'Full Car Wash',
  rating: 5,
  comment: ''
});

function submitUserReview() {
  if (!newReview.value.name || !newReview.value.comment) return;

  actions.addReview({
    bookingId: `HCW-REV-${Date.now().toString().slice(-4)}`,
    customerName: newReview.value.name,
    rating: newReview.value.rating,
    serviceName: newReview.value.serviceName,
    vehicle: newReview.value.vehicle || 'Customer Vehicle',
    comment: newReview.value.comment
  });

  newReview.value = {
    name: '',
    vehicle: '',
    serviceName: 'Full Car Wash',
    rating: 5,
    comment: ''
  };

  showWriteModal.value = false;
  alert('Thank you! Your verified review has been published.');
}
</script>

<style scoped>
.reviews-section {
  padding: 5rem 0;
  background: var(--bg-primary);
}

.reviews-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3.5rem;
}

.reviews-summary-badge {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.75rem;
  border-radius: var(--radius-xl);
  border-left: 4px solid var(--primary);
}

.big-rating {
  font-family: var(--font-heading);
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
}

.stars-gold {
  color: var(--primary);
  font-size: 1.1rem;
  letter-spacing: 2px;
}

.review-sub {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.ml-auto { margin-left: auto; }

/* Grid */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.review-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
}

.review-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.reviewer-avatar {
  width: 44px;
  height: 44px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--primary);
}

.reviewer-name {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.15rem;
}

.reviewer-vehicle {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.verified-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
  margin-top: 0.35rem;
}

.review-body {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex: 1;
  font-style: italic;
}

.admin-response-box {
  background: var(--bg-secondary);
  border-left: 3px solid var(--primary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
}

.owner-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.response-text {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  line-height: 1.45;
}

/* Modal Form */
.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.35rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.col-6 { flex: 1; }

.star-pick {
  font-size: 1.8rem;
  color: var(--text-dim);
  cursor: pointer;
  transition: var(--transition);
  margin-right: 0.35rem;
}

.star-pick.active {
  color: var(--primary);
}

.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }

@media (max-width: 992px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}
</style>
