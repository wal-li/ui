<script setup>
import { ref } from 'vue';
import Popper from '../popper/Popper.vue';

const dropdownRef = ref();

defineExpose({
  toggle() {
    dropdownRef.value.toggle();
  },
});
</script>

<template>
  <Popper ref="dropdownRef" v-slot="{ isShow, toggle }">
    <slot name="controller" v-bind="{ isShow, toggle }"></slot>

    <Transition name="fade">
      <div class="fixed z-30 w-full h-full top-0 left-0 overflow-hidden" v-if="isShow" @click.self="toggle">
        <!-- main -->
        <div
          class="absolute top-[--popper-top] left-[--popper-left] bottom-[--popper-bottom] right-[--popper-right] bg-background text-foreground max-w-96 h-min rounded-lg p-4 prose border"
        >
          <slot v-bind="{ isShow, toggle }"></slot>
        </div>
      </div>
    </Transition>
  </Popper>
</template>
