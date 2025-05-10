<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Color from 'colorjs.io';

import { useThemeStore } from '@/stores/theme';
import { renderColor } from '@/utils';
import { COLOR_MODES } from '@/constants';
import ColorWheel from '@/components/ui/ColorWheel.vue';
import Field from '@/components/ui/Field.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import MoonIcon from '@/icons/MoonIcon.vue';
import SunIcon from '@/icons/SunIcon.vue';
import ArrowDownTrayIcon from '@/icons/ArrowDownTrayIcon.vue';
import CheckIcon from '@/icons/CheckIcon.vue';

const CONTRAST_THRESHOLD = 4.5;

const DEFAULT_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const DEFAULT_PALETTES = [
  // sky + light
  {
    primary: [0.65, 0.3, 0.6122],
    secondary: [0.5, 0.2, 0.5],
    accent: [0.7, 0.4, 0.8],
    surface: [0.94, 0.0, 0.0],
    border: [0.9, 0.0, 0.0],
    success: [0.65, 0.302, 0.4019],
    danger: [0.65, 0.302, 0.0685],
    warning: [0.65, 0.302, 0.3185],
    info: [0.65, 0.302, 0.7492],
    background: [0.98, 0, 0],
    foreground: [0.2, 0, 0],
  },
  // sky + dark
  {
    primary: [0.65, 0.3, 0.6122],
    secondary: [0.5, 0.2, 0.5],
    accent: [0.7, 0.4, 0.8],
    surface: [0.3, 0, 0],
    border: [0.3, 0, 0],
    success: [0.65, 0.302, 0.4019],
    danger: [0.65, 0.302, 0.0685],
    warning: [0.65, 0.302, 0.3185],
    info: [0.65, 0.302, 0.7492],
    background: [0.2, 0, 0],
    foreground: [0.98, 0, 0],
  },
  // pastel pink + light
  {
    primary: [0.737, 0.2568, 0.9818],
    secondary: [0.6, 0.2, 0.7],
    accent: [0.8, 0.3, 0.9],
    surface: [0.94, 0.0, 0.0],
    border: [0.9, 0.0, 0.0],
    success: [0.737, 0.2568, 0.4292],
    danger: [0.737, 0.2568, 0.0702],
    warning: [0.843, 0.1534, 0.2452],
    info: [0.818, 0.1784, 0.7301],
    background: [0.98, 0, 0],
    foreground: [0.2, 0, 0],
  },
  // pastel pink + dark
  {
    primary: [0.737, 0.2568, 0.9818],
    secondary: [0.6, 0.2, 0.7],
    accent: [0.8, 0.3, 0.9],
    surface: [0.3, 0, 0],
    border: [0.3, 0, 0],
    success: [0.737, 0.2568, 0.4292],
    danger: [0.737, 0.2568, 0.0702],
    warning: [0.843, 0.1534, 0.2452],
    info: [0.818, 0.1784, 0.7301],
    background: [0.2, 0, 0],
    foreground: [0.98, 0, 0],
  },
  // neon green + light
  {
    primary: [0.93, 0.2285, 0.3419],
    secondary: [0.7, 0.3, 0.5],
    accent: [0.9, 0.5, 0.6],
    surface: [0.94, 0.0, 0.0],
    border: [0.9, 0.0, 0.0],
    success: [0.737, 0.2568, 0.4292],
    danger: [0.737, 0.2568, 0.0702],
    warning: [0.843, 0.1534, 0.2452],
    info: [0.818, 0.1784, 0.7301],
    background: [0.98, 0, 0],
    foreground: [0.2, 0, 0],
  },
  // neon green + dark
  {
    primary: [0.93, 0.2285, 0.3419],
    secondary: [0.7, 0.3, 0.5],
    accent: [0.9, 0.5, 0.6],
    surface: [0.3, 0, 0],
    border: [0.3, 0, 0],
    success: [0.737, 0.2568, 0.4292],
    danger: [0.737, 0.2568, 0.0702],
    warning: [0.843, 0.1534, 0.2452],
    info: [0.818, 0.1784, 0.7301],
    background: [0.2, 0, 0],
    foreground: [0.98, 0, 0],
  },
  // amber + light
  {
    primary: [0.87, 0.1768, 0.251],
    secondary: [0.6, 0.2, 0.4],
    accent: [0.8, 0.3, 0.5],
    surface: [0.94, 0.0, 0.0],
    border: [0.9, 0.0, 0.0],
    success: [0.87, 0.1768, 0.3343],
    danger: [0.87, 0.1768, 0.0479],
    warning: [0.91, 0.1134, 0.2477],
    info: [0.87, 0.1768, 0.7698],
    background: [0.98, 0, 0],
    foreground: [0.2, 0, 0],
  },
  // amber + dark
  {
    primary: [0.87, 0.1768, 0.251],
    secondary: [0.6, 0.2, 0.4],
    accent: [0.8, 0.3, 0.5],
    surface: [0.3, 0, 0],
    border: [0.3, 0, 0],
    success: [0.87, 0.1768, 0.3343],
    danger: [0.87, 0.1768, 0.0479],
    warning: [0.91, 0.1134, 0.2477],
    info: [0.87, 0.1768, 0.7698],
    background: [0.2, 0, 0],
    foreground: [0.98, 0, 0],
  },
  // teal + light
  {
    primary: [0.4037, 0.828, 0.5426],
    secondary: [0.3, 0.6, 0.4],
    accent: [0.5, 0.7, 0.6],
    surface: [0.94, 0, 0],
    border: [0.94, 0, 0],
    success: [0.4037, 0.828, 0.4424],
    danger: [0.4037, 0.828, 0.1795],
    warning: [0.6768, 0.439, 0.2745],
    info: [0.4037, 0.828, 0.6726],
    background: [0.98, 0, 0],
    foreground: [0.2, 0, 0],
  },
  // teal + dark
  {
    primary: [0.4037, 0.828, 0.5426],
    secondary: [0.3, 0.6, 0.4],
    accent: [0.5, 0.7, 0.6],
    surface: [0.3, 0, 0],
    border: [0.3, 0, 0],
    success: [0.4037, 0.828, 0.4424],
    danger: [0.4037, 0.828, 0.1795],
    warning: [0.6768, 0.439, 0.2745],
    info: [0.4037, 0.828, 0.6726],
    background: [0.2, 0, 0],
    foreground: [0.98, 0, 0],
  },
  // vibrant blue-violet
  {
    primary: [0.548, 0.5987, 0.6637],
    secondary: [0.4, 0.5, 0.6],
    accent: [0.6, 0.7, 0.8],
    surface: [0.474, 0.5993, 0.5804],
    border: [0.474, 0.5993, 0.5804],
    success: [0.548, 0.5987, 0.4971],
    danger: [0.548, 0.5987, 0.1637],
    warning: [0.624, 0.4493, 0.2962],
    info: [0.548, 0.5987, 0.7962],
    background: [0.548, 0.5987, 0.5804],
    foreground: [0.98, 0.0, 0.0],
  },
];

