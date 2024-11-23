<script setup>
import Tabs from '../tabs/Tabs.vue';
import CODE from '../code.ts';
import { getCurrentInstance, onMounted, ref } from 'vue';
import CodePreview from './CodePreview.vue';

defineProps(['id']);

const value = ref();
</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <Tabs>
      <template #Preview>
        <div class="p-4">
          <slot v-bind="{ value, update: (v) => (value = v) }"></slot>
        </div>

        <div v-if="value" class="bg-secondary text-xs font-mono px-4 py-2">{{ value }}</div>
      </template>

      <template #Code v-if="id">
        <CodePreview class="!rounded-none">
          <pre>{{ CODE[id] }}</pre>
        </CodePreview>
      </template>
    </Tabs>
  </div>
</template>
