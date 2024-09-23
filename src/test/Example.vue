<script setup>
import { ref } from 'vue';
import Tabs from '../tabs/Tabs.vue';

const props = defineProps({
  init: {},
  raw: {},
});

const value = ref(props.init);

function update(nextValue) {
  value.value = nextValue;
}

function toText(raw) {
  return atob(raw);
}
</script>

<template>
  <div class="border border-secondary-300">
    <Tabs>
      <template #Preview>
        <div class="p-3">
          <slot v-bind="{ value, update }"></slot>
          <span class="text-xs block mt-2 italic" v-if="value">
            Entered Value: <span class="font-semibold">{{ value }}</span>
          </span>
        </div>
      </template>
      <template #Source>
        <pre class="p-3 bg-secondary-200 overflow-x-auto">{{ toText(raw) }}</pre>
      </template>
    </Tabs>
  </div>
</template>
