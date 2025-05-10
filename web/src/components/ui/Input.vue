<script setup lang="ts">
import { ref, watch, type PropType, type Ref } from 'vue';

const COMPONENTS = { input: 'input' };

const SIZES = {
  xs: 'text-xs h-6 px-1.5',
  sm: 'text-sm h-8 px-2',
  base: 'text-base h-10 px-3',
};

const props = defineProps({
  component: {
    type: String as PropType<keyof typeof COMPONENTS>,
    default: 'input',
  },
  size: {
    type: String as PropType<keyof typeof SIZES>,
    default: 'base',
  },
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const localValue: Ref<string> = ref(props.modelValue ?? '');

watch(
  () => localValue.value,
  () => {
    emit('update:modelValue', localValue.value);
  },
);

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === localValue.value) return;
    localValue.value = props.modelValue;
  },
);
</script>

<template>
  <input
    v-model="localValue"
    v-if="component === COMPONENTS.input"
    :class="`border border-border outline-none w-full ${SIZES[size as keyof typeof SIZES]}`"
  />
</template>
