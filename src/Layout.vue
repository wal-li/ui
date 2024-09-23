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
  // {
  //   section: 'Fundamental',
  //   label: 'Charts',
  //   url: '/',
  //   command: handleRouter,
  //   icon: 'chart-bar',
  // },
  {
    section: 'Fundamental',
    label: 'Colors',
    url: '/',
    command: handleRouter,
    icon: 'palette',
  },
  {
    section: 'Fundamental',
    label: 'Icons',
    url: '/icons',
    command: handleRouter,
    icon: 'face-smile',
  },
  {
    section: 'Fundamental',
    label: 'SVG',
    url: '/svg',
    command: handleRouter,
    icon: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7.45 14.65 18.25 2.05 23.65.25 21.85 5.65 9.25 16.45C11.05 18.25 11.05 20.05 12.85 18.25 12.85 20.05 14.65 21.85 12.85 21.85A2.556 2.556 90 0111.05 23.65 9 9 90 007.45 18.25Q6.55 18.07 6.55 19.15T3.85 21.49 2.41 20.05 4.75 17.35 5.65 16.45A9 9 90 00.25 12.85 2.556 2.556 90 012.05 11.05C2.05 9.25 3.85 11.05 5.65 11.05 3.85 12.85 5.65 12.85 7.45 14.65M18.25 2.05 18.25 5.65 21.85 5.65 20.05 3.85 18.25 2.05Z" /></svg>',
  },
  {
    section: 'Fundamental',
    label: 'Size',
    url: '/size',
    command: handleRouter,
    icon: 'arrows-h',
  },
  {
    label: 'Components',
  },
  {
    section: 'Components',
    label: 'Headings',
    url: '/headings',
    command: handleRouter,
    icon: '<svg viewBox="0 0 20 20" fill="none"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1 3 1 17M1 10 10 10M10 3 10 17M14 8 19 3 19 17"/></svg>',
  },
  {
    section: 'Components',
    label: 'Buttons',
    url: '/buttons',
    command: handleRouter,
    icon: 'clone',
  },
  {
    section: 'Components',
    label: 'Inputs',
    url: '/inputs',
    command: handleRouter,
    icon: '<svg viewBox="0 0 18 18" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M1 2 17 2 17 15 1 15ZM4 5 7 5M5.5 5 5.5 12M4 12 7 12" /></svg>',
  },
  {
    label: 'Combination',
  },
  {
    section: 'Combination',
    label: 'Form',
    url: '/form',
    command: handleRouter,
    icon: '<svg fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 10h6m-6 4h6M6.996 10h1m-1 4h1M4 4h16c2 0 3 1 3 3v10c0 2-1 3-3 3H4c-2 0-3-1-3-3V7c0-2 1-3 3-3Z"/></svg>',
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
        <svg class="w-6 h-6" viewBox="0 0 24 24">
          <path
            d="M12 0Q0 0 0 13 0 24 12 24T24 12 12 0ZM5 5 7 5 19 17 19 19 17 19 5 7ZM19 5 19 7 15 11 13 9 17 5ZM12 4 14 6 12 8 10 6ZM10 14 13 17 13 19 10 19ZM5 9 8 12 8 19 5 19ZM20 12 18 14 16 12 18 10Z"
            fill="currentColor"
          />
        </svg>
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
