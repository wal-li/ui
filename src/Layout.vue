<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import Dashboard from './dashboard/Dashboard.vue';
import Heading from './heading/Heading.vue';

const router = useRouter();
const route = useRoute();

const currentItem = ref();

function handleRouter(item) {
  router.push(item.url);
}

const sideMenuItems = ref([
  {
    label: 'Fundamental',
  },
  {
    section: 'Fundamental',
    label: 'Charts',
    url: '/',
    command: handleRouter,
    icon: 'chart-bar',
  },
  {
    section: 'Fundamental',
    label: 'Colors',
    url: '/colors',
    command: handleRouter,
    icon: 'palette',
  },
  {
    label: 'Components',
  },
  {
    section: 'Components',
    label: 'Headings',
    url: '/headings',
    command: handleRouter,
    icon: '<svg viewBox="0 0 13.999999 10.000001" class="w-full h-full"><defs id=defs1 /><rect fill=none height=24 id=rect1 width=24 x=-5 y=-7 /><g id=g1 transform=translate(-5,-7)><path fill="currentColor" d="m 11,7 h 2 V 17 H 11 V 13 H 7 v 4 H 5 V 7 h 2 v 4 h 4 z m 6.57,0 C 16.976,7.95 16.066,8.658 15,9 v 1 h 2 v 7 h 2 V 7 Z"id=path1 /></g></svg>',
  },
  {
    section: 'Components',
    label: 'Buttons',
    url: '/buttons',
    command: handleRouter,
    icon: 'clone',
  },
  {
    label: 'Combination',
  },
  {
    section: 'Combination',
    label: 'Form',
    url: '/form',
    command: handleRouter,
    icon: 'calculator',
  },
]);

const topMenuItems = [];

function handleActiveMenuItem() {
  for (const item of sideMenuItems.value) {
    item.active = false;
    if (item.url === route.path) {
      item.active = true;
      currentItem.value = item;
    }
  }
}

watch(
  () => route.path,
  () => {
    handleActiveMenuItem();
  },
);

onMounted(() => {
  handleActiveMenuItem();
});
</script>

<template>
  <Dashboard :sideMenuItems="sideMenuItems" :topMenuItems="topMenuItems">
    <template #logo>
      <div class="flex gap-2 items-center text-primary">
        <i class="pi pi-star-fill text-lg"></i>
        <span class="font-black">@wal-li/ui</span>
      </div>
    </template>

    <div v-if="currentItem">
      <div class="text-xs font-light uppercase mb-2">{{ currentItem.section }}</div>
      <Heading>{{ currentItem.label }}</Heading>

      <RouterView />
    </div>
  </Dashboard>
</template>
