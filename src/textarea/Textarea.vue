<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  name: {},
  id: {},
  mode: {},
  tabSize: {
    default: 2,
  },
});

const CODE_MODE = 'code';

const model = defineModel();
const el = ref();
let savedValue = '';
let prevKey = '';

const indent = computed(() => {
  let content = '';
  for (let i = 0; i < parseInt(props.tabSize); i++) content += ' ';
  return content;
});

function removeIndent(s) {
  return s.substring(0, props.tabSize) === indent.value ? s.substring(props.tabSize) : s.trimStart();
}

function handleKeyDown(e) {
  prevKey = e.key;

  if (props.mode === CODE_MODE && prevKey === 'Tab') {
    e.preventDefault();

    let currentValue = el.value.value;
    let currentSelectionStart = el.value.selectionStart;
    let currentSelectionEnd = el.value.selectionEnd;
    let currentSelectionText = currentValue.substring(currentSelectionStart, currentSelectionEnd);

    // remove indent
    if (e.shiftKey) {
      currentSelectionText = currentSelectionText
        .split('\n')
        .map((i) => removeIndent(i))
        .join('\n');
    }
    // insert indent
    else {
      currentSelectionText = currentSelectionText
        .split('\n')
        .map((i) => indent.value + i)
        .join('\n');
    }

    // insert selection content
    currentValue =
      currentValue.substring(0, currentSelectionStart) +
      currentSelectionText +
      currentValue.substring(currentSelectionEnd, currentValue.length);

    if (currentSelectionStart === currentSelectionEnd) {
      currentSelectionStart += currentSelectionText.length;
      currentSelectionEnd = currentSelectionStart;
    } else currentSelectionEnd = currentSelectionStart + currentSelectionText.length;

    // remove indent of current line
    if (e.shiftKey) {
      const currentLineStart = currentValue.lastIndexOf('\n', currentSelectionStart - 1) + 1;
      const currentLine = currentValue.substring(currentLineStart, currentSelectionStart);
      const newCurrentLine = removeIndent(currentLine);

      currentValue =
        currentValue.substring(0, currentLineStart) +
        newCurrentLine +
        currentValue.substring(currentSelectionStart, currentValue.length);

      currentSelectionStart -= currentLine.length - newCurrentLine.length;
      currentSelectionEnd -= currentLine.length - newCurrentLine.length;
    }

    el.value.value = currentValue;
    el.value.setSelectionRange(currentSelectionStart, currentSelectionEnd);

    updateValue();
  }
}

function updateValue() {
  let currentValue = el.value.value;
  let currentSelectionStart = el.value.selectionStart;
  let currentSelectionEnd = el.value.selectionEnd;

  if (props.mode === CODE_MODE && prevKey === 'Enter') {
    const prevLine = currentValue.substring(
      currentValue.lastIndexOf('\n', currentSelectionStart - 2) + 1,
      currentSelectionStart - 1,
    );

    let localIndent = '';
    for (let i = 0; i < prevLine.length; i++) {
      if (prevLine[i] !== ' ') break;
      localIndent += ' ';
    }

    currentValue =
      currentValue.substring(0, currentSelectionStart) +
      localIndent +
      currentValue.substring(currentSelectionStart, currentValue.length);

    currentSelectionStart += localIndent.length;
    currentSelectionEnd = currentSelectionStart;
  }

  el.value.value = currentValue;
  el.value.setSelectionRange(currentSelectionStart, currentSelectionEnd);

  // emit
  savedValue = el.value.value;
  model.value = savedValue;
}

onMounted(() => {
  el.value.value = model.value || '';
  updateValue();
});

watch(
  () => model.value,
  () => {
    if (model.value !== savedValue) {
      el.value.value = model.value || '';
      updateValue();
    }
  },
);
</script>

<template>
  <textarea
    ref="el"
    class="px-3 py-2 text-sm block border border-secondary-300 outline-0 w-full bg-white focus:outline-1 dark:bg-black dark:border-secondary-700 dark:outline-0"
    spellcheck="false"
    rows="5"
    :name="name"
    :id="id"
    @keydown="handleKeyDown"
    @input="updateValue"
  ></textarea>
</template>
