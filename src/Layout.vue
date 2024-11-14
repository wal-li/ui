<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// import Dashboard from './dashboard/Dashboard.vue';
import Heading from './heading/Heading.vue';
import Sidebar from './sidebar/Sidebar.vue';

const router = useRouter();
const route = useRoute();

const currentItem = ref();

function handleRouter(item) {
  router.push(item.url);
}

const sideMenuItems = ref([
  {
    label: 'Components',
  },

  {
    section: 'Components',
    label: 'Button',
    url: '/button',
    command: handleRouter,
    icon: 'clone',
  },
  {
    section: 'Components',
    label: 'Heading',
    url: '/heading',
    command: handleRouter,
    icon: '<svg viewBox="0 0 20 20" fill="none"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1 3 1 17M1 10 10 10M10 3 10 17M14 8 19 3 19 17"/></svg>',
  },
  {
    section: 'Components',
    label: 'Input',
    url: '/input',
    command: handleRouter,
    icon: '<svg viewBox="0 0 18 18" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M1 2 17 2 17 15 1 15ZM4 5 7 5M5.5 5 5.5 12M4 12 7 12" /></svg>',
  },
  {
    section: 'Components',
    label: 'SideBar',
    url: '/sidebar',
    command: handleRouter,
    icon: 'bars',
  },
  {
    label: '--- END ---',
  },
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
    section: 'Components',
    label: 'Dialog',
    url: '/dialog',
    command: handleRouter,
    icon: 'window-maximize',
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
  <!-- <Dashboard :sideMenuItems="sideMenuItems" :topMenuItems="topMenuItems">
    <template #logo>
      <div class="flex gap-2 items-center text-primary">
        <svg class="w-6 h-6" viewBox="0 0 24 24">
          <path
            d="M12 0Q0 0 0 13 0 24 12 24T24 12 12 0ZM5 5 7 5 11 9 9 11 5 7ZM19 5 19 7 15 11 13 9 17 5ZM12 4 14 6 12 8 10 6ZM5 9 8 12 8 16 11 19 7 19 5 17zM19 9 19 17 17 19 13 19 16 16 16 12zM12 10 14 12 12 18 10 12Z"
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
  </Dashboard> -->

  <Sidebar
    class="w-full relative h-[100svh]"
    v-slot="{ ready, isShort, isFloat, toggle }"
    :lg="[
      ['static', 'full'],
      ['static', 'short'],
    ]"
  >
    <!-- sidebar -->
    <div
      class="w-[--sidebar-width] left-[--sidebar-offset] top-0 h-full fixed transition-all z-20 bg-background border-r border-secondary overflow-hidden flex flex-col p-1"
    >
      <template v-for="item in sideMenuItems">
        <Transition :name="ready ? 'slideUp' : ''" v-if="!item.command && !item.url">
          <label v-if="!isShort" class="text-muted text-xs font-medium leading-4 p-3 mb-1">{{ item.label }}</label>
        </Transition>

        <a
          v-else
          :class="`w-full text-sm leading-4 p-3 rounded cursor-pointer overflow-hidden mb-1 ${
            item.active ? 'font-bold bg-secondary' : 'hover:bg-secondary'
          }`"
          @click="item.command(item)"
        >
          <div class="w-[--sidebar-base] flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" class="w-4 h-4">
              <path
                fill-rule="evenodd"
                d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="w-0">{{ item.label }}</span>
          </div>
        </a>
      </template>
    </div>
    <!-- backdrop -->
    <Transition :name="ready ? 'fade' : ''">
      <label v-if="isFloat" class="absolute top-0 left-0 w-full h-full z-10 bg-zinc-950/50" @click="toggle"></label>
    </Transition>
    <!-- main -->
    <main class="pl-[--sidebar-padding] w-full min-h-full transition-all">
      <div class="p-4">
        <RouterView></RouterView>
      </div>
    </main>
  </Sidebar>
</template>
