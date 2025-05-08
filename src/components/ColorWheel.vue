<script setup>
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, render, watch } from 'vue';

// input
const props = defineProps(['value']);
const emits = defineEmits(['select']);

// constants
const WIDTH = 280;
const HEIGHT = 280;
const NO_PARTS = 360;
const CIRCLE_ANGLE = 2 * Math.PI;
const OUTER_RADIUS = WIDTH / 2;
const INNER_RADIUS = WIDTH * 0.375;
const WATCH_RADIUS = (((OUTER_RADIUS - INNER_RADIUS) / 2) * 3) / 4;
const WATCH_PADDING = (OUTER_RADIUS - INNER_RADIUS) / 2 / 8;
const PADDING = WIDTH / 20;
const LC_OUTER_RADIUS = INNER_RADIUS - PADDING;
const LC_INNER_RADIUS = INNER_RADIUS - PADDING * 2.5;
const REDUCE_SPACE = 0.001;
const SURFACE_COLOR = '#e0e0e0';
const BACKGROUND_COLOR = '#424242';
const SCHEMA_MODES = [
  /* monochromatic */ [0],
  /* analogous */ [-1 / 12, 0, 1 / 12],
  /* complementary */ [0, 6 / 12],
  /* triad */ [-4 / 12, 0, 4 / 12],
  /* Split Complementary */ [-5 / 12, 0, 5 / 12],
  /* square */ [-3 / 12, 0, 3 / 12, 6 / 12],
];

// utils
function toCoord(value, radius) {
  const angle = value * CIRCLE_ANGLE;
  return [Math.sin(angle) * radius, -Math.cos(angle) * radius];
}

function placePart(from, to, outerR, innerR) {
  const outerFrom = toCoord(from, outerR);
  const outerTo = toCoord(to, outerR);

  const innerFrom = toCoord(from, innerR);
  const innerTo = toCoord(to, innerR);

  return `M ${innerFrom[0]} ${innerFrom[1]} L ${outerFrom[0]} ${outerFrom[1]} L ${outerTo[0]} ${outerTo[1]} L ${innerTo[0]} ${innerTo[1]}Z`;
}

function renderColor(l, c, h) {
  return `oklch(${Math.floor(l * 1000) / 10}% ${Math.floor(c * 1000) / 1000} ${Math.floor(h * 360 * 1000) / 1000})`;
}

// color wheel
const PARTS = [];
for (let i = 0; i < NO_PARTS; i++) {
  const value = i / NO_PARTS;

  const from = value - 1 / NO_PARTS / 2;
  const to = value + REDUCE_SPACE + 1 / NO_PARTS / 2;

  PARTS.push({
    value,
    path: placePart(from, to, OUTER_RADIUS, INNER_RADIUS),
  });
}

// variables
const colorWheelRef = ref();

const l = ref(props.value?.[0] || 0.7);
const c = ref(props.value?.[1] || 0.3);
const h = ref(props.value?.[2] || 0);

const schemaIdx = ref(0);

const wheelParts = computed(() => {
  return PARTS.map((part) => ({
    ...part,
    color: renderColor(l.value, c.value, part.value),
  }));
});

const colorPoints = computed(() => {
  const points = [];

  for (const offset of SCHEMA_MODES[schemaIdx.value]) {
    const value = h.value + offset;
    const point = {
      offset,
      value: [l.value, c.value, value],
      position: toCoord(value, (OUTER_RADIUS + INNER_RADIUS) / 2),
      color: renderColor(l.value, c.value, value),
    };

    points.push(point);
  }

  return points;
});

const lightnessParts = computed(() => {
  const from = 0.5;
  const to = 1;

  const partSize = 1 / NO_PARTS;
  const result = [];
  for (let i = from; i <= to; i += partSize) {
    const value = (i - from) / (to - from);
    result.push({
      value,
      path: placePart(i, i + partSize + REDUCE_SPACE, LC_OUTER_RADIUS, LC_INNER_RADIUS),
      color: value <= l.value ? renderColor(value, c.value, h.value) : SURFACE_COLOR,
    });
  }

  return result;
});

const chromaParts = computed(() => {
  const from = 0.5;
  const to = 0;

  const partSize = 1 / NO_PARTS;
  const result = [];
  for (let i = from; i > to; i -= partSize) {
    const value = (i - from) / (to - from);
    result.push({
      value,
      path: placePart(i, i + partSize + REDUCE_SPACE, LC_OUTER_RADIUS, LC_INNER_RADIUS),
      color: value <= c.value ? renderColor(l.value, value, h.value) : SURFACE_COLOR,
    });
  }

  return result;
});

// actions
let pickerMode;

function pickColor(e) {
  const bbox = colorWheelRef.value.getBoundingClientRect();

  const x = e.clientX - bbox.x - bbox.width / 2;
  const y = e.clientY - bbox.y - bbox.height / 2;

  const rad = Math.atan2(x, -y);
  const value = rad / CIRCLE_ANGLE + (rad < 0 ? 1 : 0);

  const distance = (Math.sqrt(x * x + y * y) / bbox.width) * WIDTH;

  if (pickerMode === 'h' || (!pickerMode && distance >= INNER_RADIUS)) {
    pickerMode = 'h';
    h.value = value;
  } else if (pickerMode === 'l' || (!pickerMode && distance >= LC_INNER_RADIUS && value >= 0.5)) {
    pickerMode = 'l';
    if (value >= 0.5 && value < 1) l.value = (value - 0.5) * 2;
  } else if (pickerMode === 'c' || (!pickerMode && distance >= LC_INNER_RADIUS && value < 0.5)) {
    pickerMode = 'c';
    if (value >= 0 && value < 0.5) c.value = 1 - value * 2;
  }
}

