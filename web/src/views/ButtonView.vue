<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Checkbox from '@/components/ui/Checkbox.vue';
import ViewSource from '@/components/web/ViewSource.vue';
import Field from '@/components/ui/Field.vue';

const VARIANTS = [
  'primary',
  'secondary',
  'accent',
  'surface',
  'success',
  'danger',
  'warning',
  'info',
  'foreground',
];

const SIZES = ['xs', 'sm', 'base'];

const variant = ref();
const size = ref();
const outlined = ref(false);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-4xl font-bold">Button</h1>

    <div class="grid grid-cols-2 gap-4">
      <div class="flex items-center justify-center">
        <Button :size="size" :variant="variant" :outlined="outlined"
          >Click me</Button
        >
      </div>

      <ViewSource>
        <pre class="p-4 text-sm select-all my-0">
&lt;Button{{ size ? ` size="${size}"` : ''
          }}{{ variant ? ` variant="${variant}"` : ''
          }}{{ outlined ? ` outlined` : '' }}&gt;
  Click me
&lt;/Button&gt;</pre
        >
      </ViewSource>
    </div>

    <Field label="Size">
      <template #content>
        <div class="flex items-start gap-2 flex-wrap">
          <Checkbox
            v-for="value in SIZES"
            v-model="size"
            :label="value"
            :value="value"
            type="radio"
          />
        </div>
      </template>
    </Field>

    <Field label="Variant">
      <template #content>
        <div class="flex items-start gap-2 flex-wrap">
          <Checkbox
            v-for="value in VARIANTS"
            v-model="variant"
            :label="value"
            :value="value"
            :variant="value"
            type="radio"
          />
        </div>
      </template>
    </Field>

    <Field label="Others">
      <Checkbox v-model="outlined" label="Outlined" />
    </Field>

    <ViewSource src="@/components/ui/Button.vue" />
  </div>
</template>
