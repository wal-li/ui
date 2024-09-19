<script setup>
import { ref, computed } from 'vue';
import { loremIpsum } from 'lorem-ipsum';

import Field from '../input/Field.vue';
import Heading from '../heading/Heading.vue';
import Icon from '../icon/Icon.vue';
import Button from '../button/Button.vue';

import IconEditor from './IconEditor.vue';

const SIZES = ['text-xs', 'text-sm', 'test-base', 'text-lg', 'text-xl', 'text-2xl'];
const COLORS = ['text-primary', 'text-secondary', 'text-success', 'text-danger', 'text-warning', 'text-info'];

const ICON_DATA = [
  {
    name: 'plus',
    data: '<svg viewBox="0 0 20 20"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 1 10 19M1 10 19 10"/></svg>',
  },
  {
    name: 'h1',
    data: '<svg viewBox="0 0 20 20" fill="none"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1 3 1 17M1 10 10 10M10 3 10 17M14 8 19 3 19 17"/></svg>',
  },
  {
    name: 'input',
    data: '<svg viewBox="0 0 18 18" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M1 2 17 2 17 15 1 15ZM4 5 7 5M5.5 5 5.5 12M4 12 7 12" /></svg>',
  },
];

const svg = ref(
  '<svg viewBox="0 0 24 24"><path d="M12 0Q0 0 0 13 0 24 12 24T24 12 12 0ZM5 5 7 5 19 17 19 19 17 19 5 7ZM19 5 19 7 15 11 13 9 17 5ZM12 4 14 6 12 8 10 6ZM10 14 13 17 13 19 10 19ZM5 9 8 12 8 19 5 19ZM20 12 18 14 16 12 18 10Z" fill="currentColor"/></svg>',
);
const selectedIcon = ref();

const sampleText = loremIpsum();

function updateSvg(value) {
  console.log(value);
  if (!/^\<svg((.|\n)*)\<\/svg\>$/gm.test(value)) return;

  svg.value = value;
}
</script>

<template>
  <Heading level="2">Editor</Heading>

  <IconEditor class="mb-4" @input="updateSvg" />

  <Heading level="2">SVG</Heading>
  <div class="flex gap-4 mb-4">
    <Field label="preview" class="text-center">
      <div class="flex flex-col gap-2">
        <div class="w-32 h-32 border border-2 border-black" v-html="svg"></div>
        <div class="text-xs uppercase text-center">Compare with</div>
        <div class="w-32 h-32 border border-2 border-black">
          <i class="pi pi-face-smile text-[124px]"></i>
        </div>
      </div>
    </Field>
    <Field class="flex-1" label="source (svg)">
      <textarea
        class="w-full flex-1 resize-none bg-white border border-secondary-300 text-sm px-3 py-2 outline-0 font-mono h-auto"
        spellcheck="false"
        @input="(e) => updateSvg(e.target.value)"
        >{{ svg }}</textarea
      >
    </Field>
  </div>

  <Heading level="3">with Text</Heading>
  <div class="flex flex-col gap-2 mb-4">
    <div v-for="size in SIZES" :class="`${size}`">
      <Icon class="mr-2" :data="svg" />
      <span>
        {{ sampleText }}
      </span>
    </div>
  </div>

  <Heading level="3">with Color</Heading>
  <div class="flex gap-2 mb-4">
    <Icon v-for="color in COLORS" :class="`text-4xl ${color}`" :data="svg" />
  </div>

  <Heading level="3">with Button</Heading>
  <div class="flex gap-2 mb-4">
    <div>
      <Button size="small"><Icon :data="svg" /></Button>
    </div>
    <div>
      <Button size="normal"><Icon :data="svg" /></Button>
    </div>
    <div>
      <Button size="large"><Icon :data="svg" /></Button>
    </div>
  </div>

  <Heading level="3">List</Heading>
  <div class="flex flex-wrap mb-4">
    <button
      :class="`flex flex-col gap-2 items-center justify-center hover:outline outline-2 -outline-offset-1 w-14 h-14 ${
        selectedIcon?.name === icon.name ? 'bg-primary/20' : ''
      }`"
      v-for="icon in ICON_DATA"
      @click="selectedIcon = icon"
    >
      <Icon :data="icon.data" />
      <div class="text-xs">{{ icon.name }}</div>
    </button>
  </div>

  <div
    v-if="selectedIcon"
    class="sticky flex items-center justify-between bottom-0 left-0 w-full bg-white border-t border-secondary-300 dark:border-pureblack p-2 dark:bg-black z-30"
  >
    <div class="flex gap-4 items-center">
      <Icon class="text-4xl" :data="selectedIcon.data" />
      <div class="text-sm">{{ selectedIcon.name }}</div>
    </div>
    <div class="flex gap-2">
      <Button size="small">Copy</Button>
      <Button size="small">Download</Button>
    </div>
  </div>
</template>
