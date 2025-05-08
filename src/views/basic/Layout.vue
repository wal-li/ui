<script setup lang="ts">
import { PATHS } from '@/constants';
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-4xl font-black uppercase">Layout</h1>

    <iframe class="w-full h-92" :src="PATHS.ADMIN_LAYOUT" frameborder="0"></iframe>
  </div>
</template>
