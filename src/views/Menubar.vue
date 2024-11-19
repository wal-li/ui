<script setup lang="ts">
import Button from '../components/Button.vue';
import ArrowRightCircleIcon from '../icons/ArrowRightCircleIcon.vue';
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="menubar">
      <!-- MENUBAR -->
      <div
        class="outline outline-1 -outline-offset-1 outline-secondary rounded-lg p-2 flex items-center text-sm top-0 z-10 bg-background"
      >
        <Button size="sm" variant="secondary" :icon="ArrowRightCircleIcon" ghosted />
        <Button size="sm" variant="secondary" label="Button" ghosted />
      </div>
      <!-- END MENUBAR -->
    </Playground>
  </div>
</template>
