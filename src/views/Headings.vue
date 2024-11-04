<script setup>
import Heading from '../heading/Heading.vue';
</script>

<template>
  <div class="rounded-lg border p-4">
    <label class="mb-2">Level 1</label>
    <h1 class="text-3xl leading-9 font-bold tracking-wider">Heading 1</h1>
  </div>

  <div class="span border rounded-lg p-4 mt-4">
    <p class="mb-4 italic">Legacy Headings</p>

    <label class="mb-2">Level 1</label>
    <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Heading>

    <label class="mb-2">Level 2</label>
    <Heading level="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Heading>

    <label class="mb-2">Level 3</label>
    <Heading level="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Heading>

    <label class="mb-2">Level 4</label>
    <Heading level="4">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Heading>

    <label class="mb-2">Level 5</label>
    <Heading level="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Heading>

    <label class="mb-2">Level 6</label>
    <Heading level="6">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Heading>
  </div>
</template>
