<script setup>
import Button from '../button/Button.vue';
import ArrowRightCircleIcon from '../icons/ArrowRightCircleIcon.vue';
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="text-button">
      <!-- TEXT BUTTON -->
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
      >
        <span class="inline-block p-0.5">Button</span>
      </button>
      <!-- END TEXT BUTTON -->
    </Playground>

    <Playground id="icon-text-button">
      <!-- ICON WITH TEXT BUTTON -->
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
      >
        <ArrowRightCircleIcon class="w-5 h-5" />
        <span class="inline-block p-0.5">Button</span>
      </button>
      <!-- END ICON WITH TEXT BUTTON -->
    </Playground>

    <Playground id="icon-button">
      <!-- ICON BUTTON -->
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
      >
        <ArrowRightCircleIcon class="w-5 h-5" />
      </button>
      <!-- END ICON BUTTON -->
    </Playground>

    <Playground id="outline-primary-text-button">
      <!-- OUTLINE PRIMARY BUTTON -->
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 text-foreground outline outline-1 -outline-offset-1 outline-primary hover:bg-primary hover:text-background"
      >
        <span class="inline-block p-0.5">Button</span>
      </button>
      <!-- END OUTLINE PRIMARY BUTTON -->
    </Playground>

    <Playground id="secondary-text-button">
      <!-- SECONDARY BUTTON -->
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-secondary text-foreground"
      >
        <span class="inline-block p-0.5">Button</span>
      </button>
      <!-- END SECONDARY BUTTON -->
    </Playground>

    <Playground id="outline-secondary-text-button">
      <!-- OUTLINE SECONDARY BUTTON -->
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 text-foreground outline outline-1 -outline-offset-1 outline-secondary hover:bg-secondary"
      >
        <span class="inline-block p-0.5">Button</span>
      </button>
      <!-- END OUTLINE SECONDARY BUTTON -->
    </Playground>
  </div>
</template>
