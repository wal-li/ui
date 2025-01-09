<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Playground from '../test/Playground.vue';
import Input from '../components/Input.vue';
import vMask from '../mask/mask';

function randomValue() {
  return Math.floor(Math.random() * 1000000000 - 500000000) / 100;
}

const maskModelValue = ref(randomValue());
let loop;

onMounted(() => {
  loop = setInterval(() => {
    maskModelValue.value = randomValue();
  }, 5000);
});

onUnmounted(() => {
  clearInterval(loop);
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl leading-8 font-bold tracking-wider">Original</h2>
      </div>
      <Playground id="text-input" v-slot="{ value, update }">
        <!-- TEXT INPUT -->
        <input
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="Text Input"
          spellcheck="false"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END TEXT INPUT -->
      </Playground>

      <Playground id="number-input" v-slot="{ value, update }">
        <!-- NUMBER INPUT -->
        <input
          type="number"
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="Number Input"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END NUMBER INPUT -->
      </Playground>

      <Playground id="date-input" v-slot="{ value, update }">
        <!-- DATE INPUT -->
        <input
          type="date"
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="Date Input"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END DATE INPUT -->
      </Playground>

      <Playground id="file-input" v-slot="{ value, update }">
        <!-- FILE INPUT -->
        <input
          type="file"
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="File Input"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END FILE INPUT -->
      </Playground>

      <Playground id="mask-number-input" v-slot="{ value, update }">
        <!-- MASKED INPUT -->
        <input
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="Mask Number Input"
          v-mask="Number"
          v-model="maskModelValue"
        />
        <!-- END MASKED INPUT -->
      </Playground>

      <Playground id="mask-number-2-input" v-slot="{ value, update }">
        <!-- MASKED INPUT -->
        <input
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="(+00) 000 000 000"
          v-mask="'(+00) 000 000 000'"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END MASKED INPUT -->
      </Playground>

      <Playground id="mask-date-input" v-slot="{ value, update }">
        <!-- MASKED INPUT -->
        <input
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="yyyy-mm-dd"
          v-mask="'yyyy-mm-dd'"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END MASKED INPUT -->
      </Playground>

      <Playground id="mask-time-input" v-slot="{ value, update }">
        <!-- MASKED INPUT -->
        <input
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="hh:ii:ss"
          v-mask="'hh:ii:ss'"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END MASKED INPUT -->
      </Playground>

      <Playground id="mask-regex-input" v-slot="{ value, update }">
        <!-- MASKED INPUT -->
        <input
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="Decimal and Space"
          v-mask="/^[\d\s]+$/"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END MASKED INPUT -->
      </Playground>

      <Playground id="mask-color-input" v-slot="{ value, update }">
        <!-- MASKED INPUT -->
        <input
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
          placeholder="Hex Color"
          v-mask="'#xxxxxx'"
          :value="value"
          @input="(e) => update(e.target.value)"
        />
        <!-- END MASKED INPUT -->
      </Playground>

      <Playground id="textarea" v-slot="{ value, update }">
        <!-- MASKED INPUT -->
        <textarea
          class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded resize-none"
          :value="value"
          @input="(e) => update(e.target.value)"
        ></textarea>
        <!-- END MASKED INPUT -->
      </Playground>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl leading-8 font-bold tracking-wider">Compact</h2>
      </div>

      <Playground id="def-text-input" v-slot="{ value, update }">
        <Input placeholder="Text Input" :modelValue="value" @update:modelValue="update" />
      </Playground>

      <Playground id="def-number-input" v-slot="{ value, update }">
        <Input type="number" placeholder="Number Input" :modelValue="value" @update:modelValue="update" />
      </Playground>

      <Playground id="def-date-input" v-slot="{ value, update }">
        <Input type="date" placeholder="Date Input" :modelValue="value" @update:modelValue="update" />
      </Playground>

      <Playground id="def-file-input" v-slot="{ value, update }">
        <Input type="file" placeholder="File Input" :modelValue="value" @update:modelValue="update" />
      </Playground>

      <Playground id="def-mask-number-input" v-slot="{ value, update }">
        <Input placeholder="Mask Number Input" :mask="Number" v-model="maskModelValue" />
      </Playground>

      <Playground id="def-mask-number-2-input" v-slot="{ value, update }">
        <Input
          placeholder="(+00) 000 000 000"
          mask="(+00) 000 000 000"
          :modelValue="value"
          @update:modelValue="update"
        />
      </Playground>

      <Playground id="def-mask-date-input" v-slot="{ value, update }">
        <Input placeholder="yyyy-mm-dd" mask="yyyy-mm-dd" :modelValue="value" @update:modelValue="update" />
      </Playground>

      <Playground id="def-mask-time-input" v-slot="{ value, update }">
        <Input placeholder="hh:ii:ss" mask="hh:ii:ss" :modelValue="value" @update:modelValue="update" />
      </Playground>

      <Playground id="def-mask-regex-input" v-slot="{ value, update }">
        <Input placeholder="Decimal and Space" :mask="/^[\d\s]+$/" :modelValue="value" @update:modelValue="update" />
      </Playground>

      <Playground id="def-mask-color-input" v-slot="{ value, update }">
        <Input placeholder="Hex Color" mask="#xxxxxx" :modelValue="value" @update:modelValue="update" />
      </Playground>

      <Playground id="def-textarea" v-slot="{ value, update }">
        <!-- MASKED INPUT -->
        <Input class="resize-none" textarea :modelValue="value" @update:modelValue="update" />
        <!-- END MASKED INPUT -->
      </Playground>
    </div>
  </div>
</template>
