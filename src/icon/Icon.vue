<script setup>
import { computed } from 'vue';
const props = defineProps(['data', 'name']);

const content = computed(() => {
  return props.data;
});
</script>

<template>
  <i v-if="name" :class="`pi pi-${name}`"></i>
  <span class="w-[1em] h-[1em] inline-block align-middle" v-else v-html="content"></span>
</template>
