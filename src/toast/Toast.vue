<script setup>
import { onMounted, onUnmounted, reactive, watch } from 'vue';

defineProps(['transition']);

const model = defineModel();

const queue = reactive([]);

let currentId = 0;
let interval;

function add(value) {
  queue.push({
    value,
    life: 3000,
    id: ++currentId,
    at: +new Date(),
  });
}

function handleQueue() {
  const now = +new Date();

  let i = 0;
  while (i < queue.length) {
    // expired - remove
    if (now - queue[i].at > queue[i].life) {
      const item = queue.splice(i, 1);
      continue;
    }

    i++;
  }
}

onMounted(() => {
  interval = setInterval(handleQueue, 100);
});
onUnmounted(() => {
  clearInterval(interval);
});

watch(
  () => model.value,
  () => {
    if (model.value?.length) {
      // values
      for (const val of model.value) add(val);

      // clear model
      model.value = [];
    }
  },
  {
    deep: true,
  },
);
</script>

<template>
  <div>
    <TransitionGroup :name="transition" v-if="transition">
      <template v-for="item in queue">
        <slot v-bind="{ value: item.value }"></slot>
      </template>
    </TransitionGroup>

    <template v-else v-for="item in queue">
      <slot v-bind="{ value: item.value }"></slot>
    </template>
  </div>
</template>
