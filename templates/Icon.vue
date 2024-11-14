<script setup>
defineProps(['outlined']);
</script>

<template>
  <template v-if="outlined">
    <!-- outline -->
  </template>
  <template v-else>
    <!-- solid -->
  </template>
</template>
