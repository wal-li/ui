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
    <Example
      init="Lorem ipsum"
      v-slot="{ value, update }"
      raw="PElucHV0IDptb2RlbFZhbHVlPSJ2YWx1ZSIgQHVwZGF0ZTptb2RlbFZhbHVlPSJ1cGRhdGUiIHNwZWxsY2hlY2s9ImZhbHNlIi8+"
    >
      <Input :modelValue="value" @update:modelValue="update" spellcheck="false" />
    </Example>
  </div>

  <Heading level="2">Masked Input</Heading>
  <div class="flex flex-col gap-4 mb-4">
    <Example
      v-slot="{ value, update }"
      raw="PElucHV0IG1hc2s9IigrMDApIDAwMCAwMDAgMDAwIiA6bW9kZWxWYWx1ZT0idmFsdWUiIEB1cGRhdGU6bW9kZWxWYWx1ZT0idXBkYXRlIi8+"
    >
      <Input mask="(+00) 000 000 000" :modelValue="value" @update:modelValue="update" />
    </Example>

    <Example
      v-slot="{ value, update }"
      raw="PElucHV0IDptb2RlbFZhbHVlPSJ2YWx1ZSIgQHVwZGF0ZTptb2RlbFZhbHVlPSJ1cGRhdGUiIDptYXNrPSIvXltcZFxzXSsmI3gyNDsvIiBwbGFjZWhvbGRlcj0iRGVjaW1hbCBhbmQgU3BhY2UiLz4="
    >
      <Input :modelValue="value" @update:modelValue="update" :mask="/^[\d\s]+&#x24;/" placeholder="Decimal and Space" />
    </Example>

    <Example
      v-slot="{ value, update }"
      raw="PElucHV0IDptb2RlbFZhbHVlPSJ2YWx1ZSIgQHVwZGF0ZTptb2RlbFZhbHVlPSJ1cGRhdGUiIG1hc2s9Inl5eXktbW0tZGQiLz4="
    >
      <Input :modelValue="value" @update:modelValue="update" mask="yyyy-mm-dd" />
    </Example>

    <Example
      v-slot="{ value, update }"
      raw="PElucHV0IDptb2RlbFZhbHVlPSJ2YWx1ZSIgQHVwZGF0ZTptb2RlbFZhbHVlPSJ1cGRhdGUiIG1hc2s9ImhoOmlpOnNzIi8+"
    >
      <Input :modelValue="value" @update:modelValue="update" mask="hh:ii:ss" />
    </Example>

    <Example
      init="-1234.5678"
      v-slot="{ value, update }"
      raw="PElucHV0IDptb2RlbFZhbHVlPSJ2YWx1ZSIgQHVwZGF0ZTptb2RlbFZhbHVlPSJ1cGRhdGUiIDptYXNrPSJOdW1iZXIiIHBsYWNlaG9sZGVyPSJFbnRlciBudW1iZXIiLz4="
    >
      <Input :modelValue="value" @update:modelValue="update" :mask="Number" placeholder="Enter number" />
    </Example>
  </div>

  <Heading level="2">Color Picker</Heading>
  <div>
    <Example
      v-slot="{ value, update }"
      raw="PENvbG9yUGlja2VyIDptb2RlbFZhbHVlPSJ2YWx1ZSIgQHVwZGF0ZTptb2RlbFZhbHVlPSJ1cGRhdGUiLz4="
    >
      <ColorPicker :modelValue="value" @update:modelValue="update" />
    </Example>
  </div>
</template>
