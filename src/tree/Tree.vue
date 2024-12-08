<script setup>
import { computed, ref } from 'vue';

const props = defineProps(['value']);

const levels = ref({});

function visit(parentId, level = 0) {
  const children = props.value.filter((item) => item.parent == parentId);
  for (const child of children) levels.value[child.id] = level;
  return children.map((item) => [item, ...(item.active ? visit(item.id, level + 1) : [])]).flat();
}

const sortedTree = computed(() => {
  levels.value = {};

  return visit(null);
});
</script>

<template>
  <div v-for="item in sortedTree">
    <slot v-bind="{ item, level: levels[item.id] }"></slot>
  </div>
</template>
