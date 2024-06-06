<script setup>
import { onMounted, ref, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';

import { useTableStore } from '../../stores/table.js';
import { useGlobalStore } from '../../stores/global.js';
import {
  ADMIN_NEW_RECORD_PATH,
  ADMIN_RECORD_PATH,
  ADMIN_TABLE_PATH,
  NOT_FOUND_PATH,
  AUTH_READ_PERM,
  AUTH_CREATE_PERM,
  AUTH_UPDATE_PERM,
  AUTH_DELETE_PERM
} from '../../constants.js';

import RawViewField from '../../components/RawViewField.vue';
import PasswordViewField from '../../components/PasswordViewField.vue';
import TagViewField from '../../components/TagViewField.vue';
import ObjectViewField from '../../components/ObjectViewField.vue';
import { nextTick } from 'vue';

const route = useRoute();
const router = useRouter();
const tableStore = useTableStore();
const globalStore = useGlobalStore();
const confirm = useConfirm();
const toast = useToast();

const fieldList = shallowRef([]);
const recordList = shallowRef([]);
const tableConfig = shallowRef({});
const loadConfig = shallowRef({});
const tableName = ref(null);
const selectedIds = ref([]);
const isLoading = ref(false);
const total = ref(0);

/**
 * Validate user has permssion on the current table
 * @param {string} name
 * @returns {boolean}
 */
function hasPerm(name) {
  return (tableConfig.value.acl || []).indexOf(name) !== -1;
}

/**
 * Load data
 */
async function load() {
  if (!hasPerm(AUTH_READ_PERM)) return;

  isLoading.value = true;
  const res = await tableStore.listRecord(tableName.value, {
    pagination: {
      start: loadConfig.value.first,
      limit: loadConfig.value.rows
    },
    ...(loadConfig.value.sortField
      ? {
          sort: [
            `${loadConfig.value.sortField}:${
              loadConfig.value.sortOrder === -1 ? 'desc' : 'asc'
            }`
          ]
        }
      : {})
  });
  isLoading.value = false;
  recordList.value = res.data;
  total.value = res.meta.pagination.total;
}

function updateLoadConfig(nextConfig) {
  loadConfig.value = nextConfig;
  console.log(nextConfig);
  load();
}

function handleRemove(recordId) {
  confirm.require({
    message: `Do you want to delete this record (****${recordId.substr(
      -4,
      4
    )})?`,
    header: 'Danger Zone',
    icon: 'pi pi-info-circle mr-2',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: async () => {
      try {
        await tableStore.removeRecord(tableName.value, recordId);
      } catch (err) {
        toast.add({
          severity: 'error',
          summary: 'Invalid Request',
          detail: err.response?.data?.error || err.message,
          life: 3000
        });
        return;
      }

      toast.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Record deleted',
        life: 3000
      });

      load();
    },
    reject: () => {
      // pass
    }
  });
}

/**
 * Init component data for the first time or table name is changed
 */
function init() {
  tableName.value = null;
  fieldList.value = [];
  loadConfig.value = {
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: null
  };
  isLoading.value = false;

  if (!route.params.tableName) return router.push(NOT_FOUND_PATH);

  const config = tableStore.getConfig(route.params.tableName);
  if (!config) return router.push(NOT_FOUND_PATH);

  tableName.value = config.name;
  tableConfig.value = config;

  globalStore.addresses = [
    { label: 'Table' },
    {
      label: tableName.value,
      route: ADMIN_TABLE_PATH.replace(':tableName', tableName.value)
    }
  ];

  for (const fieldName in tableConfig.value.fields) {
    fieldList.value.push({
      ...tableConfig.value.fields[fieldName],
      name: fieldName
    });
  }

  load();
}

onMounted(() => {
  init();
});

watch(
  () => route.params.tableName,
  () => {
    init();
  }
);
</script>

<template>
  <div class="p-6">
    <DataTable
      showGridlines
      lazy
      paginator
      tableStyle="min-width: 50rem"
      dataKey="_id"
      :loading="isLoading"
      :value="recordList"
      :first="loadConfig.first"
      :rows="loadConfig.rows"
      :totalRecords="total"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      v-model:selection="selectedIds"
      @page="updateLoadConfig($event)"
      @sort="updateLoadConfig($event)"
    >
      <template #header>
        <div class="flex justify-between">
          <router-link
            v-if="hasPerm(AUTH_CREATE_PERM)"
            :to="ADMIN_NEW_RECORD_PATH.replace(':tableName', tableName)"
          >
            <Button icon="pi pi-plus" label="Create" size="small" />
          </router-link>
        </div>
      </template>
      <template #empty>
        {{
          hasPerm(AUTH_READ_PERM) ? 'No data.' : 'No permission to view data.'
        }}
      </template>
      <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
      <Column
        v-for="field in fieldList"
        sortable
        :key="field.name"
        :field="field.name"
        :header="field.label || field.name"
      >
        <template #body="{ data, field: fieldName }">
          <PasswordViewField
            v-if="field.format === 'hash'"
            :value="data[fieldName]"
          />
          <TagViewField
            v-else-if="field.type === 'array' && field.items?.type === 'string'"
            :value="data[fieldName]"
          />
          <ObjectViewField
            v-else-if="field.type === 'array' || field.type === 'object'"
            :header="fieldName"
            :value="data[fieldName]"
          />
          <RawViewField v-else :value="data[fieldName]" />
        </template>
      </Column>
      <Column headerStyle="width: 1rem;" bodyStyle=""
        ><template #body="{ data }">
          <div class="flex gap-2">
            <ObjectViewField
              v-if="hasPerm(AUTH_READ_PERM)"
              icon="pi pi-eye"
              :header="data._id"
              :value="data"
            />
            <router-link
              v-if="hasPerm(AUTH_UPDATE_PERM)"
              :to="
                ADMIN_RECORD_PATH.replace(':tableName', tableName).replace(
                  ':recordId',
                  data._id
                )
              "
            >
              <button
                class="pi pi-pencil p-2"
                :disabled="tableStore.isLoading"
              ></button>
            </router-link>
            <button
              v-if="hasPerm(AUTH_DELETE_PERM)"
              class="pi pi-trash p-2"
              :disabled="tableStore.isLoading"
              @click="handleRemove(data._id)"
            ></button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
