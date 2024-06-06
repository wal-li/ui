<script setup>
import Tag from 'primevue/tag';

defineProps(['value']);
</script>
<template>
  <div class="flex gap-2">
    <Tag v-for="item in value" :key="item" :value="item"></Tag>
  </div>
</template>
