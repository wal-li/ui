<script setup>
const props = defineProps({
  type: {
    default: 'text',
  },
  name: {},
  id: {},
  size: {
    default: 'normal',
  },
});
const model = defineModel();

const SIZES = {
  small: 'px-2 py-1 text-xs leading-none',
  normal: 'px-3 py-2 text-sm',
  large: 'px-3 py-2 text-base',
};
</script>

<template>
  <input
    :class="`${SIZES[size]} block border border-secondary-300  outline-0 w-full bg-white focus:outline-1  dark:bg-black dark:border-secondary-700 dark:outline-0`"
    :id="id"
    :type="type"
    :name="name"
    v-model="model"
  />
</template>
