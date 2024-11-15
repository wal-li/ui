<script setup>
import { ref, watch, onMounted, shallowRef, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// import Dashboard from './dashboard/Dashboard.vue';
import Heading from './heading/Heading.vue';
import Sidebar from './sidebar/Sidebar.vue';
import StopIcon from './icons/StopIcon.vue';
import DocumentIcon from './icons/DocumentIcon.vue';
import H1Icon from './icons/H1Icon.vue';
import PuzzlePieceIcon from './icons/PuzzlePieceIcon.vue';
import PencilSquareIcon from './icons/PencilSquareIcon.vue';
import Bars3Icon from './icons/Bars3Icon.vue';
import ClipboardDocumentIcon from './icons/ClipboardDocumentIcon.vue';
import PaintBrushIcon from './icons/PaintBrushIcon.vue';
import StarIcon from './icons/StarIcon.vue';
import Theme from './theme/theme.vue';
import SunIcon from './icons/SunIcon.vue';
import MoonIcon from './icons/MoonIcon.vue';

const router = useRouter();
const route = useRoute();

function handleRouter(item) {
  router.push(item.url);
}

const sideMenuItems = [
  {
    section: 'Welcome',
    label: 'Welcome',
    url: '/',
    command: handleRouter,
    icon: StarIcon,
  },
  {
    label: 'Components',
  },
  {
    section: 'Components',
    label: 'Button',
    url: '/button',
    command: handleRouter,
    icon: StopIcon,
  },
  {
    section: 'Components',
    label: 'Heading',
    url: '/heading',
    command: handleRouter,
    icon: H1Icon,
  },
  {
    section: 'Components',
    label: 'Icons',
    url: '/icons',
    command: handleRouter,
    icon: PuzzlePieceIcon,
  },
  {
    section: 'Components',
    label: 'Input',
    url: '/input',
    command: handleRouter,
    icon: PencilSquareIcon,
  },
  {
    section: 'Components',
    label: 'Sidebar',
    url: '/sidebar',
    command: handleRouter,
    icon: Bars3Icon,
  },
  {
    section: 'Components',
    label: 'Toast',
    url: '/toast',
    command: handleRouter,
    icon: ClipboardDocumentIcon,
  },
  {
    label: 'Fundamental',
  },
  {
    section: 'Fundamental',
    label: 'Colors',
    url: '/colors',
    command: handleRouter,
    icon: PaintBrushIcon,
  },

  {
    section: 'Fundamental',
    label: 'SVG',
    url: '/svg',
    command: handleRouter,
  },
  {
    section: 'Fundamental',
    label: 'Size',
    url: '/size',
    command: handleRouter,
  },

  {
    section: 'Components',
    label: 'Dialog',
    url: '/dialog',
    command: handleRouter,
  },

  {
    label: 'Combination',
  },
  {
    section: 'Combination',
    label: 'Form',
    url: '/form',
    command: handleRouter,
  },
];

const currentLabel = computed(() => {
  return sideMenuItems.filter((i) => i.url === route.path)[0]?.label;
});
</script>

<template>
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
      class="fixed w-[--sidebar-width] left-[--sidebar-offset] top-0 h-full transition-all z-20 bg-background border-r border-secondary overflow-x-hidden p-1 z-30"
    >
      <div class="min-h-full flex flex-col">
        <template v-for="item in sideMenuItems">
          <Transition :name="ready ? 'slideUp' : ''" v-if="!item.command && !item.url">
            <label v-if="!isShort" class="text-muted text-xs font-medium leading-4 p-3 mb-1">{{ item.label }}</label>
          </Transition>

          <a
            v-else
            :class="`w-full text-sm leading-4 p-2.5 rounded cursor-pointer overflow-hidden mb-1 ${
              item.url === route.path ? 'font-bold bg-secondary' : 'hover:bg-secondary'
            }`"
            @click="item.command(item)"
          >
            <div class="w-[--sidebar-base] flex items-center gap-2.5">
              <component class="w-5 h-5" :is="item.icon || DocumentIcon" :outlined="!(item.url === route.path)" />
              <span class="w-0 whitespace-nowrap">{{ item.label }}</span>
            </div>
          </a>
        </template>
      </div>
    </div>

    <!-- backdrop -->
    <Transition :name="ready ? 'fade' : ''">
      <label v-if="isFloat" class="fixed top-0 left-0 w-full h-full z-10 bg-zinc-950/50" @click="toggle"></label>
    </Transition>

    <!-- main -->
    <main class="pl-[--sidebar-padding] w-full min-h-full transition-all">
      <!-- topbar -->
      <div class="p-2 flex items-center gap-2 text-sm sticky top-0 z-20 bg-background">
        <button
          class="text-sm leading-4 font-medium p-1.5 hover:bg-secondary text-foreground rounded inline-flex items-center gap-2"
          @click="toggle"
        >
          <Bars3Icon class="w-5 h-5" />
        </button>

        <h1>{{ currentLabel }}</h1>

        <div class="flex-1"></div>

        <Theme v-slot="{ toggle, value }">
          <button
            class="text-sm leading-4 font-medium p-1.5 hover:bg-secondary text-foreground rounded inline-flex items-center gap-2"
            @click="toggle"
          >
            <SunIcon class="w-5 h-5" v-if="value === 'dark'" />
            <MoonIcon class="w-5 h-5" v-else />
          </button>
        </Theme>
      </div>

      <!-- content -->
      <div class="px-4 pb-4">
        <RouterView></RouterView>
      </div>
    </main>
  </Sidebar>
</template>
