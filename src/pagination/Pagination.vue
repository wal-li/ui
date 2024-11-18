<script setup>
import { computed } from 'vue';

const props = defineProps(['start', 'limit', 'total']);

const pages = computed(() => {
  const limit = parseInt(props.limit) || 10;
  const page = Math.floor((parseInt(props.start) || 0) / limit) + 1;
  const total = Math.ceil((parseInt(props.total) || 0) / limit);

  const p = [];

  // [1] ... 3 4 5 ... 6
  if (page > 2) {
    p.push({
      label: 1,
      page: 1,
    });
  }

  // 1 [...] 3 4 5 ... 6
  if (page > 3) {
    p.push({
      label: '...',
      page: Math.floor((page - 2) / 2) + 1,
    });
  }

  // 1 ... [3] 4 5 ... 6
  if (page > 1)
    p.push({
      label: page - 1,
      page: page - 1,
    });

  // 1 ... 3 [4] 5 ... 6
  p.push({ label: page, page });

  // 1 ... 3 4 [5] ... 6
  if (page < total) p.push({ label: page + 1, page: page + 1 });

  // 1 ... 3 4 5 [...] 6
  if (page < total - 2)
    p.push({
      label: '...',
      page: Math.floor((total - page - 1) / 2) + page + 1,
    });

  // 1 ... 3 4 5 ... [6]
  if (page < total - 1)
    p.push({
      label: total,
      page: total,
    });

  return p.map((i) => ({ ...i, start: (i.page - 1) * limit, isActive: page === i.page }));
});
</script>

<template>
  <div>
    <slot v-for="page in pages" v-bind="page"></slot>
  </div>
</template>
