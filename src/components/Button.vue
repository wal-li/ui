<script setup>
import { useTheme } from '@/theme';
import Color from '@/views/basic/Color.vue';
import { computed, onMounted } from 'vue';

const props = defineProps({
  size: {
    default: 'base',
  },
  variant: {
    default: 'primary',
  },
  outlined: {
    default: false,
  },
  ghosted: {
    default: false,
  },
});

const SIZES = {
  xs: 'text-xs h-6 px-1.5',
  sm: 'text-sm h-8 px-2',
  base: 'text-base h-10 px-3',
};

const theme = useTheme();

const currentStyles = computed(() => {
  const variantColor = theme.getColor(props.variant);
  return `--color-adaptive: ${theme.adaptColor(variantColor)}`;
});
</script>

<template>
  <button
    :style="currentStyles"
    :class="`cursor-pointer ${
      outlined !== false
        ? `border border-${variant} text-${variant} hover:bg-${variant} hover:text-adaptive`
        : ghosted !== false
        ? `text-${variant} hover:text-foreground hover:bg-${variant}`
        : `bg-${variant} text-adaptive`
    } ${SIZES[size]}`"
  >
    <slot></slot>
  </button>
</template>
