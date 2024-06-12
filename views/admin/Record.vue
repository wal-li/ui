<script setup>
import { onMounted, watch, ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Chips from 'primevue/chips';

import { useTableStore } from '../../stores/table';
import { useGlobalStore } from '../../stores/global';
import {
  NOT_FOUND_PATH,
  ADMIN_RECORD_PATH,
  ADMIN_TABLE_PATH,
  ADMIN_NEW_RECORD_PATH,
} from '../../constants';

import PasswordFormField from '../../components/PasswordFormField.vue';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const tableStore = useTableStore();
const globalStore = useGlobalStore();

const fieldList = shallowRef([]);
const tableConfig = shallowRef({});

const tableName = ref(null);
const recordId = ref(null);

const dataForm = ref({});
const validRefs = ref([]);

/**
 * Load data
 */
async function load() {
  let nextRecord;
  try {
    nextRecord = await tableStore.getRecord(tableName.value, recordId.value);
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Invalid Request',
      detail: err.response?.data?.error || err.message,
      life: 3000,
    });
    router.push(NOT_FOUND_PATH);
    return;
  }

  for (const field of fieldList.value) {
    dataForm.value[field.name] = nextRecord[field.name];
  }
}

/**
 * Init component data for the first time or table name is changed
 */
function init() {
  // init data
  tableName.value = null;
  recordId.value = null;

  fieldList.value = [];
  dataForm.value = {};

  // load configs
  if (!route.params.tableName) return router.push(NOT_FOUND_PATH);

  const config = tableStore.getConfig(route.params.tableName);
  if (!config) return router.push(NOT_FOUND_PATH);

  if (route.params.recordId) {
    recordId.value = route.params.recordId;
  }

  tableName.value = config.name;
  tableConfig.value = config;

  for (const fieldName in tableConfig.value.fields) {
    fieldList.value.push({
      ...tableConfig.value.fields[fieldName],
      name: fieldName,
    });
  }

  // update title
  globalStore.addresses = [
    { label: 'Table' },
    {
      label: tableName.value,
      route: ADMIN_TABLE_PATH.replace(':tableName', tableName.value),
    },
    {
      label: recordId.value
        ? 'Edit (****' + recordId.value.substr(-4, 4) + ')'
        : 'Create',
      route: recordId.value
        ? ADMIN_RECORD_PATH.replace(':tableName', tableName.value).replace(
            ':recordId',
            recordId.value,
          )
        : ADMIN_NEW_RECORD_PATH.replace(':tableName', tableName.value),
    },
  ];
  // `Table > ${tableName.value} > ${
  //   recordId.value

  // }`;

  // init components
  for (const item of validRefs.value) {
    if (item.init) {
      item.init();
    }
  }

  // load data
  if (recordId.value) load();
}

/**
 * Create a new record if recordId not provided, Edit and save a record else.
 */
async function handleSubmit() {
  for (const item of validRefs.value) {
    if (item.validate && !item.validate()) {
      toast.add({
        severity: 'error',
        summary: 'Invalid field(s)',
        detail: 'Some fields are incorrect.',
        life: 3000,
      });
      return;
    }
  }

  // create a new record
  if (!recordId.value) {
    let nextRecord;
    try {
      nextRecord = await tableStore.createRecord(
        tableName.value,
        dataForm.value,
      );
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Invalid Request',
        detail: err.response?.data?.error || err.message,
        life: 3000,
      });
      return;
    }

    toast.add({
      severity: 'success',
      summary: 'Created',
      detail: `Record was created successful.`,
      life: 3000,
    });

    router.push(
      ADMIN_RECORD_PATH.replace(':tableName', tableName.value).replace(
        ':recordId',
        nextRecord._id,
      ),
    );
    return;
  }

  // edit a new record
  let nextRecord;
  try {
    nextRecord = await tableStore.putRecord(
      tableName.value,
      recordId.value,
      dataForm.value,
    );
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Invalid Request',
      detail: err.response?.data?.error || err.message,
      life: 3000,
    });
    return;
  }

  toast.add({
    severity: 'success',
    summary: 'Updated',
    detail: `Record was updated successful.`,
    life: 3000,
  });

  init();
}

onMounted(() => {
  init();
});

watch(
  () => [route.params.tableName, route.params.recordId],
  () => {
    init();
  },
);
</script>

<template>
  <div class="p-6">
    <div
      v-for="field in fieldList"
      :key="field.name"
      class="flex flex-col gap-2 mb-4"
    >
      <label :for="field.name">{{ field.label || field.name }}</label>

      <PasswordFormField
        v-if="field.format === 'hash'"
        ref="validRefs"
        :name="field.name"
        :label="field.label"
        :disabled="tableStore.isLoading"
        v-model="dataForm[field.name]"
      />
      <Chips
        v-else-if="field.type === 'array' && field.items?.type === 'string'"
        :name="field.name"
        :id="field.name"
        :disabled="tableStore.isLoading"
        v-model="dataForm[field.name]"
      />
      <InputText
        v-else
        type="text"
        :name="field.name"
        :id="field.name"
        :disabled="tableStore.isLoading"
        v-model="dataForm[field.name]"
      />
    </div>

    <Button
      label="Save"
      :disabled="tableStore.isLoading"
      @click="handleSubmit"
    />
  </div>
</template>
