<script setup>
import { ref, useSlots } from 'vue';

const slots = useSlots();
const currentTab = ref(Object.keys(slots)[0]);
</script>

<template>
  <div class="flex border-b border-secondary-300">
    <button
      v-for="(_, name) in $slots"
      :key="name"
      :class="`text-xs border-b -mb-[1px] px-3 py-2 ${
        currentTab === name ? 'border-primary text-primary' : 'border-secondary-300'
      }`"
      @click="currentTab = name"
    >
      {{ name }}
    </button>
  </div>
  <slot :name="currentTab"></slot>
</template>
