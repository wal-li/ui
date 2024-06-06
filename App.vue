<script setup>
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import ConfirmDialog from 'primevue/confirmdialog';
import DynamicDialog from 'primevue/dynamicdialog';

import { useHttpStore } from './stores/http.js';

const httpStore = useHttpStore();
</script>

<template>
  <Toast position="bottom-right" />
  <ConfirmDialog />
  <DynamicDialog />

  <div class="fixed z-40 right-4 bottom-4 md:right-8 md:bottom-8">
    <ProgressSpinner
      style="width: 32px; height: 32px"
      strokeWidth="4"
      v-if="httpStore.isLoading"
    />
  </div>

  <router-view />
</template>
