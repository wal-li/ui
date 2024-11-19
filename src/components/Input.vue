<script setup>
/**
 * [parent] -> modelValue -> localValue -> ... ->
 * updateValue -> localValue -> emit:modelValue -> [parent] -> modelValue -> localValue
 */
import { ref, watch } from 'vue';
import vMask from '../mask/mask';

const props = defineProps(['modelValue', 'mask']);
const emit = defineEmits(['update:modelValue']);

// const model = defineModel({
//   set(value) {
//     if (props.mask === Number) return parseFloat(value.replace(/[^\d]/g, ''));

//     return value;
//   },
// });

const localValue = ref(props.modelValue);
let emitValue;

watch(
  () => localValue.value,
  () => {
    let value = localValue.value;

    if (props.mask === Number && typeof value === 'string') value = parseFloat(value.replace(/[^\d-.]+/g, ''));

    if (props.mask === Number && isNaN(value)) value = undefined;

    emit('update:modelValue', value);
    emitValue = value;
  },
);

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === emitValue) return;
    localValue.value = props.modelValue;
  },
);
</script>

<template>
  <input
    class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
    spellcheck="false"
    v-model="localValue"
    v-mask="mask"
  />
</template>
