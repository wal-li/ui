<script setup lang="ts">
import SOURCES from '@/sources.json';

defineProps({
  src: {
    type: String,
  },
});
</script>

<template>
  <div class="bg-surface font-mono rounded">
    <div
      v-if="src"
      class="text-foreground/50 px-4 py-3 text-xs select-all font-semibold border-b border-background"
    >
      {{ src }}
    </div>
    <slot>
      <pre class="p-4 text-sm select-all my-0" v-if="src && src in SOURCES">{{
        (SOURCES as any)[src].trim()
      }}</pre>
    </slot>
  </div>
</template>
