<script setup>
import { useGlobalStore } from '../../stores/global';
import { ADMIN_OVERVIEW_PATH } from '../../constants';

const globalStore = useGlobalStore();

globalStore.addresses = [{ label: 'Overview', route: ADMIN_OVERVIEW_PATH }];
</script>

<template>
  <div class="flex items-center justify-center h-96">
    <h1 class="text-3xl font-black text-surface-300">
      Welcome to Walli Dashboard.
    </h1>
  </div>
</template>
