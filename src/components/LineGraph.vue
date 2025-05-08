<script setup>
import { onMounted, ref, watch } from 'vue';

const WIDTH = 400;
const HEIGHT = 300;

/**
 * data should be a list
 * x is the name of x axis
 * y is the name if y axis
 */
const props = defineProps(['data', 'x', 'y']);

const path = ref('');

function renderGraph() {
  const dx = props.data.map((i) => i[props.x]);
  const dy = props.data.map((i) => i[props.y]);

  const minX = Math.min(...dx);
  const maxX = Math.max(...dx);

  const minY = Math.min(...dy);
  const maxY = Math.max(...dy);

  let content = '';

  for (let i = 0; i < dx.length; i++) {
    const x = dx[i];
    const y = dy[i];

    content += `${content === '' ? 'M' : 'L'} ${((x - minX) / (maxX - minX)) * WIDTH} ${
      ((y - minY) / (maxY - minY)) * HEIGHT
    }`;
  }

  path.value = content;
}

onMounted(() => {
  renderGraph();
});

watch(() => [props.data, props.x, props.y], renderGraph);
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${WIDTH} ${HEIGHT}`">
    <path :d="path" stroke="currentColor" stroke-width="10" fill="none" />
  </svg>
</template>
