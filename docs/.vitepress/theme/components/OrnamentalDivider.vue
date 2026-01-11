<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div class="ornamental-divider" :class="size || 'md'">
    <img src="/divider.svg" alt="" aria-hidden="true" />
  </div>
</template>