const themeStore = useThemeStore();

if (Object.keys(themeStore.colors).length === 0)
  themeStore.colors = structuredClone(DEFAULT_PALETTES[0]);

const colorScales = ref([]);
const currentPaletteIdx = ref(0);
const currentColorName = ref('primary');
const currentColor = ref([...themeStore.colors[currentColorName.value]]);

function isDark(color) {
  if (typeof color !== 'string')
    color = renderColor(color, themeStore.colorMode);

  return new Color(color).contrastWCAG21('white') >= CONTRAST_THRESHOLD;
}

function previewColor(color) {
  const backgroundColor = renderColor(color, themeStore.colorMode);
  return {
    backgroundColor,
    color: themeStore.getContrastColor(backgroundColor),
  };
}

function generateScales() {
  const [l, c, h] = currentColor.value;

  colorScales.value = [];

  // Generate scales by varying the lightness (L) and chroma (C) values
  for (const stop of DEFAULT_STOPS) {
    const scaleValue = stop / 1000; // Normalize to 0-1 range
    colorScales.value.push([
      (l + (1 - scaleValue)) / 2,
      (c + scaleValue) / 2,
      h,
    ]);
  }
}

function clone(obj) {
  return structuredClone(obj);
}

function showCurrentPalette() {
  alert(JSON.stringify(themeStore.colors));
}

let isChanging = false;
watch(
  () => [currentColor.value],
  () => {
    if (isChanging) return;
    isChanging = true;

    setTimeout(() => {
      isChanging = false;
      themeStore.colors[currentColorName.value] = [...currentColor.value];
      generateScales();
    }, 20);
  },
);

