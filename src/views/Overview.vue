<script setup>
import { ref } from 'vue';
import Button from '../components/Button.vue';
import Checkbox from '../components/Checkbox.vue';
import Field from '../components/Field.vue';
import Input from '../components/Input.vue';
import Dialog from '../components/Dialog.vue';
import ArrowRightCircleIcon from '../icons/ArrowRightCircleIcon.vue';
import Pagination from '../pagination/Pagination.vue';
import DataTable from '../data-table/DataTable.vue';
import vDragable from '../dragable/dragable';
import PencilSquareIcon from '../icons/PencilSquareIcon.vue';
import XMarkIcon from '../icons/XMarkIcon.vue';

const infoRef = ref();
const form = ref({});
const pageStart = ref(0);
const pageLimit = ref(10);
const pageTotal = ref(100);
const data = [
  {
    id: '9C2dgUnZKB59m_9ORgce4',
    firstName: 'Berniece',
    lastName: 'Johns',
    age: 47,
    bio: 'receptor lover, filmmaker 🐙',
    address: '71203 Nader Lock',
    avatar: 'https://avatars.githubusercontent.com/u/85381471',
    tools: true,
  },
];

const selected = ref([]);

function toggleSelectAll(e) {
  if (!e.target.checked) selected.value = [];
  else selected.value = data.map((i) => i.id);
}
</script>

<template>
  <Dialog ref="infoRef">
    <div class="w-full max-w-[30rem] flex flex-col">
      <h3 class="text-xl leading-7 font-bold tracking-wider">Info</h3>

      <h4 class="text-lg leading-6 font-bold tracking-wider">Form</h4>

      <div>
        <div class="text-sm leading-6 font-mono" v-for="(value, label) in form">
          {{ label }}: <b>{{ value }}</b>
        </div>
      </div>
    </div>
  </Dialog>

  <div class="grid grid-cols-3 gap-4">
    <div class="border rounded-lg p-4 flex flex-col gap-4 col-span-3 lg:col-span-1">
      <Field v-slot="{ id }" label="Username">
        <Input :id="id" v-model="form.username" />
      </Field>

      <Field v-slot="{ id }" label="Password">
        <Input type="password" :id="id" v-model="form.password" />
      </Field>

      <Field v-slot="{ id }">
        <Checkbox label="Remember Me" :id="id" v-model="form.rememberMe" />
      </Field>

      <div>
        <Button label="Login" @click="() => infoRef.toggle()" />
      </div>
    </div>

    <div class="border rounded-lg p-4 flex flex-col gap-4 col-span-3 lg:col-span-1">
      <!-- MENUBAR -->
      <div
        class="outline outline-1 -outline-offset-1 outline-secondary rounded-lg p-2 flex items-center text-sm top-0 z-10 bg-background"
      >
        <Button size="sm" variant="secondary" :icon="ArrowRightCircleIcon" ghosted />
        <Button size="sm" variant="secondary" label="Button" ghosted />
      </div>
      <!-- END MENUBAR -->
    </div>

    <div class="border rounded-lg p-4 flex flex-col gap-4 col-span-3 lg:col-span-1">
      <!-- PAGINATION -->
      <Pagination
        class="flex flex-wrap gap-2 items-center justify-center"
        :start="pageStart"
        :limit="pageLimit"
        :total="pageTotal"
        v-slot="{ start, page, label, isActive }"
      >
        <Button variant="secondary" :label="label" :outlined="!isActive" @click="pageStart = start" />
      </Pagination>
      <!-- END PAGINATION -->
    </div>

    <div class="border rounded-lg p-4 flex flex-col gap-4 col-span-3">
      <!-- DATA TABLE -->
      <div class="overflow-x-auto select-none" v-dragable>
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
    </div>
  </div>
</template>
