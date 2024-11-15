<script setup>
import Tabs from '../tabs/Tabs.vue';
import CODE from '../code.ts';
import { getCurrentInstance, onMounted } from 'vue';
import CodePreview from './CodePreview.vue';

defineProps(['id']);
</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <Tabs>
      <template #Preview>
        <div class="p-4">
          <slot></slot>
        </div>
      </template>

      <template #Code v-if="id">
        <CodePreview class="!rounded-none">
          <pre>{{ CODE[id] }}</pre>
        </CodePreview>
      </template>
    </Tabs>
  </div>
</template>
