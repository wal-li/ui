<script setup>
import { ref } from 'vue';

import Dialog from '../dialog/Dialog.vue';
import Button from '../button/Button.vue';

const visible = ref(false);
</script>

<template>
  <div>
    <Button @click="visible = true">Open</Button>
    <Dialog v-if="visible" @close="visible = false"> <div>Dialog content</div> </Dialog>
  </div>
</template>
