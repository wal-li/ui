<script setup>
import { ref } from 'vue';
import Playground from '../test/Playground.vue';
import vMask from '../mask/mask';

const tmp = ref('');
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="text-input">
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Text Input"
        spellcheck="false"
      />
    </Playground>

    <Playground id="number-input">
      <input
        type="number"
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Number Input"
      />
    </Playground>

    <Playground id="date-input">
      <input
        type="date"
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Date Input"
      />
    </Playground>

    <Playground id="file-input">
      <input
        type="file"
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="File Input"
      />
    </Playground>

    <Playground id="mask-number-input">
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Mask Number Input"
        v-mask="Number"
      />
    </Playground>

    <Playground id="mask-number-input">
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="(+00) 000 000 000"
        v-mask="'(+00) 000 000 000'"
      />
    </Playground>

    <Playground id="mask-date-input">
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="yyyy-mm-dd"
        v-mask="'yyyy-mm-dd'"
      />
    </Playground>

    <Playground id="mask-time-input">
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="hh:ii:ss"
        v-mask="'hh:ii:ss'"
      />
    </Playground>

    <Playground id="mask-regex-input">
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Decimal and Space"
        v-mask="/^[\d\s]+$/"
      />
    </Playground>

    <Playground id="mask-color-input">
      <input
        class="outline outline-1 -outline-offset-1 bg-background focus:outline-foreground w-full px-3 py-2 text-sm leading-6 rounded"
        placeholder="Hex Color"
        v-mask="'#xxxxxx'"
      />
    </Playground>
  </div>
</template>
