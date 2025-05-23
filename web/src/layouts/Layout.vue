<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { ROUTE_PATHS } from '@/constants';
import Sidebar from '@/components/ui/Sidebar.vue';
import HomeIcon from '@/icons/HomeIcon.vue';
import ArrowRightEndOnRectangleIcon from '@/icons/ArrowRightEndOnRectangleIcon.vue';
import ArrowDownOnSquareIcon from '@/icons/ArrowDownOnSquareIcon.vue';
import GiftIcon from '@/icons/GiftIcon.vue';
import Bars3Icon from '@/icons/Bars3Icon.vue';
import Button from '@/components/ui/Button.vue';

const route = useRoute();
const sidebarState = ref(false);

const NAVS = [
  {
    path: ROUTE_PATHS.HOME,
    label: 'Home',
    icon: HomeIcon,
  },
  {
    path: ROUTE_PATHS.BUTTON,
    label: 'Button',
    icon: ArrowDownOnSquareIcon,
  },
  {
    path: ROUTE_PATHS.ICON,
    label: 'Icon',
    icon: GiftIcon,
  },
  {
    path: ROUTE_PATHS.INPUT,
    label: 'Input',
    icon: ArrowRightEndOnRectangleIcon,
  },
];
</script>

<template>
  <div class="flex items-start">
    <Sidebar
      class="flex flex-col w-64 min-h-screen p-1 shrink-0 border-r border-border transition-all bg-background z-40"
      v-model="sidebarState"
    >
      <RouterLink
        v-for="nav in NAVS"
        :class="`h-10 leading-5 p-2.5 text-sm hover:bg-surface rounded-lg flex items-center gap-2.5 border border-background ${
          route.path === nav.path ? 'bg-surface' : 'border-background'
        }`"
        :to="nav.path"
      >
        <component
          v-if="nav.icon"
          :is="nav.icon"
          class="w-5 h-5"
          :outlined="route.path !== nav.path"
        />
        <span>{{ nav.label }}</span>
      </RouterLink>
    </Sidebar>

    <label
      @click="sidebarState = !sidebarState"
      v-if="sidebarState"
      class="lg:hidden fixed top-0 left-0 w-screen h-screen bg-foreground/30 z-30"
    ></label>

    <div class="grow w-full overflow-hidden max-w-12xl mx-auto p-6 pb-0">
      <div class="lg:hidden">
        <Button @click="sidebarState = !sidebarState">
          <Bars3Icon size="sm" class="w-5 h-5 -mx-0.5" />
        </Button>
      </div>

      <RouterView />
    </div>
  </div>
</template>
