<script setup>
import CheckIcon from '../icons/CheckIcon.vue';

window.walli ??= {};
window.walli.cid ??= 0;
const id = `cbx-${++window.walli.cid}`;

defineProps(['label', 'type', 'name', 'value']);

const model = defineModel();
</script>

<template>
  <span class="text-sm leading-4 inline-flex items-center">
    <!-- VALUE -->
    <input class="peer hidden" :type="type || 'checkbox'" :id="id" :value="value" :name="name" v-model="model" />
    <!-- END VALUE -->
    <label
      :for="id"
      :class="`inline-block peer-checked:hidden border border-primary w-4 h-4 m-0.5 ${
        type === 'radio' ? 'rounded-full' : 'rounded'
      }`"
    >
    </label>
    <label
      :for="id"
      :class="`hidden peer-checked:inline-block border border-primary bg-primary text-background w-4 h-4 m-0.5 ${
        type === 'radio' ? 'rounded-full' : 'rounded'
      }`"
    >
      <span v-if="type === 'radio'" class="w-3.5 h-3.5 inline-block rounded-full border-2 border-background"></span>
      <CheckIcon v-else class="w-3.5 h-3.5" />
    </label>
    <label :for="id" class="inline-block p-0.5 pl-1.5 select-none" v-if="label">{{ label }}</label>
  </span>
</template>
