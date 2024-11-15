<script setup>
import { computed, ref } from 'vue';
import codes from '../code';
import CodePreview from '../test/CodePreview.vue';
import vMask from '../mask/mask';
import ColorPicker from '../color-picker/ColorPicker.vue';

const colors = [
  '#ef3c44',
  '#f92c16',
  '#f5350b',
  '#ea4608',
  '#848516',
  '#22925e',
  '#109181',
  '#0686d4',
  '#0e82e9',
  '#3b7cf6',
  '#6376f1',
  '#8b67f6',
  '#a857f7',
  '#d91fef',
  '#ec2c99',
  '#f42e5e',
];

const primaryColor = ref('');

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

const styleCSS = computed(() => {
  if (!primaryColor.value) return codes['style.css'];
  return codes['style.css'].replace(/--primary:.*?;/g, `--primary: ${hexToRgb(primaryColor.value).join(' ')};`);
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="rounded-lg border border-secondary p-4 flex flex-col gap-4">
      <h1 class="text-3xl leading-9 font-bold tracking-wider">Walli UI</h1>
      <p>A copy&paste UI components.</p>

      <h2 class="text-2xl leading-8 font-bold tracking-wider">Install</h2>

      <CodePreview>
        <pre>
npm create vite@latest app -- --template vue-ts
cd app</pre
        >
      </CodePreview>
      <CodePreview><pre>npm install</pre></CodePreview>
      <CodePreview><pre>npm install @wal-li/ui</pre></CodePreview>
      <CodePreview><pre>npm install -D tailwindcss postcss autoprefixer</pre></CodePreview>
      <CodePreview><pre>npx tailwindcss init -p</pre></CodePreview>

      <p>Update <code class="font-mono bg-secondary rounded p-1 select-all">tailwind.config.js</code></p>
      <CodePreview>
        <pre>
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-background',
    'bg-foreground',
    'bg-primary',
    'bg-secondary',
    'bg-muted',
    'bg-danger',
    'bg-success',
    'bg-info',
    'bg-warn',
    'text-background',
    'text-foreground',
    'text-primary',
    'text-secondary',
    'text-muted',
    'text-danger',
    'text-success',
    'text-info',
    'text-warn',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        primary: 'rgb(var(--primary))',
        secondary: 'rgb(var(--secondary))',
        muted: 'rgb(var(--muted))',
        danger: 'rgb(var(--danger))',
        success: 'rgb(var(--success))',
        info: 'rgb(var(--info))',
        warn: 'rgb(var(--warn))',
      },
    },
  },
  plugins: [],
}</pre
        >
      </CodePreview>

      <p>Edit <code class="font-mono bg-secondary rounded p-1 select-all">src/style.css</code></p>
      <div class="flex flex-col gap-4 items-start lg:flex-row">
        <CodePreview class="font-mono bg-secondary p-4 rounded w-full">
          <pre>{{ styleCSS }}</pre>
        </CodePreview>

        <div class="top-4 flex flex-col gap-4 order-first bg-background w-full lg:sticky lg:w-[11rem] lg:order-last">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium leading-4">Primary Color</label>
            <ColorPicker v-model="primaryColor" />
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              class="w-8 h-8 rounded-full border"
              :style="{ backgroundColor: `${color}` }"
              v-for="color in colors"
              @click="primaryColor = color"
            ></button>
          </div>
        </div>
      </div>

      <h2 class="text-2xl leading-8 font-bold tracking-wider">Design</h2>

      <p>
        <a
          class="underline"
          href="https://www.figma.com/design/5AXQbITEUIa7eq4jcWsENm/%40wal-li%2Fui---v2?node-id=3024-226&t=7BNC9WK5lgItUdBW-1"
          target="_blank"
          >Figma</a
        >
      </p>
    </div>
  </div>
</template>
