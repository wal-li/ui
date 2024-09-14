<script setup>
const props = defineProps(['label', 'name']);

const id = (props.name ? `${props.name}-` : '') + crypto.randomUUID().split('-')[0];
</script>

<template>
  <div>
    <label class="uppercase text-xs tracking-wider leading-normal mb-2 block" v-if="label" :for="id">{{ label }}</label>
    <slot v-bind="{ id }"></slot>
  </div>
</template>
