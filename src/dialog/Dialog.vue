<script setup>
import { onMounted, onUnmounted } from 'vue';

defineEmits(['close']);

onMounted(() => {
  document.body.classList.add('overflow-hidden');
});

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
});
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center p-4">
    <div class="absolute bg-black/30 -z-10 top-0 left-0 w-full h-full bg-black/50" @click="$emit('close')"></div>
    <div class="bg-white p-4 max-h-full rounded-lg overflow-auto dark:border dark:border-pureblack dark:bg-black">
      <slot></slot>
    </div>
  </div>
</template>
