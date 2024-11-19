<script setup>
import { faker } from '@faker-js/faker';
import DataTable from '../data-table/DataTable.vue';
import CodePreview from '../test/CodePreview.vue';
import Playground from '../test/Playground.vue';
import CheckIcon from '../icons/CheckIcon.vue';
import { ref } from 'vue';
import PencilIcon from '../icons/PencilIcon.vue';
import TrashIcon from '../icons/TrashIcon.vue';

const data = [];

for (let i = 0; i < 10; i++)
  data.push({
    id: faker.string.nanoid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bio: faker.person.bio(),
    age: faker.number.int({
      min: 18,
      max: 80,
    }),
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
      <div class="overflow-x-auto">
        <DataTable class="text-sm leading-4 w-full" :value="data">
          <template #head-cell="{ label }">
            <th class="border p-2.5">
              <span class="inline-block p-0.5">{{ label }}</span>
            </th>
          </template>

          <template #head-cell[id]="">
            <td class="border p-2.5 w-10">
              <!-- CHECKBOX -->
              <div class="text-sm leading-4 inline-flex items-center">
                <!-- VALUE -->
                <input id="thcbxall" class="peer hidden" type="checkbox" @change="toggleSelectAll" />
                <!-- END VALUE -->
                <label
                  for="thcbxall"
                  class="inline-block peer-checked:hidden border border-primary w-4 h-4 rounded m-0.5"
                >
                </label>
                <label
                  for="thcbxall"
                  class="hidden peer-checked:inline-block border border-primary bg-primary text-background w-4 h-4 rounded m-0.5"
                >
                  <CheckIcon class="w-3.5 h-3.5" />
                </label>
              </div>
              <!-- END CHECKBOX -->
            </td>
          </template>

          <template #cell="{ value, name }">
            <td :class="`border p-2.5 ${name === 'age' ? 'text-center' : ''}`">
              <span class="inline-block p-0.5">{{ value }}</span>
            </td>
          </template>

          <template #cell[id]="{ name, value }">
            <td class="border p-2.5 w-10">
              <!-- CHECKBOX -->
              <div class="text-sm leading-4 inline-flex items-center">
                <!-- VALUE -->
                <input :id="`tdcbx-${value}`" class="peer hidden" type="checkbox" :value="value" v-model="selected" />
                <!-- END VALUE -->
                <label
                  :for="`tdcbx-${value}`"
                  class="inline-block peer-checked:hidden border border-primary w-4 h-4 rounded m-0.5"
                >
                </label>
                <label
                  :for="`tdcbx-${value}`"
                  class="hidden peer-checked:inline-block border border-primary bg-primary text-background w-4 h-4 rounded m-0.5"
                >
                  <CheckIcon class="w-3.5 h-3.5" />
                </label>
              </div>
              <!-- END CHECKBOX -->
            </td>
          </template>

          <template #cell[tools]="{ name, value }">
            <td class="border p-2.5 w-10">
              <div class="flex gap-2.5">
                <!-- ICON BUTTON -->
                <button class="text-sm leading-4 font-medium rounded inline-flex items-center p-0.5 hover:bg-secondary">
                  <PencilIcon class="w-4 h-4" />
                </button>
                <!-- END ICON BUTTON -->

                <!-- ICON BUTTON -->
                <button class="text-sm leading-4 font-medium rounded inline-flex items-center p-0.5 hover:bg-secondary">
                  <TrashIcon class="w-4 h-4" />
                </button>
                <!-- END ICON BUTTON -->
              </div>
            </td>
          </template>
        </DataTable>
      </div>
      <!-- END DATA TABLE -->
    </Playground>
  </div>
</template>
