<script setup>
import { ref } from 'vue';

import Dialog from 'primevue/dialog';

defineProps(['header', 'value', 'icon']);

const visible = ref(false);
</script>

<template>
  <div class="w-full text-center">
    <button
      :class="`${icon ? icon : 'pi pi-ellipsis-h'} p-2`"
      @click="visible = true"
    ></button>
    <Dialog modal :header="header" v-model:visible="visible">
      <pre class="bg-surface-200 p-4 rounded overflow-auto">{{
        JSON.stringify(value, 0, 2)
      }}</pre>
    </Dialog>
  </div>
</template>
