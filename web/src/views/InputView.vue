<script setup lang="ts">
import Input from '@/components/ui/Input.vue';
import ViewSource from '@/components/web/ViewSource.vue';
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-4xl font-bold">Input</h1>

    <Input />

    <ViewSource name="input" />
  </div>
</template>
