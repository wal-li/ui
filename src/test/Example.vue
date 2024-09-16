<script setup>
import { ref } from 'vue';

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
  <div>
    <div>
      <slot v-bind="{ value, update }"></slot>
      <span class="text-xs block mt-2 italic">
        Entered Value: <span class="font-semibold">{{ value }}</span>
      </span>
    </div>

    <pre class="bg-secondary-200 border border-secondary-300 mt-2 p-2 rounded overflow-x-auto">{{ toText(raw) }}</pre>
  </div>
</template>
