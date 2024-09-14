<script setup>
/**
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 * https://tailwindcss.com/docs/customizing-colors
 * https://coolors.co/contrast-checker
 * https://buttonbuddy.dev/
 */

import { ref, computed, onMounted } from 'vue';
import Heading from '../heading/Heading.vue';
import Input from '../input/Input.vue';
import Field from '../input/Field.vue';
import ColorPicker from '../color-picker/ColorPicker.vue';

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const BLACK = '#181818';
const WHITE = '#f5f5f5';

const GAMMA = 2.4;

const DEFAULT_STOP = 500;
const DEFAULT_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const primaryColor = ref('#1a85e2');
const secondaryColor = ref(BLACK);
const baseLuminance = ref(0.22);
const canvasRef = ref();

const selectedPallete = ref(DEFAULT_STOPS.map(() => ''));
const selectedIndex = ref(-1);

const baseColors = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
];

function lumi(v) {
  v /= 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
}

function ilum(l) {
  const v = l <= 0.03928 / 12.92 ? l * 12.92 : 1.055 * Math.pow(l, 1 / GAMMA) - 0.055;
  return Math.floor(v * 255);
}

function luminance(r, g, b) {
  const a = [r, g, b].map(lumi);
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrast(color1, color2) {
  const lum1 = luminance(...color1);
  const lum2 = luminance(...color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function hexToRgb(str) {
  str = str
    .toLowerCase()
    .replace(/[^0-9a-f]/g, '')
    .padEnd(6, '0');
  const r = parseInt(str.substring(0, 2) || '0', 16);
  const g = parseInt(str.substring(2, 4) || '0', 16);
  const b = parseInt(str.substring(4, 6) || '0', 16);

  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return '#' + r.toString(16).padStart(2, 0) + g.toString(16).padStart(2, 0) + b.toString(16).padStart(2, 0);
}

function round(value, precision = 0) {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

function rounded(v) {
  return round(v, 2);
}

function adjustLuminance(r, g, b, lum) {
  const lr = lumi(r);
  const lg = lumi(g);
  const lb = lumi(b);

  const adj = lum - (lr * RED + lg * GREEN + lb * BLUE);

  const alr = lr + adj / RED;
  const alg = lg + adj / GREEN;
  const alb = lb + adj / BLUE;

  return [alr, alg, alb].map((l) => {});
}

function rgbToHsl(r, g, b) {
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  //   return `hsl(${h},${s}%,${l}%)`;
  return [h, s, l];
}

function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

function hslToRgb(h, s, l) {
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function pickCanvasColor(e) {
  const lum = parseFloat(baseLuminance.value);

  const bb = canvasRef.value.getBoundingClientRect();
  const b = e.pageX - bb.x;
  const r = e.pageY - bb.y;

  primaryColor.value = rgbToHex(...rblToRgb(r, b, lum));
}

function rblToRgb(r, b, l) {
  const lr = lumi(r);
  const lb = lumi(b);
  const lg = (l - (lr * RED + lb * BLUE)) / GREEN;
  const g = clamp(ilum(lg), 0, 255);

  return [r, g, b];
}

function drawCanvas() {
  const lum = parseFloat(baseLuminance.value);

  canvasRef.value.width = 256;
  canvasRef.value.height = 256;

  const ctx = canvasRef.value.getContext('2d');

  const STOP = 1;

  for (let r = 0; r < 256; r += STOP)
    for (let b = 0; b < 256; b += STOP) {
      ctx.fillStyle = rgbToHex(...rblToRgb(r, b, lum));
      ctx.fillRect(r, b, STOP, STOP);
    }
}

function createStops(y) {
  const x = DEFAULT_STOP / 1000;
  const a = (y - x) / (x * (x - 1));
  const b = 1 - a;

  const res = [];
  for (const stop of DEFAULT_STOPS) {
    const tx = stop / 1000;
    const nl = a * tx * tx + b * tx;
    res.push(nl);
  }

  return res;
}

function createLuminancePallete(color) {
  const lum = parseFloat(baseLuminance.value);

  const rgb = hexToRgb(color);

  return createStops(lum)
    .map((nl) => rgbToHex(...rblToRgb(rgb[0], rgb[2], nl)))
    .reverse();
}

function createSaturationPallete(color) {
  const hsl = rgbToHsl(...hexToRgb(color));

  const newS = createStops(hsl[1] / 100).map((step) => 100 * step);
  const newL = createStops(hsl[2] / 100).map((step) => 100 * step);

  return newS.map((s, i) => rgbToHex(...hslToRgb(hsl[0], s, newL[i]))).reverse();
}

function bestContrastColor(color) {
  const rgb = hexToRgb(color);
  const cb = contrast(rgb, hexToRgb(BLACK));
  const cw = contrast(rgb, hexToRgb(WHITE));

  return cb > cw ? BLACK : WHITE;
}

function selectPalleteColor(color) {
  const nextIndex = selectedIndex.value === -1 ? selectedPallete.value.indexOf('') : selectedIndex.value;
  if (nextIndex === -1) return;

  selectedPallete.value[nextIndex] = color;
}

function selectPrimaryColor(color) {
  primaryColor.value = color;

  selectPalleteColor(color);
}

const colorGrid = computed(() => {
  const lum = parseFloat(baseLuminance.value);
  const res = [];

  for (const baseColor of baseColors) {
    const [r, g, b] = hexToRgb(baseColor);

    const reLumColor = rgbToHex(...rblToRgb(r, b, lum));

    const pallete = createSaturationPallete(reLumColor).slice(1, -1);

    res.push([baseColor, reLumColor, ...pallete]);
  }
  return res;
});

function exportPallete() {
  prompt('Copy your pallete', JSON.stringify(selectedPallete.value.map((c, i) => ({ [DEFAULT_STOPS[i]]: c }))));
}

const primarySecondaryContrast = computed(() => contrast(hexToRgb(primaryColor.value), hexToRgb(secondaryColor.value)));
const palletes = computed(() => [
  createLuminancePallete(primaryColor.value),
  createSaturationPallete(primaryColor.value),
]);

onMounted(() => {
  drawCanvas();
});
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 mb-4 items-center">
    <div>
      <canvas ref="canvasRef" @click="pickCanvasColor"></canvas>
    </div>

    <div class="flex flex-col gap-4 flex-1 w-full">
      <Field label="Base Luminance" v-slot="{ id }">
        <Input type="number" :id="id" v-model="baseLuminance" @change="drawCanvas" />
      </Field>

      <Field class="w-full relative" label="Primary Color">
        <ColorPicker v-model="primaryColor" />
        <button class="absolute p-1.5 top-7 right-1" @click="selectPalleteColor(primaryColor)">
          <i class="pi pi-wrench"></i>
        </button>
      </Field>

      <Field class="w-full relative" label="Secondary Color">
        <ColorPicker v-model="secondaryColor" />
        <button class="absolute p-1.5 top-7 right-1" @click="selectPalleteColor(secondaryColor)">
          <i class="pi pi-wrench"></i>
        </button>
      </Field>
    </div>
  </div>

  <table class="table table-fixed text-sm w-full mb-4">
    <tbody>
      <tr>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2">Luminance</td>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2 w-12 text-center">
          {{ rounded(luminance(...hexToRgb(primaryColor))) }}
        </td>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2">
          {{ rounded(luminance(...hexToRgb(secondaryColor))) }}
        </td>
      </tr>
      <tr>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2">Contrast</td>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2 w-12 text-center">
          {{ rounded(primarySecondaryContrast) }}
        </td>
        <td
          class="border border-secondary-300 dark:border-secondary-700 px-3 py-2"
          :style="{ backgroundColor: primaryColor, color: secondaryColor }"
        >
          <b>Lorem</b> ipsum <i>dolor</i> <u>sit</u> <span class="line-through">hamet</span>.
        </td>
      </tr>
      <tr>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2">AA Large Text</td>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2 w-12 text-center">3</td>
        <td
          :class="`font-semibold text-xs uppercase border border-secondary-300 dark:border-secondary-700 px-3 py-2 ${
            primarySecondaryContrast >= 3 ? 'bg-success' : 'bg-danger'
          }`"
        >
          {{ primarySecondaryContrast >= 3 ? 'OK' : 'Huh?' }}
        </td>
      </tr>
      <tr>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2">
          AA Small Text, AAA Large Text, Button
        </td>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2 w-12 text-center">4.5</td>
        <td
          :class="`font-semibold text-xs uppercase border border-secondary-300 dark:border-secondary-700 px-3 py-2 ${
            primarySecondaryContrast >= 4.5 ? 'bg-success' : 'bg-danger'
          }`"
        >
          {{ primarySecondaryContrast >= 4.5 ? 'OK' : 'Huh?' }}
        </td>
      </tr>
      <tr>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2">AAA Small Text</td>
        <td class="border border-secondary-300 dark:border-secondary-700 px-3 py-2 w-12 text-center">7</td>
        <td
          :class="`font-semibold text-xs uppercase border border-secondary-300 dark:border-secondary-700 px-3 py-2 ${
            primarySecondaryContrast >= 7 ? 'bg-success' : 'bg-danger'
          }`"
        >
          {{ primarySecondaryContrast >= 7 ? 'OK' : 'Huh?' }}
        </td>
      </tr>
    </tbody>
  </table>

  <div class="mb-4">
    <div class="flex">
      <span
        class="w-[9.09%] overflow-hidden block text-xs uppercase px-2 py-1 text-center"
        v-for="stop in DEFAULT_STOPS"
        >{{ stop }}</span
      >
    </div>

    <div class="text-sm flex mb-2" v-for="pallete in palletes">
      <button class="w-[9.09%] overflow-hidden" v-for="(color, index) in pallete" @click="selectPalleteColor(color)">
        <div class="text-center px-2 py-1" :style="{ backgroundColor: color, color: bestContrastColor(color) }">
          <span class="block text-xs font-lighter w-full">{{ color }}</span>
          <span class="block font-semibold">{{ rounded(luminance(...hexToRgb(color))) }}</span>
        </div>
      </button>
    </div>
  </div>

  <div class="mb-4">
    <div class="text-xs uppercase flex">
      <div class="text-center px-2 py-1 w-[9.09%] overflow-hidden">Origin</div>
      <div class="text-center px-2 py-1 w-[9.09%] overflow-hidden">Base</div>
      <div class="text-center px-2 py-1 w-[9.09%] overflow-hidden" v-for="stop in DEFAULT_STOPS.slice(1, -1)">
        {{ stop }}
      </div>
    </div>
    <div class="text-sm flex" v-for="row in colorGrid">
      <button
        class="w-[9.09%] overflow-hidden hover:outline outline-2 -outline-offset-2"
        v-for="color in row"
        @click="selectPrimaryColor(color)"
      >
        <div class="text-center px-2 py-1 w-full" :style="{ backgroundColor: color, color: bestContrastColor(color) }">
          <span class="block text-xs font-lighter">{{ color }}</span>
          <span class="block font-semibold">{{ rounded(luminance(...hexToRgb(color))) }}</span>
        </div>
      </button>
    </div>
  </div>

  <div
    class="sticky flex bottom-0 left-0 w-full bg-white border-t border-secondary-300 dark:border-pureblack z-40 py-2 dark:bg-black z-30"
  >
    <button
      :class="`w-[8.8%] overflow-hidden h-20 flex flex-col justify-between items-center ${
        selectedIndex === i ? 'outline outline-2 -outline-offset-2' : ''
      }`"
      v-for="(color, i) in selectedPallete"
      @click="selectedIndex = i"
    >
      <div class="block text-xs uppercase px-2 py-1 text-center">{{ DEFAULT_STOPS[i] }}</div>
      <div
        class="text-center px-2 py-1 w-full flex-1 flex flex-col justify-center items-center"
        :style="{ backgroundColor: color, color: bestContrastColor(color) }"
      >
        <span class="block text-xs font-lighter">{{ color }}</span>
        <span class="block font-semibold">{{ rounded(luminance(...hexToRgb(color))) }}</span>
      </div>
    </button>
    <button class="flex flex-1 items-center justify-end h-20" @click="exportPallete">
      <i class="pi pi-file-export"></i>
    </button>
  </div>
</template>
