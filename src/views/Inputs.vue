<script setup>
import { ref } from 'vue';

import Input from '../input/Input.vue';
import Heading from '../heading/Heading.vue';
import ColorPicker from '../color-picker/ColorPicker.vue';
import Example from '../test/Example.vue';

const SIZES = ['small', 'normal', 'large'];
</script>

<template>
  <Heading level="2">Text</Heading>
  <div class="flex flex-col gap-4 mb-4">
    <Example init="Lorem ipsum" v-slot="{ value, update }" raw="abcdef">
      <Input :modelValue="value" @update:modelValue="update" spellcheck="false" />
    </Example>
  </div>

  <Heading level="2">Masked Input</Heading>
  <div class="flex flex-col gap-4 mb-4">
    <Example v-slot="{ value, update }">
      <Input mask="(+00) 000 000 000" :modelValue="value" @update:modelValue="update" />
    </Example>

    <Example v-slot="{ value, update }">
      <Input :modelValue="value" @update:modelValue="update" :mask="/^[\d\s]+$/" placeholder="Decimal and Space" />
    </Example>

    <Example v-slot="{ value, update }">
      <Input :modelValue="value" @update:modelValue="update" mask="yyyy-mm-dd" />
    </Example>

    <Example v-slot="{ value, update }">
      <Input :modelValue="value" @update:modelValue="update" mask="hh:ii:ss" />
    </Example>

    <Example init="-1234.5678" v-slot="{ value, update }">
      <Input :modelValue="value" @update:modelValue="update" :mask="Number" placeholder="Enter number" />
    </Example>
  </div>

  <Heading level="2">Color Picker</Heading>
  <div>
    <Example v-slot="{ value, update }">
      <ColorPicker :modelValue="value" @update:modelValue="update" />
    </Example>
  </div>
</template>
