<script setup>
import { ref } from 'vue';
import Playground from '../test/Playground.vue';
import Toast from '../toast/Toast.vue';

const data = ref([]);
let idx = 0;
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <!-- Simple Toast -->
    <Playground id="simple-toast">
      <Toast
        class="fixed select-none bottom-4 right-4 flex flex-col gap-4 items-right text-sm"
        v-model="data"
        v-slot="{ value }"
      >
        <div :class="`bg-${value.type} px-2 py-1 rounded shrink-0`">
          {{ value.message }}
        </div>
      </Toast>

      <button
        class="text-sm leading-4 font-medium p-3 bg-primary text-background rounded inline-flex items-center gap-2"
        @click="data.push({ type: 'info', message: `Toast Messsage - ${++idx}` })"
      >
        Push Toast
      </button>
    </Playground>
  </div>
</template>
