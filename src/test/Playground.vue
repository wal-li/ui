<script setup>
import Tabs from '../tabs/Tabs.vue';
import CODE from '../code.ts';
import { getCurrentInstance, onMounted } from 'vue';
import CodePreview from './CodePreview.vue';

defineProps(['id', 'preview']);
</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <Tabs>
      <template #Preview v-if="preview !== false">
        <div class="p-4">
          <slot></slot>
        </div>
      </template>

      <template #Code v-if="preview === false && id">
        <CodePreview class="!rounded-none">
          <pre>{{ CODE[id] }}</pre>
        </CodePreview>
      </template>
    </Tabs>
  </div>
</template>
