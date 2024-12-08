<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { Paths } from './constants';

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
import SunIcon from './icons/SunIcon.vue';
import MoonIcon from './icons/MoonIcon.vue';
import DocumentDuplicateIcon from './icons/DocumentDuplicateIcon.vue';

import Theme from './theme/theme.vue';
import CheckCircleIcon from './icons/CheckCircleIcon.vue';
import FolderOpenIcon from './icons/FolderOpenIcon.vue';
import TableCellsIcon from './icons/TableCellsIcon.vue';
import CheckIcon from './icons/CheckIcon.vue';
import EllipsisHorizontalIcon from './icons/EllipsisHorizontalIcon.vue';
import DocumentTextIcon from './icons/DocumentTextIcon.vue';
import Bars2Icon from './icons/Bars2Icon.vue';
import PhotoIcon from './icons/PhotoIcon.vue';
import DocumentCheckIcon from './icons/DocumentCheckIcon.vue';
import HomeIcon from './icons/HomeIcon.vue';
import ArrowTurnDownRightIcon from './icons/ArrowTurnDownRightIcon.vue';
import ArrowPathIcon from './icons/ArrowPathIcon.vue';

const router = useRouter();
const route = useRoute();

function handleRouter(item) {
  router.push(item.url);
}

const sideMenuItems = [
  // Introduce
  {
    label: 'Introduce',
  },
  {
    section: 'Introduce',
    label: 'Overview',
    url: '/',
    command: handleRouter,
    icon: HomeIcon,
  },
  {
    section: 'Introduce',
    label: 'Install',
    url: '/install',
    command: handleRouter,
    icon: StarIcon,
  },
  // Components
  {
    label: 'Components',
  },
  {
    label: 'Button',
    url: '/button',
    command: handleRouter,
    icon: StopIcon,
  },
  {
    label: 'Checkbox',
    url: Paths.CHECKBOX,
    command: handleRouter,
    icon: CheckIcon,
  },
  {
    label: 'Editor',
    url: Paths.EDITOR,
    command: handleRouter,
    icon: DocumentTextIcon,
  },
  {
    label: 'Heading',
    url: '/heading',
    command: handleRouter,
    icon: H1Icon,
  },
  {
    label: 'Icons',
    url: '/icons',
    command: handleRouter,
    icon: PuzzlePieceIcon,
  },
  {
    label: 'Input',
    url: '/input',
    command: handleRouter,
    icon: PencilSquareIcon,
  },
  {
    label: 'Loading',
    url: Paths.LOADING,
    command: handleRouter,
    icon: ArrowPathIcon,
  },
  {
    label: 'Menubar',
    url: Paths.MENUBAR,
    command: handleRouter,
    icon: Bars2Icon,
  },
  {
    label: 'Pagination',
    url: Paths.PAGINATION,
    command: handleRouter,
    icon: EllipsisHorizontalIcon,
  },
  {
    label: 'Popper',
    url: Paths.POPPER,
    command: handleRouter,
    icon: FolderOpenIcon,
  },
  {
    label: 'Sidebar',
    url: '/sidebar',
    command: handleRouter,
    icon: Bars3Icon,
  },
  {
    label: 'Table',
    url: Paths.TABLE,
    command: handleRouter,
    icon: TableCellsIcon,
  },
  {
    label: 'Toast',
    url: '/toast',
    command: handleRouter,
    icon: ClipboardDocumentIcon,
  },
  {
    label: 'Tree',
    url: Paths.TREE,
    command: handleRouter,
    icon: ArrowTurnDownRightIcon,
  },

  // Combination
  {
    label: 'Combination',
  },
  {
    label: 'Form',
    url: Paths.FORM,
    command: handleRouter,
    icon: DocumentCheckIcon,
  },

  // Fundamental
  {
    label: 'Fundamental',
  },
  {
    label: 'Colors',
    url: '/colors',
    command: handleRouter,
    icon: PaintBrushIcon,
  },
  {
    label: 'Sidebar',
    url: Paths.SIDEBAR_FUND,
    command: handleRouter,
    icon: Bars3Icon,
  },
  {
    label: 'Layers',
    url: Paths.LAYERS,
    command: handleRouter,
    icon: DocumentDuplicateIcon,
  },
  {
    label: 'SVG',
    url: '/svg',
    command: handleRouter,
    icon: PhotoIcon,
  },
];

const currentLabel = computed(() => {
  return sideMenuItems.filter((i) => i.url === route.path)[0]?.label;
});
</script>

<template>
  <Sidebar
    class="w-full relative h-[100svh]"
    v-slot="{ ready, isShort, isFloat, isTop, toggle }"
    :lg="[
      ['static', 'full'],
      ['static', 'short'],
    ]"
  >
    <!-- sidebar container -->
    <div
      class="fixed top-0 left-[--sidebar-offset] w-[--sidebar-float] overflow-x-hidden overflow-y-scroll h-full z-20 transition-all scroll-hidden"
      @click.self="toggle"
    >
      <div class="w-[--sidebar-width] min-h-full p-1 bg-background border-r transition-all">
        <template v-for="item in sideMenuItems">
          <Transition :name="ready ? 'slideUp' : ''" v-if="!item.command && !item.url">
            <label v-if="!isShort" class="block text-muted text-xs font-medium leading-4 p-3 mb-1">{{
              item.label
            }}</label>
          </Transition>

          <a
            v-else
            :class="`block w-full text-sm leading-4 p-2.5 rounded cursor-pointer overflow-hidden mb-1 ${
              item.url === route.path ? 'font-bold bg-secondary' : 'hover:bg-secondary'
            }`"
            @click="
              item.command(item);
              isFloat && toggle();
            "
          >
            <div class="w-[calc(var(--sidebar-base)-2rem)] flex items-center gap-2.5">
              <component class="w-5 h-5" :is="item.icon || DocumentIcon" :outlined="!(item.url === route.path)" />
              <span class="w-0 whitespace-nowrap">{{ item.label }}</span>
            </div>
          </a>
        </template>
      </div>
    </div>

    <!-- backdrop -->
    <Transition :name="ready ? 'fade' : ''">
      <label v-if="isFloat" class="fixed top-0 left-0 w-full h-full bg-zinc-950/50 z-10"></label>
    </Transition>

    <!-- main -->
    <main class="pl-[--sidebar-padding] w-full min-h-full transition-all relative">
      <!-- topbar -->
      <div
        :class="`${isTop ? 'static' : 'sticky border-b'} p-2 flex items-center gap-2 text-sm top-0 z-10 bg-background`"
      >
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
