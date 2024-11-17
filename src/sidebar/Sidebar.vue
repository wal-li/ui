<script setup>
/**
 * # Sidebar
 *
 * ## States:
 *
 * ![./sidebar-state.drawio.png](State Diagram)
 *
 * - types: `static`, `hidden`, `float`.
 * - size: `full`, `short`.
 *
 * ## CSS Variables:
 *
 * --sidebar-base: Base width of sidebar.
 * --sidebar-width: Current width of sidebar.
 * --sidebar-offset: Current base offset of sidebar.
 * --sidebar-padding: Main content padding.
 * --sidebar-float: 100% when float, otherwise width.
 */
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const LG_WIDTH = 1024; // pixel
const BASE_WIDTH = 16; // rem
const BASE_ICON = 3; // rem
const ICO_SM_STATES = [
  ['static', 'short'],
  ['static', 'full'],
];
const DEF_SM_STATES = [
  ['hidden', 'full'],
  ['float', 'full'],
];
const ICO_LG_STATES = [
  ['static', 'short'],
  ['static', 'full'],
];
const DEF_LG_STATES = [
  ['static', 'full'],
  ['hidden', 'full'],
];

/**
 * - icon: if exists, enable ico mode, else def mode.
 * - sm: sm state changes `[[from_type, from_size], [to_type, to_size]]`.
 * - lg: ls state changes `[[from_type, from_size], [to_type, to_size]]`.
 */
const props = defineProps(['width', 'icon', 'sm', 'lg']);

const boolState = ref(false);
const ready = ref(false);
const isTop = ref(true);

const windowSize = ref('sm');
const states = reactive({
  sm: [
    ['hidden', 'full'],
    ['hidden', 'full'],
  ],
  lg: [
    ['hidden', 'full'],
    ['hidden', 'full'],
  ],
});

const sidebarWidth = ref(BASE_WIDTH);
const iconWidth = ref(BASE_ICON);

// computed
const isClosed = computed(() => (isSmallWindow.value ? !boolState.value : boolState.value));

const cssVariables = computed(() => {
  const type = states[windowSize.value][boolState.value ? 1 : 0][0];
  const size = states[windowSize.value][boolState.value ? 1 : 0][1];

  const width = size === 'short' ? iconWidth.value : sidebarWidth.value;

  return [
    `--sidebar-base: ${sidebarWidth.value}rem`,
    `--sidebar-width: ${width}rem`,
    `--sidebar-offset: ${type === 'hidden' ? -width : 0}rem`,
    `--sidebar-padding: ${type === 'static' ? width : 0}rem`,
    `--sidebar-float: ${type === 'float' ? '100%' : width + 'rem'}`,
  ].join('; ');
});

const isFloat = computed(() => {
  const type = states[windowSize.value][boolState.value ? 1 : 0][0];
  return type === 'float';
});

const isShort = computed(() => {
  const size = states[windowSize.value][boolState.value ? 1 : 0][1];
  return size === 'short';
});

// init
function init() {
  const propWidth = parseInt(props.width);
  const propIcon = parseInt(props.icon);

  // default width
  if (!isNaN(propWidth)) {
    sidebarWidth.value = propWidth;
  }

  // icon mode
  if (!isNaN(propIcon)) {
    iconWidth.value = propIcon;
  }

  // sm states
  if (Array.isArray(props.sm)) {
    states.sm = props.sm;
  } else {
    states.sm = props.icon ? ICO_SM_STATES : DEF_SM_STATES;
  }

  // lg states
  if (Array.isArray(props.lg)) {
    states.lg = props.lg;
  } else {
    states.lg = props.icon ? ICO_LG_STATES : DEF_LG_STATES;
  }

  nextTick(() => {
    ready.value = true;
  });
}

// binding methods
function toggle() {
  boolState.value = !boolState.value;
}

// resize window
function windowResize() {
  if (window.innerWidth >= LG_WIDTH) {
    windowSize.value = 'lg';
  } else {
    windowSize.value = 'sm';
  }
}

// scroll event
function scrolling() {
  if (window.scrollY < 48) {
    isTop.value = true;
  } else {
    isTop.value = false;
  }
}

onMounted(() => {
  init();
  windowResize();
  scrolling();

  window.addEventListener('resize', windowResize);
  window.addEventListener('scroll', scrolling);
});

onUnmounted(() => {
  window.removeEventListener('resize', windowResize);
  window.removeEventListener('scroll', scrolling);
});

watch(
  () => [props.icon, props.width, props.sm, props.lg],
  () => {
    init();
  },
);

watch(
  () => isFloat.value,
  () => {
    if (isFloat.value) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  },
);
</script>

<template>
  <div :style="cssVariables">
    <slot v-bind="{ ready, isShort, isFloat, isTop, toggle }"></slot>
  </div>
</template>
