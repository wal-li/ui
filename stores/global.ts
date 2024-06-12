import { ref } from 'vue';
import { defineStore } from 'pinia';

import { GLOBAL_STORE_NAME } from '../constants';

export const storeName = GLOBAL_STORE_NAME;

export const useGlobalStore = defineStore(storeName, () => {
  const addresses = ref([]);
  const dashboardName = import.meta.env.WALLI_DASHBOARD_NAME;

  return {
    addresses,
    dashboardName,
  };
});
