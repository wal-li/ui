import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';

import {
  GLOBAL_DEFAULT_MENU_ITEM_PRIORITY,
  GLOBAL_STORE_NAME,
} from '../constants';

export const storeName = GLOBAL_STORE_NAME;

export const useGlobalStore = defineStore(storeName, () => {
  const addresses = ref([]);
  const dashboardName = import.meta.env.WALLI_DASHBOARD_NAME;

  const menuItems: Ref<any> = ref([]);

  function setMenuItem(name: string, value: any, priority?: number) {
    for (const item of menuItems.value) {
      if (item.name === name) {
        item.value = value;
        item.priority = item.priority || GLOBAL_DEFAULT_MENU_ITEM_PRIORITY;
        return;
      }
    }

    menuItems.value.push({
      name,
      value,
      priority: priority || GLOBAL_DEFAULT_MENU_ITEM_PRIORITY,
    });
  }

  return {
    addresses,
    dashboardName,

    // admin menu
    menuItems,
    setMenuItem,
  };
});
