<script setup lang="ts">
import { type PropType } from 'vue';

const SIZES = {
  xs: 'text-xs h-6 px-1.5',
  sm: 'text-sm h-8 px-2',
  base: 'text-base h-10 px-3',
};

defineProps({
  size: {
    type: String as PropType<keyof typeof SIZES>,
    default: 'base',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  outlined: {
    type: Boolean,
  },
});
</script>

<template>
  <button
    :class="`cursor-pointer ${(SIZES as any)[size]} ${
      outlined !== undefined && outlined !== false ? 
        `border border-${variant} text-${variant} hover:bg-${variant} hover:text-${variant}-contrast` 
      : `bg-${variant} text-${variant}-contrast`}`"
  >
    <slot></slot>
  </button>
</template>
