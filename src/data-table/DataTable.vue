<script setup>
import { computed } from 'vue';

const props = defineProps(['value', 'fields']);

const cols = computed(() => {
  // user-defined fields
  if (Array.isArray(props.fields)) {
    return props.fields.map((cfg) => ({
      name: typeof cfg === 'string' ? cfg : cfg.name,
      label: typeof cfg === 'string' ? toLabel(cfg) : cfg.label,
    }));
  }

  // auto fields
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
        <slot :name="`cell[${col.name}]`" v-for="col in cols" v-bind="{ value: row[col.name], ...col, row }">
          <slot name="cell" v-bind="{ value: row[col.name], ...col, row }">
            <td>{{ row[col] }}</td>
          </slot>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
