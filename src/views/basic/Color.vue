<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Color from 'colorjs.io';
import ColorWheel from '@/components/ColorWheel.vue';
import LineGraph from '@/components/LineGraph.vue';
import { useTheme } from '@/theme';

// constants
const COLOR_DESCRIPTIONS = {
  primary: 'Main brand color used for emphasis, buttons, and key UI elements.',
  secondary: 'Supportive brand color that complements the primary color, often used for highlights or hover states.',
  accent: 'Used sparingly to draw attention to important UI elements like calls to action or badges.',
  surface: 'Neutral background color used for cards, modals, or elevated UI components.',
  border: 'Color used to define boundaries between UI elements, such as dividers, input outlines, and component edges.',
  success: 'Indicates successful operations or positive outcomes, such as form submissions or completed tasks.',
  danger: 'Used to signal errors, destructive actions, or critical problems needing immediate attention.',
  warning: 'Represents caution or potential issues, often used for non-critical alerts and messages.',
  info: 'Provides users with neutral, informative content or updates that require attention but no action.',
  muted: 'Low-contrast color typically used for disabled elements, secondary text, or de-emphasized UI parts.',
  background: 'Base color used for the main page background to support content and maintain readability.',
  foreground: 'Main color for text and essential content that appears on top of backgrounds or surfaces.',
  black: 'Used for deep contrast, text, or shadow effects in dark themes or overlays.',
  white: 'Clean, neutral color often used for content backgrounds, whitespace, or light UI themes.',
};

const COLOR_MODES = {
  OKLCH: 'oklch',
  RGB: 'rgb',
  HEX: 'hex',
};

const DEFAULT_STOP = 500;
const DEFAULT_STOPS = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000];

