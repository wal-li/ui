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
      class="absolute w-10 h-full block border border-secondary-300 dark:border-secondary-700"
      :style="{ backgroundColor: model }"
    ></label>
    <input
      class="border-none w-10 h-full absolute opacity-0"
      type="color"
      :modelValue="formattedColor"
      @input="updateValue"
    />
    <input
      class="block border border-secondary-300 pl-12 pr-3 py-2 outline-0 w-full bg-white text-sm dark:bg-black dark:border-secondary-700 dark:outline-0"
      type="text"
      v-model="model"
    />
  </div>
</template>
