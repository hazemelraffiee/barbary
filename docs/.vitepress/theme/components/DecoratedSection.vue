<script setup lang="ts">
defineProps<{
  title?: string
  pattern?: 'subtle' | 'none'
}>()
</script>

<template>
  <section class="decorated-section" :class="pattern ? `pattern-${pattern}` : ''">
    <div class="corner corner-top-right"></div>
    <div class="corner corner-top-left"></div>
    <h3 v-if="title" class="section-title">{{ title }}</h3>
    <slot />
    <div class="corner corner-bottom-right"></div>
    <div class="corner corner-bottom-left"></div>
  </section>
</template>
