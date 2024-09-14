<script setup>
const props = defineProps(['type', 'name', 'id']);
const model = defineModel();
</script>

<template>
  <input
    class="block border border-stone-300 px-3 py-2 outline-0 w-full bg-white focus:outline-1 text-sm dark:bg-black dark:border-stone-700 dark:outline-0"
    :id="id"
    :type="type ?? 'text'"
    :name="name"
    v-model="model"
  />
</template>
