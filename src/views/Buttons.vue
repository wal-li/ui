<script setup>
import Button from '../button/Button.vue';

const SEVERITIES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
</script>

<template>
  <div class="flex gap-2 mb-4">
    <div v-for="severity in SEVERITIES">
      <Button :severity="severity">{{ severity }}</Button>
    </div>
  </div>
</template>
