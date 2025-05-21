
<script setup lang="ts">
defineProps(['outlined']);
</script>

<template>
  <template v-if="outlined !== undefined && outlined !== false">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75"/>
</svg>

  </template>
  <template v-else>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
  <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v13.19l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6.75 6.75a.75.75 0 0 1-1.06 0l-6.75-6.75a.75.75 0 1 1 1.06-1.06l5.47 5.47V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/>
</svg>

  </template>
</template>
