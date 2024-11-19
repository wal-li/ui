<script setup>
// @todo: number date return, date return

import { ref, computed, onMounted, watch } from 'vue';

const model = defineModel();

const props = defineProps({
  type: {
    default: 'text',
  },
  name: {},
  id: {},
  size: {
    default: 'normal',
  },
  mask: {},
});

const el = ref();
const localValue = ref('');
let prevValue = '';
let prevKey = '';
let savedValue = '';

const maskString = computed(() => {
  if (props.mask && typeof props.mask === 'string') return props.mask;
  return '';
});

const SIZES = {
  small: 'px-2 py-1 text-xs leading-none',
  normal: 'px-3 py-2 text-sm',
  large: 'px-3 py-2 text-base',
};

function handleKeyDown(e) {
  prevKey = e.key;
}

function updateValue() {
  const insertMode = prevKey !== 'Backspace' && prevKey !== 'Delete';

  let currentValue = el.value.value;
  let currentSelectionStart = el.value.selectionStart;

  if (props.type === 'text' && props.mask && currentValue) {
    // placeholder
    if (typeof props.mask === 'string') {
      let value = currentValue || '';
      let cursor = currentSelectionStart;

      const parts = props.mask.split(/[^a-z0-9]+/gi).map((i) => i.toLowerCase());
      const splits = props.mask.split(/[a-z0-9]+/gi);

      if (parts.length > 0 && parts[0] === '') parts.shift();
      if (parts.length > 0 && parts[parts.length - 1] === '') parts.pop();

      // remove chars
      const partStr = parts.join('').split('');
      let i = 0;
      while (i < value.length && i < partStr.length) {
        const c = partStr[i];

        // invalid char
        if (
          // alphabet
          (c === 'a' && !/[a-z]/i.test(value[i])) ||
          // digital
          (c === '0' && !/[0-9]/i.test(value[i])) ||
          // year
          (c === 'y' && !/[0-9]/i.test(value[i])) ||
          // month
          (c === 'm' &&
            ((partStr[i + 1] === 'm' && !/[0-1]/i.test(value[i])) ||
              (partStr[i - 1] === 'm' && value[i - 1] === '0' && !/[1-9]/i.test(value[i])) ||
              (partStr[i - 1] === 'm' && value[i - 1] === '1' && !/[0-2]/i.test(value[i])))) ||
          // day
          (c === 'd' &&
            ((partStr[i + 1] === 'd' && !/[0-3]/i.test(value[i])) ||
              (partStr[i - 1] === 'd' && value[i - 1] === '0' && !/[1-9]/i.test(value[i])) ||
              (partStr[i - 1] === 'd' && ['1', '2'].indexOf(value[i - 1]) !== -1 && !/[0-9]/i.test(value[i])) ||
              (partStr[i - 1] === 'd' && value[i - 1] === '3' && !/[0-1]/i.test(value[i])))) ||
          // hour
          (c === 'h' &&
            ((partStr[i + 1] === 'h' && !/[0-2]/i.test(value[i])) ||
              (partStr[i - 1] === 'h' && ['0', '1'].indexOf(value[i - 1]) !== -1 && !/[0-9]/i.test(value[i])) ||
              (partStr[i - 1] === 'h' && value[i - 1] === '2' && !/[0-3]/i.test(value[i])))) ||
          // min
          (c === 'i' &&
            ((partStr[i + 1] === 'i' && !/[0-5]/i.test(value[i])) ||
              (partStr[i - 1] === 'i' && !/[0-9]/i.test(value[i])))) ||
          // sec
          (c === 's' &&
            ((partStr[i + 1] === 's' && !/[0-5]/i.test(value[i])) ||
              (partStr[i - 1] === 's' && !/[0-9]/i.test(value[i])))) ||
          // others
          ('a0ymd'.indexOf(c) === -1 && !/[a-z0-9]/i.test(value[i]))
        ) {
          value = value.substring(0, i) + value.substring(i + 1, value.length);
          if (cursor > i) cursor--;
          continue;
        }

        i++;
      }

      value = value.substring(0, i);
      cursor = Math.min(cursor, value.length);

      // insert splits
      i = 0;

      const prefix = splits.shift();
      if (prefix.length) {
        value = prefix + value;
        cursor += prefix.length;
        i += prefix.length;
      }

      while (parts.length) {
        const part = parts.shift();
        const split = splits.shift();

        i += part.length;

        if (cursor > i) cursor += split.length;
        if (cursor === i && insertMode) cursor += split.length;

        value = value.substring(0, i).padEnd(i, '\0') + split + value.substring(i, value.length);
        i += split.length;
      }

      // set
      currentValue = value;
      currentSelectionStart = cursor;
    }

    // regex
    if (props.mask instanceof RegExp && !props.mask.test(currentValue)) {
      currentValue = prevValue;
      currentSelectionStart += insertMode ? -1 : 0;
    }

    // number
    if (props.mask === 'number' || props.mask?.name === 'Number') {
      let value = currentValue || '';
      let cursor = currentSelectionStart;

      // remove chars
      let i = 0;
      let haveDot = false;
      while (i < value.length) {
        if (!/[-\d\.]/.test(value[i]) || (i !== 0 && value[i] === '-') || (haveDot && value[i] === '.')) {
          value = value.substring(0, i) + value.substring(i + 1, value.length);
          if (cursor > i) cursor--;
          continue;
        }
        if (value[i] === '.') haveDot = true;
        i++;
      }

      // partition
      const parts = value.split('.');
      value = parts[0];

      i = value[0] === '-' ? 1 : 0;
      i += (value.length - i) % 3 === 0 ? 3 : (value.length - i) % 3;

      while (i < value.length) {
        value = value.substring(0, i) + '\x01' + value.substring(i, value.length);
        if (cursor > i) cursor++;
        i += 4;
      }

      if (haveDot) value += '.' + parts[1];

      currentValue = value;
      currentSelectionStart = cursor;
    }
  }

  el.value.value = currentValue.replace(/\0/g, '_').replace(/\x01/g, ' ');
  if (props.type === 'text') el.value.setSelectionRange(currentSelectionStart, currentSelectionStart);
  prevValue = currentValue;
  prevKey = '';

  // emit
  savedValue = currentValue.split('\0')[0].replace(/\x01/g, '');
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
  <input
    ref="el"
    :class="`${SIZES[size]} block border border-secondary-300 outline-0 w-full bg-white focus:outline-1 dark:bg-black dark:border-secondary-700 dark:outline-0`"
    :id="id"
    :type="type"
    :name="name"
    :placeholder="maskString"
    @keydown="handleKeyDown"
    @input="updateValue"
  />
</template>
