<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';

defineProps(['sideMenuItems', 'topMenuItems']);

const SIDE_PANEL_WIDTH_KEY = '@wal-li/ui.sidePanelWidth';
const THEME_KEY = '@wal-li/ui.theme';

const sidePanelWidth = ref(parseInt(localStorage.getItem(SIDE_PANEL_WIDTH_KEY) || '256'));
const sidePanelResize = ref(0);
const isMobileScreen = ref(true);
const toggleSideMenu = ref(false);
const toggleConfigMenu = ref(false);
const theme = ref(localStorage.getItem(THEME_KEY) === 'dark');

const sidePanelActualWidth = computed(() => sidePanelWidth.value + sidePanelResize.value);

let lastX = null;

function handleResizeSidePanel(size) {}

function resizeSidePanelDown(e) {
  lastX = e.clientX;
  sidePanelResize.value = 0;
}

function resizeSidePanelMove(e) {
  if (lastX === null) return;

  sidePanelResize.value = e.clientX - lastX;
}

function resizeSidePanelUp(e) {
  if (lastX === null) return;

  sidePanelWidth.value = sidePanelWidth.value + e.clientX - lastX;
  sidePanelResize.value = 0;

  lastX = null;

  localStorage.setItem(SIDE_PANEL_WIDTH_KEY, sidePanelWidth.value);
}

function resizeWindow() {
  isMobileScreen.value = window.innerWidth < 768;
}

function updateTheme() {
  localStorage.setItem(THEME_KEY, theme.value ? 'dark' : 'light');

  const htmlTag = document.getElementsByTagName('html')[0];
  htmlTag.classList.remove('dark', 'light');
  htmlTag.classList.add(theme.value ? 'dark' : 'light');
}

onMounted(() => {
  resizeWindow();
  updateTheme();

  window.addEventListener('mousemove', resizeSidePanelMove);
  window.addEventListener('mouseup', resizeSidePanelUp);
  window.addEventListener('resize', resizeWindow);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', resizeSidePanelMove);
  window.removeEventListener('mouseup', resizeSidePanelUp);
  window.removeEventListener('resize', resizeWindow);
});
</script>

<template>
  <div>
    <div
      class="fixed top-0 left-0 w-full h-16 px-4 flex items-center gap-4 border-b border-stone-300 z-40 bg-white dark:bg-black dark:border-pureblack"
    >
      <button class="leading-normal text-lg" v-if="isMobileScreen" @click="toggleSideMenu = !toggleSideMenu">
        <i class="pi pi-bars"></i>
      </button>
      <div class="flex items-center gap-4 w-full">
        <div class="inline-flex items-center">
          <slot name="logo"></slot>
        </div>

        <a
          class="bg-primary px-2 inline-flex items-center rounded dark:text-black"
          v-for="item in topMenuItems"
          :key="item.key"
          :href="item.url"
          @click="item.command"
          >{{ item.label }}</a
        >
      </div>
      <button class="leading-normal text-lg" @click="toggleConfigMenu = !toggleConfigMenu">
        <i class="pi pi-cog"></i>
      </button>
    </div>
    <div
      class="fixed z-40 top-16 overflow-x-hidden bg-white border-l border-stone-300 w-64 h-[calc(100vh-64px)] transition-all flex flex-col justify-between dark:bg-black dark:border-pureblack"
      :style="{ right: toggleConfigMenu ? '0px' : '-256px' }"
    >
      <div></div>
      <div class="p-4">
        <div class="flex items-center justify-around">
          <input type="checkbox" class="hidden" id="update-theme" @change="updateTheme" v-model="theme" />
          <label class="uppercase text-xs tracking-wider leading-normal" for="update-theme">Light</label>
          <label
            for="update-theme"
            role="checkbox"
            tabindex="0"
            aria-checked="true"
            :class="`relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent rounded-full ${
              theme ? 'bg-primary' : 'bg-stone-200'
            }`"
          >
            <span
              aria-hidden="true"
              class="inline-block rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs"
            >
            </span>
            <span
              aria-hidden="true"
              class="inline-block rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs"
            ></span>
            <span
              aria-hidden="true"
              :class="`inline-block absolute transform transition ease-in-out duration-200 h-5 w-5 rounded-full shadow flex items-center justify-center text-xs ${
                theme ? 'translate-x-full text-primary bg-black' : 'translate-x-0 text-stone-400 bg-white'
              }`"
            ></span>
          </label>
          <label class="uppercase text-xs tracking-wider leading-normal" for="update-theme">Dark</label>
        </div>
      </div>
    </div>
    <div
      class="fixed top-16 overflow-x-hidden bg-white z-40 h-[calc(100vh-64px)] border-r md:border-none transition-all md:transition-none dark:bg-black dark:border-pureblack"
      :style="{
        width: isMobileScreen ? '100%' : sidePanelActualWidth + 'px',
        left: isMobileScreen && !toggleSideMenu ? '-100%' : '0px',
      }"
    >
      <slot name="side-menu">
        <a
          v-for="item in sideMenuItems"
          :key="item.key"
          :class="`block cursor-pointer flex items-center px-4 ${
            item.command || item.url ? 'h-10 text-sm leading-normal' : 'uppercase text-xs uppercase tracking-wider h-16'
          }`"
          :href="item.url"
          @click="item.command"
        >
          <i :class="`pi pi-${item.icon} text-base mr-4`" v-if="item.icon"></i>
          <span>
            {{ item.label }}
          </span>
        </a>
      </slot>
    </div>
    <div
      class="fixed top-16 w-[5px] h-[calc(100vh-64px)] hover:bg-stone-300 cursor-col-resize select-none z-40 dark:hover:bg-pureblack"
      v-if="!isMobileScreen"
      :style="{ left: sidePanelActualWidth + 'px' }"
      @mousedown="resizeSidePanelDown"
    >
      <div class="w-[1px] ml-[2px] h-full bg-stone-300 dark:bg-pureblack"></div>
    </div>
    <div
      class="p-4 mt-16 relative h-[calc(100vh-64px)]"
      :style="{
        marginLeft: isMobileScreen ? '0px' : sidePanelActualWidth + 'px',
      }"
    >
      <Transition>
        <div
          v-if="isMobileScreen && (toggleSideMenu || toggleConfigMenu)"
          @click="
            () => {
              toggleConfigMenu = false;
              toggleSideMenu = false;
            }
          "
          class="fixed top-16 h-[calc(100vh-64px)] bg-[#181818aa] top-0 left-0 w-full h-full"
        ></div>
      </Transition>
      <slot></slot>
    </div>
  </div>
</template>
