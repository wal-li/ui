<script setup>
defineProps({
  severity: {
    default: 'primary',
  },
});
</script>

<template>
  <div>
    <button
      :class="`px-4 py-2.5 text-xs font-semibold bg-${severity} text-white uppercase leading-normal dark:text-white`"
    >
      <slot />
    </button>
  </div>
</template>
