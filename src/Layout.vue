<script setup>
import { ref, watch, onMounted, shallowRef } from 'vue';
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

const router = useRouter();
const route = useRoute();

function handleRouter(item) {
  router.push(item.url);
}

const sideMenuItems = [
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
      class="w-[--sidebar-width] left-[--sidebar-offset] top-0 h-full fixed transition-all z-20 bg-background border-r border-secondary overflow-hidden flex flex-col p-1"
    >
      <template v-for="item in sideMenuItems">
        <Transition :name="ready ? 'slideUp' : ''" v-if="!item.command && !item.url">
          <label v-if="!isShort" class="text-muted text-xs font-medium leading-4 p-3 mb-1">{{ item.label }}</label>
        </Transition>

        <a
          v-else
          :class="`w-full text-sm leading-4 p-3 rounded cursor-pointer overflow-hidden mb-1 ${
            item.url === route.path ? 'font-bold bg-secondary' : 'hover:bg-secondary'
          }`"
          @click="item.command(item)"
        >
          <div class="w-[--sidebar-base] flex items-center gap-3">
            <component class="w-4 h-4" :is="item.icon || DocumentIcon" :outlined="!(item.url === route.path)" />
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
