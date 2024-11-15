<script setup>
import { onMounted, ref } from 'vue';

const STATE_KEY = 'walli.ui.theme';
const html = document.getElementsByTagName('html')[0];

const props = defineProps(['prefer']);

const value = ref(localStorage.getItem(STATE_KEY) ?? html.classList.contains('dark') ? 'dark' : undefined);

function updateHtml() {
  if (value.value === 'dark') html.classList.remove('light');
  else html.classList.remove('dark');
  html.classList.add(value.value);
}

function toggle() {
  value.value = value.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem(STATE_KEY, value.value);

  updateHtml();
}

onMounted(() => {
  if (!value.value) value.value = props.prefer ?? 'light';

  updateHtml();
});
</script>

<template>
  <slot v-bind="{ toggle, value }"></slot>
</template>