let selectTimeout;
let latestSelectValue;
function doSelect(value) {
  latestSelectValue = value;
  if (selectTimeout) return;

  selectTimeout = setTimeout(() => {
    emits('select', latestSelectValue);
    selectTimeout = null;
  }, 1000 / 60);
}

function pickePoint(point) {
  doSelect({
    value: point.value,
    color: point.color,
  });
}

// events
let isMouseDown = false;
function mouseDown(e) {
  if (e.target.getAttribute('disabled') === 'true') return;

  isMouseDown = true;

  pickColor(e);
}

function mouseMove(e) {
  if (!isMouseDown) return;

  pickColor(e);
}

function mouseUp(e) {
  if (!isMouseDown) return;
  pickColor(e);

  isMouseDown = false;
  pickerMode = null;
}

onMounted(() => {
  colorWheelRef.value.addEventListener('mousedown', mouseDown);
  window.addEventListener('mousemove', mouseMove);
  window.addEventListener('mouseup', mouseUp);
});

onBeforeUnmount(() => {
  colorWheelRef.value.removeEventListener('mousedown', mouseDown);
  window.removeEventListener('mousemove', mouseMove);
  window.removeEventListener('mouseup', mouseUp);
});

watch(
  () => [l.value, c.value, h.value],
  () => {
    doSelect({
      value: [l.value, c.value, h.value],
      color: renderColor(l.value, c.value, h.value),
    });
  },
);

watch(
  () => [props.value],
  () => {
    if (!props.value || !Array.isArray(props.value) || props.value.length !== 3) return;
    if (props.value?.[0] === l.value && props.value?.[1] === c.value && props.value?.[2] === h.value) return;

    l.value = props.value[0];
    c.value = props.value[1];
    h.value = props.value[2];

    console.log('update color');
  },
);
</script>

<template>
  <svg
    class="select-none"
    :viewBox="`-${WIDTH / 2} -${HEIGHT / 2} ${WIDTH} ${HEIGHT}`"
    xmlns="http://www.w3.org/2000/svg"
    ref="colorWheelRef"
  >
    <path v-for="part in wheelParts" :d="part.path" :style="`fill: ${part.color}`" />
    <circle
      v-for="point in colorPoints"
      :cx="point.position[0]"
      :cy="point.position[1]"
      :r="WATCH_RADIUS"
      stroke="#ffffff"
      :stroke-width="point.offset === 0 ? WATCH_PADDING * 2 : WATCH_PADDING"
      :style="`fill: ${point.color}`"
      @click="pickePoint(point)"
      :disabled="point.offset === 0 ? false : true"
    />
    <path v-for="lPart in lightnessParts" :d="lPart.path" :style="`fill: ${lPart.color}`" />
    <path v-for="cPart in chromaParts" :d="cPart.path" :style="`fill: ${cPart.color}`" />

    <!-- Top-left box (L) -->
    <rect x="-34" y="-34" width="32" height="32" rx="6" :fill="SURFACE_COLOR" />

    <!-- Top-right box (C) -->
    <rect x="2" y="-34" width="32" height="32" rx="6" :fill="SURFACE_COLOR" />

    <!-- Bottom-left box (H) -->
    <rect x="-34" y="2" width="32" height="32" rx="6" :fill="SURFACE_COLOR" />

    <!-- Bottom-right box (Arrow) -->
    <rect
      x="2"
      y="2"
      width="32"
      height="32"
      rx="6"
      :fill="BACKGROUND_COLOR"
      @click="schemaIdx = (schemaIdx + 1) % SCHEMA_MODES.length"
    />

    <!-- Top-left text (L) -->
    <text
      x="-18"
      y="-18"
      text-anchor="middle"
      dominant-baseline="middle"
      font-weight="bold"
      font-size="12"
      fill="#000000"
    >
      {{ Math.round(l * 100) / 100 }}
    </text>

    <!-- Top-right text (C) -->
    <text
      x="18"
      y="-18"
      text-anchor="middle"
      dominant-baseline="middle"
      font-weight="bold"
      font-size="12"
      fill="#000000"
    >
      {{ Math.round(c * 100) / 100 }}
    </text>

    <!-- Bottom-left text (H) -->
    <text
      x="-18"
      y="18"
      text-anchor="middle"
      dominant-baseline="middle"
      font-weight="bold"
      font-size="12"
      fill="#000000"
    >
      {{ Math.round(h * 360) }}
    </text>

    <!-- Bottom-right text (Arrow) -->
    <text
      x="18"
      y="18"
      text-anchor="middle"
      dominant-baseline="middle"
      font-weight="bold"
      font-size="16"
      fill="#ffffff"
      class="pointer-events-none"
    >
      →
    </text>
  </svg>
</template>
