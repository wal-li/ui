<script setup lang="ts">
import ArrowRightCircleIcon from '../icons/ArrowRightCircleIcon.vue';
import Popper from '../popper/Popper.vue';
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="menubar">
      <!-- MENUBAR -->
      <div
        class="outline outline-1 -outline-offset-1 outline-secondary rounded-lg p-2 flex items-center gap-2 text-sm top-0 z-10 bg-background"
      >
        <!-- OUTLINE SECONDARY BUTTON -->
        <button
          class="text-sm leading-4 font-medium p-1.5 rounded inline-flex items-center gap-1.5 text-foreground hover:bg-secondary"
        >
          <ArrowRightCircleIcon class="w-5 h-5" />
        </button>
        <!-- END OUTLINE SECONDARY BUTTON -->

        <!-- OUTLINE SECONDARY BUTTON -->
        <button
          class="text-sm leading-4 font-medium p-1.5 rounded inline-flex items-center gap-1.5 text-foreground hover:bg-secondary"
        >
          <span class="inline-block p-0.5">Button</span>
        </button>
        <!-- END OUTLINE SECONDARY BUTTON -->

        <!-- DROPDOWN -->
        <Popper class="inline-block" v-slot="{ isShow, toggle }">
          <button
            class="text-sm leading-4 font-medium p-1.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
            @click="toggle"
          >
            <span class="inline-block p-0.5">Dropdown</span>
          </button>
          <Transition name="fade">
            <div class="fixed z-30 w-full h-full top-0 left-0 overflow-hidden" v-if="isShow" @click.self="toggle">
              <!-- main -->
              <div
                class="absolute top-[--popper-top] left-[--popper-left] bottom-[--popper-bottom] right-[--popper-right] bg-background text-foreground max-w-96 h-min rounded-lg p-4 prose border"
              >
                content
              </div>
            </div>
          </Transition>
        </Popper>
        <!-- END DROPDOWN -->
      </div>
      <!-- END MENUBAR -->
    </Playground>
  </div>
</template>
