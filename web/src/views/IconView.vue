<script setup>
import { onMounted, onBeforeMount, ref, shallowRef, computed } from 'vue';

import ICONS from '@/icons.json';

import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

const loadedComponents = shallowRef([]);
const outlined = ref(true);
const searchText = ref('');
const selectedIcon = shallowRef(null);
const selectedSize = ref('base');

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

    <div
      class="rounded-lg grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] pb-18"
    >
      <button
        :class="`flex flex-col items-center justify-center gap-4 cursor-pointer p-4 rounded ${
          selectedIcon === item
            ? 'outline outline-2 -outline-offset-2 outline-foreground'
            : ''
        }`"
        v-for="item in filteredComponents"
        @click="selectedIcon = selectedIcon === item ? null : item"
      >
        <component class="w-6 h-6" :is="item.component" :outlined="outlined" />
        <div class="w-full text-center text-xs text-ellipsis overflow-hidden">
          {{ item.componentName }}
        </div>
      </button>
    </div>

    <div
      class="w-full fixed bottom-0 h-14 z-30 left-0 lg:left-64 bg-background border-t border-border flex items-center px-2 gap-2"
      v-if="selectedIcon"
    >
      <Button
        size="base"
        :variant="selectedSize === 'base' ? 'primary' : 'none'"
        @click="selectedSize = 'base'"
      >
        <component
          class="w-6 h-6 -mx-1"
          :is="selectedIcon.component"
          :outlined="outlined"
        />
      </Button>

      <Button
        size="sm"
        :variant="selectedSize === 'sm' ? 'primary' : 'none'"
        @click="selectedSize = 'sm'"
      >
        <component
          class="w-5 h-5 -mx-0.5"
          :is="selectedIcon.component"
          :outlined="outlined"
        />
      </Button>

      <Button
        size="xs"
        :variant="selectedSize === 'xs' ? 'primary' : 'none'"
        @click="selectedSize = 'xs'"
      >
        <component
          class="w-4 h-4 -mx-0.5"
          :is="selectedIcon.component"
          :outlined="outlined"
        />
      </Button>

      <pre
        class="text-xs font-semibold select-all my-0 border-b border-background before:content-['$'] before:mr-2 px-2"
      >
wui add {{ selectedIcon.name + '-icon' }}</pre
      >

      <pre
        class="text-xs font-semibold select-all my-0 border-b border-background px-2"
      >
&lt;{{ selectedIcon.componentName }} class="{{
          selectedSize === 'base'
            ? 'w-6 h-6'
            : selectedSize === 'sm'
            ? 'w-5 h-5'
            : 'w-4 h-4'
        }}" /&gt;</pre
      >
    </div>
  </div>
</template>
