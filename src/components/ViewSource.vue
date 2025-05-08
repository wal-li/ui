<script setup>
defineProps(['src', 'content']);
</script>

<template>
  <div class="bg-surface my-4 rounded-lg">
    <div class="border-b border-background font-mono text-xs p-2 font-semibold">{{ src }}</div>
    <pre class="my-0 select-all">{{ content }}</pre>
  </div>
</template>
