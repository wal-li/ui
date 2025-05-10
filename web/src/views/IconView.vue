<script setup>
import { onMounted, onBeforeMount, ref, shallowRef, computed } from 'vue';

import ICONS from '@/icons.json';

import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

const loadedComponents = shallowRef([]);
const outlined = ref(true);
const searchText = ref('');

const filteredComponents = computed(() => {
  return loadedComponents.value.filter((item) => {
    const text = searchText.value.toLowerCase();

    // match name
    if (item.name.toLowerCase().indexOf(text) !== -1) return true;

    // match component name
    if (item.componentName.toLowerCase().indexOf(text) !== -1) return true;

    // match keywords
    if (
      item.keywords?.some(
        (keyword) => keyword.toLowerCase().indexOf(text) !== -1,
      )
    )
      return true;

    return false;
  });
});

onBeforeMount(async () => {
  const res = [];
  for (const name in ICONS) {
    const item = ICONS[name];

    res.push({
      ...item,
      name,
      keywords: item.keywords || [],
      componentName: item.component,
      component: (await import(`@/icons/${item.component}.vue`)).default,
    });
  }
  loadedComponents.value = res;
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-4xl font-bold">Icon</h1>

    <div class="flex gap-2">
      <Input size="sm" v-model="searchText" placeholder="Search icon..." />

      <Button
        size="sm"
        :variant="outlined ? 'none' : 'primary'"
        @click="outlined = false"
        >Solid</Button
      >
      <Button
        size="sm"
        :variant="outlined ? 'primary' : 'none'"
        @click="outlined = true"
        >Outlined</Button
      >
    </div>

    <div class="rounded-lg grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
      <button
        class="flex flex-col items-center justify-center gap-4 cursor-pointer p-4 rounded"
        v-for="item in filteredComponents"
        @click=""
      >
        <component class="w-6 h-6" :is="item.component" :outlined="outlined" />
        <div
          class="w-full text-center text-xs text-ellipsis overflow-hidden select-all"
        >
          {{ item.componentName }}
        </div>
      </button>
    </div>
  </div>
</template>
