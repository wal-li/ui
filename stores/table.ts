import { Ref, computed, ref } from 'vue';
import { defineStore } from 'pinia';

import qs from 'qs';

import { useHttpStore } from './http';
import {
  ADMIN_TABLE_PATH,
  TABLE_API,
  TABLE_LIST_API,
  TABLE_STORE_NAME,
} from '../constants';
import { joinPath } from '../utils';
import { useGlobalStore } from './global';

export const storeName = TABLE_STORE_NAME;

export const useTableStore = defineStore(storeName, () => {
  const httpStore = useHttpStore();
  const globalStore = useGlobalStore();

  const tables: Ref<any[]> = ref([]);
  const permissions = ref([]);
  const isTableLoading = ref(true);

  /**
   * Load table configs
   */
  async function loadConfigs() {
    isTableLoading.value = true;

    // make request
    const res = await httpStore.createRequest().get(TABLE_LIST_API);

    // set data
    tables.value = [];
    for (const tableName in res.data.data) {
      tables.value.push({
        name: tableName,
        ...res.data.data[tableName],
      });
    }

    // update menu
    const tableItems: any[] = [];
    for (const table of tables.value) {
      tableItems.push({
        label: table.name,
        route: ADMIN_TABLE_PATH.replace(':tableName', table.name),
        icon: 'pi pi-file',
      });
    }
    globalStore.setMenuItem('tables', {
      label: 'Tables',
      items: tableItems,
    });

    permissions.value = res.data.user?.permissions || [];

    isTableLoading.value = false;
  }

  /**
   * Get table config in local store
   * @param {string} tableName
   * @returns {import('../typedefs').TableConfig}
   */
  function getConfig(tableName) {
    for (const table of tables.value) {
      if (table.name === tableName) return table;
    }
    return null;
  }

  /**
   * Get list of record, contain pagination
   * @param {string} tableName
   * @returns {object[]} Record list
   */
  async function listRecord(tableName, query = {}) {
    // make request
    const res = await httpStore
      .createRequest()
      .get(joinPath(TABLE_API, tableName) + '?' + qs.stringify(query));
    return res.data;
  }

  /**
   * Create a new record
   * @param {string} tableName
   * @param {object} data
   * @returns {object} created record
   */
  async function createRecord(tableName, data) {
    // make request
    const res = await httpStore
      .createRequest()
      .post(joinPath(TABLE_API, tableName), data);

    // validate status
    if (res.status !== 200 && res.data.error) throw new Error(res.data.error);
    else if (res.status !== 200) throw new Error(res.data || res.statusText);

    return res.data.data[0];
  }

  /**
   * Get a record
   * @param {string} tableName
   * @param {string} recordId
   * @returns {object} record
   */
  async function getRecord(tableName, recordId) {
    // make request
    const res = await httpStore
      .createRequest()
      .get(joinPath(TABLE_API, tableName, recordId));

    // validate status
    if (res.status !== 200 && res.data.error) throw new Error(res.data.error);
    else if (res.status !== 200) throw new Error(res.data || res.statusText);

    return res.data.data[0];
  }

  /**
   * Update record by replace
   * @param {string} tableName
   * @param {string} recordId
   * @param {object} data
   * @returns {object}
   */
  async function putRecord(tableName, recordId, data) {
    // make request
    const res = await httpStore
      .createRequest()
      .put(joinPath(TABLE_API, tableName, recordId), data);

    // validate status
    if (res.status !== 200 && res.data.error) throw new Error(res.data.error);
    else if (res.status !== 200) throw new Error(res.data || res.statusText);

    return res.data.data[0];
  }

  /**
   * Remove record
   * @param {string} tableName
   * @param {string} recordId
   * @returns {object}
   */
  async function removeRecord(tableName, recordId) {
    // make request
    const res = await httpStore
      .createRequest()
      .delete(joinPath(TABLE_API, tableName, recordId));

    // validate status
    if (res.status !== 200 && res.data.error) throw new Error(res.data.error);
    else if (res.status !== 200) throw new Error(res.data || res.statusText);

    return res.data.data[0];
  }

  return {
    isLoading: computed(() => httpStore.isLoading),
    tables,
    permissions,
    isTableLoading,
    loadConfigs,
    getConfig,
    listRecord,
    createRecord,
    getRecord,
    putRecord,
    removeRecord,
  };
});
