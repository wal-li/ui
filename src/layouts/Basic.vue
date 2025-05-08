<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import Sidebar from '@/components/Sidebar.vue';
import Button from '@/components/Button.vue';
import GiftIcon from '@/icons/GiftIcon.vue';
import NavIcon from '@/icons/NavIcon.vue';
import { PATHS } from '@/constants';
import { routes } from '@/routes';

const route = useRoute();
const sidebarToggle = ref(false);

const selectedRoutes = computed(() => {
  return routes[0].children;
});
</script>

<template>
  <div class="flex items-start">
    <Sidebar
      class="flex flex-col w-64 min-h-screen p-1 shrink-0 border-r border-border transition-all"
      v-model="sidebarToggle"
    >
      <RouterLink
        v-for="currentRoute in selectedRoutes"
        :class="`h-10 leading-5 p-2.5 text-sm hover:bg-surface rounded-lg flex items-center gap-2.5 border border-background ${
          route.path === currentRoute.path ? 'bg-surface' : 'border-background'
        }`"
        :to="currentRoute.path"
      >
        <component v-if="currentRoute.icon" :is="currentRoute.icon" class="w-5 h-5" />
        <span>{{ currentRoute.label }}</span>
      </RouterLink>
    </Sidebar>

    <div class="grow w-full overflow-hidden">
      <!-- app bar -->
      <div class="h-10 flex items-center p-1">
        <Button size="sm" variant="foreground" ghosted>
          <NavIcon class="w-5 h-5" />
        </Button>
      </div>

      <div class="max-w-12xl mx-auto p-6 pb-0">
        <RouterView />
      </div>
    </div>
  </div>
  <!-- <div class="max-w-12xl mx-auto p-6 pb-0"></div> -->
</template>
