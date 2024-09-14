<script setup>
import { ref, computed } from 'vue';

import Field from '../input/Field.vue';

const svg = ref('');

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
      ></textarea>
    </Field>
  </div>
</template>
