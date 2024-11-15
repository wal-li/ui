<script setup>
import Tabs from '../tabs/Tabs.vue';
import CODE from '../code.ts';
import { getCurrentInstance, onMounted } from 'vue';

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
        <pre class="p-4 p-4 bg-secondary">{{ CODE[id] }}</pre>
      </template>
    </Tabs>
  </div>
</template>
