<script setup>
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="heading-1">
      <h1 class="text-3xl leading-9 font-bold tracking-wider">
        Heading 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h1>
    </Playground>
    <Playground id="heading-2">
      <h2 class="text-2xl leading-8 font-bold tracking-wider">
        Heading 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h2>
    </Playground>
    <Playground id="heading-3">
      <h3 class="text-xl leading-7 font-bold tracking-wider">
        Heading 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h3>
    </Playground>
    <Playground id="heading-4">
      <h4 class="text-lg leading-6 font-bold tracking-wider">
        Heading 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h4>
    </Playground>
    <Playground id="heading-5">
      <h5 class="text-sm leading-5 font-bold tracking-wider">
        Heading 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h5>
    </Playground>
    <Playground id="heading-6">
      <h6 class="text-xs leading-4 font-bold tracking-wider">
        Heading 6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h6>
    </Playground>
  </div>
</template>
