<script setup>
const model = defineModel();
</script>

<template>
  <div class="relative">
    <label
      class="absolute w-10 h-full block border border-stone-300 border-r-0"
      :style="{ backgroundColor: model }"
    ></label>
    <input class="border-none w-10 h-full absolute opacity-0" type="color" v-model="model" />
    <input
      class="block border border-stone-300 pl-12 pr-3 py-2 outline-0 w-full bg-white text-sm dark:bg-black dark:border-stone-700 dark:outline-0"
      type="text"
      v-model="model"
    />
  </div>
</template>
