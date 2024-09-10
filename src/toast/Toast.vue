<script setup>
import { onMounted, onUnmounted, reactive } from 'vue';

const queue = reactive([]);

let currentId = 0;
let interval;

defineExpose({
  add(item) {
    queue.push({
      severity: 'info',
      summary: '',
      detail: '',
      life: 3000,
      ...item,
      id: ++currentId,
      at: +new Date(),
    });
  },
});

function handleQueue() {
  const now = +new Date();

  let i = 0;
  while (i < queue.length) {
    if (now - queue[i].at > queue[i].life) {
      queue.splice(i, 1);
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
</script>

<template>
  <div class="fixed bottom-12 right-12 z-40">
    <div v-for="item in queue" :key="item.id" :class="`border p-2 mt-2`">{{ item.summary }} - {{ item.detail }}</div>
  </div>
</template>
