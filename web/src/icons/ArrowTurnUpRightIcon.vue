
<script setup lang="ts">
defineProps(['outlined']);
</script>

<template>
  <template v-if="outlined !== undefined && outlined !== false">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75-3.751m0 0-3.75-3.75m3.75 3.75H3.74V19.5"/>
</svg>

  </template>
  <template v-else>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
  <path fill-rule="evenodd" d="M3.74 20.25a.75.75 0 0 0 .75-.75V8.999h13.938l-2.47 2.47a.75.75 0 0 0 1.061 1.06l3.75-3.75a.75.75 0 0 0 0-1.06l-3.75-3.75a.75.75 0 0 0-1.06 1.06l2.47 2.47H3.738a.75.75 0 0 0-.75.75V19.5c0 .414.336.75.75.75Z" clip-rule="evenodd"/>
</svg>

  </template>
</template>
