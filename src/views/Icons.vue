<script setup>
import { onMounted, onBeforeMount, ref, shallowRef } from 'vue';
import icons from '../icons';
import { copyToClipboard } from '../utils';

const loadedComponents = shallowRef([]);
const outlined = ref(true);

onBeforeMount(async () => {
  const res = [];
  for (const item of icons) {
    res.push({
      ...item,
      component: (await import(`../icons/${item.componentName}.vue`)).default,
    });
  }
  loadedComponents.value = res;

  console.log(loadedComponents);
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="border border-secondary rounded-lg p-4 sticky top-4 bg-background">
      <button
        :class="`text-sm leading-4 font-medium p-3 ${
          outlined
            ? 'text-foreground outline outline-1 -outline-offset-1 outline-primary hover:bg-primary hover:text-background'
            : 'bg-primary text-primary'
        } rounded inline-flex items-center gap-2`"
        @click="outlined = !outlined"
      >
        {{ outlined ? 'Outlined' : 'Solid' }}
      </button>
    </div>

    <div class="border border-secondary rounded-lg p-4 grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
      <button
        class="flex flex-col items-center justify-center gap-4 hover:bg-secondary cursor-pointer p-4 rounded"
        v-for="item in loadedComponents"
        @click="copyToClipboard(item.componentName)"
      >
        <component class="w-5 h-5 bg-secondary" :is="item.component" :outlined="outlined" />
        <div class="w-full text-center text-xs text-ellipsis overflow-hidden">{{ item.componentName }}</div>
      </button>
    </div>
  </div>
</template>
