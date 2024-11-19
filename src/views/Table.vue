<script setup>
import { faker } from '@faker-js/faker';
import DataTable from '../data-table/DataTable.vue';
import CodePreview from '../test/CodePreview.vue';
import Playground from '../test/Playground.vue';
import CheckIcon from '../icons/CheckIcon.vue';
import { ref } from 'vue';
import Checkbox from '../components/Checkbox.vue';
import Button from '../components/Button.vue';
import PencilSquareIcon from '../icons/PencilSquareIcon.vue';
import XMarkIcon from '../icons/XMarkIcon.vue';
import vDragable from '../dragable/dragable';

const data = [];

for (let i = 0; i < 20; i++)
  data.push({
    id: faker.string.nanoid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({
      min: 18,
      max: 80,
    }),
    bio: faker.person.bio(),
    address: faker.location.streetAddress(),
    avatar: faker.image.avatar(),
    tools: true,
  });

const selected = ref([]);

function toggleSelectAll(e) {
  if (!e.target.checked) selected.value = [];
  else selected.value = data.map((i) => i.id);
}
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <CodePreview>
      <pre>
const data = [{{ JSON.stringify(data[0], null, 2) }}];

const selected = ref([]);

function toggleSelectAll(e) {
  if (!e.target.checked) selected.value = [];
  else selected.value = data.map((i) => i.id);
}</pre
      >
    </CodePreview>

    <Playground id="data-table">
      <!-- DATA TABLE -->
      <div class="overflow-x-auto h-[40rem] select-none" v-dragable>
        <DataTable class="leading-4 w-full" :value="data">
          <template #head-cell="{ label }">
            <th class="border p-2.5 whitespace-nowrap text-ellipsis">
              <span class="inline-block p-0.5">{{ label }}</span>
            </th>
          </template>

          <template #head-cell[id]="">
            <td class="border p-2.5 w-10">
              <Checkbox @change="toggleSelectAll" />
            </td>
          </template>

          <template #cell="{ value, name }">
            <td :class="`border p-2.5 whitespace-nowrap text-ellipsis ${name === 'age' ? 'text-center' : ''}`">
              <span class="inline-block p-0.5">{{ value }}</span>
            </td>
          </template>

          <template #cell[id]="{ name, value }">
            <td class="border p-2.5 w-10">
              <Checkbox :value="value" v-model="selected" />
            </td>
          </template>

          <template #cell[tools]="{ name, value }">
            <td class="border p-1.5 w-10">
              <div class="flex">
                <Button size="sm" variant="secondary" :icon="PencilSquareIcon" ghosted />
                <Button size="sm" variant="secondary" :icon="XMarkIcon" ghosted />
              </div>
            </td>
          </template>
        </DataTable>
      </div>
      <!-- END DATA TABLE -->
    </Playground>
  </div>
</template>
