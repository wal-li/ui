<script setup>
import { ref, computed, watch } from 'vue';
import InputText from 'primevue/inputtext';

const props = defineProps(['name', 'label', 'disabled', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const model = ref('');
const retype = ref('');

const isMatched = computed(() => model.value === retype.value);

defineExpose({
  init() {
    model.value = '';
    retype.value = '';
  },
  validate() {
    return isMatched.value;
  }
});

watch(
  () => model.value,
  () => {
    emit('update:modelValue', model.value);
  }
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <InputText
      type="password"
      class="mb-2"
      :disabled="disabled"
      v-model="model"
    />

    <label :for="`retype-${name}`">Re-type {{ label || name }}</label>

    <InputText
      type="password"
      :name="`retype-${name}`"
      :id="`retype-${name}`"
      :invalid="!isMatched"
      :disabled="disabled"
      v-model="retype"
    />

    <small v-if="!isMatched" class="text-rose-500"
      >Re-type {{ label || name }} is not match.</small
    >
  </div>
</template>
