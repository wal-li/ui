<script setup>
import { ref } from 'vue';

import Dashboard from './dashboard/Dashboard.vue';
import Input from './input/Input.vue';
import Button from './button/Button.vue';
import Toast from './toast/Toast.vue';
import DataTable from './table/DataTable.vue';

import { topMenuItems, sideMenuItems } from './constants';

const toastStore = ref();

const sampleDataColumns = [{ name: 'name', label: 'Name' }];
const sampleData = [
  {
    name: 'foo',
    age: 12,
  },
];

function handleSubmit(e) {
  e.preventDefault();
  return false;
}

function pushToast() {
  toastStore.value.add({
    severity: 'error',
    summary: 'ErrorSummary',
    detail: 'This is error detail',
    life: 3000,
  });
}
</script>

<template>
  <Dashboard :sideMenuItems="sideMenuItems" :topMenuItems="topMenuItems">
    <template #logo>
      <div class="flex gap-2 items-center text-primary-700">
        <i class="pi pi-star-fill text-lg"></i>
        <span class="font-black">@wal-li/ui</span>
      </div>
    </template>

    <div class="flex flex-col gap-4">
      <div>
        <div class="text-xs font-light uppercase text-stone-500">Overview</div>
        <div class="text-xl font-semibold">Dashboard</div>
      </div>

      <div>
        <form @submit="handleSubmit">
          <Input label="Username" name="username" modelValue="sample user" />
          <Input label="Password" name="password" type="password" />
          <Button>Login</Button>
        </form>
      </div>

      <div>
        <Toast ref="toastStore" />
        <Button @click="pushToast">Push Toast</Button>
      </div>

      <div>
        <DataTable></DataTable>
      </div>
    </div>
  </Dashboard>
</template>
