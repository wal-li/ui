<script setup>
import Button from '../button/Button.vue';
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <!-- Text Button -->
    <Playground id="text-button">
      <button class="text-sm leading-4 font-medium p-3 bg-primary text-primary rounded inline-flex items-center gap-2">
        Button
      </button>
    </Playground>

    <!-- Icon with Text Button -->
    <Playground id="icon-text-button">
      <button class="text-sm leading-4 font-medium p-3 bg-primary text-primary rounded inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" class="w-4 h-4">
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
            clip-rule="evenodd"
          />
        </svg>
        Button
      </button>
    </Playground>

    <!-- Icon Button -->
    <Playground id="icon-button">
      <button class="text-sm leading-4 font-medium p-3 bg-primary text-primary rounded inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" class="w-4 h-4">
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </Playground>

    <!-- Outline Button > Primary Button -->
    <Playground id="outline-primary-text-button">
      <button
        class="text-sm leading-4 font-medium p-3 text-foreground outline outline-1 -outline-offset-1 outline-primary hover:bg-primary hover:text-primary rounded inline-flex items-center gap-2"
      >
        Button
      </button>
    </Playground>

    <!-- Secondary Button -->
    <Playground id="secondary-text-button">
      <button
        class="text-sm leading-4 font-medium p-3 text-foreground bg-secondary rounded inline-flex items-center gap-2"
      >
        Button
      </button>
    </Playground>

    <!-- Outline Button > Secondary Button -->
    <Playground id="outline-secondary-text-button">
      <button
        class="text-sm leading-4 font-medium p-3 text-foreground outline outline-1 -outline-offset-1 outline-secondary hover:bg-secondary rounded inline-flex items-center gap-2"
      >
        Button
      </button>
    </Playground>
  </div>
</template>
