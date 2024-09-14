<script setup>
import Input from '../input/Input.vue';

const SIZES = ['small', 'normal', 'large'];
</script>

<template>
  <div class="flex flex-col gap-4">
    <Input v-for="size of SIZES" :size="size" modelValue="Lorem ipsum" />
  </div>
</template>
