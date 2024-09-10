<script setup>
const props = defineProps(['type', 'label', 'name']);

const model = defineModel();

const id = (props.name ? `${props.name}-` : '') + crypto.randomUUID().split('-')[0];
</script>

<template>
  <div class="mb-4">
    <label class="uppercase text-xs uppercase tracking-wider leading-normal mb-2 block" v-if="label" :for="id">{{
      label
    }}</label>
    <input
      class="block border border-stone-300 px-3 py-2 outline-0 w-full focus:outline-1 text-sm"
      :id="id"
      :type="type ?? 'text'"
      :name="name"
      v-model="model"
    />
  </div>
</template>
