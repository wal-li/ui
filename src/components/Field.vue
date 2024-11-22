<script setup>
defineProps(['label']);

window.walli ??= {};
window.walli.cid ??= 0;
const id = `field-${++window.walli.cid}`;
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-sm leading-4 font-medium" v-if="label">{{ label }}</label>
    <div class="flex gap-2">
      <slot v-bind="{ id }"></slot>
    </div>
  </div>
</template>
