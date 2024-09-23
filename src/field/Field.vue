<script setup>
const props = defineProps(['label', 'name']);

const id = (props.name ? `${props.name}-` : '') + crypto.randomUUID().split('-')[0];
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="uppercase text-xs tracking-wider leading-normal block" v-if="label" :for="id">{{ label }}</label>
    <slot v-bind="{ id }"></slot>
  </div>
</template>
