<script setup>
import EmptyValue from './EmptyValue.vue';

defineProps(['value']);
</script>

<template>
  <span v-if="value">********</span>
  <span v-else><EmptyValue /></span>
</template>
