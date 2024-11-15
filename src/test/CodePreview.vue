<script setup>
import { ref } from 'vue';
import DocumentDuplicateIcon from '../icons/DocumentDuplicateIcon.vue';
import { copyToClipboard } from '../utils';

const codeRef = ref();

function copy(slots) {
  copyToClipboard(codeRef.value.querySelector('pre').innerText);
}
</script>

<template>
  <div class="font-mono bg-secondary p-4 rounded w-full overflow-hidden relative" ref="codeRef">
    <div class="w-full overflow-auto">
      <slot></slot>
    </div>

    <button
      class="text-sm leading-4 font-medium p-2 rounded inline-flex items-center gap-1.5 text-foreground outline outline-1 -outline-offset-1 outline-primary hover:bg-primary hover:text-background opacity-30 hover:opacity-100 absolute top-2 right-2"
      @click="copy($slots)"
    >
      <DocumentDuplicateIcon class="w-4 h-4" />
    </button>
  </div>
</template>
