import Color from 'colorjs.io';
import { Reactive, reactive, Ref, ref, ShallowReactive, ShallowRef } from 'vue';

const cache: ShallowReactive<any> = reactive({});
const root: ShallowRef<any> = ref();
const state: Reactive<any> = reactive({
  breakpointLg: 1024,
  adaptiveColors: [],
});
const isInitialize: Ref<boolean> = ref(false);

function updateTheme(newRootStyle: string = '') {
  if (newRootStyle) {
    // clear cache
    for (const key in cache) delete cache[key];

    // assign new style
    document.documentElement.setAttribute('style', newRootStyle);
  }

  // update
  const rootStyles = getComputedStyle(document.documentElement);
  const strBreakpointLg = rootStyles.getPropertyValue('--breakpoint-lg').trim();

  if (strBreakpointLg) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    state.breakpointLg = parseFloat(strBreakpointLg.replace(/rem$/, '')) * rootFontSize;
  }

  const foregroundColor = rootStyles.getPropertyValue('--color-foreground').trim();
  const backgroundColor = rootStyles.getPropertyValue('--color-background').trim();

  if (foregroundColor && backgroundColor) {
    state.adaptiveColors = [
      [new Color(foregroundColor).to('oklch').coords[0], foregroundColor],
      [new Color(backgroundColor).to('oklch').coords[0], backgroundColor],
    ];
  }

  root.value = rootStyles;
}

function toHash(raw: any) {
  if (Array.isArray(raw)) return raw.join(',');
  if (raw && typeof raw === 'object') return JSON.stringify(raw);
  return raw.toString();
}

function adaptColor(raw: string | number[]) {
  const hash = toHash(raw);

  if (cache[hash]) return cache[hash];

  const lightness = Array.isArray(raw) ? raw[0] : new Color(raw).to('oklch').coords[0];

  let maxDiff = 0;
  let maxColor;

  for (const [l, c] of state.adaptiveColors) {
    const diff = Math.abs(lightness - l);
    if (diff > maxDiff) {
      maxDiff = diff;
      maxColor = c;
    }
  }

  cache[hash] = maxColor || 'oklch(0% 0 0)';

  return cache[hash];
}

function getColor(name: string) {
  if (!root.value) return;

  return root.value.getPropertyValue(`--color-${name}`);
}

state.updateTheme = updateTheme;
state.adaptColor = adaptColor;
state.getColor = getColor;

export function useTheme() {
  if (!isInitialize.value) {
    isInitialize.value = true;
    updateTheme();
  }

  return state;
}
