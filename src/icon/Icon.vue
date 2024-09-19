<script setup>
import { computed } from 'vue';
const props = defineProps(['data']);

const content = computed(() => {
  return props.data;
});
</script>

<template>
  <span class="w-[1em] h-[1em] inline-block align-middle" v-html="content"></span>
</template>
