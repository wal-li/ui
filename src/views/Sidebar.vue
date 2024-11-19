<script setup>
import CODE from '../code.ts';
import CodePreview from '../test/CodePreview.vue';
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <CodePreview>
      <pre>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import Theme from '@wal-li/ui/theme';
import { SunIcon, MoonIcon, StopIcon } from '@wal-li/ui/icons';

const router = useRouter();
const route = useRoute();

function handleRouter(item) {
  router.push(item.url);
}

const sideMenuItems = [
  {
    label: 'Components',
  },
  {
    label: 'Button',
    url: '/button',
    command: handleRouter,
    icon: StopIcon,
  }
];

const currentLabel = computed(() => {
  return sideMenuItems.filter((i) => i.url === route.path)[0]?.label;
});</pre
      >
    </CodePreview>
    <CodePreview>
      <pre>{{ CODE['sidebar'] }}</pre>
    </CodePreview>
  </div>
</template>
