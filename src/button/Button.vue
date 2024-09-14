<script setup>
defineProps({
  severity: {
    default: 'primary',
    type: String,
  },
  size: {
    default: 'normal',
    type: String,
  },
  outlined: {
    default: false,
    type: Boolean,
  },
  rounded: {
    default: false,
    type: Boolean,
  },
});

const SIZES = {
  small: 'px-2 py-[calc(0.375rem+2px)] text-xs leading-none',
  normal: 'px-[calc(0.75rem+1px)] py-2.5 text-xs font-semibold leading-normal',
  large: 'px-3.5 py-[calc(0.625rem+0.5px)] font-semibold text-sm leading-normal',
};
</script>

<template>
  <button
    :class="`${SIZES[size]} ${
      outlined
        ? `text-${severity} border border-${severity} hover:bg-${severity}/10`
        : `bg-${severity} text-white dark:text-black`
    } ${rounded ? 'rounded-full' : ''} uppercase`"
  >
    <slot />
  </button>
</template>
