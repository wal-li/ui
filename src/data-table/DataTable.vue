<script setup>
import { computed } from 'vue';

const props = defineProps(['value']);

const cols = computed(() => {
  if (!props.value || !Array.isArray(props.value)) return [];

  const colSet = new Set();
  for (const row of props.value) for (const col in row) colSet.add(col);

  return [...colSet].map((name) => ({ name, label: toLabel(name) }));
});

function toLabel(name) {
  return name
    .split(/(?<![A-Z])(?=[A-Z])/)
    .filter((w) => w)
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <slot :name="`head-cell[${col.name}]`" v-for="col in cols" v-bind="col">
          <slot name="head-cell" v-bind="col">
            <th>{{ col.label }}</th>
          </slot>
        </slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in value">
        <slot :name="`cell[${col.name}]`" v-for="col in cols" v-bind="{ value: row[col.name], ...col }">
          <slot name="cell" v-bind="{ value: row[col.name], ...col }">
            <td>{{ row[col] }}</td>
          </slot>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
