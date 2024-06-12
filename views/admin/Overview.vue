<script setup>
import { useGlobalStore } from '../../stores/global';
import { ADMIN_OVERVIEW_PATH } from '../../constants';

const globalStore = useGlobalStore();

globalStore.addresses = [{ label: 'Overview', route: ADMIN_OVERVIEW_PATH }];
</script>

<template>Overview</template>
