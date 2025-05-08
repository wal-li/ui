<script setup>
const props = defineProps({
  component: {
    default: 'input',
  },
  size: {
    default: 'base',
  },
});

const SIZES = {
  xs: 'text-xs h-6 px-1.5',
  sm: 'text-sm h-8 px-2',
  base: 'text-base h-10 px-3',
};
</script>

<template>
  <component :is="component" :class="`border border-border outline-none w-full ${SIZES[size]}`"></component>
</template>
