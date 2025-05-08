<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

const sidebarToggle = ref(false);
</script>

<template>
  <div class="flex overflow-hidden">
    <Sidebar class="w-32 bg-surface h-screen border transition-all" v-model="sidebarToggle" side="left">
      <button @click="sidebarToggle = !sidebarToggle">Sidebar</button>
    </Sidebar>
    <main class="grow">
      <button @click="sidebarToggle = !sidebarToggle">Toggle</button>
    </main>
  </div>
</template>
