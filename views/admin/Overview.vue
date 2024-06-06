<script setup>
import { useGlobalStore } from '../../stores/global.js';
import { ADMIN_OVERVIEW_PATH } from '../../constants.js';

const globalStore = useGlobalStore();

globalStore.addresses = [{ label: 'Overview', route: ADMIN_OVERVIEW_PATH }];
</script>

<template>Overview</template>
