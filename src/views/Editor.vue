<script setup>
import { ref } from 'vue';
import vEditor from '../editor/editor';

const content = ref('');
</script>

<template>
  <textarea
    class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded font-mono"
    spellcheck="false"
    rows="10"
    v-editor="{ autoHeight: true }"
    v-model="content"
  ></textarea>
</template>
