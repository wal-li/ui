<script setup>
import { ref, watch, onMounted } from 'vue';

import Menu from 'primevue/menu';

import {
  ADMIN_OVERVIEW_PATH,
  ADMIN_PATH,
  ADMIN_TABLE_PATH,
} from '../constants';
import { useTableStore } from '../stores/table';
import { useAuthStore } from '../stores/auth';
import { useGlobalStore } from '../stores/global';
import { computed } from 'vue';

const tableStore = useTableStore();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const sortedMenuItems = computed(() => {
  const items = [...globalStore.menuItems];

  return items.map((i) => i.value);
});
</script>

<template>
  <div>
    <Menu :model="sortedMenuItems" class="admin-menu">
      <template #start>
        <h1
          class="text-center text-xl font-semibold w-full uppercase tracking-widest text-primary my-4"
        >
          {{ globalStore.dashboardName }}
        </h1>
      </template>

      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-4 capitalize">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-4 capitalize">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<style>
.admin-menu {
  border-width: 0;
  padding: 0;
}

.admin-menu ul li [data-pc-section='content'] {
  background-color: transparent;
}
</style>
