<script setup>
import { useTheme } from '@/theme';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  side: {
    default: 'left',
  },
});

const MODES = {
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
  FLOAT: 'float',
};

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
const status = defineModel(false);
const device = ref(DEVICES.MOBILE);
const width = ref(0);
const sidebarRef = ref();
const theme = useTheme();

const currentStyles = computed(() => {
  const result = {};

  if (device.value === DEVICES.MOBILE) {
    result.position = 'absolute';
    result[props.side === SIDES.LEFT ? 'left' : 'right'] = status.value ? '0px' : -width.value + 'px';
  } else {
    result.position = 'sticky';
    result.top = '0px';
    result[props.side === SIDES.LEFT ? 'marginLeft' : 'marginRight'] = status.value ? -width.value + 'px' : '0px';
  }

  return result;
});

function resize() {
  if (window.innerWidth < theme.breakpointLg) device.value = DEVICES.MOBILE;
  else device.value = DEVICES.PC;

  width.value = sidebarRef.value.getBoundingClientRect().width;
}

onMounted(() => {
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
