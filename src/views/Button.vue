<script setup>
import Button from '../components/Button.vue';
import ArrowRightCircleIcon from '../icons/ArrowRightCircleIcon.vue';
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl leading-8 font-bold tracking-wider">Original</h2>
      </div>

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

    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl leading-8 font-bold tracking-wider">Compact</h2>
      </div>

      <Playground id="def-text-button">
        <Button label="Button" />
      </Playground>

      <Playground id="def-icon-text-button">
        <Button label="Button" :icon="ArrowRightCircleIcon" />
      </Playground>

      <Playground id="def-icon-button">
        <Button :icon="ArrowRightCircleIcon" />
      </Playground>

      <Playground id="def-outline-primary-text-button">
        <Button label="Button" outlined />
      </Playground>

      <Playground id="def-secondary-text-button">
        <Button label="Button" variant="secondary" />
      </Playground>

      <Playground id="def-outline-secondary-text-button">
        <Button label="Button" variant="secondary" outlined />
      </Playground>
    </div>
  </div>
</template>
