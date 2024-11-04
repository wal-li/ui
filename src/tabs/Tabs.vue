<script setup>
import { ref, useSlots } from 'vue';

const slots = useSlots();
const currentTab = ref(Object.keys(slots)[0]);
</script>

<template>
  <div class="flex border-b">
    <button
      v-for="(_, name) in $slots"
      :key="name"
      :class="`text-sm border-b -mb-[1px] px-4 font-semibold py-2 ${
        currentTab === name ? 'text-foreground border-primary' : 'text-muted'
      }`"
      @click="currentTab = name"
    >
      {{ name }}
    </button>
  </div>
  <slot :name="currentTab"></slot>
</template>
