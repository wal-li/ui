<script setup>
import { ref } from 'vue';
import DocumentDuplicateIcon from '../icons/DocumentDuplicateIcon.vue';
import { copyToClipboard } from '../utils';
import CheckIcon from '../icons/CheckIcon.vue';

const codeRef = ref();

const isCopied = ref(false);

function copy(slots) {
  copyToClipboard(codeRef.value.querySelector('pre').innerText);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1000);
}
</script>

<template>
  <div class="font-mono bg-secondary p-4 rounded w-full overflow-hidden relative" ref="codeRef">
    <div class="w-full overflow-auto">
      <slot></slot>
    </div>

    <button
      class="text-sm leading-4 font-medium p-1 rounded inline-flex items-center gap-1.5 text-foreground outline outline-1 -outline-offset-1 outline-primary hover:bg-primary hover:text-background opacity-10 hover:opacity-100 absolute top-1 right-1"
      @click="copy($slots)"
    >
      <CheckIcon class="w-4 h-4" v-if="isCopied" />
      <DocumentDuplicateIcon class="w-4 h-4" v-else />
    </button>
  </div>
</template>
