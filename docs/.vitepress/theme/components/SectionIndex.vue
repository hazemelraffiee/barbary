<script setup lang="ts">
interface Section {
  id: string
  title: string
  description: string
  icon?: string
}

defineProps<{
  sections: Section[]
}>()

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="section-index">
    <div class="section-index-grid">
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        class="section-card"
        :style="{ '--delay': `${index * 0.08}s` }"
        @click="scrollToSection(section.id)"
      >
        <div class="card-decoration"></div>
        <div class="card-content">
          <span v-if="section.icon" class="card-icon">{{ section.icon }}</span>
          <h4 class="card-title">{{ section.title }}</h4>
          <p class="card-description">{{ section.description }}</p>
        </div>
        <div class="card-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.section-index {
  margin: 1.5rem 0;
}

.section-index-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.section-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, rgba(254, 247, 237, 0.9) 0%, rgba(250, 248, 245, 0.9) 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  text-align: right;
  direction: rtl;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: cardFadeIn 0.5s ease-out backwards;
  animation-delay: var(--delay);
  width: 100%;
  font-family: inherit;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--color-gold) 0%, var(--color-gold-light) 50%, var(--color-gold) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(146, 64, 14, 0.15);
  border-color: var(--color-gold);
  background: linear-gradient(135deg, rgba(254, 247, 237, 1) 0%, rgba(255, 255, 255, 1) 100%);
}

.section-card:hover .card-decoration {
  opacity: 1;
}

.section-card:active {
  transform: translateY(-2px);
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-icon {
  display: inline-block;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  filter: grayscale(0.2);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.section-card:hover .card-icon {
  transform: scale(1.15);
  filter: grayscale(0);
}

.card-title {
  margin: 0 0 0.375rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-brown-deep);
  transition: color 0.3s ease;
  line-height: 1.4;
}

.section-card:hover .card-title {
  color: var(--color-gold);
}

.card-description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.card-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.section-card:hover .card-arrow {
  background: var(--color-gold);
  color: white;
  transform: translateX(-4px);
}

/* Dark mode */
.dark .section-card {
  background: linear-gradient(135deg, rgba(36, 28, 20, 0.9) 0%, rgba(46, 36, 26, 0.9) 100%);
  border-color: #3d2914;
}

.dark .section-card:hover {
  background: linear-gradient(135deg, rgba(46, 36, 26, 1) 0%, rgba(56, 44, 32, 1) 100%);
  border-color: var(--color-gold);
}

.dark .card-title {
  color: var(--color-gold);
}

.dark .section-card:hover .card-title {
  color: var(--color-gold-light);
}

.dark .card-arrow {
  background: rgba(61, 41, 20, 0.8);
  color: var(--vp-c-text-2);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .section-index-grid {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 1rem 1.25rem;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-description {
    font-size: 0.85rem;
  }
}
</style>
