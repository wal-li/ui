<script setup lang="ts">
import SOURCES from '@/sources.json';

defineProps({
  src: {
    type: String,
  },
  name: {
    type: String,
  },
});
</script>

<template>
  <div class="bg-surface font-mono rounded">
    <div
      v-if="src || (name && name in SOURCES)"
      class="text-foreground/50 px-4 py-3 text-xs select-all font-semibold border-b border-background"
    >
      {{
        src ? src : name && name in SOURCES ? (SOURCES as any)[name].entry : ''
      }}
    </div>
    <slot>
      <pre
        class="px-4 py-3 text-xs font-semibold select-all my-0 border-b border-background before:content-['$'] before:mr-2"
        v-if="name && name in SOURCES"
      >
wui add {{ name }}</pre
      >

      <pre class="p-4 text-sm select-all my-0" v-if="name && name in SOURCES">{{
        (SOURCES as any)[name].content.trim()
      }}</pre>
    </slot>
  </div>
</template>
