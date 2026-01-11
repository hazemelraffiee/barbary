<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div class="teacher-avatar" :class="size || 'md'">
    <img src="/teacher-avatar.svg" alt="صورة المعلم" />
  </div>
</template>

<style scoped>
.teacher-avatar {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.teacher-avatar img {
  filter: drop-shadow(0 4px 12px rgba(146, 64, 14, 0.15));
  transition: transform 0.3s ease;
}

.teacher-avatar:hover img {
  transform: scale(1.02);
}

.teacher-avatar.sm img { width: 120px; height: 120px; }
.teacher-avatar.md img { width: 180px; height: 180px; }
.teacher-avatar.lg img { width: 240px; height: 240px; }
</style>
