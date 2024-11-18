<script setup>
import { ref } from 'vue';
import Playground from '../test/Playground.vue';
import vMask from '../mask/mask';

const tmp = ref('');
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="text-input">
      <!-- TEXT INPUT -->
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Text Input"
        spellcheck="false"
      />
      <!-- END TEXT INPUT -->
    </Playground>

    <Playground id="number-input">
      <!-- NUMBER INPUT -->
      <input
        type="number"
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Number Input"
      />
      <!-- END NUMBER INPUT -->
    </Playground>

    <Playground id="date-input">
      <!-- DATE INPUT -->
      <input
        type="date"
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Date Input"
      />
      <!-- END DATE INPUT -->
    </Playground>

    <Playground id="file-input">
      <!-- FILE INPUT -->
      <input
        type="file"
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="File Input"
      />
      <!-- END FILE INPUT -->
    </Playground>

    <Playground id="mask-number-input">
      <!-- MASKED INPUT -->
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Mask Number Input"
        v-mask="Number"
      />
      <!-- END MASKED INPUT -->
    </Playground>

    <Playground id="mask-number-2-input">
      <!-- MASKED INPUT -->
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="(+00) 000 000 000"
        v-mask="'(+00) 000 000 000'"
      />
      <!-- END MASKED INPUT -->
    </Playground>

    <Playground id="mask-date-input">
      <!-- MASKED INPUT -->
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="yyyy-mm-dd"
        v-mask="'yyyy-mm-dd'"
      />
      <!-- END MASKED INPUT -->
    </Playground>

    <Playground id="mask-time-input">
      <!-- MASKED INPUT -->
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="hh:ii:ss"
        v-mask="'hh:ii:ss'"
      />
      <!-- END MASKED INPUT -->
    </Playground>

    <Playground id="mask-regex-input">
      <!-- MASKED INPUT -->
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Decimal and Space"
        v-mask="/^[\d\s]+$/"
      />
      <!-- END MASKED INPUT -->
    </Playground>

    <Playground id="mask-color-input">
      <!-- MASKED INPUT -->
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Hex Color"
        v-mask="'#xxxxxx'"
      />
      <!-- END MASKED INPUT -->
    </Playground>
  </div>
</template>
