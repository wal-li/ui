<script setup>
defineProps(['label', 'helperText', 'helperClass']);

window.walli ??= {};
window.walli.cid ??= 0;
const id = `field-${++window.walli.cid}`;
</script>

<template>
  <div class="flex flex-col gap-2">
    <slot name="label" v-bind="{ id }">
      <label :for="id" class="text-sm leading-4 font-semibold" v-if="label">{{ label }}</label>
    </slot>
    <slot name="content" v-bind="{ id }">
      <div class="flex items-start gap-2">
        <slot v-bind="{ id }"></slot>
      </div>
    </slot>
    <slot name="helper" v-bind="{ id, helperText, helperClass }">
      <div v-if="helperText" :class="`text-xs ${helperClass}`">{{ helperText }}</div>
    </slot>
  </div>
</template>