// utils
function renderColor(color, mode = COLOR_MODES.OKLCH) {
  const [l, c, h] = color;
  const textColor = `oklch(${Math.floor(l * 1000) / 10}% ${Math.floor(c * 1000) / 1000} ${
    Math.floor(h * 360 * 1000) / 1000
  })`;

  if (mode === COLOR_MODES.OKLCH) return textColor;

  const colorObject = new Color(textColor);
  const [r, g, b] = colorObject.to('srgb', { inGamut: true }).coords.map((x) => Math.round(x * 255));

  if (mode === COLOR_MODES.RGB) return `rgb(${r} ${g} ${b})`;

  if (mode === COLOR_MODES.HEX)
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// variables
const theme = useTheme();
if (!theme.colors)
  theme.colors = {
    primary: [0.65, 0.3, 0.6122],
    secondary: [0.65, 0.3, 0.2789],
    accent: [0.65, 0.3, 0.9455],
    surface: [0.94, 0, 0],
    border: [0.8, 0, 0],
    success: [0.65, 0.302, 0.4019],
    danger: [0.65, 0.302, 0.0685],
    warning: [0.65, 0.302, 0.3185],
    info: [0.65, 0.302, 0.7492],
    muted: [0.5, 0, 0],
    background: [0.98, 0, 0],
    foreground: [0.2, 0, 0],
    black: [0, 0, 0],
    white: [1, 0, 0],
  };

const schemaColors = ref([]);
const colors = reactive(theme.colors);
const currentColorName = ref('primary');
const currentWheelColor = ref(colors.primary);
const colorMode = ref(COLOR_MODES.OKLCH);
const palettes = ref([]);

const colorTheme = computed(() => {
  let content = '';
  for (const key in colors) {
    content += `--color-${key}: ${renderColor(colors[key], colorMode.value)};\n`;
  }
  return content;
});

const paletteTheme = computed(() => {
  let content = '';
  for (const item of (palettes.value[0] || []).slice(1, -1)) {
    content += `--color-${currentColorName.value}-${item.stop}: ${renderColor(item.color, colorMode.value)};\n`;
  }
  return content;
});

function hexToRGB(H) {
  if (H.length === 6 && !H.startsWith(`#`)) {
    H = `#${H}`;
  }

  let r = `0`;
  let g = `0`;
  let b = `0`;
  if (H.length === 4) {
    r = `0x${H[1]}${H[1]}`;
    g = `0x${H[2]}${H[2]}`;
    b = `0x${H[3]}${H[3]}`;
  } else if (H.length === 7) {
    r = `0x${H[1]}${H[2]}`;
    g = `0x${H[3]}${H[4]}`;
    b = `0x${H[5]}${H[6]}`;
  }

  return { r, g, b };
}

function hexToHSL(H) {
  if (H.length === 6 && !H.startsWith(`#`)) {
    H = `#${H}`;
  }

  // Convert hex to RGB first
  let { r, g, b } = hexToRGB(H);
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
  return { h, s, l };
}

function unsignedModulo(x, n) {
  return ((x % n) + n) % n;
}

function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

function createSaturationScale(tweak = 0, stop = DEFAULT_STOP) {
  const stops = DEFAULT_STOPS;
  const index = stops.indexOf(stop);

  if (index === -1) {
    throw new Error(`Invalid key value: ${stop}`);
  }

  return stops.map((stop) => {
    const diff = Math.abs(stops.indexOf(stop) - index);
    const tweakValue = tweak ? Math.round((diff + 1) * tweak * (1 + diff / 10)) : 0;

    if (tweakValue > 100) {
      return { stop, tweak: 100 };
    }

    return { stop, tweak: tweakValue };
  });
}

function createHueScale(tweak = 0, stop = DEFAULT_STOP) {
  const stops = DEFAULT_STOPS;
  const index = stops.indexOf(stop);

  if (index === -1) {
    throw new Error(`Invalid parameter value: ${stop}`);
  }

  return stops.map((stop) => {
    const diff = Math.abs(stops.indexOf(stop) - index);
    const tweakValue = tweak ? diff * tweak : 0;

    return { stop, tweak: tweakValue };
  });
}

function createDistributionValues(min = 0, max = 100, lightness, stop = DEFAULT_STOP) {
  const stops = DEFAULT_STOPS;

  // Create known stops
  const newValues = [
    { stop: 0, tweak: max },
    { stop, tweak: lightness },
    { stop: 1000, tweak: min },
  ];

  // Create missing stops
  for (let i = 0; i < stops.length; i++) {
    const stopValue = stops[i];

    if (stopValue === 0 || stopValue === 1000 || stopValue === stop) {
      continue;
    }

    const diff = Math.abs((stopValue - stop) / 100);
    const totalDiff =
      stopValue < stop
        ? Math.abs(stops.indexOf(stop) - stops.indexOf(DEFAULT_STOPS[0])) - 1
        : Math.abs(stops.indexOf(stop) - stops.indexOf(DEFAULT_STOPS[DEFAULT_STOPS.length - 1])) - 1;
    const increment = stopValue < stop ? max - lightness : lightness - min;

    const tweak =
      stopValue < stop ? (increment / totalDiff) * diff + lightness : lightness - (increment / totalDiff) * diff;

    newValues.push({ stop: stopValue, tweak: Math.round(tweak) });
  }

  newValues.sort((a, b) => a.stop - b.stop);

  return newValues;
}

function createSwatches(value) {
  const valueStop = 500;
  const lMin = 20;
  const lMax = 98;

  const hueScale = createHueScale(0, valueStop);
  const saturationScale = createSaturationScale(0, valueStop);

  // Get the base hex's H/S/L values
  const { h: valueH, s: valueS, l: valueL } = hexToHSL(value);

  // Create lightness scales based on tweak
  const distributionScale = createDistributionValues(lMin, lMax, valueL, valueStop);

  const swatches = hueScale.map(({ stop }, stopIndex) => {
    const newH = unsignedModulo(valueH + hueScale[stopIndex].tweak, 360);
    const newS = clamp(valueS + saturationScale[stopIndex].tweak, 0, 100);
    let newL = distributionScale[stopIndex].tweak;
    newL = clamp(newL, 0, 100);

    const newColor = new Color(`hsl(${newH}, ${newS}%, ${newL}%)`).to('oklch').coords;

    return {
      stop,
      color: [newColor[0], newColor[1], isNaN(newColor[2]) ? 0 : newColor[2] / 360],
      lightness: newColor[0],
    };
  });

  return swatches;
}

function changeColor(color, changePalette = true) {
  colors[currentColorName.value] = color;

  if (changePalette) {
    const hexColor = renderColor(color, COLOR_MODES.HEX);
    palettes.value = [createSwatches(hexColor)];
  }
}

function previewColor(color) {
  return {
    backgroundColor: renderColor(color, colorMode.value),
    color: theme.adaptColor(color),
  };
}

onMounted(() => {
  changeColor(colors.primary);
});

watch(
  () => colorTheme.value,
  () => {
    theme.updateTheme(colorTheme.value);
  },
);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-4xl font-black uppercase">Colors</h1>

    <div class="flex flex-col items-center gap-6 xl:flex-row xl:items-start">
      <div class="max-w-92 w-full relative">
        <ColorWheel class="w-full" :value="currentWheelColor" @select="(data) => changeColor(data.value)" />

        <LineGraph
          v-if="palettes[0]"
          class="w-14 absolute bottom-0 -right-3 bg-surface rounded-lg xl:w-16"
          :data="palettes[0].slice(1, -1)"
          x="stop"
          y="lightness"
        />
      </div>

      <div v-for="palette in palettes" class="flex w-full xl:w-12 xl:flex-col xl:h-92">
        <button
          class="grow text-xs py-2 shrink-0 xl:px-2 font-bold"
          v-for="item in palette.slice(1, -1)"
          :style="previewColor(item.color)"
          @click="changeColor(item.color, false)"
        >
          {{ item.stop }}
        </button>
      </div>

      <div class="w-full grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2">
        <button
          :class="`text-left block inline-flex items-start flex-col rounded-xl px-4 py-3 gap-1 ${
            currentColorName === name ? 'outline-3 outline-foreground dark:outline-background' : ''
          }`"
          :style="previewColor(colors[name])"
          v-for="(desc, name) in COLOR_DESCRIPTIONS"
          @click="currentColorName = name"
          @dblclick="
            () => {
              currentColorName = name;
              currentWheelColor = colors[name];
            }
          "
        >
          <h3 class="text-lg font-black uppercase">{{ name }}</h3>
          <p class="text-sm">{{ desc }}</p>
        </button>
      </div>

      <div class="w-full flex flex-col gap-2 xl:max-w-sm">
        <div class="flex items-center">
          <button
            :class="`text-xs font-bold uppercase cursor-pointer px-2 py-1 rounded-lg ${
              colorMode === value ? '' : 'opacity-30'
            }`"
            :style="colorMode === value ? previewColor(colors[currentColorName]) : {}"
            v-for="(value, name) in COLOR_MODES"
            @click="colorMode = value"
          >
            {{ name }}
          </button>

          <div
            class="grow rounded-lg px-2 py-1 select-all ml-2 font-mono text-sm"
            :style="previewColor(colors[currentColorName])"
          >
            {{ renderColor(colors[currentColorName], colorMode) }}
          </div>
        </div>
        <div class="w-full overflow-auto p-4 rounded-lg text-xs leading-5" :style="previewColor(colors.surface)">
          <pre class="select-all">{{ colorTheme }}</pre>
        </div>

        <div class="w-full overflow-auto p-4 rounded-lg text-xs leading-5" :style="previewColor(colors.surface)">
          <pre class="select-all">{{ paletteTheme }}</pre>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-black">References</h2>
      <ul class="list-disc ml-5">
        <li>
          <a href="https://www.understandingaccessibility.com/" class="text-primary underline" target="_blank"
            >Understanding Accessibility</a
          >
        </li>
        <li>
          <a href="https://oklch.com/" class="text-primary underline" target="_blank">OKLCH Color Picker & Converter</a>
        </li>
        <li>
          <a href="https://www.tints.dev/" class="text-primary underline" target="_blank">Tints - Palette Generator</a>
        </li>
        <li>
          <a href="https://coolors.co/contrast-checker/" class="text-primary underline" target="_blank"
            >Color Contrast Checker</a
          >
        </li>
        <li>
          <a href="https://buttonbuddy.dev/" class="text-primary underline" target="_blank">ButtonBuddy</a>
        </li>
      </ul>
    </div>

    <!-- fallback colors -->
    <div
      class="text-primary text-secondary text-accent text-surface text-success text-danger text-warning text-info text-muted text-background text-foreground text-black text-white hidden"
    ></div>
    <div
      class="hover:text-primary hover:text-secondary hover:text-accent hover:text-surface hover:text-success hover:text-danger hover:text-warning hover:text-info hover:text-muted hover:text-background hover:text-foreground hover:text-black hover:text-white hover:hidden"
    ></div>
    <div
      class="bg-primary bg-secondary bg-accent bg-surface bg-success bg-danger bg-warning bg-info bg-muted bg-background bg-foreground bg-black bg-white hidden"
    ></div>
    <div
      class="hover:bg-primary hover:bg-secondary hover:bg-accent hover:bg-surface hover:bg-success hover:bg-danger hover:bg-warning hover:bg-info hover:bg-muted hover:bg-background hover:bg-foreground hover:bg-black hover:bg-white hover:hidden"
    ></div>
  </div>
</template>