onMounted(() => {
  generateScales();
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      class="flex flex-col items-center gap-6 2xl:flex-row 2xl:items-start flex-wrap"
    >
      <!-- color wheel -->
      <div class="flex flex-col gap-6 max-w-112 w-full shrink-0">
        <div class="w-full relative">
          <ColorWheel
            class="w-full"
            :value="currentColor"
            @select="
              (item) => {
                currentColor = item.value;
              }
            "
          />
        </div>
      </div>

      <!-- color scales -->
      <div class="flex w-full 2xl:w-12 2xl:flex-col 2xl:h-112">
        <button
          class="grow text-xs py-3 shrink-0 w-1/11 2xl:w-full 2xl:px-2 font-bold"
          v-for="(color, idx) in colorScales"
          :style="previewColor(color)"
          :key="idx"
          @click="themeStore.colors[currentColorName] = color"
        >
          {{ DEFAULT_STOPS[idx] }}
        </button>
      </div>

      <div
        class="flex flex-col w-full h-full justify-between 2xl:grow 2xl:w-auto 2xl:h-112"
      >
        <!-- defined pallete -->
        <div
          class="w-full grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2"
        >
          <button
            v-for="(palette, idx) in DEFAULT_PALETTES"
            :class="`flex items-end h-20 rounded-lg overflow-hidden cursor-pointer relative ${
              currentPaletteIdx === idx ? 'outline-2 outline-foreground' : ''
            }`"
            :style="previewColor(palette.primary)"
            @click="
              () => {
                themeStore.colors = clone(DEFAULT_PALETTES[idx]);
                currentPaletteIdx = idx;
              }
            "
          >
            <component
              class="w-5 h-5 top-2 right-2 absolute"
              :is="isDark(palette.background) ? MoonIcon : SunIcon"
            />
            <div
              class="grow h-3 border-t border-background"
              v-for="(color, name) in palette"
              :style="previewColor(color)"
            ></div>
          </button>
        </div>

        <div>
          <div class="h-[1px] bg-surface relative my-6">
            <button
              class="absolute -top-3 right-0 bg-background hover:bg-surface p-1 rounded cursor-pointer"
              @click="showCurrentPalette"
            >
              <ArrowDownTrayIcon class="w-4 h-4" />
            </button>
          </div>

          <!-- current palette -->
          <div
            class="w-full grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2"
          >
            <button
              :class="`p-2.5 rounded-lg text-center text-sm font-bold cursor-pointer ${
                currentColorName === name ? 'outline-2 outline-foreground' : ''
              }`"
              v-for="(color, name) in themeStore.colors"
              :key="name"
              :style="previewColor(color)"
              @click="currentColorName = name"
              @dblclick="
                () => {
                  currentColorName = name;
                  currentColor = themeStore.colors[name];
                }
              "
            >
              {{ name }}
            </button>
          </div>
        </div>
      </div>

      <!-- preview -->
      <div class="w-full flex flex-col gap-6 3xl:max-w-sm">
        <div class="flex items-center">
          <button
            :class="`text-xs font-bold uppercase cursor-pointer px-2 py-1 rounded ${
              themeStore.colorMode === value ? '' : 'opacity-30'
            }`"
            :style="
              themeStore.colorMode === value
                ? previewColor(themeStore.colors[currentColorName])
                : {}
            "
            v-for="(value, name) in COLOR_MODES"
            @click="themeStore.colorMode = value"
          >
            {{ name }}
          </button>

          <div
            class="grow px-2 py-1 select-all ml-2 font-mono text-sm"
            :style="previewColor(themeStore.colors[currentColorName])"
          >
            {{
              renderColor(
                themeStore.colors[currentColorName],
                themeStore.colorMode,
              )
            }}
          </div>
        </div>

        <div class="p-4 pt-6 border border-border rounded-lg relative">
          <span
            class="bg-background inline-block px-2 absolute left-2 -top-2 text-xs uppercase"
          >
            Preview
          </span>

          <Field
            label="Your name"
            helper-text="Enter your name"
            v-slot="{ id }"
          >
            <Input size="sm" :id="id" />
            <Button size="sm" outlined>
              <CheckIcon class="w-5 h-5 -mx-0.5" />
            </Button>
          </Field>
        </div>
      </div>
    </div>
  </div>
</template>
