<script setup>
import { computed } from 'vue';

const model = defineModel();

const formattedColor = computed(() =>
  (model.value || '')
    .toLowerCase()
    .replace(/[^0-9a-f]/g, '')
    .padEnd(6, '0'),
);

function updateValue(e) {
  model.value = e.target.value;
}
</script>

<template>
  <div class="relative">
    <label
      class="absolute w-10 h-full block border border-secondary-300 dark:border-secondary-700 rounded"
      :style="{ backgroundColor: model }"
    ></label>
    <input
      class="border-none w-10 h-full absolute opacity-0"
      type="color"
      :modelValue="formattedColor"
      @input="updateValue"
    />
    <input
      class="pl-12 block outline outline-1 outline-offset-0 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
      type="text"
      v-model="model"
    />
  </div>
</template>
