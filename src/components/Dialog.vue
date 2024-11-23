<script setup>
import { ref } from 'vue';
import XMarkIcon from '../icons/XMarkIcon.vue';
import Popper from '../popper/Popper.vue';

const dialogRef = ref();

defineExpose({
  toggle() {
    dialogRef.value.toggle();
  },
});
</script>

<template>
  <Popper ref="dialogRef" v-slot="{ isShow, toggle }">
    <slot name="controller" v-bind="{ isShow, toggle }"></slot>

    <Transition name="fade">
      <div class="fixed z-30 w-full h-full top-0 left-0 overflow-x-hidden overflow-y-auto bg-zinc-950/50" v-if="isShow">
        <!-- outter -->
        <div class="p-4 min-h-full flex flex-col items-center justify-center" @click.self="toggle">
          <!-- main -->
          <div class="relative bg-background text-foreground w-full max-w-96 h-min rounded-lg p-4 prose border">
            <!-- close button -->
            <button
              class="absolute top-1 right-1 text-sm leading-4 font-medium p-1 rounded inline-flex items-center gap-1.5"
              @click="toggle"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>

            <!-- content -->
            <slot v-bind="{ isShow, toggle }"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Popper>
</template>
