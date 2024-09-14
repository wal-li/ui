<script setup>
import { ref, computed } from 'vue';

import Field from '../input/Field.vue';

const svg = ref(
  '<svg viewBox="0 0 24 24"><path d="M12 0Q0 0 0 13 0 24 12 24T24 12 12 0ZM5 5 7 5 19 17 19 19 17 19 5 7ZM19 5 19 7 15 11 13 9 17 5ZM12 4 14 6 12 8 10 6ZM10 14 13 17 13 19 10 19ZM5 9 8 12 8 19 5 19ZM20 12 18 14 16 12 18 10Z"fill="currentColor"/></svg>',
);

function updateSvg(e) {
  if (!/^\<svg((.|\n)*)\<\/svg\>$/gm.test(e.target.value)) return;

  svg.value = e.target.value;
}
</script>

<template>
  <div class="flex gap-4 mb-4">
    <Field label="preview" class="text-center">
      <div class="flex flex-col gap-2">
        <div class="w-32 h-32 border border-2 border-black" v-html="svg"></div>
        <div class="text-xs uppercase text-center">Compare with</div>
        <div class="w-32 h-32 border border-2 border-black">
          <i class="pi pi-face-smile text-[124px]"></i>
        </div>
      </div>
    </Field>
    <Field class="flex-1" label="source (svg)">
      <textarea
        class="w-full flex-1 resize-none bg-white border border-secondary-300 text-sm px-3 py-2 outline-0 font-mono h-auto"
        spellcheck="false"
        @input="updateSvg"
        >{{ svg }}</textarea
      >
    </Field>
  </div>
</template>
