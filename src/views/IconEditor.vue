<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

const emit = defineEmits(['input']);

const N_COL = 18;
const N_ROW = 18;

const mainBoard = ref();
const layers = ref([{ d: '', stroke: true }]);

const grid = computed(() => {
  let d = '';

  for (let i = 0; i < N_COL; i++) {
    d += `M${i} 0 ${i} ${N_ROW}`;
  }

  for (let i = 0; i < N_ROW; i++) {
    d += `M0 ${i} ${N_COL} ${i}`;
  }

  return d;
});

const result = computed(() => {
  return `<svg viewBox="0 0 18 18" fill="none">${layers.value
    .filter((layer) => layer.d.trim())
    .map(
      (layer) =>
        `<path ${
          layer.stroke
            ? 'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
            : 'fill="currentColor"'
        } d="${layer.d}" />`,
    )
    .join('')}</svg>`;
});

onMounted(() => {});

onUnmounted(() => {});

watch(
  layers,
  () => {
    emit('input', result.value);
  },
  { deep: true },
);
</script>

<template>
  <div class="flex gap-4">
    <svg class="max-w-96 w-full" ref="mainBoard" :viewBox="`0 0 ${N_COL} ${N_ROW}`" fill="none">
      <path opacity="0.1" stroke="black" stroke-width="0.04" :d="grid" />

      <path
        v-for="layer in layers"
        :stroke="layer.stroke ? 'black' : ''"
        :fill="layer.stroke ? '' : 'black'"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        :d="layer.d"
      />
    </svg>

    <div class="w-full">
      <div class="flex items-center justify-between mb-4">
        <input class="text-xs" type="file" />
        <span class="text-xs inline-block ml-2 uppercase">Sample</span>
      </div>

      <div v-for="layer in layers">
        <textarea
          v-model="layer.d"
          class="w-full flex-1 resize-none bg-white border border-secondary-300 text-sm px-3 py-2 outline-0 font-mono h-auto"
          rows="5"
          spellcheck="false"
        ></textarea>
        <div class="flex justify-between">
          <div class="inline-flex items-center">
            <input type="checkbox" v-model="layer.stroke" />
            <span class="text-xs inline-block ml-2 uppercase">Stroke</span>
          </div>

          <!-- <div class="flex gap-2">
            <button class="text-xs uppercase bg-primary/30 font-semibold px-1">Add</button>
            <button class="text-xs uppercase bg-danger/30 font-semibold px-1">Remove</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
