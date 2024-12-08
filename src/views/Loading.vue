<script setup>
import ArrowPathIcon from '../icons/ArrowPathIcon.vue';
import SpinnerIcon from '../icons/SpinnerIcon.vue';
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
    <Playground id="icon-spinner">
      <ArrowPathIcon class="w-6 h-6 animate-spin" />
    </Playground>

    <Playground id="svg-spinner">
      <SpinnerIcon class="h-6 w-6 animate-spin" />
    </Playground>
  </div>
</template>
