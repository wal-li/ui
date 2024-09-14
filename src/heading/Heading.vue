<script setup>
defineProps({
  level: {
    default: 1,
  },
});

const fontSizes = {
  1: 'text-2xl',
  2: 'text-xl',
  3: 'text-lg',
  4: 'text-base',
  5: 'text-sm',
  6: 'text-xs',
};
</script>

<template>
  <component :is="`h${level}`" :class="`${fontSizes[level]} font-semibold mb-4`"><slot></slot></component>
</template>
