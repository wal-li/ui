<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  type CSSProperties,
  type Ref,
} from 'vue';

const props = defineProps({
  side: {
    default: 'left',
  },
});

const DEVICES = {
  MOBILE: 'mobile',
  PC: 'pc',
};

const SIDES = {
  LEFT: 'left',
  RIGHT: 'right',
};

/**
 * status [false] + device [mobile] = hidden
 * status [false] + device [pc] = visible
 * status [true] + device [mobile] = float
 * status [true] + device [pc] = hidden
 */
const status = defineModel({ default: false });
const device = ref(DEVICES.MOBILE);
const width = ref(0);
const sidebarRef: Ref<any> = ref();
let breakpointLg = 1024;

const currentStyles = computed<CSSProperties>(() => {
  const result: CSSProperties = {};

  if (device.value === DEVICES.MOBILE) {
    result.position = 'absolute';
    result[props.side === SIDES.LEFT ? 'left' : 'right'] = status.value
      ? '0px'
      : -width.value + 'px';
  } else {
    result.position = 'sticky';
    result.top = '0px';
    result[props.side === SIDES.LEFT ? 'marginLeft' : 'marginRight'] =
      status.value ? -width.value + 'px' : '0px';
  }

  return result;
});

function init() {
  const rootStyles = getComputedStyle(document.documentElement);
  const strBreakpointLg = rootStyles.getPropertyValue('--breakpoint-lg').trim();

  if (strBreakpointLg) {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    breakpointLg =
      parseFloat(strBreakpointLg.replace(/rem$/, '')) * rootFontSize;
  }
}

function resize() {
  if (window.innerWidth < breakpointLg) device.value = DEVICES.MOBILE;
  else device.value = DEVICES.PC;

  width.value = sidebarRef.value.getBoundingClientRect().width;
}

onMounted(() => {
  init();
  resize();

  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<template>
  <div :style="currentStyles" ref="sidebarRef">
    <slot></slot>
  </div>
</template>
