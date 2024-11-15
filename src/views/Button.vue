<script setup>
import Button from '../button/Button.vue';
import ArrowRightCircleIcon from '../icons/ArrowRightCircleIcon.vue';
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <!-- Text Button -->
    <Playground id="text-button">
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
      >
        <span class="inline-block p-0.5">Button</span>
      </button>
    </Playground>

    <!-- Icon with Text Button -->
    <Playground id="icon-text-button">
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
      >
        <ArrowRightCircleIcon class="w-5 h-5" />
        <span class="inline-block p-0.5">Button</span>
      </button>
    </Playground>

    <!-- Icon Button -->
    <Playground id="icon-button">
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
      >
        <ArrowRightCircleIcon class="w-5 h-5" />
      </button>
    </Playground>

    <!-- Outline Button > Primary Button -->
    <Playground id="outline-primary-text-button">
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 text-foreground outline outline-1 -outline-offset-1 outline-primary hover:bg-primary hover:text-background"
      >
        <span class="inline-block p-0.5">Button</span>
      </button>
    </Playground>

    <!-- Secondary Button -->
    <Playground id="secondary-text-button">
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-secondary text-foreground"
      >
        <span class="inline-block p-0.5">Button</span>
      </button>
    </Playground>

    <!-- Outline Button > Secondary Button -->
    <Playground id="outline-secondary-text-button">
      <button
        class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 text-foreground outline outline-1 -outline-offset-1 outline-secondary hover:bg-secondary"
      >
        <span class="inline-block p-0.5">Button</span>
      </button>
    </Playground>
  </div>
</template>
