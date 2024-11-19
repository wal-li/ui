<script setup>
// @todo: remote toggle

import { computed, ref, watch } from 'vue';

const popperRef = ref();
const isShow = ref(false);

let lastPos;
const cssVariables = computed(() => {
  if (!isShow.value || !popperRef.value) return lastPos || '';

  const bbox = popperRef.value?.getBoundingClientRect();

  const left = bbox.left;
  const right = window.innerWidth - bbox.left - bbox.width;
  const top = bbox.top + bbox.height + 4;
  const bottom = window.innerHeight - bbox.top + 4;

  lastPos = [
    ...(left < window.innerWidth / 2 ? [`--popper-left: ${left}px`] : [`--popper-right: ${right}px`]),
    ...(top < window.innerHeight / 2 ? [`--popper-top: ${top}px`] : [`--popper-bottom: ${bottom}px`]),
  ].join('; ');
  return lastPos;
});

function toggle() {
  isShow.value = !isShow.value;
}

watch(
  () => isShow.value,
  () => {
    if (isShow.value) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  },
);
</script>

<template>
  <div :style="cssVariables" ref="popperRef">
    <slot v-bind="{ isShow, toggle }"></slot>
  </div>
</template>
